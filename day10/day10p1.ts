import * as fs from "node:fs";

export function surrounding([row, col]: number[], puzzleGrid: string[][]) {
  const surrounding: string[] = [];
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (
        r >= 0 &&
        r < puzzleGrid.length &&
        c >= 0 &&
        c < puzzleGrid[r].length &&
        !(r === row && c === col)
      ) {
        surrounding.push(puzzleGrid[r][c]);
      } else if (!(r === row && c === col)) {
        surrounding.push(".");
      }
    }
  }
  return surrounding;
}

console.log(
  surrounding(
    [1, 1],
    [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ]
  )
); //E
console.log(
  surrounding(
    [0, 0],
    [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ]
  )
); //A
console.log(
  surrounding(
    [2, 2],
    [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ]
  )
); //I
console.log(
  surrounding(
    [0, 2],
    [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ]
  )
); //C

export function day10p1(filename: string) {
  /* Part 1 */
  const puzzleGrid: string[][] = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((rows: any) => {
      return rows.split("");
    });
  let start = [0, 0];
  for (let row = 0; row < puzzleGrid.length; row++) {
    for (let col = 0; col < puzzleGrid[row].length; col++) {
      if (puzzleGrid[row][col] === "S") {
        start = [row, col];
      }
    }
  }

  return puzzleGrid;
}

console.log(day10p1("./day10/example.txt"));
// console.log(day10p2("./day10/raw-data.txt"));
