import * as fs from "node:fs";

export function day09p1(filename: string) {
  /* Part 1 */

  return fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .map((historyReadings) => {
      return historyReadings.split(/\s+/).map((reading) => +reading);
    })
    .map((historyReadings) => {
      console.log(historyReadings);
      let differenceArray: any = [historyReadings];
      console.log(historyReadings);
      let differences: any = [...historyReadings];

      while (!differences.every((x) => x === 0)) {
        differences = differences
          .map((reading, index, array) => {
            if (index !== array.length - 1) {
              return array[index + 1] - reading;
            }
          })
          .filter((x) => x !== undefined);
        differenceArray.push([...differences]);
      }

      console.log(differenceArray);
      return differenceArray;
    })
    .map((differenceArrays) => {
      console.log(differenceArrays);
      let lastValues = differenceArrays.map(
        (differenceArray) => differenceArray[differenceArray.length - 1]
      );
      console.log(lastValues);
      return lastValues.reduce((acc, value) => acc + value);
    })
    .reduce((acc, value) => acc + value);
}

// console.log(day09p1("./day09/example.txt"));
console.log(day09p1("./day09/raw-data.txt"));
