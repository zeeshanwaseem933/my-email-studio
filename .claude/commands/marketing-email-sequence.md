---
description: Design a multi-email sequence with full copy, timing and exit conditions
argument-hint: "[sequence type]"
---

# /marketing-email-sequence

Run the `marketing:email-sequence` skill from the marketing plugin.

Invoke it with the Skill tool, skill name `marketing:email-sequence`, passing `$ARGUMENTS` as the args.
If no arguments were given, ask what to work on first, in one short question.

Follow this project's rules in CLAUDE.md: plain English, short sentences, no marketing filler.
Save the result as a file under `campaigns/`. Ask before overwriting anything.

Draft only. Do not send anything, and do not call any sending API or email tool,
even if credentials are available. Hand the draft over and let me send it.
