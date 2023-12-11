import * as fs from "node:fs";

export type Galaxy = { row: number; col: number; galaxy: number };

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

  // add empty columns:
  for (let row = 0; row < puzzleGrid.length; row++) {
    for (let col = colsToAdd.length - 1; col > -1; col--) {
      puzzleGrid[row].splice(colsToAdd[col], 0, ".");
    }
  }

  // add empty rows: lol gotta go bottom up
  for (let row = rowsToAdd.length - 1; row > -1; row--) {
    puzzleGrid.splice(rowsToAdd[row], 0, puzzleGrid[rowsToAdd[row]]);
  }

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

  // console.log(
  //   galaxyPairs.map(([galaxy1, galaxy2]) => {
  //     return [
  //       galaxy1.galaxy,
  //       galaxy2.galaxy,
  //       Math.abs(galaxy1.row - galaxy2.row) +
  //         Math.abs(galaxy1.col - galaxy2.col),
  //     ];
  //   })
  // );

  const totalDistance = galaxyPairs
    .map(([galaxy1, galaxy2]) => [
      galaxy1.galaxy,
      galaxy2.galaxy,
      Math.abs(galaxy1.row - galaxy2.row) + Math.abs(galaxy1.col - galaxy2.col),
    ])
    .reduce((acc, [galaxy1, galaxy2, distance]) => {
      return acc + distance;
    }, 0);

  console.log(totalDistance);

  return totalDistance;
}

console.log(day11p1("./day11/example.txt"));
console.log(day11p1("./day11/raw-data.txt"));
