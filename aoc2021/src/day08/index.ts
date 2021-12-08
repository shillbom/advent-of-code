import run from "aocrunner"
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


//const parseInput = (rawInput: string) => rawInput.split("\n").map(row => row.split("|").map(n => n.split(" ").filter(n => n != "").map(n => n.split("").sort().join(""))))
const parseInput = (rawInput: string) => rawInput.split("\n").map(row => row.split("|").map(n => n.split(" ").filter(n => n != "")))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  var sum = 0;
  for (var line of input) {
    const [indata, outdata] = line;
    let counted =
      outdata.filter(n => 
        n.length == 2 ||
        n.length == 3 ||
        n.length == 4 ||
        n.length == 7)
      
      sum += counted.length;
  }


  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const result = []

  for (let x of input) {
    let joined = x[0].concat(x[1])
    let mapToDigit = new Map<string, string>();
    let mapFromDigit = new Map<string, string>();
    function set(digit: string, value: string) {
      mapToDigit.set(digit, value);
      mapFromDigit.set(value, digit);
    }

    for (let digit of joined) {
      if (digit.length == 2) {
        set(digit, "1");
        continue
      }
      if (digit.length == 3) {
        set(digit, "7");
        continue
      }     
      if (digit.length == 4) {
        set(digit, "4");
        continue
      }      
      if (digit.length == 7) {
        set(digit, "8");
        continue
      }
    }

    // check if a contains all letters in b
    function contains(a: string, b: string | undefined): boolean {
      if (b == null) {
        return false
      }
      for (let char of [...b]) {
        if (a.indexOf(char) == -1) {
          return false
        }
      }
      return true
    }

    // used to detect two
    var magicEight = mapFromDigit.get("8")!
    for (let char of mapFromDigit.get("4")!) {
      magicEight = magicEight.replace(char, "");
    }

    for (let digit of joined) {
      // 2, 3, 5 => 5
      if (digit.length == 5) {
        if (contains(digit, mapFromDigit.get("1"))) {
          set(digit, "3")
          continue;
        }

        if (contains(digit, magicEight)) {
          set(digit, "2")
          continue;
        }

        set(digit, "5")
        continue;
      }

      // 6, 9, 0 => 6
      if (digit.length == 6) {
        if (contains(digit, mapFromDigit.get("4"))) {
          set(digit, "9")
          continue;
        }

        if (contains(digit, mapFromDigit.get("1"))) {
          set(digit, "0")
          continue;
        }

        set(digit, "6")
        continue
      }
    }

    // use map to create output
    var calc = parseInt(x[1].map(n => mapToDigit.get(n)).join(""));
    console.log(x[1].join(" ") + ":", calc)
    result.push(calc)
  }

  console.log(result)
  return result.reduce((acc, f) => acc + f, 0)
}

run({
  onlyTests: false,
  part1: {
    tests: [
      { input: `
      be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
      edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
      fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
      fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
      aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
      fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
      dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
      bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
      egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
      gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
      expected: 26 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
      be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
      edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
      fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
      fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
      aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
      fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
      dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
      bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
      egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
      gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
      expected: 61229 },
      { input: `
      acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`,
      expected: 5353 },
      { input: `
      bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef`,
      expected: 1625 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
