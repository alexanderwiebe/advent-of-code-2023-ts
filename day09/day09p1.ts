import { input } from './data';

export interface coords {
  x: number;
  y: number;
}

export type instruction = [string, number];

export const example = [
  ['R', 4],
  ['U', 4],
  ['L', 3],
  ['D', 1],
  ['R', 4],
  ['D', 1],
  ['L', 5],
  ['R', 2],
] as instruction[];

export function day09p1(input: instruction[]) {
  let head = { x: 0, y: 0 } as coords;
  let tail = { x: 0, y: 0 } as coords;

  let positions = new Set();
  positions.add(`${tail.x},${tail.y}`);

  function calcTailMoves(head: coords, tail: coords) {
    if (head.x === tail.x && head.y == tail.y) {
      // overlap
      return;
    }
    if (Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2) {
      // touching
      return;
    }

    if (head.x === tail.x) {
      // same row
      if (head.y - tail.y < 0) {
        tail.y--;
      } else {
        tail.y++;
      }
      return;
    }

    if (head.y === tail.y) {
      // same column
      if (head.x - tail.x < 0) {
        tail.x--;
      } else {
        tail.x++;
      }
      return;
    }

    if (head.x > tail.x && head.y > tail.y) {
      tail.x++;
      tail.y++;
      return;
    }

    if (head.x < tail.x && head.y < tail.y) {
      tail.x--;
      tail.y--;
      return;
    }

    if (head.x < tail.x && head.y > tail.y) {
      tail.x--;
      tail.y++;
      return;
    }

    if (head.x > tail.x && head.y < tail.y) {
      tail.x++;
      tail.y--;
      return;
    }
  }

  function calcHeadMoves([direction, distance]: instruction) {
    console.log(direction, distance);
    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case 'R': {
          ++head.x;
          break;
        }
        case 'L': {
          --head.x;
          break;
        }
        case 'U': {
          ++head.y;
          break;
        }
        case 'D': {
          --head.y;
          break;
        }
      }

      calcTailMoves(head, tail);
      positions.add(`${tail.x},${tail.y}`);
      //   display(head, tail);
      //   console.log(direction, i, head, tail);
    }
  }

  input.forEach(calcHeadMoves);

  return positions.size;
}

console.log(day09p1(example));

console.log(day09p1(input as instruction[]));

export function display(head: coords, tail: coords) {
  let graph: string[][] = [];
  for (let x = 0; x < 5; x++) {
    graph[x] = ['.', '.', '.', '.', '.', '.'];
  }
  graph[tail.y][tail.x] = 'T';
  graph[head.y][head.x] = 'H';
  let output = graph.reduceRight((acc, list) => {
    return (acc += list.join('') + '\n');
  }, '');
  console.log(output);
}
//   let graph: string[][] = [];
//   for (let x = 0; x < 5; x++) {
//     graph[x] = ['.', '.', '.', '.', '.', '.'];
//   }
//   positions.forEach(({ x, y }) => {
//     graph[y][x] = '#';
//   });
//   let output = graph.reduceRight((acc, list) => {
//     return (acc += list.join('') + '\n');
//   }, '');
//   console.log(output);
