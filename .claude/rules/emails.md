---
paths:
  - "campaigns/**/emails/*.md"
---

# How to write an email file

This applies to every email draft in a campaign — any `.md` file inside an
`emails/` folder under `campaigns/`. It applies to nothing else. Plans, notes and
lists are not email files.

Read [brand/voice.md](../../brand/voice.md) first. This page is the shape of the
file. The voice guide is how it sounds.

## The first two lines

Line 1 is the subject. Line 2 is the preview text. Nothing comes before them.

    Subject: The Steep Club is open
    Preview: Three teas a month, and how to brew each one

The subject is 50 characters or fewer. The preview is 90 characters or fewer.
Count the text after the label, not the `Subject: ` or `Preview: ` part itself.
Short is the point: long subjects get cut off in the inbox, and the preview is
the second line the reader sees, so don't repeat the subject in it.

## Greeting

Greet the reader by name, using the merge field:

    Hi {{first_name}},

Write `{{first_name}}` exactly like that, with two braces each side. It is
filled in by the sending tool. Never type a real name in its place.

## One link

Each email has exactly one main link, and it is this one:

    [Button text](https://kettlebird.example/steep-club)

Swap "Button text" for words that say where the link goes — "Join the Club",
"See this month's tea". Keep the address as it is. One link per email, so there
is one thing to do. The unsubscribe address in the footer is a placeholder, not
a second link, so it doesn't count.

## How the email ends

The last part of every file, in this order:

1. The sign-off from the voice guide. A named person, every time — "Happy
   steeping, — Mara, Kettlebird Tea", with the real sender's name swapped in.
   Never "the team" and never the bare brand name.
2. The practical bits the voice guide asks for: how to reply, how to pause a
   month, how to cancel. Cancelling has to be as easy to find as joining was.
3. The footer. Always the last two lines of the file:

Line one: You're getting this because you joined the Kettlebird Tea waitlist.

Line two: Kettlebird Tea, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Write both footer lines as ordinary text in the email, the way the sign-off is
written. Don't put them in a code block, don't indent them, and don't wrap them
in backticks — the reader sees this, and it should look like the rest of the
email. Keep `{{company_address}}` and `{{unsubscribe_url}}` as they are. The
sending tool fills them in. A missing address or a broken unsubscribe link is a
legal problem, not a style one.

## Placeholders hold facts, not sentences

A square bracket holds something that has to be checked — a price, a date, a
tasting note. It never holds the sentence around it. Write the sentence so it
still works once the bracket is swapped for the real thing:

    You can pause the Club [PAUSE — placeholder: for up to two months at a
    time] from your account page or by asking me.

Not this, where deleting the bracket takes the meaning with it:

    A gift subscription [GIFT PAUSE/CANCEL — placeholder: doesn't auto-renew,
    so there's nothing to cancel].

This matters most for the pause and cancel lines. If they only exist inside a
bracket, a careless replace deletes them and the email still looks finished.

Notes to whoever is editing go in the folder's README, never inside a sentence
the reader will see.

## Anything invented is a placeholder

If a line states something as true — a number, a date, a price, something a
reader did — it is either true or it is a labelled placeholder, never an
invented sentence in plain prose. "A few of you asked whether the Club works as
a present" looks like ordinary copy, so the sweep for square brackets before
sending walks straight past it — and nobody counted those people.

## Still true here

Everything in [CLAUDE.md](../../CLAUDE.md) and the voice guide applies to these
files as well. Two worth repeating:

- **Nothing sends.** An email file is a draft. It goes to Mara and Mara sends it.
- **Ask before overwriting.** A finished draft is work. Check first.
