import run from "aocrunner"
import { column } from "mathjs"
import { split } from "ramda"
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

const parseInput = (rawInput: string) => rawInput.split("\n\n")

class Nr {
  number: number
  marked: boolean

  constructor(nr : number) {
    this.number = nr
    this.marked = false
  }
}

function mark(board: Nr[][], drawn: Number): void {
  for (let row of board) {
    for (let number of row) {
      if (number.number == drawn) {
        number.marked = true;
      }
    }
  }
}

function checkForBingo(board: Nr[][] ): boolean {
  for(let x = 0; x < 5; x++) {
    if (board[x].filter(n => n.marked).length == 5) {
      return true;
    }

    if (board.map(b => b[x]).filter(n => n.marked).length == 5) {
      return true;
    }
  }
  for (let row of board) {
    let rb = 0;
    for (let number of row) {
      rb++;
      if (number.marked) {
        number.marked = true;
      } else {
        break;
      }

      if (rb == 5) return true;
    }
  }

  return false;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const numbers = input[0].split(",").map(Number);
  const boards:Nr[][][] = [];

  for(let i = 1; i < input.length; i++) {
    let board = input[i]
      .split("\n").map(n => 
        n.split(" ").filter(n => n.trim() != "").map(n => new Nr(parseInt(n))))
    boards.push(board);

    //console.log(input[i], board);
  }

  for (let draw of numbers) {
    for(let board of boards) {
      mark(board, draw);

      if (checkForBingo(board)) {
        var sum = board.reduce((acc, row) => acc + row.reduce((row, nr) => row + (nr.marked ? 0 : nr.number), 0), 0)
        return draw * sum;
      }
    }
  }

  return 0;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const numbers = input[0].split(",").map(Number);
  let boards:Nr[][][] = [];

  for(let i = 1; i < input.length; i++) {
    let board = input[i]
      .split("\n").map(n => 
        n.split(" ").filter(n => n.trim() != "").map(n => new Nr(parseInt(n))))
    boards.push(board);
  }

  let bingos = boards.length;
  for (let draw of numbers) {
    let next = [];
    for(let board of boards) {
      mark(board, draw);

      if (!checkForBingo(board)) {
        next.push(board)
      } else {
        bingos--;
      }

      if (bingos == 0) {
        var sum = boards[0].reduce((acc, row) => acc + row.reduce((row, nr) => row + (nr.marked ? 0 : nr.number), 0), 0)
        return draw * sum;
      }
    }

    boards = next;
  }

  return 0;
}

run({
  part1: {
    tests: [
      { input: `
      7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
      `, expected: 4512 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
      7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
      `, expected: 1924 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
