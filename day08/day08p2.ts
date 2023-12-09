import * as fs from "node:fs";

export function day08p2(filename: string) {
  /* Part 2 */

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
                  // console.log(key, left, right);
                  return [key, [left, right]];
                }
              )
            ),
          },
        };
      },
      { steps: [], instructions: {} }
    );

  // console.log(formattedData);

  let currentNodes = Object.keys(formattedData.instructions).filter((node) =>
    node.endsWith("A")
  );
  let step = 0;
  let totalSteps = 0;
  const maxStep = formattedData.steps.length;
  // console.log(maxStep);
  // for(let i = 0; i < 10; i++) {
  let iterations = currentNodes.map((node) => {
    let currentNode = node;
    let step = 0;
    let totalSteps = 0;
    const maxStep = formattedData.steps.length;
    while (!currentNode.endsWith("Z")) {
      if (step === maxStep) {
        step = 0;
      }
      // console.log(formattedData.instructions[currentNode]);
      // console.log(formattedData.steps[step]);
      // console.log(step);
      currentNode =
        formattedData.instructions[currentNode][formattedData.steps[step]];
      step++;
      totalSteps++;
    }
    return totalSteps;
  });
  console.log("totalsteps", iterations);

  // COPIED FROM STACKOVERFLOW
  function gcd2(a, b) {
    // Greatest common divisor of 2 integers
    if (!b) return b === 0 ? a : NaN;
    return gcd2(b, a % b);
  }
  function gcd(array) {
    // Greatest common divisor of a list of integers
    var n = 0;
    for (var i = 0; i < array.length; ++i) n = gcd2(array[i], n);
    return n;
  }
  function lcm2(a, b) {
    // Least common multiple of 2 integers
    return (a * b) / gcd2(a, b);
  }
  function lcm(array) {
    // Least common multiple of a list of integers
    var n = 1;
    for (var i = 0; i < array.length; ++i) n = lcm2(array[i], n);
    return n;
  }
  // COPIED FROM STACKOVERFLOW
  console.log("lcm", lcm(iterations));
  return lcm(iterations);
}

// console.log(day08p2("./day08/example-3.txt"));
console.log(day08p2("./day08/raw-data.txt"));
