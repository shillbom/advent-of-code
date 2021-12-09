import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map(n => n.split("").map(n => parseInt(n)))

function get(x: number, y: number, matrix: number[][]) {
  let ret = undefined;
  try {
    ret = matrix[y][x];
  } catch {
    // nop
  }

  ret = ret ?? 10
  return ret
}

function isLow(x: number, y: number, matrix: number[][]) {
  const min = matrix[y][x]
  if (get(x, y + 1, matrix) <= min) {
    return false
  }
  if (get(x, y - 1, matrix) <= min) {
    return false
  }  
  if (get(x + 1, y, matrix) <= min) {
    return false
  }  
  if (get(x -1, y, matrix) <= min) {
    return false
  }

  return true;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  var res = []
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (isLow(x, y, input)) {
        res.push({x: x + 1 , y: y + 1, value: input[y][x] + 1});
      }
    }
  }
  //console.log("result", res);
  return res.reduce((acc, f) => acc + f.value, 0);
}

function get2(x: number, y: number, matrix: number[][]) {
  let ret = undefined;
  try {
    ret = matrix[y][x];
  } catch {
    // nop
  }

  ret = ret ?? 10
  return ret
}

function isLow2(x: number, y: number, matrix: number[][]) {
  const min = matrix[y][x]
  if (get2(x, y + 1, matrix) <= min) {
    return false
  }
  if (get2(x, y - 1, matrix) <= min) {
    return false
  }  
  if (get2(x + 1, y, matrix) <= min) {
    return false
  }  
  if (get2(x -1, y, matrix) <= min) {
    return false
  }

  return true;
}

function findBasin(x: number, y: number, matrix: number[][]) {
  
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  var res = []
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (isLow(x, y, input)) {
        res.push({x: x + 1 , y: y + 1, value: input[y][x] + 1});
      }
    }
  }
  //console.log("result", res);
  return res.reduce((acc, f) => acc + f.value, 0);
}

run({
  onlyTests: false,
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
      { input: `
2199943210
3987894921
9856789892
8767896789
9899965678
      `, expected: 1134 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
