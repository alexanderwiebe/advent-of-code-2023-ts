import * as fs from "node:fs";

type Node = {
  value: string;
  row: number;
  col: number;
  travel: boolean;
  distanceAway: number;
};

export function surrounding(
  { row, col, travel, distanceAway }: Node,
  puzzleGrid: Node[][]
) {
  const surrounding: Node[] = [];

  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (
        r >= 0 &&
        r < puzzleGrid.length &&
        c >= 0 &&
        c < puzzleGrid[r].length &&
        !(r === row && c === col)
      ) {
        surrounding.push({
          ...puzzleGrid[r][c],
          distanceAway: distanceAway + 1,
        });
      } else if (!(r === row && c === col)) {
        // out of bounds filler
        surrounding.push({
          value: ".",
          row: r,
          col: c,
          travel,
          distanceAway: distanceAway + 1,
        });
      }
    }
  }
  return [surrounding[1], surrounding[3], surrounding[4], surrounding[6]];
}

//#region Surrounding Tests

const surroundingPuzzleGrid = [
  [
    { value: "A", row: 0, col: 0, travel: false, distanceAway: 0 },
    { value: "B", row: 0, col: 1, travel: false, distanceAway: 0 },
    { value: "C", row: 0, col: 2, travel: false, distanceAway: 0 },
  ],
  [
    { value: "D", row: 1, col: 0, travel: false, distanceAway: 0 },
    { value: "E", row: 1, col: 1, travel: false, distanceAway: 0 },
    { value: "F", row: 1, col: 2, travel: false, distanceAway: 0 },
  ],
  [
    { value: "G", row: 2, col: 0, travel: false, distanceAway: 0 },
    { value: "H", row: 2, col: 1, travel: false, distanceAway: 0 },
    { value: "I", row: 2, col: 2, travel: false, distanceAway: 0 },
  ],
];

console.log(
  surrounding(
    { row: 1, col: 1, value: "E", travel: true, distanceAway: 0 },
    surroundingPuzzleGrid
  ).map(({ value }) => value)
); //E
console.log(
  surrounding(
    { row: 0, col: 0, value: "A", travel: true, distanceAway: 0 },
    surroundingPuzzleGrid
  ).map(({ value }) => value)
); //A
console.log(
  surrounding(
    { row: 2, col: 2, value: "I", travel: true, distanceAway: 0 },
    surroundingPuzzleGrid
  ).map(({ value }) => value)
); //I
console.log(
  surrounding(
    { row: 0, col: 2, value: "C", travel: true, distanceAway: 0 },
    surroundingPuzzleGrid
  ).map(({ value }) => value)
); //C
//#endregion

export function travelNodes(
  [north, east, west, south]: Node[],
  puzzleGrid: Node[][]
) {
  const travelNodes: Node[] = [];
  if (north.value === "|" || north.value === "7" || north.value === "F") {
    travelNodes.push(north);
  }
  if (east.value === "-" || east.value === "F" || east.value === "L") {
    travelNodes.push(east);
  }
  if (west.value === "-" || west.value === "7" || west.value === "J") {
    travelNodes.push(west);
  }
  if (south.value === "|" || south.value === "L" || south.value === "J") {
    travelNodes.push(south);
  }
  const travelingToNodes = travelNodes.filter(({ travel }) => !travel);
  travelingToNodes.forEach((node) => {
    puzzleGrid[node.row][node.col].travel = true;
  });
  return travelingToNodes; // don't go to the same node twice
}

//#region Travel Nodes Tests
const puzzleGrid = [
  [
    { value: ".", row: 0, col: 0, travel: false, distanceAway: 0 },
    { value: ".", row: 0, col: 1, travel: false, distanceAway: 0 },
    { value: ".", row: 0, col: 2, travel: false, distanceAway: 0 },
    { value: ".", row: 0, col: 3, travel: false, distanceAway: 0 },
    { value: ".", row: 0, col: 4, travel: false, distanceAway: 0 },
  ],
  [
    { value: ".", row: 1, col: 0, travel: false, distanceAway: 0 },
    { value: "S", row: 1, col: 1, travel: false, distanceAway: 0 },
    { value: "-", row: 1, col: 2, travel: false, distanceAway: 0 },
    { value: "7", row: 1, col: 3, travel: false, distanceAway: 0 },
    { value: ".", row: 1, col: 4, travel: false, distanceAway: 0 },
  ],
  [
    { value: ".", row: 2, col: 0, travel: false, distanceAway: 0 },
    { value: "|", row: 2, col: 1, travel: false, distanceAway: 0 },
    { value: ".", row: 2, col: 2, travel: false, distanceAway: 0 },
    { value: "|", row: 2, col: 3, travel: false, distanceAway: 0 },
    { value: ".", row: 2, col: 4, travel: false, distanceAway: 0 },
  ],
  [
    { value: ".", row: 3, col: 0, travel: false, distanceAway: 0 },
    { value: "L", row: 3, col: 1, travel: false, distanceAway: 0 },
    { value: "-", row: 3, col: 2, travel: false, distanceAway: 0 },
    { value: "J", row: 3, col: 3, travel: false, distanceAway: 0 },
    { value: ".", row: 3, col: 4, travel: false, distanceAway: 0 },
  ],
  [
    { value: ".", row: 4, col: 0, travel: false, distanceAway: 0 },
    { value: ".", row: 4, col: 1, travel: false, distanceAway: 0 },
    { value: ".", row: 4, col: 2, travel: false, distanceAway: 0 },
    { value: ".", row: 4, col: 3, travel: false, distanceAway: 0 },
    { value: ".", row: 4, col: 4, travel: false, distanceAway: 0 },
  ],
];
console.log(
  travelNodes(
    surrounding(
      { row: 1, col: 1, value: "S", travel: true, distanceAway: 0 },
      puzzleGrid
    ),
    puzzleGrid
  )
);
console.log(
  travelNodes(
    surrounding(
      { row: 1, col: 2, value: "-", travel: true, distanceAway: 1 },
      puzzleGrid
    ),
    puzzleGrid
  )
);
//#endregion

export function moveNext(node: Node, puzzleGrid: Node[][]) {
  return travelNodes(surrounding(node, puzzleGrid), puzzleGrid);
}

export function day10p1(filename: string) {
  /* Part 1 */
  const puzzleGrid: Node[][] = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((rows: any) => {
      return rows.split("");
    })
    .map((row, rowIndex) => {
      return row.map((col, colIndex) => ({
        value: col,
        row: rowIndex,
        col: colIndex,
        travel: false,
        distanceAway: 0,
      }));
    });

  let start!: Node;
  for (let row = 0; row < puzzleGrid.length; row++) {
    for (let col = 0; col < puzzleGrid[row].length; col++) {
      if (puzzleGrid[row][col].value === "S") {
        start = { value: "S", row, col, travel: true, distanceAway: 0 };
      }
    }
  }

  let next = moveNext(start, puzzleGrid);
  console.log(next);
  let previous;

  while (next.length > 0) {
    previous = next;
    next = next.map((newNode) => moveNext(newNode, puzzleGrid)).flat();
    console.log(previous);
    console.log(next);
  }

  console.log(previous.map(({ distanceAway }) => distanceAway));

  return previous.map(({ distanceAway }) => distanceAway);
}

// console.log(day10p1("./day10/example.txt"));
// console.log(day10p1("./day10/example1.txt"));
// console.log(day10p1("./day10/example2.txt"));
console.log(day10p1("./day10/raw-data.txt"));
