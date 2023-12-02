"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.day10p2 = void 0;
const fs = __importStar(require("node:fs"));
function day10p2(filename) {
    /* Part 1 */
    let input = fs
        .readFileSync(filename)
        .toString()
        .split('\n')
        .map((line) => {
        const match = line.match(/(?:(.*?) (-*\d+))|(^.*$)*/);
        if ((match === null || match === void 0 ? void 0 : match[1]) === 'addx') {
            return { command: match === null || match === void 0 ? void 0 : match[1], value: match === null || match === void 0 ? void 0 : match[2], cycles: 2 };
        }
        if ((match === null || match === void 0 ? void 0 : match[3]) === 'noop') {
            return { command: match === null || match === void 0 ? void 0 : match[3], cycles: 1 };
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
    let tick = (currentCycle) => {
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
    let signalStrength = {};
    let currentCycle = 1;
    let xRegister = 1;
    input.forEach(({ command, value, cycles }) => {
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
        .map(([cycle, regX]) => cycle * regX)
        .reduce((acc, item) => acc + item);
    return screen.map((row) => row.join('')).join('\n');
}
exports.day10p2 = day10p2;
// console.log('example problem');
// console.log(day10p2('./src/day10/example.txt'));
// console.log('real problem');
// console.log(day10p2('./src/day10/raw-data.txt'));
//# sourceMappingURL=day02p2.js.map