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

function draw(dots: pos[], onlyCount = false): number {
  let grid: boolean[][] = []
  let count = 0;
  let maxX = -Infinity
  let maxY = -Infinity
  for (let dot of dots) {
    maxX = math.max(maxX, dot.x)
    maxY = math.max(maxY, dot.y)

    set(dot.x, dot.y, true, grid)
  }

  for (let i = 0; i <= maxY; i++) {
    let line = ""
    for (let j = 0; j <= maxX; j++) {
      let val = get(j, i, grid) 
      line += val ? "#" : "."

      if (val) count++
    }

    if (!onlyCount) {
      console.log(line)
    }
  }

  return count;
}

class pos {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

const part1 = (rawInput: string) => {
  let dots: pos[] = []
  const [paper, folds] = parseInput(rawInput);
  for (let line of paper.split("\n")) {
    const [xs, ys] = line.split(",")
    const x = parseInt(xs)
    const y = parseInt(ys)
    
    dots.push(new pos(x, y))
  }

  for (let fold of folds.split("\n")) {
    const [instr, coords] = fold.split("=")
    const offset = parseInt(coords)
    for (let dot of dots) {
      if (instr.endsWith("x")) {
        if (dot.x > offset) dot.x = 2 * offset - dot.x
      } 
      else {
        if (dot.y > offset) dot.y = 2 * offset - dot.y
      }
    }
    console.log(fold, draw(dots, true))
  }
 
  draw(dots)
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
