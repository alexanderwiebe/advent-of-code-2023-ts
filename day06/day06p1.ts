import * as fs from "node:fs";

export function day06p1(filename: string) {
  /* Part 1 */

  const formattedLines = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) => line.split(/\s+/));
  let waysToWin: number[] = [];
  for (let i = 1; i < formattedLines[0].length; i++) {
    let time = +formattedLines[0][i];
    let distance = +formattedLines[1][i];
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
  }
  return waysToWin.reduce((acc, race) => acc * race);
}

console.log(day06p1("./day06/example.txt"));
console.log(day06p1("./day06/raw-data.txt"));
