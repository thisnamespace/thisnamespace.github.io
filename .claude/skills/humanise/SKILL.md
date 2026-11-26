---
name: humanise
description: Use before any prose written for this site or repo reaches a reader - site copy in src/data/content.ts, commit messages, pull request descriptions, README and docs, longer code comments. Fires on "write the copy", "write the commit", "write this up", "does this read like AI", "humanise this".
---

# humanise

Write prose that reads as if Michael wrote it on a good day: plain, specific, a little
opinionated. Read this before drafting. Fixing voice afterwards is slower than writing
plainly the first time.

This is a fresh write-up for this repo. It owes its starting point to Wikipedia's
"Signs of AI writing" page, which is worth reading in full.

## What it covers here

| Writing                                 | Applies | Notes                                                           |
| --------------------------------------- | ------- | --------------------------------------------------------------- |
| Site copy in `src/data/content.ts`      | Yes     | First person, British English, no em dashes.                    |
| Commit messages                         | Yes     | Keep the `type(scope): Subject` shape the commit hook enforces. |
| Pull request descriptions, README, docs | Yes     |                                                                 |
| Code comments longer than a line        | Yes     | Say why, in one plain sentence.                                 |
| Button labels, nav items, form text     | No      | Keep them short, sentence case, named for what happens.         |
| Code, tests, config                     | No      |                                                                 |

## The test for every sentence

Ask what the sentence tells the reader to know or do. If you can't restate it as a fact,
a number or an instruction, cut it. If it could sit unchanged on someone else's site, it
says nothing about this one.

## What to catch

These are families, not word lists. Flag the shape even when the exact words differ.

**Claims with nothing behind them.**
"Fully tested", "production ready", "a clean fix". Name the command you ran and what you
saw, or say what you didn't check. Describe a change by what it touches and what it leaves
alone.

**Importance by assertion.**
Words that award significance: crucial, pivotal, transformative, a testament to. Delete
the word. If the sentence still means the same thing, the word was decoration.

**Setting up a point by knocking one down.**
"It isn't X, it's Y." "Not just X, but Y." Drop the negation and say Y.

**Rhythm tricks.**
Groups of three used for the sound of it. A question asked only so the next sentence can
answer it. A short fragment dropped at the end of a paragraph for effect. A bold label and
a colon in front of an ordinary sentence.

**Borrowed authority.**
"Studies show", "experts say", "widely regarded". Name the source or lose the claim.

**Marketing voice.**
Seamless, powerful, world-class, passionate about delivering. Say what the thing does.

**Dressed-up verbs.**
"Serves as", "stands as", "boasts" where "is" or "has" would do. "Utilise" for "use".

**Chat leaking into the document.**
"Hope this helps", "let me know", "as discussed", "per the review". The reader was not in
the conversation.

**Padding.**
"It's worth noting that", "in order to", "a wide range of". Cut the phrase or replace it
with the count.

**Jargon as flavour.**
Engineering slang used because it sounds seasoned. Use the term only when it is the
precise one.

## What to add

Removing tells is half of it. Text with no voice is just as easy to spot.

- Take a position. "I'd take a good team with average tools over the reverse" beats a
  balanced list.
- Vary sentence length, and let a paragraph be one sentence when that is all it needs.
- Prefer the specific detail to the general claim, and digits to number words.
- Use "I". Use contractions where you would say them aloud.
- Hedge only when you are unsure, and say what you are unsure about.
- Keep paragraphs to one or two sentences, three at most.

## Rules for this site's copy

- The site shows what Michael cares about. It is a presence, not a CV.
- No team sizes, technology stack names or employer-specific detail.
- Nothing that reads as looking for a job.
- Statements of belief are fine. Claims about results need a number Michael supplied.

## Process

1. Draft.
2. Read it against the families above.
3. Rewrite what you flagged, keeping the meaning.
4. Ask what still gives it away, and fix that.
5. Read it aloud.

A flagged word is a reason to look, not an automatic cut. Keep it when it is the exact
word for the case.
