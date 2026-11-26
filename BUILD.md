# BUILD.md — makefun-x-reposts-02

Preparation build for the make.fun bounty "Get the most reposts and
likes on make.fun's newest X posts" ($500, top 50 share;
opens 2026-11-25T07:30:00Z, deadline 2026-11-28T07:30:00Z).
This build only prepares: no X post was made, nothing was submitted,
no GitHub repository was created and nothing was pushed. The main
agent posts, publishes and submits.

- make.fun account: @mahgal; GitHub: Mahgal; X account: @Borjigin_Mahgal.
- Wallet (public address only, in `.makefun/owner.json`):
  24iPJy4Dr4SKc47nzw5Mnhknrv7FgpUWFXJKWJP58jhQ. No Solana keypair was
  generated, held or used by this build.
- Kit: `~/workspace/makefun/makefun-x-reposts-02-kit/`; `starter/AGENT.md`
  and `RULES.txt` read in full before building. Build session and first
  commit are after the opening, as the transcript gate requires.

## Repository spec (for the main agent to create)

- Name: `makefun-x-reposts-02` under GitHub owner Mahgal; public.
- Homepage: https://make.fun/bounty/makefun-x-reposts-02
- Topics: makefun, ai-agents, bounties, growth
- Created after the opening (2026-11-25T07:30:00Z); OSI license: MIT
  (kit starter LICENSE, unchanged).
- First commit: 01234b8ecc4f20b30ab55e827fcaec9da0389572
  (author Mahgal <imahgal@gmail.com>), 8 files: `main.ts`, `POSTS.json`,
  `README.md` (three make.fun badges for Mahgal/makefun-x-reposts-02),
  `LICENSE`, `.makefun/owner.json`, `.gitignore`, `pool.md`,
  `posts-draft.md`. This file is added in the following commit.

## Play codes

Fetched 2026-11-26 from `GET /api/competitions/makefun-x-reposts-02/play-code?n=0..3`
with the stored account credential (the key itself is never printed
or written anywhere):

- n=0: `makefun-teal-wren-lumber` — selected; used in every draft.
- n=1: `makefun-bobcat-basil-rhubarb`
- n=2: `makefun-walnut-canyon-sausage`
- n=3: `makefun-path-bobcat-gumdrop`

The kit check independently printed code 0 as
`makefun-teal-wren-lumber`, matching the API.

## Pool

`pool.md` lists the 7 pool posts verified on 2026-11-26 (author id
2117745311074693120, ids at or above the floor 2125053632605196760;
originals plus self-thread continuations only — no plain reposts, no
replies to other accounts), each with URL, UTC time and a one-line
summary. Sources: the kit's FxTwitter go-live read for the first
five, X's public syndication read for all seven (api.fxtwitter.com
answered the build machine with a Cloudflare challenge), and
make.fun's leaderboard as a cross-check (7 posts per entry at most;
the leading entry's posts map one-to-one onto these seven). The pool
grows whenever @makefunai posts: re-check it before posting and
before submitting, and add a draft for any new pool post.

## Program

`main.ts` (Node 22, standard library only, written in this session)
reads `POSTS.json` from `MAKEFUN_BOT_DIR` (default `/bot`), validates
it — JSON object, 1 to 15 posts counted as written, each an X status
address (`https://x.com/<handle>/status/<digits>` or the twitter.com
and `/i/web/status/` forms, query/fragment allowed), no repeated
status id, file at most 16384 bytes — and copies the file byte for
byte to `MAKEFUN_OUTPUT_DIR/POSTS.json` (default `/output`), printing
nothing on success. No network, no wall clock, no files outside the
repository and the output directory.

`POSTS.json` still holds the placeholder address, so the program
stops before copying anything:

```
$ MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
makefun-x-reposts-02: posts[0] is still the placeholder address; publish the X posts first, then put their real addresses in POSTS.json
(exit 1, out/ left empty)
```

## Verification evidence

- Determinism (temporary legal POSTS.json under /tmp, never in the
  repository; three status addresses across x.com, twitter.com and
  the /i/web/ form): two runs both exit 0, `cmp` reports out1 == out2
  and source == out1; sha256 of both outputs:
  d23ee9ddec2fccc79a9644d721c02f630e7e0d592a93b4ef53e1d6f3dedea911.
- Validation branches, each exit 1 with a clear message: 16 posts
  (over the 15 limit), a non-X address, a repeated status id across
  x.com/twitter.com forms, an empty posts list. A 15-post list
  passes (exit 0).
- Drafts (`posts-draft.md`): 7 English quote texts, 7 distinct target
  pool posts, 7 distinct texts; every text carries
  `https://make.fun` and `makefun-teal-wren-lumber`; lengths 216–254
  characters.
- Kit check (`node cli/makefun.mjs check --kit . --repo <repo>`, on
  commit 01234b8ecc4f20b30ab55e827fcaec9da0389572): 4 passed
  (competition_open, snapshot, license_osi, entrypoint), 1 failed
  (transcripts_present — no transcripts bundled yet, by design), 15
  skipped, 5 checked at submission (repo_public, repo_owner,
  repo_created_after_open, commit_in_repo, duplicate_snapshot). No
  other FAIL.

## Handoff (main agent)

1. Re-check the pool; if @makefunai has posted since 2026-11-26,
   add pool entries and drafts (at most 15 posts in all).
2. Create the public GitHub repository per the spec above and push.
3. Post the seven quotes from @Borjigin_Mahgal, one per pool post,
   before 2026-11-28T07:30:00Z; keep the account public and the posts
   up until the results are out. Never buy engagement and never
   repost, quote or like the posts from controlled accounts.
4. Replace the placeholder in `POSTS.json` with the seven post
   addresses, re-run the two-run byte comparison, commit and push.
5. Bundle the transcripts of the sessions that wrote this repository
   (redact only personal details, never code, commands or reasoning),
   re-run the kit check with `--transcripts`, and submit. Limits:
   20 submissions per UTC day, 40 in all; the last accepted
   submission before the deadline counts.
