import * as fs from "node:fs";

export function day06p2(filename: string) {
  /* Part 1 */

  const formattedLines = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) => +line.split(":")[1].replace(/\s+/g, ""));

  console.log(formattedLines);

  let waysToWin: number[] = [];

  let time = +formattedLines[0];
  let distance = +formattedLines[1];
  console.log(time, distance);
  let permutations: number[] = [];
  for (let pushDuration = 1; pushDuration < time; pushDuration++) {
    const moveDuration = time - pushDuration;
    if (moveDuration * pushDuration > distance) {
      permutations.push(pushDuration);
    }
  }
  console.log(permutations);
  waysToWin.push(permutations.length);

  return waysToWin.reduce((acc, race) => acc * race);
}

console.log(day06p2("./day06/example.txt"));
console.log(day06p2("./day06/raw-data.txt"));
