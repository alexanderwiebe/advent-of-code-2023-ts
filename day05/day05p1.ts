import * as fs from "node:fs";

export function day05p1(filename: string) {
  /* Part 1 */
  const MAPPERS = [
    "seed-to-soil",
    "soil-to-fertilizer",
    "fertilizer-to-water",
    "water-to-light",
    "light-to-temperature",
    "temperature-to-humidity",
    "humidity-to-location",
  ];
  const SECTIONS = ["seeds", ...MAPPERS];

  let sectionIndex = -1;

  const formattedLines = fs
    .readFileSync(filename)
    .toString()
    .split("\n")
    .reduce(
      (acc, line) => {
        if (sectionIndex === -1) {
          // seeds
          sectionIndex++;
          return {
            ...acc,
            [SECTIONS[sectionIndex]]: line
              .split(/\s+/)
              .slice(1)
              .map((x) => parseInt(x)),
          };
        } else {
          if (line === "") {
            const retVal = {
              ...acc,
              [SECTIONS[sectionIndex]]: acc[SECTIONS[sectionIndex]].sort(
                (a, b) => a[1] - b[1]
              ),
            };
            sectionIndex++;
            return retVal;
          } else {
            if (line.includes(":")) {
              return acc; // skip the section header
            }
            return {
              ...acc,
              [SECTIONS[sectionIndex]]: [
                ...acc[SECTIONS[sectionIndex]],
                line.split(/\s+/).map((x) => parseInt(x)),
              ],
            };
          }
          return acc;
        }
      },
      {
        seeds: [],
        "seed-to-soil": [],
        "soil-to-fertilizer": [],
        "fertilizer-to-water": [],
        "water-to-light": [],
        "light-to-temperature": [],
        "temperature-to-humidity": [],
        "humidity-to-location": [],
      }
    );

  // add a zero mapper to the start
  MAPPERS.forEach((section) => {
    if (formattedLines[section][0][1] !== 0) {
      formattedLines[section].splice(0, 0, [
        0,
        0,
        formattedLines[section][0][1],
      ]);
    }
  });

  // to infinity and beyond
  MAPPERS.forEach((section) => {
    const length = formattedLines[section].length;
    console.log(formattedLines[section][length - 1][1]);
    formattedLines[section].push([
      formattedLines[section][length - 1][1] +
        formattedLines[section][length - 1][2],
      formattedLines[section][length - 1][1] +
        formattedLines[section][length - 1][2],
      Infinity,
    ]);
  });

  console.log(formattedLines);

  MAPPERS.forEach((section) => {
    formattedLines[section] = formattedLines[section].map(
      ([dest, source, inc]) => {
        return (input) =>
          input >= source && input < source + inc ? input - source + dest : -1;
      }
    );
  });

  /* testing array to function */
  let testVal = [[54, 54, Infinity]].map(([dest, source, inc]) => {
    return (input) =>
      input >= source && input < source + inc ? input - source + dest : -1;
  })[0](81);
  console.log(testVal);

  const seeds = formattedLines.seeds;
  const locations = seeds.map((seed) => {
    console.log("seed", seed);
    let nextValue = formattedLines["seed-to-soil"]
      .map((func: any) => func(seed))
      .find((x) => x !== -1);
    console.log("soil", nextValue);
    nextValue = formattedLines["soil-to-fertilizer"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    console.log("fertilizer", nextValue);
    nextValue = formattedLines["fertilizer-to-water"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    console.log("water", nextValue);
    nextValue = formattedLines["water-to-light"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    console.log("light", nextValue);
    nextValue = formattedLines["light-to-temperature"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    console.log("temp", nextValue);
    nextValue = formattedLines["temperature-to-humidity"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    console.log("humidity", nextValue);
    nextValue = formattedLines["humidity-to-location"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    console.log("location", nextValue);
    return nextValue;
  });
  console.log(seeds);
  console.log(locations);

  // iteration 1
  console.log((formattedLines["seed-to-soil"][0] as any)(seeds[0]));
  console.log((formattedLines["seed-to-soil"][1] as any)(seeds[0]));
  console.log((formattedLines["seed-to-soil"][2] as any)(seeds[0]));
  console.log((formattedLines["seed-to-soil"][0] as any)(seeds[1]));
  console.log((formattedLines["seed-to-soil"][1] as any)(seeds[1]));
  console.log((formattedLines["seed-to-soil"][2] as any)(seeds[1]));
  console.log((formattedLines["seed-to-soil"][0] as any)(seeds[2]));
  console.log((formattedLines["seed-to-soil"][1] as any)(seeds[2]));
  console.log((formattedLines["seed-to-soil"][2] as any)(seeds[2]));
  console.log((formattedLines["seed-to-soil"][0] as any)(seeds[3]));
  console.log((formattedLines["seed-to-soil"][1] as any)(seeds[3]));
  console.log((formattedLines["seed-to-soil"][2] as any)(seeds[3]));

  // iteration 2
  console.log((formattedLines["soil-to-fertilizer"][0] as any)(seeds[0]));
  return formattedLines;
}

/**
 *     if(index === 0 && source !== 0) {
        return [
            (input) => ((input < source) ? (input) : -1 ),
            (input) => ((input > source) ? (input - source + dest) : -1 )
            ];
    }
 */

/* convers 
    let func = [ [ 52, 50, 48 ], [ 50, 98, 2 ] ].map(([dest, source, inc], index) => {
    return (input) => ((input > source) ? (input - source + dest) : -1 ); 
}) */

console.log(day05p1("./day05/example.txt"));
// console.log(day05p1("./day05/raw-data.txt"));
