"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.day09p2 = exports.example2 = exports.example = void 0;
const data_1 = require("./data");
exports.example = [
    ['R', 4],
    ['U', 4],
    ['L', 3],
    ['D', 1],
    ['R', 4],
    ['D', 1],
    ['L', 5],
    ['R', 2],
];
exports.example2 = [
    ['R', 5],
    ['U', 8],
    ['L', 8],
    ['D', 3],
    ['R', 17],
    ['D', 10],
    ['L', 25],
    ['U', 20],
];
function day09p2(input) {
    let head = { x: 0, y: 0 };
    let k1 = { x: 0, y: 0 };
    let k2 = { x: 0, y: 0 };
    let k3 = { x: 0, y: 0 };
    let k4 = { x: 0, y: 0 };
    let k5 = { x: 0, y: 0 };
    let k6 = { x: 0, y: 0 };
    let k7 = { x: 0, y: 0 };
    let k8 = { x: 0, y: 0 };
    let k9 = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };
    let positions = new Set();
    positions.add(`${tail.x},${tail.y}`);
    function calcTailMoves(head, tail) {
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
            }
            else {
                tail.y++;
            }
            return;
        }
        if (head.y === tail.y) {
            // same column
            if (head.x - tail.x < 0) {
                tail.x--;
            }
            else {
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
    function calcHeadMoves([direction, distance]) {
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
exports.day09p2 = day09p2;
console.log(day09p2(exports.example));
console.log(day09p2(exports.example2));
console.log(day09p2(data_1.input));
//# sourceMappingURL=day09p2.js.map