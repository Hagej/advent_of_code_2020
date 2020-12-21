import { readFileSync } from "fs";
import { sum } from "../utils";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file.split("\n").map((r) => r);

  const commands: Array<string | { mem: number; index: number }> = rows.map(
    (r) => {
      const v = r.split(" = ");
      if (v[0] === "mask") {
        return v[1];
      } else {
        return {
          index: parseInt(v[0].substring(4)),
          mem: parseInt(v[1]),
        };
      }
    }
  );

  let mask = "";
  const memory: string[] = [];
  commands.map((r, index) => {
    if (typeof r === "string") {
      mask = r;
    } else {
      memory[r.index] = applyMask(to36bit(r.mem), mask);
    }
  });

  memory.forEach((v, index) => {
    const sumX = findXes(v);
    if (sumX > 0) {
    }
  });

  console.log(memory);

  const results = memory.map((m) => {
    return toInt(m);
  });
  //console.log(results);

  result = sum(results);

  function to36bit(value: number) {
    let result = "";
    for (let i = 35; i >= 0; i--) {
      if (value - Math.pow(2, i) >= 0) {
        value -= Math.pow(2, i);
        result += "1";
      } else {
        result += "0";
      }
    }
    return result;
  }

  function applyMask(value: string, mask: string) {
    if (value.length !== 36 || mask.length !== 36) {
      console.log("Shomethings up with the values!", value, mask);
    }

    let result = value;

    for (let i = 0; i < 36; i++) {
      if (mask.charAt(i) === "1") {
        result = result.substring(0, i) + "1" + result.substring(i + 1);
      } else if (mask.charAt(i) === "X") {
        result = result.substring(0, i) + "X" + result.substring(i + 1);
      }
    }
    return result;
  }

  function toInt(value: string) {
    let result = 0;
    for (let i = 0; i < 36; i++) {
      if (value.charAt(i) === "1") {
        result += Math.pow(2, 35 - i);
      }
    }
    return result;
  }

  function findXes(value: string) {
    return value.split("").reduce((sum, v) => (v === "X" ? sum + 1 : sum), 0);
  }

  function replaceFloats(value: string, replacements: string[]) {
    let result = value;
    replacements.map((r) => {
      result.replace("X", r);
    });
    return result;
  }

  console.log(result);
}

main();
