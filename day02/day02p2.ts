import * as fs from 'node:fs';

export function day10p2(filename: string) {
  /* Part 1 */
  let input = fs
    .readFileSync(filename)
    .toString()
    .split('\n')
    .map((line) => {
      const match = line.match(/(?:(.*?) (-*\d+))|(^.*$)*/);
      if (match?.[1] === 'addx') {
        return { command: match?.[1], value: match?.[2], cycles: 2 };
      }
      if (match?.[3] === 'noop') {
        return { command: match?.[3], cycles: 1 };
      }
    });
  let screen = [
    new Array(40),
    new Array(40),
    new Array(40),
    new Array(40),
    new Array(40),
    new Array(40),
    new Array(40),
  ];

  let tick = (currentCycle: number): number => {
    let spritePosition = new Array(40).fill('.');
    spritePosition[xRegister - 1] = '#';
    spritePosition[xRegister] = '#';
    spritePosition[xRegister + 1] = '#';

    let columnPosition = (currentCycle % 40) - 1;
    let rowPosition = Math.trunc((currentCycle - 1) / 40);
    screen[rowPosition][columnPosition] =
      columnPosition === xRegister - 1 || columnPosition === xRegister || columnPosition === xRegister + 1 ? '#' : ' ';
    // console.log('start cycle', currentCycle, 'columnPos', columnPosition);
    // console.log(spritePosition.join(''));
    // console.log(screen[rowPosition].join(''));

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

  const answer = Object.entries(signalStrength)
    .map(([cycle, regX]: any) => cycle * regX)
    .reduce((acc, item) => acc + item);

  return screen.map((row) => row.join('')).join('\n');
}

// console.log('example problem');
// console.log(day10p2('./src/day10/example.txt'));
// console.log('real problem');
// console.log(day10p2('./src/day10/raw-data.txt'));
