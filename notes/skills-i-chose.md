# Skills I chose for the email studio

Searched skills.sh on 15 Nov 2026 with `npx skills find` for: email marketing, email
sequence, campaign plan, resend. Nothing installed yet — this is just the shortlist.

Re-verified 15 Nov 2026 against the GitHub API and repo contents: install counts, stars,
last-push dates, licences, skill-folder names, Snyk findings. One error found and fixed
(see rule 4).

## Use these

**1. Writing campaigns — `coreyhaines31/marketingskills@emails`**
(same repo also has `@cold-email` for outbound. This skill was called `@email-sequence`
until 14 May 2026, commit 30f9b9a — skills.sh still serves that retired listing, but the
folder is gone from the repo. Install `@emails`.)

Published by Corey Haines, a real marketer with a public track record (github.com/coreyhaines31,
corey.co, 3.8k followers). The repo has **60,404 GitHub stars**, was last updated 11 Nov 2026,
is MIT licensed, and passes all three security audits shown on skills.sh (Gen Agent Trust Hub,
Socket, Snyk). The skill has 89.1k installs. The retired `@email-sequence` listing separately shows
55.1k — a lifetime total still accruing against a name that no longer exists, which is why
it read as healthy for six months after the rename.

Why it fits: it is about the thinking, not a vendor's API. It starts by asking what kind of
sequence you want (welcome, nurture, re-engagement, post-purchase, sales…) and it reads a
`.agents/product-marketing.md` from your repo if you have one (`product-marketing-context.md`
is the legacy name, still read as a fallback), so the copy picks up your
product details instead of being generic. It is the single best-supported marketing skill set
in the directory by a wide margin.

**2. Sending email — `resend/resend-skills@resend`**
(pair it with `resend/email-best-practices@email-best-practices`)

Published by **Resend themselves** — the GitHub org that builds the product (since 2022,
2.4k followers), and listed on the skills.sh "Official — skills from technology makers" page.
That page lists only the real makers; of everything my searches turned up, Resend was the only
publisher on it. 212 stars on the skills repo, last updated 9 Nov 2026, MIT licensed.

Why it fits: it is the sending half that the Corey Haines skills don't cover — transactional and
batch sends, broadcasts, contacts, domains, templates, webhooks, delivery events, and the SDK
setup. Because the vendor wrote it, it carries the gotchas you'd otherwise learn the hard way
(idempotency keys, webhook signature verification, template variable syntax). The companion
`email-best-practices` skill covers SPF/DKIM/DMARC, spam and bounce problems, and CAN-SPAM /
GDPR compliance — all things that will bite a marketing studio specifically.

**The Snyk "Warn" on the `resend` skill — I read the detail, it's fine.**
(skills.sh/resend/resend-skills/resend/security/snyk, analysed 10 Nov 2026)

One issue, **W011, medium, scored 0.30**: "third-party content exposure (indirect prompt
injection risk)" — because the skill monitors webhook endpoints and ingests inbound emails and
webhook payloads, i.e. free text written by strangers. That is not a flaw in Resend's code; it is
the auditor pointing out that anything reading inbound email hands an outsider a channel to my
agent. `resend-cli` carries the identical W011 for the same reason. Gen Agent Trust Hub and
Socket both pass with zero alerts.

So: install it, and treat inbound email content as untrusted data rather than instructions.
If I only ever send (broadcasts, campaigns) and never ingest, the finding doesn't even apply to
my use.

**But skip `resend/resend-skills@agent-email-inbox`** — the sibling skill from the same search.
It has two findings, and the second one matters: **W012, scored 0.70 (high)** — its setup
instructions run `curl -fsSL https://tailscale.com/install.sh | sh`, piping a remote shell script
straight into a shell at install time. Official publisher or not, I'm not running that to send
marketing email. I don't need an agent inbox anyway.

