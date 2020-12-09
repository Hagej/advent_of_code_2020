import { readFileSync } from "fs";

async function main() {
  const file = readFileSync(process.argv[2], "utf-8");
  const values = file.split("\n");
  const width = values[0].length;
  let result = 1;

  function traverseSlope(values: string[], right: number, down: number) {
    let index = 0;
    let trees = 0;
    for (let i = 0; i < values.length; i += down) {
      if (values[i].charAt(index % width) === "#") trees++;
      index += right;
    }
    return trees;
  }

  result *= traverseSlope(values, 1, 1);
  result *= traverseSlope(values, 3, 1);
  result *= traverseSlope(values, 5, 1);
  result *= traverseSlope(values, 7, 1);
  result *= traverseSlope(values, 1, 2);

  console.log(result);
}

main();
