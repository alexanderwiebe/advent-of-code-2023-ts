import * as fs from "node:fs";

type Node = {
  value: string;
  row: number;
  col: number;
  travel: boolean;
  distanceAway: number;
  direction?: "UP" | "DOWN";
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
  currentNode: Node,
  [north, east, west, south]: Node[],
  puzzleGrid: Node[][]
) {
  const travelNodes: Node[] = [];
  if (
    (north.value === "|" || north.value === "7" || north.value === "F") &&
    (currentNode.value === "S" ||
      currentNode.value === "L" ||
      currentNode.value === "J" ||
      currentNode.value === "|")
  ) {
    if (north.value === "|") {
      travelNodes.push({ ...north, direction: "UP" });
    } else {
      travelNodes.push({ ...north });
    }
  }
  if (
    (east.value === "-" || east.value === "F" || east.value === "L") &&
    (currentNode.value === "S" ||
      currentNode.value === "7" ||
      currentNode.value === "J" ||
      currentNode.value === "-")
  ) {
    travelNodes.push(east);
  }
  if (
    (west.value === "-" || west.value === "7" || west.value === "J") &&
    (currentNode.value === "S" ||
      currentNode.value === "F" ||
      currentNode.value === "L" ||
      currentNode.value === "-")
  ) {
    travelNodes.push(west);
  }
  if (
    (south.value === "|" || south.value === "L" || south.value === "J") &&
    (currentNode.value === "S" ||
      currentNode.value === "7" ||
      currentNode.value === "F" ||
      currentNode.value === "|")
  ) {
    if (south.value === "|") {
      travelNodes.push({ ...south, direction: "DOWN" });
    } else {
      travelNodes.push({ ...south });
    }
  }
  const travelingToNode = travelNodes.filter(({ travel }) => !travel)[0];
  if (!travelingToNode) {
    return { value: "S", row: 1, col: 1, travel: true, distanceAway: 0 }; // completed the loop
  }

  puzzleGrid[travelingToNode.row][travelingToNode.col].travel = true;
  if (travelingToNode.direction) {
    puzzleGrid[travelingToNode.row][travelingToNode.col].direction =
      travelingToNode.direction;
  }
  return travelingToNode; // don't go to the same node twice
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
  return travelNodes(node, surrounding(node, puzzleGrid), puzzleGrid);
}

export function day10p2(filename: string) {
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

  while (next.value !== "S") {
    previous = next;
    next = moveNext(next, puzzleGrid);
    console.log(previous);
    console.log(next);
  }

  console.log(
    puzzleGrid.map((row) =>
      row.map(({ direction }) =>
        direction ? (direction === "UP" ? "↑" : "↓") : " "
      )
    )
  );

  console.log(puzzleGrid.map((row) => row.map(({ travel }) => travel)));

  let areaNode = 0;
  console.log(
    puzzleGrid.map((row) => {
      let inLoop = false;
      let previousAdded = false;
      let boundingPipes = row
        .filter(({ value, travel }) => value === "|" && travel)
        .map(({ col }) => col);
      return row.map((node, column, array) => {
        let retVal = node.value;
        if (
          !node.travel &&
          inLoop &&
          column < boundingPipes[boundingPipes.length - 1] &&
          (!array[column + 1].travel || previousAdded)
        ) {
          areaNode++;
          previousAdded = true;
          retVal = "X";
        }
        if (!!node?.direction) {
          inLoop = !inLoop;
        }
        return retVal;
      });
    })
  );
  return areaNode;
}

// console.log(day10p2("./day10/example.txt"));
console.log(day10p2("./day10/example1.txt"));
// console.log(day10p2("./day10/example2.txt"));
// console.log(day10p2("./day10/example3.txt"));
// console.log(day10p2("./day10/example4.txt"));
// console.log(day10p2("./day10/example5.txt"));
// console.log(day10p2("./day10/example6.txt"));
// console.log(day10p2("./day10/raw-data.txt"));
