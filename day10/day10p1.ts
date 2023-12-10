import * as fs from "node:fs";

export function day10p1(filename: string) {
  /* Part 1 */

  return fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((historyReadings) => {
      return historyReadings.split(/\s+/).map((reading) => +reading);
    });
}

console.log(day10p1("./day10/example.txt"));
// console.log(day10p2("./day10/raw-data.txt"));
