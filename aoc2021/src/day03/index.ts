import run from "aocrunner"
import { number } from "mathjs"
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

const parseInput = (rawInput: string) => rawInput.split("\n").map(line => [...line].map(Number))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let gamma = []

  for (let i = 0; i < input[0].length; i++) {
    gamma.push(0)
  }
  for (const item of input) {
    for (let i = 0; i < item.length; i++) {
      gamma[i] = gamma[i] + (item[i] == 1 ? 1 : -1)
    }
  }

  let gammaRes = gamma.map(n => n >= 0 ? 1 : 0).join("");
  let epsiRes = gamma.map(n => n >= 0 ? 0 : 1).join("");

  return '' + parseInt(gammaRes, 2) * parseInt(epsiRes, 2)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let gamma = []
  let epsi = []

  for (let i = 0; i < input[0].length; i++) {
    gamma.push(0)
    epsi.push(0)
  }

  let oxygen = [...input]
  let co2 = [...input]
  for (let i = 0; i < input[0].length; i++) {
    for (const item of oxygen) {
      for (let i = 0; i < item.length; i++) {
        gamma[i] = gamma[i] + (item[i] == 1 ? 1 : -1)
      }
    }  
    let gammaRes = gamma.map(n => n >= 0 ? 1 : 0);
    gamma = gamma.map(n => 0);
    
    if (oxygen.length > 1) {
      oxygen = oxygen.filter(o => o[i] == gammaRes[i])
    }
    
    for (const item of co2) {
      for (let i = 0; i < item.length; i++) {
        epsi[i] = epsi[i] + (item[i] == 1 ? 1 : -1)
      }
    }  
    let epsiRes = epsi.map(n => n >= 0 ? 0 : 1);
    epsi = epsi.map(i => 0)
    if (co2.length > 1) {
      co2 = co2.filter(o => o[i] == epsiRes[i])
    }
  }

  return '' + parseInt(oxygen[0].join(""), 2) * parseInt(co2[0].join(""), 2)
}

run({
  part1: {
    tests: [
      { input: `
        00100
        11110
        10110
        10111
        10101
        01111
        00111
        11100
        10000
        11001
        00010
        01010`, expected: "198" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
        00100
        11110
        10110
        10111
        10101
        01111
        00111
        11100
        10000
        11001
        00010
        01010`, expected: "230" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
