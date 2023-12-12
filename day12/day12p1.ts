import * as fs from "node:fs";

export function day12p1(filename: string) {
  /* Part 1 */
  const puzzleGrid: string[][] = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((rows: any) => {
      return rows;
    });

  // Add empty rows to rows without galaxies
  return puzzleGrid;
}

console.log(day12p1("./day12/example.txt"));
// console.log(day11p1("./day12/raw-data.txt"));
