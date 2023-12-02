import * as fs from "node:fs";

export function day02p1(filename: string) {
  /* Part 1 */
  return fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) => {
      const [_, gameId, gameFlow]: any = line.match(/Game (\d+): (.*?)$/i);
      return gameFlow
        .split(";")
        .map((gameStep: any) => {
          return [...gameStep.matchAll(/((\d+) (red|blue|green))/g)]
            .map(([_, _1, blockCount, blockColor]) => {
              // only 12 red cubes, 13 green cubes, and 14 blue cubes
              if (
                (blockCount > 12 && blockColor === "red") ||
                (blockCount > 13 && blockColor === "green") ||
                (blockCount > 14 && blockColor === "blue")
              ) {
                return "error";
              } else {
                return gameId;
              }
            })
            .every((match) => match === gameId);
        })
        .every((match: any) => match);
    })
    .map((game, index) => (game ? index + 1 : 0))
    .reduce((acc, item) => acc + item, 0);
}

console.log(day02p1("./day02/example.txt"));
console.log(day02p1("./day02/raw-data.txt"));

// console.log(day10p1('./src/day10/raw-data.txt'));
