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
exports.day10p1 = void 0;
const fs = __importStar(require("node:fs"));
function day10p1(filename) {
    /* Part 1 */
    let input = fs
        .readFileSync(filename)
        .toString()
        .split('\n')
        .map((line) => {
        const match = line.match(/(?:(.*?) (-*\d+))|(^.*$)*/);
        console.log(match);
        if ((match === null || match === void 0 ? void 0 : match[1]) === 'addx') {
            return { command: match === null || match === void 0 ? void 0 : match[1], value: match === null || match === void 0 ? void 0 : match[2], cycles: 2 };
        }
        if ((match === null || match === void 0 ? void 0 : match[3]) === 'noop') {
            return { command: match === null || match === void 0 ? void 0 : match[3], cycles: 1 };
        }
    });
    let tick = (currentCycle) => {
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
    console.log(signalStrength);
    const answer = Object.entries(signalStrength)
        .map(([cycle, regX]) => cycle * regX)
        .reduce((acc, item) => acc + item);
    return answer;
}
exports.day10p1 = day10p1;
console.log(day10p1('./src/day10/example.txt'));
console.log(day10p1('./src/day10/raw-data.txt'));
//# sourceMappingURL=day10p1.js.map