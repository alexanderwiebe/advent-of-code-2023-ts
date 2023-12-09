import * as fs from "node:fs";

export function day09p1(filename: string) {
  /* Part 1 */

  return fs.readFileSync(filename).toString().split("\n");
}

console.log(day09p1("./day09/example.txt"));
// console.log(day09p1("./day09/raw-data.txt"));
