import run from "aocrunner"
import { listenerCount } from "process"
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

const parseInput = (rawInput: string) => rawInput.split("\n").map(line => line.split("").filter(s => s != " "))
const scoreMap = new Map([
  [")", 3],
  ["]", 57],
  ["}", 1197],
  [">", 25137]
])

const scoreMap2 = new Map([
  [")", 1],
  ["]", 2],
  ["}", 3],
  [">", 4]
])

const map = new Map([
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
  ["<", ">"]
])

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let score = 0

  for(var line of input) {
    let stack = []
    for (let char of line) {
      if (["(", "[", "{", "<"].includes(char)) {
        stack.push(char)
        continue;
      }

      let last = stack.pop()
      let expected = map.get(last!)

      if (expected != char) {
        score += scoreMap.get(char)!;
      }
    }
  }

  return score
}

function test(line: string[]): boolean {
  console.log(line.join(""))
  let stack = []
  for (let char of line) {
    if (["(", "[", "{", "<"].includes(char)) {
      stack.push(char)
      continue;
    }

    let last = stack.pop()
    let expected = map.get(last!)

    if (expected != char) {
      console.log("Expected " + expected + " but found " + char)
      return false;
    }
  }

  return true;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let ok = []
  let scores : number[] = []

  for(var line of input) {
    if (test(line)) {
      ok.push(line);
    }
  }

  console.log("ok", ok.map(n => n.join("")));
  for(var line of ok) {
    let stack = []
    let score = 0
    for (let char of line) {
      if (["(", "[", "{", "<"].includes(char)) {
        stack.push(char)
        continue;
      }

      let last = stack.pop()
      let expected = map.get(last!)

      if (expected != char) {
        console.log("ABSOLUTE CHAOS")
      }
    }

    var add = stack.reverse().map(n => map.get(n))
    for (let char of add) {
      score = score * 5 + scoreMap2.get(char!)!
    }
    console.log(line.join("") + " complete by adding " + add.join("") + " score: " + score)
    scores.push(score)
  }

  scores.sort((a, b) => a - b)
  console.log(scores)
  return scores[math.floor(scores.length/2)];
}

run({
  onlyTests: false,
  part1: {
    tests: [
      { input: `
      [({(<(())[]>[[{[]{<()<>>
        [(()[<>])]({[<{<<[]>>(
        {([(<{}[<>[]}>{[]{[(<()>
        (((({<>}<{<{<>}{[]{[]{}
        [[<[([]))<([[{}[[()]]]
        [{[{({}]{}}([{[{{{}}([]
        {<[[]]>}<{[{[{[]{()[[[]
        [<(<(<(<{}))><([]([]()
        <{([([[(<>()){}]>(<<{{
        <{([{{}}[<[[[<>{}]]]>[]]`, expected: 26397 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
      [({(<(())[]>[[{[]{<()<>>
        [(()[<>])]({[<{<<[]>>(
        {([(<{}[<>[]}>{[]{[(<()>
        (((({<>}<{<{<>}{[]{[]{}
        [[<[([]))<([[{}[[()]]]
        [{[{({}]{}}([{[{{{}}([]
        {<[[]]>}<{[{[{[]{()[[[]
        [<(<(<(<{}))><([]([]()
        <{([([[(<>()){}]>(<<{{
        <{([{{}}[<[[[<>{}]]]>[]]`, expected: 288957 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
