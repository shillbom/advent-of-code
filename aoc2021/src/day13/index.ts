import run from "aocrunner"
import { max } from "mathjs"

import {
  math,
} from "../utils/index.js"

const parseInput = (rawInput: string) => rawInput.split("\n\n")

function get(x: number, y: number, grid: boolean[][]) {
  return grid[y]?.[x] ?? false
}

function set(x: number, y: number, val: boolean, grid: boolean[][]) {
  if (grid[y] === undefined) {
    grid[y] = []
  }

  grid[y][x] = val;
}

function draw(grid: boolean[][], x: number, y: number): number {
  let count = 0;
  console.log(x, y)
  for (let i = 0; i < y; i++) {
    let line = ""
    for (let j = 0; j < x; j++) {
      let val = get(j, i, grid) 
      line += val ? "#" : "."

      if (val) count++
    }
    console.log(line)
  }

  return count;
}

function foldX(grid: boolean[][], fx: number, maxX: number, maxY: number) {
  for (let y = 0; y <= maxY; y++) {
    for (let i = 1; i + fx <= maxX; i++) {
      let val = get(fx + i, y, grid)
      if (val) {
        set(fx - i, y, val, grid)
      }
    }
  }
}

function foldY(grid: boolean[][], fy: number, maxX: number, maxY: number) {
  for (let i = 1; i + fy <= maxY; i++) {
    for (let x = 0; x <= maxX; x++) {
      let val = get(x, fy + i, grid);
      if (val) {
        set(x, fy - i, val, grid)
      }
    }
  }
}

const part1 = (rawInput: string) => {
  const [paper, folds] = parseInput(rawInput);
  let maxX = -Infinity; let maxY = -Infinity
  let grid: boolean[][] = []
  for (let line of paper.split("\n")) {
    const [xs, ys] = line.split(",")
    const x = parseInt(xs)
    const y = parseInt(ys)
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y

    set(x, y, true, grid)
  }

  maxX++
  maxY++

  // draw(grid, maxX, maxY)

  for (let fold of folds.split("\n")) {
    console.log(fold)
    const [instr, coords] = fold.split("=")
    const coord = parseInt(coords)
    if (instr.endsWith("x")) {
      foldX(grid, coord, maxX, maxY)
      maxX = coord;
    } else {
      foldY(grid, coord, maxX, maxY)
      maxY = coord
    }

    // draw(grid, maxX, maxY)
  }

  return draw(grid, maxX, maxY)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

run({
  onlyTests: false,
  part1: {
    tests: [
      { input: `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
      `, expected: 17 },
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
