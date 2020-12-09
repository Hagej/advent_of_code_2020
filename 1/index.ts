import { readFileSync } from "fs";

export function main() {
  const text = readFileSync(process.argv[2], "utf-8");
  const values = text.split("\n");
  const ints = values.map((v) => parseInt(v));
  for (let i = 0; i < ints.length; i++) {
    for (let j = i + 1; j < ints.length; j++) {
      for (let k = j + 1; k < ints.length; k++) {
        if (ints[i] + ints[j] + ints[k] === 2020) {
          console.log(ints[i] * ints[j] * ints[k]);
        }
      }
    }
  }
}

main();
