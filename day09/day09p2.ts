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

export const example2 = [
  ['R', 5],
  ['U', 8],
  ['L', 8],
  ['D', 3],
  ['R', 17],
  ['D', 10],
  ['L', 25],
  ['U', 20],
] as instruction[];

export function day09p2(input: instruction[]) {
  let head = { x: 0, y: 0 } as coords;
  let k1 = { x: 0, y: 0 } as coords;
  let k2 = { x: 0, y: 0 } as coords;
  let k3 = { x: 0, y: 0 } as coords;
  let k4 = { x: 0, y: 0 } as coords;
  let k5 = { x: 0, y: 0 } as coords;
  let k6 = { x: 0, y: 0 } as coords;
  let k7 = { x: 0, y: 0 } as coords;
  let k8 = { x: 0, y: 0 } as coords;
  let k9 = { x: 0, y: 0 } as coords;
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

      calcTailMoves(head, k1);
      calcTailMoves(k1, k2);
      calcTailMoves(k2, k3);
      calcTailMoves(k3, k4);
      calcTailMoves(k4, k5);
      calcTailMoves(k5, k6);
      calcTailMoves(k6, k7);
      calcTailMoves(k7, k8);
      calcTailMoves(k8, tail);
      positions.add(`${tail.x},${tail.y}`);
    }
  }

  input.forEach(calcHeadMoves);

  return positions.size;
}

console.log(day09p2(example));
console.log(day09p2(example2));
console.log(day09p2(input as instruction[]));
