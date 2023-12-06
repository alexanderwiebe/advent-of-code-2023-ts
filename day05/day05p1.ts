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
      ([dest, source, inc], index, array) => {
        return (input) =>
          input >= source &&
          input < (index < array.length - 1 ? array[index + 1][1] : false)
            ? input - source + dest
            : -1;
      }
    );
  });

  const seeds = formattedLines.seeds;

  /* testing array to function*/
  // prettier-ignore
  let testVal = [ 
  [ 718278079,           0, 132911406 ],
  [ 851189485,   132911406, 158998254 ],
  [ 404519244,   291909660, 232498813 ],
  [ 1373357719,  524408473,  98619504 ],
  [ 35892165,    623027977,  44757736 ],
  [ 0,           667785713,  35892165 ],
  [ 691784648,   703677878,  26493431 ],
  [ 1079077725,  730171309, 241191740 ],
  [ 80649901,    971363049,  35482565 ],
  [ 637018057,  1006845614,  54766591 ],
  [ 1010187739, 1061612205,  68889986 ],
  [ 1320269465, 1130502191,  53088254 ],
  [ 368073252,  1183590445,  36445992 ],
  [ 116132466,  1220036437, 251940786 ],
  [ 3321831622, 2330985014,  61597014 ], // 251940786 + 1220036437 = 1471977223
  [ 2887711667, 2392582028,  64590748 ],
  [ 2581158120, 2457172776, 306553547 ],
  [ 2972543746, 2763726323, 349287876 ],
  [ 2330985014, 3113014199, 250173106 ],
  [ 2952302415, 3363187305,  20241331 ],
  [ 3839358665, 3383428636, 455608631 ],
  [ 3383428636, 3839037267, 267181273 ],
  [ 3650609909, 4106218540, 188748756 ],
  [ 4294967296, 4294967296, Infinity ] ].map(([dest, source, inc], index, array) => {
    return (input) => {
      console.log('input', input, 'source', source, 'inc', inc);
      console.log('input >= source', input >= source);
      console.log('input < source + inc', input < source + inc);
      console.log('val ', input >= source && input < source + inc);
      console.log('is there a scenario where the source + inc is larger than the next source?');
      console.log('index', index, 'array.length', array.length);
      if(index < array.length - 1) {
        console.log('next source', array[index + 1][1]);
        console.log('source + inc', source + inc);
        console.log('is there a true here?', source + inc == array[index + 1][1]);
        if(source + inc !== array[index + 1][1]){
          console.log(index)
          console.log(source);
          console.log(source + inc);
          console.log(array[index + 1][1]);
          // 1471977223
          // 2330985014
        }
      }
      // how is this not working?
      return input >= source && input < (index < array.length - 1 ? array[index + 1][1] : false)  ? input - source + dest : -1;
    }
  }).map((func: any) => func(seeds[10]));
  // manually solve the undefinied issue here
  // console.log(1220036437 + 251940786)
  console.log(testVal);
  console.log(seeds[10]);

  const locations = seeds.map((seed) => {
    console.log("seed", seed);
    let nextValue = formattedLines["seed-to-soil"]
      .map((func: any) => func(seed))
      .find((x) => x !== -1);
    if (!nextValue) {
      console.log("error for seed", seed);
    }
    console.log("soil", nextValue);
    nextValue = formattedLines["soil-to-fertilizer"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    if (!nextValue) {
      console.log("error for seed", seed);
    }
    console.log("fertilizer", nextValue);
    nextValue = formattedLines["fertilizer-to-water"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    if (!nextValue) {
      console.log("error for seed", seed);
    }
    console.log("water", nextValue);
    nextValue = formattedLines["water-to-light"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    if (!nextValue) {
      console.log("error for seed", seed);
    }
    console.log("light", nextValue);
    nextValue = formattedLines["light-to-temperature"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    if (!nextValue) {
      console.log("error for seed", seed);
    }
    console.log("temp", nextValue);
    nextValue = formattedLines["temperature-to-humidity"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    if (!nextValue) {
      console.log("error for seed", seed);
    }
    console.log("humidity", nextValue);
    nextValue = formattedLines["humidity-to-location"]
      .map((func: any) => func(nextValue))
      .find((x) => x !== -1);
    if (!nextValue) {
      console.log("error for seed", seed);
    }
    console.log("location", nextValue);
    return nextValue;
  });
  console.log(seeds);
  console.log(locations);

  // iteration 1
  // console.log((formattedLines["seed-to-soil"][0] as any)(seeds[0]));
  // console.log((formattedLines["seed-to-soil"][1] as any)(seeds[0]));
  // console.log((formattedLines["seed-to-soil"][2] as any)(seeds[0]));
  // console.log((formattedLines["seed-to-soil"][0] as any)(seeds[1]));
  // console.log((formattedLines["seed-to-soil"][1] as any)(seeds[1]));
  // console.log((formattedLines["seed-to-soil"][2] as any)(seeds[1]));
  // console.log((formattedLines["seed-to-soil"][0] as any)(seeds[2]));
  // console.log((formattedLines["seed-to-soil"][1] as any)(seeds[2]));
  // console.log((formattedLines["seed-to-soil"][2] as any)(seeds[2]));
  // console.log((formattedLines["seed-to-soil"][0] as any)(seeds[3]));
  // console.log((formattedLines["seed-to-soil"][1] as any)(seeds[3]));
  // console.log((formattedLines["seed-to-soil"][2] as any)(seeds[3]));

  // iteration 2
  // console.log((formattedLines["soil-to-fertilizer"][0] as any)(seeds[0]));
  return locations.sort((a, b) => a - b)[0];
}

// console.log(day05p1("./day05/example.txt"));
console.log(day05p1("./day05/raw-data.txt"));
