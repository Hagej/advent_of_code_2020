import { readFileSync } from "fs";
import { sum } from "../utils";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file.split("\n").map((r) => {
    return parseInt(r);
  });

  let weakness = 0;
  // Part 1
  for (let i = 25; i < rows.length; i++) {
    if (!containsSum(rows.slice(i - 25, i), rows[i])) {
      weakness = rows[i];
      break;
    }
  }

  // Part 2
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 2; j < rows.length; j++) {
      if (sum(rows.slice(i, j)) === weakness) {
        result = Math.min(...rows.slice(i, j)) + Math.max(...rows.slice(i, j));
        break;
      }
    }
  }

  console.log(result);
}

function containsSum(values: number[], target: number) {
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (values[i] + values[j] === target) {
        return true;
      }
    }
  }
}

main();
