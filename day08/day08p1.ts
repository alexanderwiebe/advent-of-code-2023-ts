import * as fs from "node:fs";

export function day08p1(filename: string) {
  /* Part 1 */

  let formattedData = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .reduce(
      (acc: any, line: string, index: number) => {
        if (index === 0) {
          return {
            ...acc,
            steps: line.split("").map((x) => (x === "L" ? 0 : 1)),
          };
        }
        if (index === 1) {
          return acc;
        }
        return {
          ...acc,
          instructions: {
            ...acc.instructions,
            ...Object.fromEntries(
              [...line.matchAll(/(\w+)\s=\s\((\w+),\s(\w+)/g)].map(
                ([_, key, left, right]) => {
                  console.log(key, left, right);
                  return [key, [left, right]];
                }
              )
            ),
          },
        };
      },
      { steps: [], instructions: {} }
    );

  console.log(formattedData);

  let currentNode = "AAA";
  let step = 0;
  let totalSteps = 0;
  const maxStep = formattedData.steps.length;
  console.log(maxStep);
  while (currentNode !== "ZZZ") {
    if (step === maxStep) {
      step = 0;
    }
    console.log(formattedData.instructions[currentNode]);
    console.log(formattedData.steps[step]);
    console.log(step);
    currentNode =
      formattedData.instructions[currentNode][formattedData.steps[step]];
    step++;
    totalSteps++;
  }
  console.log(totalSteps);
  return totalSteps;
}

console.log(day08p1("./day08/example.txt"));
console.log(day08p1("./day08/raw-data.txt"));
