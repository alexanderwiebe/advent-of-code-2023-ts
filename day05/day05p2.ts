import * as fs from "node:fs";

export function day05p2(filename: string) {
  /* Part 1 */
  return fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) => {
      return line;
    });
}

console.log(day05p2("./day05/example.txt"));
// console.log(day05p2("./day05/raw-data.txt"));
