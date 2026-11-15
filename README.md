# my-email-studio

A workspace for planning and writing email campaigns for a small business.

Campaigns get planned, drafted, reviewed and saved as files. The work here is
planning and drafting only.

**Nothing in this folder sends email to real people.** A draft is finished when
it is saved to a file and handed to the sender. That is the whole point of the
setup, and a hook enforces it — see [Sending](#sending) below.

## Layout

| Folder | What's in it |
| --- | --- |
| [`brand/`](brand/) | Who the business is and how it sounds. Read before drafting. |
| [`leads/`](leads/) | Contact lists and the audience groups we write for. |
| [`campaigns/`](campaigns/) | The campaigns: plans, sequences and email drafts. |
| [`notes/`](notes/) | Working notes and research. |

## The campaign in here

[`campaigns/steep-club-launch/`](campaigns/steep-club-launch/) — a waitlist
launch for a monthly tea box.

- [`plan.md`](campaigns/steep-club-launch/plan.md) — the goal, the audience, the
  calendar and the metrics, with the arithmetic behind the target.
- [`emails/`](campaigns/steep-club-launch/emails/) — the four launch emails.
- [`groups/`](campaigns/steep-club-launch/groups/) — a copy of each email
  rewritten for each lead group: `tea-curious`, `gift-buyers`, `daily-drinkers`.

## How an email file is written

[`.claude/rules/emails.md`](.claude/rules/emails.md) sets the shape of every
draft under `campaigns/**/emails/`: subject and preview on the first two lines,
a `{{first_name}}` greeting, one link, and a fixed sign-off and footer.

Two conventions worth knowing before you read a draft:

- **Square brackets hold facts that still need checking** — a price, a date, a
  tasting note. The sentence around a bracket is written so it still works once
  the bracket is swapped for the real thing.
- **Anything invented is a labelled placeholder**, never plain prose. If a line
  states a number or a date as true, it is either true or it is bracketed.

So a draft that still has brackets in it is not unfinished sloppiness — it is
the file telling you what has not been confirmed yet.

## Sending

Drafting is safe by default. Three things hold that line:

**1. The project rule.** [`CLAUDE.md`](CLAUDE.md) forbids sending to real
people. Resend is allowed to two kinds of address only: Resend's own
`@resend.dev` test addresses, and the owner's own address.

**2. The guard.** [`.claude/hooks/send-guard.mjs`](.claude/hooks/send-guard.mjs)
runs before every Resend MCP call and decides whether it may go ahead:

- `send-email` and `send-batch-emails` — every address in `to`, `cc` and `bcc`
  must end in `@resend.dev` or match `MY_EMAIL`. Otherwise blocked.
- `send-broadcast`, `create-automation`, `send-inbox-draft` and
  `send-new-inbox-email` — always blocked. These reach whole lists of people.
- Anything the guard cannot read or cannot understand is blocked, not allowed.

**3. Practice mode.** [`.mcp.json`](.mcp.json) defaults `RESEND_BASE_URL` to a
local server, so a send that gets past the guard still does not leave the
machine. It holds no credentials — the values are environment lookups with safe
defaults.

If you point this at a real Resend account, practice mode is gone and the guard
is the only thing left. Keep it.

## Setup

The [`marketing`](https://github.com/anthropics/knowledge-work-plugins) plugin is
declared in [`.claude/settings.json`](.claude/settings.json), which is committed,
so it loads for anyone who opens this folder. It adds skills for campaign plans,
content drafting, email sequences and performance reports. A local
[`personalize`](.claude/skills/personalize/SKILL.md) skill writes one copy of a
campaign's emails per lead group.

`MY_EMAIL` lives in `.claude/settings.local.json`, which is gitignored and stays
on your machine. Set it before using the Resend tools, or the guard has nothing
to match your own address against.