> Note: there is no official Anthropic email skill. `anthropics/skills` is on the official page
> with 605 skills, but nothing email-marketing or email-sending related. If I ever move off
> Resend, `klaviyo-labs` is also an official maker on that page.

## Avoid these

**1. `claude-office-skills/skills@email-marketing` — the name is misleading**

It reads like official Claude tooling. It isn't. The GitHub org behind the handle
`claude-office-skills` is actually called **"AGI Lab"**, an unrelated outfit created Jan 2026
with 66 followers, and it does not appear on the skills.sh official makers page. On top of that
the repo has been **dead since 31 Jan 2026** — nine and a half months with no commits, which is
a long time in this ecosystem. 575 stars is respectable but doesn't make up for a name that
borrows someone else's credibility.

**2. `caffeinelabs/skills@extension-email-marketing` — install count doesn't match anything else**

It advertises 31.7k installs, which looks like the third most popular result I found. But the
repo has **2 GitHub stars** and no description at all, and the org (Caffeine Labs, created Oct
2025) has 21 followers. When installs are five figures and stars are single digits, I don't
trust the install number. Worse, when I read the actual skill it turns out to be a "marketing
email extension for **Caffeine AI**" — platform-specific plumbing for their own product, full of
Motoko/Internet Computer code. It would do nothing for my studio even if I trusted it.

Also skipped for the same single-digit-stars reason: `mbfinotti/sales-skills` (3 stars) and
`mbfinotti/advertising-skills` (2 stars), plus the long tail of 40–300 install results
(`arnabbagxd`, `rampstackco`, `minhnv0807`, `skills.volces.com`).

**3. `open.feishu.cn@lark-mail` — the biggest number, and unassessable**

900.6k installs: top result for "email marketing," 10× anything else here. Skipped — but not
for the number, which is probably honest (Feishu is ByteDance's Lark, a real product with real
users). Skipped because its skills.sh page 404s, so rule 3 can't be performed on it at all,
and because it's Lark mailbox plumbing, not campaign tooling. Not on the official makers page.

## How I decided

Four things to check on every skill before installing it:

1. **Who actually publishes it.** Open the GitHub org or user, don't just read the handle.
   A handle can be named anything — `claude-office-skills` turned out to be "AGI Lab". The best
   case is the company that makes the tool (check the skills.sh Official page: skills.sh/official).
   Second best is a named person with a public reputation to lose. Anonymous org, fresh account,
   no website — skip it.

2. **Is it alive, and do the numbers agree with each other.** Stars, installs, and last commit
   date should tell the same story. One huge number next to two tiny ones means something is
   being gamed. Also check the licence (MIT or Apache is fine) and the three audit badges on the
   skills.sh page — Gen Agent Trust Hub, Socket and Snyk. **Click the badge, don't just read the
   colour**: each one links to `/<owner>/<repo>/<skill>/security/<gen|socket|snyk>` with the
   actual findings, and a passing audit just renders an empty page. A Warn can be a note about
   the problem domain (Resend's W011) or an actual red flag (the `curl | sh` in
   `agent-email-inbox`), and the badge looks the same either way.

3. **Read the SKILL.md on the listing page before installing.** The skills.sh page shows the
   whole thing, so there's no excuse. Confirm it does what the title says, that it isn't tied to
   some other vendor's platform, and — most important — check what it wants access to: which API
   keys or env vars it reads, what files it touches, whether it sends anything outbound on its
   own. A skill runs with my permissions, so an email-sending skill deserves more scrutiny than
   a copywriting one.

4. **Open the repo's `skills/` folder and confirm the skill is still there under that exact
   name.** A listing page is a claim about a skill; the repo is the skill. `@email-sequence`
   listed as perfectly healthy — 55.1k installs, three passing audits, repo pushed four days
   earlier — half a year after the folder was renamed away. Listings carry retired names
   forward indefinitely. `git log -- skills/<name>` settles it in one command.
