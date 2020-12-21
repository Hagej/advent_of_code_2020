import { readFileSync } from "fs";

async function main() {
  let result = 0;

  const numbersSpoken: Map<number, number> = new Map();
  let latestNumber = 0;
  if (process.argv[2] === "input.txt") {
    numbersSpoken.set(18, 1);
    numbersSpoken.set(11, 2);
    numbersSpoken.set(9, 3);
    numbersSpoken.set(0, 4);
    numbersSpoken.set(5, 5);
    numbersSpoken.set(1, 6);
  } else {
    numbersSpoken.set(0, 1);
    numbersSpoken.set(3, 2);
    numbersSpoken.set(6, 3);
  }

  for (let i = numbersSpoken.size + 1; i < 30000000; i++) {
    const latestTurn = numbersSpoken.get(latestNumber);
    const diff: number | undefined = latestTurn ? i - latestTurn : undefined;
    // console.log(diff, latestNumber, i, numbersSpoken[latestNumber]);
    numbersSpoken.set(latestNumber, i);
    latestNumber = diff ? diff : 0;
  }

  console.log(latestNumber);
}

main();
