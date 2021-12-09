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

const parseInput = (rawInput: string) => rawInput.split("\n").map(n => n.split("").map(n => parseInt(n)))

function get(x: number, y: number, matrix: number[][]) {
  try {
    return matrix[y][x];
  } catch {
    return -1;
  }
}

function isLow(x: number, y: number, matrix: number[][]) {
  const min = matrix[y][x]
  if (get(y + 1, x, matrix) > min) {
    return false
  }
  if (get(y - 1, x, matrix) > min) {
    return false
  }  
  if (get(y, x + 1, matrix) > min) {
    return false
  }  
  if (get(y, x -1, matrix) > min) {
    return false
  }

  return true;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  console.log(input);
  var res = []
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (isLow(x, y, input)) {
        res.push(input[y][x] + 1);
      }
    }
  }

  return res.reduce((acc, f) => acc + f, 0);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

run({
  onlyTests: true,
  part1: {
    tests: [
      { input: `
2199943210
3987894921
9856789892
8767896789
9899965678
      `, expected: 15 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
