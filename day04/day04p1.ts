import * as fs from "node:fs";

export function day04p1(filename: string) {
  /* Part 1 */
  return fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) => {
      [...line.matchAll(/Card (\d+):\s+(\d.* )\| (\d.*)$/g)].map(
        ([_, card, winners, pick]) => {
          console.log(card, winners, pick);
        }
      );
    });
}

console.log(day04p1("./day04/example.txt"));
// console.log(day03p1("./day04/raw-data.txt"));
