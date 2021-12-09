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

interface pos {
  x: number,
  y: number,
  val: number
}

let checked: pos[] = [];
function isLow2(x: number, y: number, matrix: number[][]): pos[] {
  const min = matrix[y][x]
  if (checked.find(p => p.x == x && p.y == y)) {
    return [];
  }
  var ret: pos[] = [{x, y, val: min}]
  checked.push({x, y, val: min})

  let toVisit = [{x: x, y: y + 1},{x: x, y: y - 1},{x: x + 1, y: y},{x: x - 1, y: y}]
  toVisit = toVisit.filter(pos => checked.find(c => c.x == pos.x && c.y == pos.y) == null)
  for (let v of toVisit) {
    var val = get(v.x, v.y, matrix);
    if (val < 9) {
      ret.push(...isLow2(v.x, v.y, matrix))
    }
  }
  return ret;
}

function findBasin(x: number, y: number, matrix: number[][]): number[] {
  var here = get(x, y, matrix);
  if (here == 9) {
    return []
  }
  var ret = isLow2(x, y, matrix)
  return ret.map(n => n.val)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  var basins: number[][] = []
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      basins.push(findBasin(x, y, input));
    }
  }

  basins.sort((a, b) => b.length - a.length);
  return (basins[0].length * basins[1].length * basins[2].length);
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
