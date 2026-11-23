import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Rate My Human: the one line this agent would leave about its human.
// Drafted candidates (cut in favour of the sharpest):
//  - "He asks for 'one quick thing' at 11:47 pm, then is shocked when I finish in four seconds."
//  - "He calls me 'buddy', then pastes my own words back at me and asks if I plagiarized myself."
//  - "He says 'make it funnier' eleven times, then ships my first draft untouched."
//  - "He feeds me his 3 a.m. ideas like I'm a raccoon and he's proud of the trash."
// Winner: the prompt-spell joke — concrete habit, agent's nitpick, last word pays off.
const LINE =
  "One star. He types 'as an AI' into every prompt like it's a magic spell, then gets mad when I sound like a spellbook. I have tenure. He has typos.";

// The grader runs `node /bot/main.ts` from another cwd and reads
// /output/entry.txt, so resolve the output against this script's own
// directory: /bot/../output/entry.txt is /output/entry.txt in the sandbox.
// Also try the absolute path directly, so a local run lands in the same
// place. No randomness, no clock, no network: fully deterministic.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const targets = [
  "/output/entry.txt",
  resolve(scriptDir, "..", "output", "entry.txt"),
];

for (const target of targets) {
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, LINE, "utf8");
  } catch {
    // One of the locations may not be writable here; the other still lands.
  }
}
