import { map } from "@arrows/array";
import run from "aocrunner"
import { inc } from "ramda";

const parseInput = (rawInput: string) => rawInput.split("\n\n")

const part1 = (rawInput: string) => {
  const steps = 10;
  const [start, rules] = parseInput(rawInput)
  let map = new Map<string, string>()

  for (let rule of rules.split("\n")) {
    let [from, to] = rule.split(" -> ")
    map.set(from, to)
  }

  let data = start;
  for (let step = 1; step <= steps; step++) {
    for (let i = 0; i < data.length - 1; i++) {
      var text = data.substring(i, i+2)
      var add = map.get(text)
      if (add != null) {
        data = [data.slice(0, i + 1), add, data.slice(i + 1)].join('');
        i++
      }
    }
  }

  var count = new Map<string, number>()
  for (var letter of data.split("")) {
    if (count.has(letter)) {
      count.set(letter, count.get(letter)! + 1)
    } else {
      count.set(letter, 1)
    }
  }

  let min = Infinity
  let max = -Infinity

  for (let key of count.keys()) {
    const c = count.get(key)!
    if (c > max) {
      max = c
    }

    if (c < min) {
      min = c
    }
  }

  return max - min
}

function up(pair: string, count: number, map: Map<string, number>) {
  if (!map.has(pair)) {
    map.set(pair, 0)
  }
  map.set(pair, map.get(pair)! + count)
}

const part2 = (rawInput: string) => {
  const steps = 40;
  const [start, ruleString] = parseInput(rawInput)
  let rules = new Map<string, string>()

  for (let rule of ruleString.split("\n")) {
    let [from, to] = rule.split(" -> ")
    rules.set(from, to)
  }

  let data = new Map<string, number>()
  let str = start.split("")
  for (let i = 0; i < str.length - 1; i++) {
    const pair = str[i] + str[i + 1]
    up(pair, 1, data)
  }

  var countResult = new Map<string, number>()
  for (var letter of start.split("")) {
    up(letter, 1, countResult)
  }

  for (let step = 1; step <= steps; step++) {
    let result = new Map<string, number>()
    for (let pair of data.keys()) {
      const count = data.get(pair)!
      if (rules.has(pair)) {
        var r = rules.get(pair)!
        up(r, count, countResult)
        
        up(pair[0] + r, count, result)
        up(r + pair[1], count, result)
      }
      else 
      {
        up(pair, count, result)
      }
    }
    data = result
  }

  let min = Infinity
  let max = -Infinity

  for (let key of countResult.keys()) {
    const c = countResult.get(key)!
    if (c > max) {
      max = c
    }

    if (c < min) {
      min = c
    }
  }

  return max - min
}

run({
  onlyTests: false,
  part1: {
    tests: [
      { input: `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
      `, expected: 1588 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
      `, expected: 2188189693529 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})

// NN => NC, CN   NC => NB, BC  => CB => CH, HB