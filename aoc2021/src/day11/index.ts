import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map(line => line.split("").map(n => new pos(n)))

const updateNearby = (x: number, y: number, matrix: pos[][]) => {
  if (matrix[y][x].flash) {
    return;
  }

  matrix[y][x].flash = true;
  for (let xi of [-1, 0, 1]) {
    for (let yi of [-1, 0, 1]) {
      if (matrix[y+yi]?.[x+xi] !== undefined) {
        matrix[y+yi][x+xi].val = matrix[y+yi][x+xi].val + 1
        if (matrix[y+yi][x+xi].val > 9) {
          updateNearby(x+xi, y+yi, matrix)
        }
      }
    }
  }
}
let log = false;

class pos {
  constructor(number: string) {
    this.val = parseInt(number);
    this.flash = false;
  }
  public flash: boolean
  public val: number
}

const part1 = (rawInput: string) => {
  const steps = 100;
  let flashes = 0;

  const input = parseInput(rawInput)
  var matrix = input

  for (let step = 1; step <= steps; step++) {
    // update all
    if (step < 3) {
      log = true;
    } else {
      log = false
    }

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        matrix[y][x].val = matrix[y][x].val + 1
      }
    }

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let here = matrix[y][x].val
        if (here > 9) {
          updateNearby(x, y, matrix)
        }
      }
    }

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let here = matrix[y][x]
        if (here.val > 9) {
          matrix[y][x].val = 0
          matrix[y][x].flash = false
          flashes++
        }
      }
    }
  }

  return flashes
}

const part2 = (rawInput: string) => {
  const steps = 500;

  const input = parseInput(rawInput)
  var matrix = input

  for (let step = 1; step <= steps; step++) {
    let flashes = 0;

    // update all
    if (step < 3) {
      log = true;
    } else {
      log = false
    }

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        matrix[y][x].val = matrix[y][x].val + 1
      }
    }

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let here = matrix[y][x].val
        if (here > 9) {
          updateNearby(x, y, matrix)
        }
      }
    }

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let here = matrix[y][x]
        if (here.val > 9) {
          matrix[y][x].val = 0
          matrix[y][x].flash = false
          flashes++
        }
      }
    }

    if (flashes == 100) {
      return step
    }
  }

  return steps
}

run({
  onlyTests: false,
  part1: {
    tests: [
      { input: `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`, expected: 1656 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`, expected: 195 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
