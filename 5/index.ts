import { readFileSync } from "fs";

async function main() {
  let result = 0;
  const file = readFileSync("input.txt", "utf-8");
  const rows = file.split("\n").map((r) => {
    return r;
  });

  const seats: Array<number[]> = [];
  rows.map((r, index) => {
    const seatNum = getSeat(r);
    seats.push(seatNum);

    result = Math.max(result, seatNum[0] + seatNum[1] * 8);
  });

  const sortedSeats = seats.sort(
    (a, b) => parseInt("" + a[1] + a[0]) - parseInt("" + b[1] + b[0])
  );
  console.log(sortedSeats);

  const seatIds = seats.map((s) => s[0] + s[1] * 8);
  const sorted = seatIds.sort((a, b) => a - b);

  const mySeat = sorted.find((s, index) => {
    if (index !== 0 || index !== seats.length - 1) {
      if (sorted[index + 1] !== s + 1) {
        result = s + 1;
        return s;
      }
    }
  });

  console.log(result);
}

function getSeat(val: string) {
  let columnLb = 0;
  let columnHb = 7;
  let rowLb = 0;
  let rowHb = 127;
  for (const c of val.split("")) {
    if (c === "F") {
      rowHb = Math.floor((rowHb + rowLb) / 2);
    }
    if (c === "B") {
      rowLb = Math.ceil((rowHb + rowLb) / 2);
    }
    if (c === "R") {
      columnLb = Math.ceil((columnHb + columnLb) / 2);
    }
    if (c === "L") {
      columnHb = Math.floor((columnHb + columnLb) / 2);
    }
  }
  return [columnLb, rowLb];
}

main();
