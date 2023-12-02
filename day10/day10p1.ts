import * as fs from 'node:fs';

export function day10p1(filename: string) {
  /* Part 1 */
  let input = fs
    .readFileSync(filename)
    .toString()
    .split('\n')
    .map((line) => {
      const match = line.match(/(?:(.*?) (-*\d+))|(^.*$)*/);
      console.log(match);
      if (match?.[1] === 'addx') {
        return { command: match?.[1], value: match?.[2], cycles: 2 };
      }
      if (match?.[3] === 'noop') {
        return { command: match?.[3], cycles: 1 };
      }
    });

  let tick = (currentCycle: number): number => {
    if (currentCycle - 20 === 0 || (currentCycle - 20) % 40 === 0) {
      signalStrength[currentCycle] = xRegister;
    }
    currentCycle++;
    return currentCycle;
  };

  let signalStrength: any = {};
  let currentCycle = 1;
  let xRegister = 1;

  input.forEach(({ command, value, cycles }: any) => {
    if (command === 'noop') {
      currentCycle = tick(currentCycle);
    }
    if (command === 'addx') {
      currentCycle = tick(currentCycle);
      currentCycle = tick(currentCycle);
      xRegister += +value;
    }
  });

  console.log(signalStrength);
  const answer = Object.entries(signalStrength)
    .map(([cycle, regX]: any) => cycle * regX)
    .reduce((acc, item) => acc + item);
  return answer;
}

console.log(day10p1('./src/day10/example.txt'));
console.log(day10p1('./src/day10/raw-data.txt'));
