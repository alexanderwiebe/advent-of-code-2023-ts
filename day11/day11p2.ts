import * as fs from "node:fs";

export function day11p2(filename: string) {
  /* Part 2 */
  const puzzleGrid: Node[][] = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((rows: any) => {
      return rows.split("");
    });

  return puzzleGrid;
}

// console.log(day11p2("./day11/example.txt"));
// console.log(day11p2("./day11/raw-data.txt"));
