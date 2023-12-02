import * as fs from "node:fs";

export function day02p1(filename: string) {
  /* Part 1 */
  let input = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) => {
      const [_, gameCount, gameFlow]: any = line.match(/Game (\d+): (.*?)$/i);
      return gameFlow.split(";").map((gameStep: any) => {
        return [...gameStep.matchAll(/((\d+) (red|blue|green))/g)].map(
          ([_, _1, blockCount, blockColor]) => {
            // only 12 red cubes, 13 green cubes, and 14 blue cubes
            switch (blockColor) {
              case "red":
                if (blockCount > 12) {
                  console.log("red", blockCount, " in ", gameCount, " game");
                  return gameCount;
                }
                break;
              case "green":
                if (blockCount > 13) {
                  console.log("green", blockCount, " in ", gameCount, " game");
                  return gameCount;
                }
                break;
              case "blue":
                if (blockCount > 14) {
                  console.log("blue", blockCount, " in ", gameCount, " game");
                  return gameCount;
                }
                break;
              default:
                return false;
                break;
            }
          }
        );
      });
    });
  // .filter((game) => game.some((gameStep: any) => gameStep));
  console.log(input);
  // return Array.from(new Set(input.flat()))
  //   .filter((x) => x)
  //   .map((x) => parseInt(x))
  //   .reduce((acc, item) => acc + item);
}

console.log(day02p1("./day02/example.txt"));
// console.log(day10p1('./src/day10/raw-data.txt'));
