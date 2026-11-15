---
description: Check a draft against the brand voice in brand/ and flag deviations
argument-hint: "<content to review>"
---

# /marketing-brand-review

Run the `marketing:brand-review` skill from the marketing plugin.

Invoke it with the Skill tool, skill name `marketing:brand-review`, passing `$ARGUMENTS` as the args.
If no arguments were given, ask what to work on first, in one short question.

Follow this project's rules in CLAUDE.md: plain English, short sentences, no marketing filler.
Save the result as a file under `campaigns/`. Ask before overwriting anything.
