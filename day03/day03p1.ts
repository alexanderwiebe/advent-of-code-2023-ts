import * as fs from "node:fs";

export function day03p1(filename: string) {
  /* Part 1 */
  const fileStringArray = fs.readFileSync(filename).toString().split("\n");
  const fileCoords = fileStringArray.map((line) => line.split(""));
  const height = fileStringArray.length;
  const width = fileStringArray[0].length; // rectangle grid
  return fileStringArray
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
          return !returnCoords
            .map(([x, y]) => fileCoords[y][x])
            .every((char) => char === ".");
        })(match.index, index, match[0].length)
          ? parseInt(match[0])
          : 0;
      });
    })
    .flat()
    .reduce((acc, item) => acc + item, 0);
}

console.log(day03p1("./day03/example.txt"));
console.log(day03p1("./day03/raw-data.txt"));
