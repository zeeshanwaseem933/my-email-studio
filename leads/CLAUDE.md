# leads/ — practice data only

Everyone in this folder is made up. These are not customers. They exist so we can
test segments, counts and campaign drafts without touching anyone real.

[leads.csv](leads.csv) holds 24 invented people, 8 in each of our three groups:
tea-curious, gift-buyers and daily-drinkers.

## Rules for this folder

**1. These people are not real. Keep it that way.**
Never add a real person to any file here. Not a customer, not a friend, not yourself.
If you need more practice rows, invent them.

**2. Never put a real email address in this folder.**
Every address ends in `@example.com`. That domain is reserved by the standards body
for exactly this purpose and cannot receive mail, so a slip here cannot reach a
person. An address at any other domain might belong to someone.

**3. Never change the existing `@example.com` addresses.**
Don't swap the domain, don't "fix" them to look more realistic, don't tidy them into
a company format. The fake domain is the safety net. Leave it alone.

**4. Every row needs a consent value.**
No blanks. Real list hygiene starts with knowing how someone joined, so the practice
data should reflect that. All 24 rows currently say `waitlist form`.

**5. Keep the columns as they are.**
`first_name,last_name,email,group,joined_on,consent`. Dates are ISO, `YYYY-MM-DD`.
The group must be one of the three names above, spelled the same way, or the counts
in the campaign plan stop matching.

## What still applies from the top level

The rules in the project's own [CLAUDE.md](../CLAUDE.md) hold here too. Two matter
most in this folder:

- **Nothing sends.** A list of addresses is not permission to mail them. Fake domain
  or not, no sending happens from this folder.
- **Ask before deleting.** This includes overwriting [leads.csv](leads.csv) with a
  regenerated version. Say what would be lost first.
