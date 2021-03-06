import run from "aocrunner"
import { parse } from "path/posix"
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

class Point {
  x: number
  y: number

  constructor(input: string) {
    const coord = input.split(",")
    this.x = parseInt(coord[0])
    this.y = parseInt(coord[1])
  }
}

function increment(grid: number[][], x: number, y: number) {
  if (grid[y] == null) {
    grid[y] = []
  }

  if (grid[y][x] == null) {
    grid[y][x] = 1
  } else {
    grid[y][x] = grid[y][x] + 1;
  }
}

const parseInput = (rawInput: string) => rawInput.split("\n").map(line => line.split(" -> ").map(t => new Point(t)))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let grid: number[][] = [];

  let lines = input.filter(l => l[0].x == l[1].x || l[0].y == l[1].y)
  for(const line of lines) {
    if (line[0].x == line[1].x) {
      const from = Math.min(line[0].y, line[1].y)
      const to = Math.max(line[0].y, line[1].y)

      for (let i = from; i <= to; i++) {
        increment(grid, line[0].x, i);
      }
    } else {
      const from = Math.min(line[0].x, line[1].x)
      const to = Math.max(line[0].x, line[1].x)

      for (let i = from; i <= to; i++) {
        increment(grid, i, line[0].y);
      }
    }
  }

  var dangers = 0
  for (let y of grid) {
    for(let x  of y ?? []) {
      if (x != null && x >= 2) {
        dangers++
      }
    }
  }

  return dangers
}

function markAll(grid: number[][], from: Point, to: Point) {
  if (from.x == to.x) {
    const s = Math.min(from.y, to.y)
    const e = Math.max(from.y, to.y)

    for (let i = s; i <= e; i++) {
      increment(grid, from.x, i);
    }
  } else if (from.y == to.y){
    const s = Math.min(from.x, to.x)
    const e = Math.max(from.x, to.x)

    for (let i = s; i <= e; i++) {
      increment(grid, i, from.y);
    }
  } else {
    // Does not matter
    const start = from.x < to.x ? from : to; 
    const end = from.x >= to.x ? from : to; 

    let up = start.y < end.y;

    for (let i = 0; i <= end.x - start.x; i++) {
      increment(grid, start.x + i, (start.y + (up ? i : -i)));
    }
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let grid: number[][] = [];

  let lines = input
  for(const line of lines) {
    markAll(grid, line[0], line[1])
  }

  // console.log("grid", grid)

  var dangers = 0
  for (let y of grid) {
    for(let x  of y ?? []) {
      if (x != null && x >= 2) {
        dangers++
      }
    }
  }

  return dangers
}

run({
  onlyTests: false,
  part1: {
    tests: [
      { input: `
      0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
      `, expected: 5 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
      0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
      `, expected: 12 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
