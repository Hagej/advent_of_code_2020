import { readFileSync } from "fs";

const width = 32;

async function main() {
  const file = readFileSync("input.txt", "utf-8");
  const values = file.split("\n");
  let result = 1;

  result *= traverseSlope(values, 1, 1);
  result *= traverseSlope(values, 3, 1);
  result *= traverseSlope(values, 5, 1);
  result *= traverseSlope(values, 7, 1);
  result *= traverseSlope(values, 1, 2);

  console.log("Result:", result);
}

function traverseSlope(values: string[], right: number, down: number) {
  let index = 0;
  let trees = 0;
  for (let i = 0; i < values.length; i += down) {
    if (values[i].charAt(index % (width - 1)) === "#") trees++;
    index += right;
  }
  return trees;
}

main();
