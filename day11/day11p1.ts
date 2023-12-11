import * as fs from "node:fs";

export type Galaxy = { row: number; col: number; galaxy: number };
export const EXPANSION = 1000000;
export function day11p1(filename: string) {
  /* Part 1 */
  const puzzleGrid: string[][] = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((rows: any) => {
      return rows.split("");
    });

  // Add empty rows to rows without galaxies
  let rowsToAdd: any = [];
  puzzleGrid.forEach((row, rowIndex) => {
    !row.find((space) => space === "#") ? rowsToAdd.push(rowIndex) : null;
  });
  console.log(rowsToAdd);

  // Add empty columns to columns without galaxies
  let colsToAdd: any = [];
  for (let col = 0; col < puzzleGrid[0].length; col++) {
    // calm down its a rectangle
    let hasGalaxy = false;
    for (let row = 0; row < puzzleGrid.length; row++) {
      if (puzzleGrid[row][col] === "#") {
        hasGalaxy = true;
        break;
      }
    }
    if (!hasGalaxy) {
      colsToAdd.push(col);
    }
  }
  console.log(colsToAdd);

  // add empty columns:
  // for (let row = 0; row < puzzleGrid.length; row++) {
  //   for (let col = colsToAdd.length - 1; col > -1; col--) {
  //     puzzleGrid[row].splice(colsToAdd[col], 0, ".");
  //   }
  // }

  // // add empty rows: lol gotta go bottom up
  // for (let row = rowsToAdd.length - 1; row > -1; row--) {
  //   puzzleGrid.splice(rowsToAdd[row], 0, puzzleGrid[rowsToAdd[row]]);
  // }

  let galaxyNumber = 1; // don't forget they start at 1
  let galaxies: Galaxy[] = [];

  puzzleGrid.forEach((row, rowIndex) => {
    row.forEach((space, colIndex) => {
      if (space === "#") {
        galaxies.push({ row: rowIndex, col: colIndex, galaxy: galaxyNumber });
        galaxyNumber++;
      }
    });
  });

  let galaxyPairs: [Galaxy, Galaxy][] = [];
  for (let i = 0; i <= galaxies.length - 2; i++) {
    for (let j = i + 1; j <= galaxies.length - 1; j++) {
      galaxyPairs.push([galaxies[i], galaxies[j]]);
    }
  }

  console.log(galaxyPairs.length);

  const totalDistance = galaxyPairs
    .map(([galaxy1, galaxy2]) => {
      // find any pairs that span an empty row or column
      let spanEmptyRow = rowsToAdd.filter(
        (row) =>
          (galaxy1.row < row && row < galaxy2.row) ||
          (galaxy2.row < row && row < galaxy1.row)
      );
      let spanEmptyCol = colsToAdd.filter(
        (col) =>
          (galaxy1.col < col && col < galaxy2.col) ||
          (galaxy2.col < col && col < galaxy1.col)
      );
      return [
        galaxy1.galaxy,
        galaxy2.galaxy,
        Math.abs(galaxy1.row - galaxy2.row) +
          (spanEmptyRow.length
            ? spanEmptyRow.length * EXPANSION - spanEmptyRow.length
            : 0) +
          Math.abs(galaxy1.col - galaxy2.col) +
          (spanEmptyCol.length
            ? spanEmptyCol.length * EXPANSION - spanEmptyCol.length
            : 0),
      ];
    })
    .reduce((acc, [galaxy1, galaxy2, distance]) => {
      return acc + distance;
    }, 0);

  console.log(totalDistance);

  return totalDistance;
}

// console.log(day11p1("./day11/example.txt"));
console.log(day11p1("./day11/raw-data.txt"));
