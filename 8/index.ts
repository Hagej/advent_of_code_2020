import { readFileSync } from "fs";

async function main() {
  const file = readFileSync(process.argv[2], "utf-8");
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
      break;
    }
    linesRun.push(index);
    const values = rows[index].split(" ");
    const operation = values[0];
    const value = parseInt(values[1]);
    if (operation === "acc") {
      accumulator += value;
      index++;
    }
    if (operation === "nop") {
      if (!changed && runProgram(value + index, rows)) {
        index += value;
        changed = true;
        continue;
      }
      index++;
    }
    if (operation === "jmp") {
      if (!changed && runProgram(index + 1, rows)) {
        index++;
        changed = true;
        continue;
      }
      index += value;
    }
  }

  console.log(accumulator);
}

function runProgram(startIndex: number, commands: string[]) {
  const linesRun: number[] = [];
  let index = startIndex;
  while (!linesRun.includes(index)) {
    if (index === commands.length) {
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
