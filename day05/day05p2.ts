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

  // console.log(formattedLines);
  const seeds = formattedLines.seeds;

  let seedRange: any = [];
  for (let i = 0; i < formattedLines.seeds.length; i += 2) {
    seedRange.push([seeds[i], seeds[i + 1]]);
  }
  console.log(seedRange);

  let locationRange = seedRange.map(([seedStart, seedInc]: any) => {
    // map each seed range
    let inputRanges: any = [[seedStart, seedStart + seedInc]];
    let newInputRanges: any = [];
    MAPPERS.forEach((section) => {
      // for each section
      inputRanges.forEach(([inputStart, inputEnd]) => {
        formattedLines[section].forEach(
          ([destStart, mapStart, mapInc], index, array) => {
            // for each mapper

            const mapEnd = mapStart + mapInc;
            console.log(index); // , inputRanges[0][0]);
            if (index === 0 && mapStart > 0 && inputRanges[0][0] < mapStart) {
              newInputRanges.push([inputRanges[0][0], mapStart]); //figure out how to handle first case
            }
            if (index === array.length - 1 && inputRanges[0][0] >= mapEnd) {
              newInputRanges.push([inputRanges[0][0], inputRanges[0][1]]);
            }
            // for each
            if (inputStart <= mapStart && inputEnd >= mapEnd) {
              // input range covers map range
              newInputRanges.push([destStart, destStart + mapInc]);
            }
            if (inputStart >= mapStart && inputEnd <= mapEnd) {
              // map range covers input range
              newInputRanges.push([
                inputStart - mapStart + destStart,
                inputEnd - mapStart + destStart,
              ]);
            }
            if (inputStart <= mapEnd && inputEnd >= mapEnd) {
              // input range ends after map range
              newInputRanges.push([inputStart - mapStart + destStart, mapEnd]);
            }
            if (inputStart <= mapStart && inputEnd >= mapStart) {
              // input range starts before map range
              newInputRanges.push([destStart, inputEnd - mapStart + destStart]);
            }
          }
        ); // for each mapper

        console.log("inputRanges", inputRanges);
        console.log("newInputRanges", newInputRanges);
        inputRanges = [...newInputRanges];
        newInputRanges = [];
        console.log("inputRanges", inputRanges);
        console.log("newInputRanges", newInputRanges);
      });
    }); // for each section

    return inputRanges;
  }); // map each seed range
  console.log(locationRange);

  return Math.min(...locationRange.flat(2));
}

console.log(day05p2("./day05/example.txt"));
console.log(day05p2("./day05/raw-data.txt"));
