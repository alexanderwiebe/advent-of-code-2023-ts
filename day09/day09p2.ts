import * as fs from "node:fs";

export function day09p2(filename: string) {
  /* Part 1 */

  return (
    fs
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
        let firstValues = differenceArrays.map(
          (differenceArray) => differenceArray[0]
        );
        console.log(firstValues);
        firstValues.pop();
        console.log(firstValues);

        return firstValues.reverse().reduce((acc, item) => {
          console.log(
            "item",
            item,
            "acc",
            acc,
            "acc - item",
            acc - item,
            "item - acc",
            item - acc
          );
          return item - acc;
        });
      })
      // .forEach((x) => {
      //   console.log(x)
      // });
      .reduce((acc, value) => {
        console.log(value);
        return acc + value;
      }, 0)
  );
}

// console.log(day09p2("./day09/example.txt"));
console.log(day09p2("./day09/raw-data.txt"));
