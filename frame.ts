import { readFileSync } from "fs";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file.split("\n").map((r) => {
    return r;
  });

  rows.map((r, index) => {});

  console.log(result);
}

main();
