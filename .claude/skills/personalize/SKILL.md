---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each lead group

Take the finished emails in one campaign folder. Write one copy of each email for
each lead group. The copies are the same email with a different opening line and
one different example.

Nothing here sends. These are drafts, same as the originals.

## If no campaign folder was given

Glob `campaigns/*/` and list the folders you find. Say that one is needed, show
the list, and stop. Don't guess which one was meant.

## Step 1 — read these first

1. `leads/leads.csv` — the `group` column holds the group names. Use the ones
   actually in the file. Don't type the names from memory.
2. `brand/voice.md` — how we sound, which words are banned, how we sign off.
3. `.claude/rules/emails.md` — the shape every email file has to keep.
4. `<campaign>/plan.md`, if it exists — it usually says what each group cares
   about.

## Step 2 — find the emails

Glob `<campaign>/emails/*.md`.

Skip any file whose first line is not `Subject: `. `README.md` is notes for the
editor, not an email. If no file has a subject line, say so and stop.

## Step 3 — write one copy per group

For every email, for every group, write one file.

**Keep exactly as they are:**

- the subject line and the preview line
- the greeting, including `{{first_name}}`
- the one link — same address and same link text
- every square-bracket placeholder, word for word
- the sign-off, the reply/pause/cancel lines, and both footer lines
- `{{company_address}}` and `{{unsubscribe_url}}`
- the order of the paragraphs, and how many there are

**Change two things, and nothing else:**

1. **The opening line.** The first paragraph after the greeting. Say the same
   thing the original says, in the words that fit this group.
2. **One example.** Pick one sentence further down that gives an example — a
   tea, a way of brewing it, a reason someone signed up — and swap it for one
   that fits this group. One sentence. Not two.

Every other line is copied across unchanged.

## What each group cares about

The plan is the source. This is the short version.

- **tea-curious** — new to loose leaf. Worried about brewing it wrong and wasting
  the money. Lead with how to make it. The note is "you won't get this wrong."
- **gift-buyers** — often don't drink tea. Want price, what arrives, when it
  arrives. Lead with the plain facts. A posting date is a fact, not pressure.
- **daily-drinkers** — already buy tea. Don't explain brewing to them. They care
  whether the tea is good and whether they can skip a month.

If the campaign has groups these three don't cover, read the plan for them.

## Facts you may not invent

A new opening line or example is still copy a reader sees, so rule 2 of
`.claude/rules/emails.md` holds: anything stated as true is either true or a
labelled placeholder.

- Build the new line out of facts already in that email. Don't add a tea, a
  price, a date or a number that isn't there.
- If the line needs a fact nobody has, write it as a placeholder in the same
  shape as the ones already in the file.
- Never write that people asked for something, that a group is big, or that
  something is nearly gone. Nobody counted.
- No urgency words and no wellness words. `brand/voice.md` lists them.

## Step 4 — save it

Write each copy to:

    <campaign>/groups/<group>/emails/<same file name>

Same file name as the original. Nothing is renamed.

**If a file is already there, do not overwrite it.** Stop, and say which files
already exist. Overwriting work is the user's call, not yours.

## Step 5 — what to reply

A short summary and nothing else. Two parts:

1. How many files you wrote.
2. One opening line per group — one example, quoted, with the group name and the
   email it came from.

Don't paste the drafts. Don't list every file. Don't explain your choices. If
something stopped you, say that instead.
