import * as fs from "node:fs";

export function day05p2(filename: string) {
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
              [SECTIONS[sectionIndex]]: acc[SECTIONS[sectionIndex]],
              // .sort(
              //   (a, b) => a[1] - b[1]
              // ),
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

  // console.log(formattedLines);
  const seeds = formattedLines.seeds;

  let seedRange: any = [];
  for (let i = 0; i < formattedLines.seeds.length; i += 2) {
    seedRange.push([seeds[i], seeds[i + 1]]);
  }
  // console.log(seedRange);

  let locationRange = seedRange.map(([start, inc]: any) => {
    let locationRange: any = [];
    // do stuff
    for (let seedR = start; seedR < start + inc; seedR++) {
      let seedMutate = seedR;
      MAPPERS.forEach((section) => {
        let listTransforms = formattedLines[section].filter(
          ([_, source, inc]) => {
            if (seedMutate >= source && seedMutate < source + inc) {
              return true;
            } else {
              return false;
            }
          }
        );
        if (listTransforms.length > 1) {
          console.error("more than 1 transform found");
        }
        if (listTransforms.length === 0) {
          // console.error("no transform found"); // now expected behaviour
        } else {
          let [dest, source] = listTransforms[0];
          seedMutate = seedMutate - source + dest;
        }
      });
      locationRange.push(seedMutate);
    }
    return locationRange;
  });
  // console.log(locationRange);
  // console.log(Math.min(...locationRange.flat()));

  return Math.min(...locationRange.flat());
}

// console.log(day05p2("./day05/example.txt"));
console.log(day05p2("./day05/raw-data.txt"));
