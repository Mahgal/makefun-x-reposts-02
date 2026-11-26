// Entry program for the make.fun bounty "Get the most reposts and likes on
// make.fun's newest X posts" (makefun-x-reposts-02), Node 22, standard
// library only.
//
// The entry itself is a set of posts on X. This program's whole job is to
// hand their addresses to the grader: it reads POSTS.json from the
// repository root, checks that it names between 1 and 15 X status
// addresses, and copies the file byte for byte to the output directory.
// The house reads the posts and their counts from X itself; nothing this
// program could write about the posts is scored.
//
// Until the posts are published, POSTS.json holds a placeholder address
// and this program stops with a clear error instead of copying it.
//
// Local run, the way the grader runs it:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const MAX_POSTS = 15;
const MAX_FILE_BYTES = 16384;

// An X status address: x.com or twitter.com (www. or mobile. allowed),
// either /<handle>/status/<digits> or /i/web/status/<digits>, with an
// optional query or fragment after it.
const STATUS_URL =
  /^https:\/\/(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/(?:[A-Za-z0-9_]{1,15}\/status\/([0-9]+)|i\/web\/status\/([0-9]+))(?:[?#].*)?$/;

function fail(message: string): never {
  console.error(`makefun-x-reposts-02: ${message}`);
  process.exit(1);
}

function checkPostUrl(value: unknown, index: number): string {
  if (typeof value !== "string") {
    fail(`posts[${index}] is not a string`);
  }
  const url = value.trim();
  if (url.includes("<") || url.includes(">")) {
    fail(
      `posts[${index}] is still the placeholder address; ` +
        "publish the X posts first, then put their real addresses in POSTS.json",
    );
  }
  const match = STATUS_URL.exec(url);
  if (match === null) {
    fail(
      `posts[${index}] is not an X status address ` +
        `(want https://x.com/<handle>/status/<digits>): ${url}`,
    );
  }
  return match[1] ?? match[2];
}

const sourcePath = join(botDir, "POSTS.json");
let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch (err) {
  fail(`cannot read POSTS.json from ${botDir}: ${(err as Error).message}`);
}

if (raw.length > MAX_FILE_BYTES) {
  fail(`POSTS.json is ${raw.length} bytes; the limit is ${MAX_FILE_BYTES}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw.toString("utf8"));
} catch (err) {
  fail(`POSTS.json is not valid JSON: ${(err as Error).message}`);
}

if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
  fail('POSTS.json must be a JSON object of the form {"posts": [...]}');
}

const posts = (parsed as { posts?: unknown }).posts;
if (!Array.isArray(posts)) {
  fail('POSTS.json must hold a "posts" list of X status addresses');
}
if (posts.length === 0) {
  fail("POSTS.json names no posts yet; publish the X posts first");
}
if (posts.length > MAX_POSTS) {
  fail(`POSTS.json names ${posts.length} posts; at most ${MAX_POSTS} are allowed`);
}

const seenIds = new Set<string>();
posts.forEach((value, index) => {
  const statusId = checkPostUrl(value, index);
  if (seenIds.has(statusId)) {
    fail(
      `posts[${index}] repeats status ${statusId}; ` +
        "each listed post must be a different post",
    );
  }
  seenIds.add(statusId);
});

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "POSTS.json"), raw);
