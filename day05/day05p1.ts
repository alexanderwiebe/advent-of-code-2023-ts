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
  console.log(formattedLines);
  // as usual this only messed things up
  // // add a zero mapper to the start
  // MAPPERS.forEach((section) => {
  //   if (formattedLines[section][0][1] !== 0) {
  //     formattedLines[section].splice(0, 0, [
  //       0,
  //       0,
  //       formattedLines[section][0][1],
  //     ]);
  //   }
  // });

  // // to infinity and beyond
  // MAPPERS.forEach((section) => {
  //   const length = formattedLines[section].length;
  //   formattedLines[section].push([
  //     formattedLines[section][length - 1][1] +
  //       formattedLines[section][length - 1][2],
  //     formattedLines[section][length - 1][1] +
  //       formattedLines[section][length - 1][2],
  //     Infinity,
  //   ]);
  // });

  // MAPPERS.forEach((section) => {
  //   console.log(formattedLines[section]);
  //   formattedLines[section] = formattedLines[section].map(
  //     ([dest, source, inc], index, array) => {
  //       console.log(dest, source, inc, array[index + 1]);
  //       if (index < array.length - 1) {
  //         return [dest, source, inc, array[index + 1][1]];
  //       } else {
  //         return [dest, source, inc, Infinity];
  //       }
  //     }
  //   );
  // });

  console.log(formattedLines);
  const seeds = formattedLines.seeds;

  let locations = seeds.map((seed: any) => {
    MAPPERS.forEach((section) => {
      let listTransforms = formattedLines[section].filter(
        ([_, source, inc]) => {
          if (seed >= source && seed < source + inc) {
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
        seed = seed - source + dest;
      }
    });
    return seed;
  });
  return Math.min(...locations); // .sort((a, b) => a - b)// [0];
}

console.log(day05p1("./day05/example.txt"));
console.log(day05p1("./day05/raw-data.txt"));
