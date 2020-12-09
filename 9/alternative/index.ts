import { readFileSync } from "fs";
import { sum, numArrayCombinations } from "../../utils";

async function main() {
  let result = 0;
  const file = readFileSync("../input.txt", "utf-8");
  const rows = file.split("\n").map((r) => {
    return parseInt(r);
  });

  let weakness = 0;
  // Part 1
  for (let i = 25; i < rows.length; i++) {
    if (!numArrayCombinations(rows.slice(i - 25, i)).includes(rows[i])) {
      weakness = rows[i];
      console.log("FOUND WEAKNESS ON INDEX", i);
      console.log("===== VALUE:", weakness, "=====");
      console.log("");
      break;
    }
  }

  // Part 2
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 2; j < rows.length; j++) {
      if (sum(rows.slice(i, j)) === weakness) {
        console.log("FOUND ENCRYPTION WEAKNESS");
        result = Math.min(...rows.slice(i, j)) + Math.max(...rows.slice(i, j));
        console.log("===== VALUE", result, "=====");
        break;
      }
    }
  }
}

main();
