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
exports.day02p1 = void 0;
const fs = __importStar(require("node:fs"));
function day02p1(filename) {
    /* Part 1 */
    let input = fs
        .readFileSync(filename)
        .toString()
        .split("\n")
        .map((line) => {
        const [_, gameCount, gameFlow] = line.match(/Game (\d+): (.*?)$/i);
        return gameFlow.split(";").map((gameStep) => {
            return [...gameStep.matchAll(/((\d+) (red|blue|green))/g)].map(([_, _1, blockCount, blockColor]) => {
                // only 12 red cubes, 13 green cubes, and 14 blue cubes
                switch (blockColor) {
                    case "red":
                        if (blockCount > 12) {
                            console.log("red", blockCount, " in ", gameCount, " game");
                            return gameCount;
                        }
                        break;
                    case "green":
                        if (blockCount > 13) {
                            console.log("green", blockCount, " in ", gameCount, " game");
                            return gameCount;
                        }
                        break;
                    case "blue":
                        if (blockCount > 14) {
                            console.log("blue", blockCount, " in ", gameCount, " game");
                            return gameCount;
                        }
                        break;
                    default:
                        return false;
                        break;
                }
            });
        });
    });
    // .filter((game) => game.some((gameStep: any) => gameStep));
    console.log(input);
    // return Array.from(new Set(input.flat()))
    //   .filter((x) => x)
    //   .map((x) => parseInt(x))
    //   .reduce((acc, item) => acc + item);
}
exports.day02p1 = day02p1;
console.log(day02p1("./day02/example.txt"));
// console.log(day10p1('./src/day10/raw-data.txt'));
//# sourceMappingURL=day02p1.js.map