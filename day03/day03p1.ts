import * as fs from "node:fs";

export function day03p1(filename: string) {
  /* Part 1 */
  return fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line, index) => {});
}

console.log(day03p1("./day03/example.txt"));
// console.log(day03p1("./day03/raw-data.txt"));
