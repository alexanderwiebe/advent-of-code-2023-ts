import * as fs from "node:fs";

export function day09p2(filename: string) {
  /* Part 1 */

  return fs.readFileSync(filename).toString().split("\n");
}

console.log(day09p2("./day09/example.txt"));
// console.log(day09p2("./day09/raw-data.txt"));
