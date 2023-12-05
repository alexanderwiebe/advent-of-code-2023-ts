import * as fs from "node:fs";

export function day04p2(filename: string) {
  /* Part 2 */
  const cardCopies: number[] = Array.from({ length: 224 }, () => 1);
  fs.readFileSync(filename)
    .toString()
    .split("\n")
    .forEach((line) =>
      [...line.matchAll(/Card\s+(\d+):\s+(\d.*)\s+\|\s+(\d.*)$/g)].map(
        ([_, card, winners, pick]) => {
          const cardIndex = parseInt(card);
          const winnerCount = winners.split(/\s+/).filter((winner) => {
            return pick.split(/\s+/).includes(winner);
          }).length;
          for (let j = 0; j < cardCopies[cardIndex]; j++) {
            for (let i = cardIndex + 1; i <= cardIndex + winnerCount; i++) {
              cardCopies[i] += 1;
            }
          }
        }
      )
    );
  return cardCopies.slice(1).reduce((acc, item) => acc + item, 0); // remove 0th item
}

console.log(day04p2("./day04/example.txt")); // needs the Array.from to be 7 (cards + 1)
console.log(day04p2("./day04/raw-data.txt")); // needs the Array.from to be 224 (cards + 1)
