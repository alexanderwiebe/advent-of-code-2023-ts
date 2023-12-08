import * as fs from "node:fs";

export function day07p1(filename: string) {
  /* Part 1 */
  enum CARD_TYPES {
    "5Kind", // 0
    "4Kind", // 1
    "FullHouse", // 2
    "3Kind", // 3
    "2Pair", // 4
    "1Pair", // 5
    "HighCard", // 6
  }
  const CARD_LOOKUP = [
    "5Kind", // 0
    "4Kind", // 1
    "FullHouse", // 2
    "3Kind", // 3
    "2Pair", // 4
    "1Pair", // 5
    "HighCard", // 6
  ];

  return fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((line) => line.split(/\s+/))
    .map(([hand, bidAmount]) => ({
      hand,
      bidAmount: +bidAmount,
      numericHand: hand.split("").map((x) => "-123456789TJQKA".indexOf(x)),
      numericHandSorted: hand
        .split("")
        .map((x) => "-123456789TJQKA".indexOf(x))
        .sort((a, b) => b - a),
    }))
    .map((handObj) => ({
      ...handObj,
      cardType: ((inputHand) => {
        if (
          inputHand[0] === inputHand[1] &&
          inputHand[1] === inputHand[2] &&
          inputHand[2] === inputHand[3] &&
          inputHand[3] === inputHand[4]
        ) {
          return CARD_TYPES["5Kind"];
        }
        if (
          (inputHand[0] === inputHand[1] &&
            inputHand[1] === inputHand[2] &&
            inputHand[2] === inputHand[3]) ||
          (inputHand[1] === inputHand[2] &&
            inputHand[2] === inputHand[3] &&
            inputHand[3] === inputHand[4])
        ) {
          return CARD_TYPES["4Kind"];
        }
        if (
          (inputHand[0] === inputHand[1] &&
            inputHand[1] === inputHand[2] &&
            inputHand[3] === inputHand[4]) ||
          (inputHand[0] === inputHand[1] &&
            inputHand[2] === inputHand[3] &&
            inputHand[3] === inputHand[4])
        ) {
          return CARD_TYPES["FullHouse"];
        }
        if (
          (inputHand[0] === inputHand[1] && inputHand[1] === inputHand[2]) ||
          (inputHand[1] === inputHand[2] && inputHand[2] === inputHand[3]) ||
          (inputHand[2] === inputHand[3] && inputHand[3] === inputHand[4])
        ) {
          return CARD_TYPES["3Kind"];
        }
        if (
          (inputHand[0] === inputHand[1] && inputHand[2] === inputHand[3]) ||
          (inputHand[0] === inputHand[1] && inputHand[3] === inputHand[4]) ||
          (inputHand[1] === inputHand[2] && inputHand[3] === inputHand[4])
        ) {
          return CARD_TYPES["2Pair"];
        }
        if (
          inputHand[0] === inputHand[1] ||
          inputHand[1] === inputHand[2] ||
          inputHand[2] === inputHand[3] ||
          inputHand[3] === inputHand[4]
        ) {
          return CARD_TYPES["1Pair"];
        }
        return CARD_TYPES["HighCard"];
      })(handObj.numericHandSorted),
    }))
    .sort((b, a) => {
      if (a.cardType !== b.cardType) {
        return a.cardType - b.cardType;
      } else {
        for (let i = 0; i < a.numericHand.length; i++) {
          if (a.numericHand[i] !== b.numericHand[i]) {
            return b.numericHand[i] - a.numericHand[i];
          }
        }
      }
      return 0;
    })
    .reduce((acc, handObj, index) => acc + handObj.bidAmount * (index + 1), 0);
}

console.log(day07p1("./day07/example.txt"));
console.log(day07p1("./day07/raw-data.txt"));
