import run from "aocrunner"
import {
  A,
  pipe,
  compose,
  rail,
  curry,
  multi,
  method,
  dispatch,
  math,
  R,
  graph,
  log,
  delay,
  equal,
  grid,
  numSys,
  gen,
  crypto,
} from "../utils/index.js"

const parseInput = (rawInput: string) => rawInput.split(",").map(Number)

const part1 = (rawInput: string) => {
  const days = 80;
  let fishes = parseInput(rawInput)

  for (let day = 1; day <= days; day++) {
    let next = [];
    for (let f of fishes) {
      if (f == 0) {
        next.push(6);
        next.push(8);
      } else {
        next.push(f - 1);
      }
    }

    fishes = next;
    // console.log(`After \t ${day} days: ${fishes.length}`);
  }

  return fishes.length;
}

const part2 = (rawInput: string) => {
  const days = 256;
  let fishes = parseInput(rawInput)
  let fishPerAge = [0, 0, 0, 0, 0, 0, 0, 0]

  for (let f of fishes) {
    fishPerAge[f]++
  }

  // console.log("fishage " + fishPerAge)

  for (let day = 1; day <= days; day++) {
    let next = [0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < fishPerAge.length; i++) {
      if (i == 0) {
        next[8] = fishPerAge[i];
        next[6] = fishPerAge[i];
      } else {
        next[i-1] += fishPerAge[i];
      }
    }

    fishPerAge = next;
    // console.log(`After \t ${day} days: ${fishPerAge.join(",")}`);
  }

  return fishPerAge.reduce((acc, f) => acc + f, 0);
}

run({
  part1: {
    tests: [
      { input: `3,4,3,1,2`, expected:  5934},
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `3,4,3,1,2`, expected:  26984457539},
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
