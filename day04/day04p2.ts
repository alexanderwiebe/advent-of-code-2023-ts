import * as fs from "node:fs";

export function day03p2(filename: string) {
  /* Part 1 */
  const fileStringArray = fs.readFileSync(filename).toString().split("\n");
  const fileCoords = fileStringArray.map((line) => line.split(""));
  const height = fileStringArray.length;
  const width = fileStringArray[0].length; // rectangle grid
  const gearMap = fileStringArray
    .map((line, index) => {
      return [...line.matchAll(/\d+/g)].map((match) => {
        return ((xIndex = 0, yIndex: number, length: number) => {
          let returnCoords: number[][] = [
            [xIndex - 1, yIndex - 1],
            [xIndex - 1, yIndex],
            [xIndex - 1, yIndex + 1],
            [xIndex, yIndex - 1],
            [xIndex, yIndex + 1],
          ];
          if (length === 1) {
            returnCoords = [
              ...returnCoords.concat([
                [xIndex + 1, yIndex - 1],
                [xIndex + 1, yIndex],
                [xIndex + 1, yIndex + 1],
              ]),
            ];
          } else {
            for (let i = 1; i < length; i++) {
              returnCoords = [
                ...returnCoords.concat([
                  [xIndex + i, yIndex - 1],
                  [xIndex + i, yIndex + 1],
                ]),
              ];
            }
            returnCoords = [
              ...returnCoords.concat([
                [xIndex + length, yIndex - 1],
                [xIndex + length, yIndex],
                [xIndex + length, yIndex + 1],
              ]),
            ];
          }
          returnCoords = returnCoords.filter(
            ([x, y]) => x >= 0 && y >= 0 && x < width && y < height
          );

          return returnCoords
            .map(([x, y]) => ({
              number: match[0],
              char: fileCoords[y][x],
              x,
              y,
            }))
            .filter(({ char }) => char === "*");
        })(match.index, index, match[0].length); //iife
      });
    })
    .flat()
    .filter((x) => x.length > 0) // remove lines without a number
    .flat()
    .reduce((acc, item) => {
      const key = `${item.x}_${item.y}`;
      return {
        ...acc,
        [key]: acc[key] ? [...acc[key], item] : [item],
      };
    }, {});
  return Object.entries(gearMap)
    .filter(([key, value]: [string, any]) => value.length === 2)
    .reduce((acc, [key, [gear1, gear2]]: any) => {
      console.log(key, gear1, gear2);
      return acc + parseInt(gear1.number) * parseInt(gear2.number);
    }, 0);
}

console.log(day03p2("./day03/example.txt"));
console.log(day03p2("./day03/raw-data.txt"));
