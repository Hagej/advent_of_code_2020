import { readFileSync } from "fs";

async function main() {
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file
    .split("\n")
    .map((r) => {
      return parseInt(r);
    })
    .sort((a, b) => a - b);

  let current = 0;

  const indices: number[] = [];

  rows.unshift(0);
  rows.map((r, index) => {
    if (r - current === 3) {
      indices.push(index);
    }
    current = r;
  });
  indices.push(rows.length);

  const arrangements = indices.reduce((total, i, index) => {
    return (
      total *
      arrangeAdapters(
        rows.slice(indices[index - 1] || 0, i),
        0,
        rows[indices[index - 1]] || 0
      )
    );
  }, 1);

  console.log(rows[rows.length - 1]);

  function arrangeAdapters(
    adapters: number[],
    index: number,
    current: number
  ): number {
    if (index >= adapters.length) return 0;
    if (index === adapters.length - 1) return 1;
    if (adapters[index] - current <= 3) {
      return (
        arrangeAdapters(adapters, index + 1, adapters[index]) +
        arrangeAdapters(adapters, index + 2, adapters[index]) +
        arrangeAdapters(adapters, index + 3, adapters[index])
      );
    }
    return 0;
  }

  console.log(arrangements);
}

main();
