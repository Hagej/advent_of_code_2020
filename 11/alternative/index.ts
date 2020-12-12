import { readFileSync } from "fs";

async function main() {
  let result = 0;
  const file = readFileSync("../input.txt", "utf-8");
  let rows = file.split("\n").map((r) => {
    return r.split("");
  });

  while (true) {
    const newMap: Array<string[]> = [...rows.map((r) => [...r])];
    rows.map((r, index) => {
      for (let i = 0; i < r.length; i++) {
        const curSeat = getSeat(index, i);
        if (curSeat === ".") {
          continue;
        }
        let occupied = calcOccupied(index, i);
        if (curSeat === "#" && occupied >= 5) {
          newMap[index][i] = "L";
          continue;
        }
        if (curSeat === "L" && occupied === 0) {
          newMap[index][i] = "#";
          continue;
        }
      }
    });
    if (JSON.stringify(newMap) === JSON.stringify(rows)) break;

    rows = [...newMap.map((m) => [...m])];
  }

  function getSeat(row: number, column: number): string | undefined {
    const r = rows[row];
    return r ? r[column] : undefined;
  }

  function calcOccupied(startRow: number, startColumn: number) {
    let bools: (boolean | undefined)[] = [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ];
    let i = 1;
    while (bools.some((b) => typeof b !== "boolean")) {
      const TL = rows[startRow - i]
        ? rows[startRow - i][startColumn - i]
        : undefined;
      const T = rows[startRow - i]
        ? rows[startRow - i][startColumn]
        : undefined;
      const TR = rows[startRow - i]
        ? rows[startRow - i][startColumn + i]
        : undefined;
      const ML = rows[startRow] ? rows[startRow][startColumn - i] : undefined;
      const MR = rows[startRow] ? rows[startRow][startColumn + i] : undefined;
      const DL = rows[startRow + i]
        ? rows[startRow + i][startColumn - i]
        : undefined;
      const D = rows[startRow + i]
        ? rows[startRow + i][startColumn]
        : undefined;
      const DR = rows[startRow + i]
        ? rows[startRow + i][startColumn + i]
        : undefined;
      const positions = [TL, T, TR, ML, MR, DL, D, DR];

      bools = positions.map((p, index) => {
        if (typeof bools[index] === "boolean") return bools[index];
        if (p === "#") {
          return true;
        } else if (p === "L") {
          return false;
        } else if (p === ".") {
          return undefined;
        }
        return bools[index] || false;
      });
      i++;
    }
    return bools.reduce((total, b) => (b ? total + 1 : total), 0);
  }

  result = rows.reduce(
    (total, r) =>
      total + r.reduce((sum, c) => (c === "#" ? sum + 1 : sum + 0), 0),
    0
  );

  console.log(result);
}

main();
