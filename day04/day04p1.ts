import * as fs from "node:fs";

export function day04p1(filename: string) {
  /* Part 1 */
  return fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) =>
      [...line.matchAll(/Card\s+(\d+):\s+(\d.*)\s+\|\s+(\d.*)$/g)].map(
        ([_, card, winners, pick]) => {
          console.log(card, winners, pick);
          console.log(winners.split(/\s+/));
          console.log(pick.split(/\s+/));
          console.log(
            winners.split(/\s+/).filter((winner) => {
              return pick.split(/\s+/).includes(winner);
            })
          );
          const winnerCount = winners.split(/\s+/).filter((winner) => {
            return pick.split(/\s+/).includes(winner);
          }).length;
          return winnerCount > 0 ? Math.pow(2, winnerCount - 1) : 0;
        }
      )
    )
    .flat()
    .reduce((a, b) => a + b, 0);
}
console.log(Math.pow(2, 0));
console.log(day04p1("./day04/example.txt"));
console.log(day04p1("./day04/raw-data.txt"));
