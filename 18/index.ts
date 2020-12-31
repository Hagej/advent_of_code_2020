import { readFileSync } from "fs";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file.split("\n").map((r) => {
    return r;
  });

  rows.map((r, index) => {
    let starts: number[] = [];
    let ends: number[] = [];
    const chars = r.replace(/\s+/g, "").split("");

    chars.forEach((c, index) => {
      if (c === "(") {
        starts.push(index);
      }
      if (c === ")") {
        ends.push(index);
      }
    });
    while (ends.length > 0 && starts.length > 0) {
      const end = ends.shift() || 0;
      let start = 0;
      let index = 0;
      starts.forEach((s, i) => {
        if (s < end) {
          start = s;
          index = i;
        }
      });

      starts.splice(index, 1);
      const diff = end - start;

      chars.splice(start, diff + 1, "" + calc(chars.slice(start + 1, end)));
      starts = starts.map((s) => {
        return s > end ? s - diff : s;
      });
      ends = ends.map((e) => {
        return e > end ? e - diff : e;
      });
    }
    result += calc(chars);
  });

  console.log(result);
}

const operators = ["+", "*"] as const;
type Operator = typeof operators[number];

function calc(values: string[]) {
  let result = parseInt(values.shift() || "0");
  while (values.length >= 2) {
    const op = values.shift() as Operator;
    const val = parseInt(values.shift() || "0");
    result = performOperation(result, op, val);
  }

  return result;
}

function performOperation(val1: number, operator: Operator, val2: number) {
  if (operator === "+") return val1 + val2;
  return val1 * val2;
}

main();
