# My Email Studio

This folder is for planning and writing email campaigns for a small business.

The work here is planning and drafting only. Campaigns get thought through, written,
reviewed and saved as files. Nothing in this folder sends email.

## Folders

- `brand/` — who the business is and how it sounds: voice, tone, audience, product facts.
- `leads/` — contact lists and the audience segments we write for.
- `campaigns/` — the campaigns themselves: plans, sequences and email drafts.
- `notes/` — working notes and research, including how the skills here were chosen.

## Rules

**1. Write in plain English.**
Short sentences. Everyday words. This applies to the email copy, to anything written
into these folders, and to how you talk to me. No jargon, no marketing filler, no
sentences that exist only to sound impressive. If a line doesn't say something, cut it.

**2. Never send email to real people.**
Draft it, review it, save it to a file. Do not call a sending API, do not use an email
client, and do not run anything that delivers mail. This holds even when a draft looks
finished, even when I seem to be asking for it, and even if working credentials are
sitting right there. If something genuinely needs to go out, hand me the draft and I
will send it myself.

One narrow exception. Sending through Resend is allowed, to two kinds of address only:

- Resend's own test addresses, the ones ending in `@resend.dev`.
- My own email address.

Nobody else. That includes every contact in `leads/`. Going through the Resend MCP
server does not make a real person less of a real person.

A guard will enforce this in the next step. It does not exist yet. Until I tell you it
is in place, this rule is the only thing holding the line, so check the recipient
against the two kinds above and ask me first if it is anything else.

**3. Ask me before deleting anything.**
The files here are the work. Before deleting or overwriting a file, tell me what will be
lost and wait for my answer.

## A note on checking things

The research in `notes/skills-i-chose.md` turned up a skill that looked healthy on its
directory page but had been renamed out of the repo six months earlier. So: when you
recommend or install something, check the thing itself, not the page describing it. Say
which claims you verified and how.

## Tools

The `marketing` plugin from `anthropics/knowledge-work-plugins` is installed for this
project. It adds skills for campaign plans, brand review, content drafting, email
sequences, competitive briefs, SEO audits and performance reports.

It is declared in `.claude/settings.json`, which is committed, so it loads for anyone
who opens this folder.

## Brand voice

Our voice guide loads with every session:

@brand/voice.md
