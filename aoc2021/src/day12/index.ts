import run from "aocrunner"
import { create } from "domain"
import { runInThisContext } from "vm"
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

const parseInput = (rawInput: string) => rawInput.split("\n")

class Cave {
  name: string
  links: Cave[]
  isBig: boolean

  constructor(name: string) {
    this.name = name
    this.links = []

    this.isBig = name == name.toUpperCase()
  }

  addLink(cave: Cave) {
    if (this.links.find(c => c.equals(cave)) == null) {
      this.links.push(cave)
    }
  }

  equals(cave: Cave) {
    return this.name == cave.name
  }
}

function getOrCreate(cave: string, caves: Map<string, Cave>): Cave {
  if (caves.has(cave)) {
    return caves.get(cave)!
  }

  var created = new Cave(cave);
  caves.set(cave, created)
  return created;
}

function traverse(cave: Cave, visited: Cave[]): Cave[][] {
  visited.push(cave)
  
  if (cave.name == "end") {
    return [visited]
  }

  let canVisit = cave.links.filter(c => c.isBig || visited.find(v => c.equals(v)) == null)

  if (canVisit.length == 0) {
    return []
  }

  let result: Cave[][] = []
  for (let visit of canVisit.map(c => traverse(c, [...visited]))) {
    if (visit.length > 0) {
      result.push(...visit)
    }
  }

  return result
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let caves = new Map<string, Cave>()
  for (let line of input) {
    let [cave1s, cave2s] = line.split("-")
    let cave1 = getOrCreate(cave1s, caves)
    let cave2 = getOrCreate(cave2s, caves)

    cave1.addLink(cave2)
    cave2.addLink(cave1)
  }

  // console.log(caves)
  var start = caves.get("start")!
  var result = traverse(start, [])

  console.log(result.map(list => list.map(cave => cave.name).join(",")))

  return result.length
}

function traverse2(cave: Cave, visited: Cave[], twice: boolean): Cave[][] {
  visited.push(cave)
  
  if (cave.name == "end") {
    return [visited]
  }

  let result: Cave[][] = []

  // verify
  let canVisit = cave.links.filter(c => c.isBig || visited.find(v => c.equals(v)) == null)
  if (canVisit.length == 0 && twice) {
    return []
  }

  if (twice == false) {
    let doubleVisit = cave.links.filter(c => 
      c.name != "start" && c.name != "end" && !c.isBig && visited.find(v => v.equals(c)))

    if (canVisit.length == 0 && doubleVisit.length == 0) {
      return []
    }
  }

  // travel
  for (let visit of canVisit.map(c => traverse2(c, [...visited], twice))) {
    if (visit.length > 0) {
      result.push(...visit)
    }
  }

  if (twice == false) {
    let doubleVisit = cave.links.filter(c => 
      c.name != "start" && c.name != "end" && !c.isBig && visited.find(v => v.equals(c)))

    if (doubleVisit.length > 0) {
      for (let visit of doubleVisit.map(c => traverse2(c, [...visited], true))) {
        if (visit.length > 0) {
          result.push(...visit)
        }
      }
    }
  }

  return result
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let caves = new Map<string, Cave>()
  for (let line of input) {
    let [cave1s, cave2s] = line.split("-")
    let cave1 = getOrCreate(cave1s, caves)
    let cave2 = getOrCreate(cave2s, caves)

    cave1.addLink(cave2)
    cave2.addLink(cave1)
  }

  // console.log(caves)
  var start = caves.get("start")!
  var result = traverse2(start, [], false)

  console.log(result.map(list => list.map(cave => cave.name).join(",")).sort())

  return result.length
}

run({
  onlyTests: false,
  part1: {
    tests: [
      { input: `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
      `, expected: 10 }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
      `, expected: 36 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
