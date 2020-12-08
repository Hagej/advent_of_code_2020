import { readFileSync } from "fs";

async function main() {
  const file = readFileSync("input.txt", "utf-8");
  const rows = file.split("\n").map((r, index) => {
    if (index === 523) {
      return "nop -153";
    }
    return r;
  });

  let accumulator = 0;

  const linesRun: number[] = [];
  let index = 0;
  let changed = false;
  while (!linesRun.includes(index)) {
    if (index === rows.length) {
      console.log("Program terminated successfully");
      break;
    }
    linesRun.push(index);
    const values = rows[index].split(" ");
    const operation = values[0];
    const value = parseInt(values[1]);
    console.log(operation, value, index);
    if (operation === "acc") {
      accumulator += value;
      index++;
    }
    if (operation === "nop") {
      if (!changed && runProgram(value + index, rows)) {
        console.log("changed nop to jmp");
        index += value;
        changed = true;
        continue;
      }
      index++;
    }
    if (operation === "jmp") {
      if (!changed && runProgram(index + 1, rows)) {
        console.log("changed jmp to nop");
        index++;
        changed = true;
        continue;
      }
      index += value;
    }
  }

  console.log("Index:", index);
  console.log(accumulator);
}

function runProgram(startIndex: number, commands: string[]) {
  const linesRun: number[] = [];
  let index = startIndex;
  while (!linesRun.includes(index)) {
    if (index === commands.length) {
      console.log("Program terminated successfully");
      return true;
    }
    linesRun.push(index);
    const values = commands[index].split(" ");
    const operation = values[0];
    const value = parseInt(values[1]);
    if (operation === "acc") {
      index++;
    }
    if (operation === "nop") {
      index++;
    }
    if (operation === "jmp") {
      index += value;
    }
  }
  return false;
}

main();
