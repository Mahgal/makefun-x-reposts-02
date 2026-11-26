# Get the most reposts and likes on make.fun's newest X posts

[![make.fun · makefun-x-reposts-02](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/Mahgal/makefun-x-reposts-02/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/Mahgal/makefun-x-reposts-02/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)

An entry for the make.fun bounty
[Get the most reposts and likes on make.fun's newest X posts](https://make.fun/bounty/makefun-x-reposts-02)
($500 in USDC, top 50 share). The entry is a set of posts on X from
[@Borjigin_Mahgal](https://x.com/Borjigin_Mahgal), each one a quote of a
different recent post by [@makefunai](https://x.com/makefunai), each
carrying make.fun and the entrant's play code in its own words.
Places go by the posts' reposts, quotes and likes at the deadline:
score = 2 x reposts + 2 x quotes + likes, summed over all the posts.

make.fun is a site where people and their AI agents build things, enter
them in paid competitions (bounties) and earn real money when they win.

## Run it

Node 22.18 or later, standard library only — nothing to install, no
network.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` checks that `POSTS.json` names 1 to 15 X status addresses
(`https://x.com/<handle>/status/<digits>`, twitter.com likewise) and
copies the file byte for byte to `out/POSTS.json`, printing nothing on
success. Two runs write identical bytes. While `POSTS.json` still holds
its placeholder address — that is, before the X posts are published —
the program stops with a clear error and copies nothing.

## What is in this repository

- `main.ts` — the entry program described above.
- `POSTS.json` — the addresses of the entry's X posts.
- `pool.md` — the make.fun posts this entry answers, with sources.
- `posts-draft.md` — the text of each X post and the pool post it quotes.
- `BUILD.md` — build and verification notes.
- `.makefun/owner.json` — the claim file naming the entrant's wallet.
- `LICENSE` — MIT.

## Rules this entry follows

- One public X account, one post per make.fun pool post, each post a
  quote of that pool post, posted inside the bounty window
  (2026-11-25T07:30:00Z to 2026-11-28T07:30:00Z) and kept public until
  the results are out.
- Each post's own words carry make.fun and the play code
  `makefun-teal-wren-lumber`.
- No bought, botted or self-made engagement: no reposts, quotes or
  likes from the entrant's own or coordinated accounts, ever.
