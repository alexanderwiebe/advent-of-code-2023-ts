import * as fs from "node:fs";

export function day02p2(filename: string) {
  /* Part 2 */
  return fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) => {
      const [_, gameId, gameFlow]: any = line.match(/Game (\d+): (.*?)$/i);
      return gameFlow.split(";").map((gameStep: any) => {
        return [...gameStep.matchAll(/((\d+) (red|blue|green))/g)].map(
          ([_, _1, blockCount, blockColor]) => {
            return { count: parseInt(blockCount), color: blockColor };
          }
        );
      });
    })
    .map((game) => {
      // console.log(game);
      debugger;
      let minBlocks: any = { red: 0, blue: 0, green: 0 };
      game.map((round: any) => {
        // console.log(round);
        round.forEach(({ count, color }: any) => {
          if (minBlocks[color] < count) {
            minBlocks[color] = count;
          }
        });
      });
      // console.log(minBlocks);
      return minBlocks;
    })
    .map((minBlock: any) =>
      Object.values(minBlock).reduce((acc: any, item: any) => acc * item, 1)
    )
    .reduce((acc: any, item: any) => acc + item, 0);
}

console.log(day02p2("./day02/example.txt"));
console.log(day02p2("./day02/raw-data.txt"));
