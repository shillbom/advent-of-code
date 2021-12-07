import run from "aocrunner"
import { i } from "mathjs";
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

function moveCrabs(to: number, crabs: number[]): number {
  var sum = 0;
  for (let c of crabs) {
    sum += math.abs(to - c);
  }

  return sum;
}

function moveCrabs2(toHor: number, crabs: number[]): number {
  var sum = 0;
  for (let c of crabs) {
    let i = 1;
    let cost = 0;
    let from = math.min(c, toHor);
    let to = math.max(c, toHor); 

    for (let fuel = from; fuel < to; fuel++) {
      cost += i;
      i++
    }
    sum += cost;
  }

  return sum;
}

function median(values: number[]): number {
  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);
  
  if (values.length % 2)
    return values[half];
  
  return (values[half - 1] + values[half]) / 2.0;
}

function average(values: number[]): number {
  return math.round(values.reduce((a, f) => a+f, 0) / values.length)
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let crabs = input.sort();

  console.log("average", average(crabs))
  console.log("median", median(crabs))

  return moveCrabs(median(crabs), crabs)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let crabs = input.sort();

  let min = Infinity
  let max = -Infinity
  for (let c of crabs) {
    if (c < min) min = c
    if (c > max) max = c
  }

  console.log("minmax", min, max)
  let results = []
  for (let i = min; i <= max; i++) {
    results.push(moveCrabs2(i, crabs))
  }

  console.log(results)
  let minFuel = Infinity
  let minPos = 0
  for (let i = 0; i < results.length; i++) {
    let c = results[i]
    if (c < minFuel) {
      minFuel = c
      minPos = (i)
    }
  }

  console.log(minFuel, minPos)


  return minFuel
}

run({
  onlyTests: false,
  part1: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
