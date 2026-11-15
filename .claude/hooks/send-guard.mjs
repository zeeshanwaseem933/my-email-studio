#!/usr/bin/env node
/**
 * PreToolUse guard for the Resend MCP server.
 *
 * Reads the tool call as JSON on stdin and decides whether it may run:
 *   - send-email / send-batch-emails: every address in to, cc and bcc must end
 *     in @resend.dev or be the owner's own address (MY_EMAIL). Otherwise block.
 *   - send-broadcast / create-automation / send-inbox-draft /
 *     send-new-inbox-email: always block. These reach whole lists of people.
 *   - anything else: allow.
 *
 * Exit 0 allows the call. Exit 2 blocks it and shows the reason to Claude.
 * Anything it cannot read or cannot understand is blocked, not allowed.
 */

import { readFileSync } from "node:fs";

const SAFE_DOMAIN = "resend.dev";

// Tools where we check the recipients.
const CHECKED_TOOLS = new Set(["send-email", "send-batch-emails"]);

// Tools that can reach a whole list. Never allowed from here.
const BLOCKED_TOOLS = new Map([
  ["send-broadcast", "a broadcast goes to a whole audience"],
  ["create-automation", "an automation can email a whole list later, unattended"],
  ["send-inbox-draft", "an inbox draft carries its own recipients, which may be anyone"],
  ["send-new-inbox-email", "it sends from an inbox to any address given"],
]);

function block(reason) {
  process.stderr.write(`Blocked by send-guard: ${reason}\n`);
  process.exit(2);
}

function allow() {
  process.exit(0);
}

/** The bare tool name, e.g. "mcp__resend__send-email" -> "send-email". */
function bareToolName(toolName) {
  if (typeof toolName !== "string") return "";
  const parts = toolName.split("__");
  return parts[parts.length - 1];
}

/**
 * Pull a plain address out of one entry.
 * Handles "a@b.com" and "Name <a@b.com>". Returns null if it cannot be read
 * as exactly one address, which the caller treats as a reason to block.
 */
function readAddress(raw) {
  if (typeof raw !== "string") return null;
  let value = raw.trim();

  const angled = value.match(/<([^<>]*)>$/);
  if (angled) value = angled[1].trim();

  if (!value) return null;
  if (/[<>,;\s]/.test(value)) return null;

  const at = value.indexOf("@");
  if (at <= 0) return null;
  if (value.lastIndexOf("@") !== at) return null;

  const domain = value.slice(at + 1);
  if (!domain || !domain.includes(".")) return null;

  return { address: value.toLowerCase(), domain: domain.toLowerCase() };
}

function myEmail() {
  const parsed = readAddress(process.env.MY_EMAIL ?? "");
  return parsed ? parsed.address : null;
}

/** Collect {raw, field, where} for every recipient field we can find. */
function collectRecipients(toolName, input) {
  const found = [];

  const take = (holder, where) => {
    if (!holder || typeof holder !== "object") return;
    for (const field of ["to", "cc", "bcc"]) {
      const value = holder[field];
      if (value === undefined || value === null) continue;
      const items = Array.isArray(value) ? value : [value];
      for (const raw of items) found.push({ raw, field, where });
    }
  };

  // send-email puts to/cc/bcc at the top level.
  take(input, "");

  // send-batch-emails nests one set per email under emails[].
  if (toolName === "send-batch-emails") {
    if (!Array.isArray(input?.emails) || input.emails.length === 0) {
      return { found, problem: "the call has no emails array, so there is nothing to check" };
    }
    input.emails.forEach((email, i) => {
      if (!email || typeof email !== "object") {
        found.push({ raw: null, field: "to", where: `emails[${i}]` });
        return;
      }
      take(email, `emails[${i}]`);
    });
  }

  return { found, problem: null };
}

function main() {
  let payload;
  try {
    const stdin = readFileSync(0, "utf8");
    payload = JSON.parse(stdin);
  } catch {
    block("could not read the tool call as JSON, so the recipients could not be checked");
  }

  const toolName = bareToolName(payload?.tool_name);
  const input = payload?.tool_input;

  if (BLOCKED_TOOLS.has(toolName)) {
    block(`${toolName} is never allowed from this project — ${BLOCKED_TOOLS.get(toolName)}. Save the draft to a file instead.`);
  }

  if (!CHECKED_TOOLS.has(toolName)) {
    allow();
  }

  if (!input || typeof input !== "object") {
    block(`${toolName} was called with no readable input, so the recipients could not be checked`);
  }

  const { found, problem } = collectRecipients(toolName, input);
  if (problem) block(`${toolName}: ${problem}`);

  if (found.length === 0) {
    block(`${toolName} was called with no recipients to check`);
  }

  const mine = myEmail();

  for (const { raw, field, where } of found) {
    const at = where ? `${where}.${field}` : field;
    const parsed = readAddress(raw);

    if (!parsed) {
      block(`${at} contains ${JSON.stringify(raw)}, which is not a single readable address`);
    }
    if (parsed.domain === SAFE_DOMAIN) continue;
    if (mine && parsed.address === mine) continue;

    const allowed = mine
      ? `only @${SAFE_DOMAIN} test addresses and ${mine} are allowed`
      : `only @${SAFE_DOMAIN} test addresses are allowed (MY_EMAIL is not set)`;
    block(`${at} is ${parsed.address} — ${allowed}. Hand the draft over instead of sending it.`);
  }

  allow();
}

main();
