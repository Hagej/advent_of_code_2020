import { createReadStream } from "fs";
import { createInterface } from "readline";

async function main() {
  const file = createReadStream("input.txt", "utf-8");
  const rl = createInterface({
    input: file,
    crlfDelay: Infinity,
  });
  let result = 0;
  for await (const line of rl) {
    const words = line.split(" ");
    const indices = words[0].split("-");
    const start = parseInt(indices[0]);
    const end = parseInt(indices[1]);
    const char = words[1].charAt(0);

    if (
      (words[2].charAt(start - 1) === char ||
        words[2].charAt(end - 1) == char) &&
      words[2].charAt(start - 1) !== words[2].charAt(end - 1)
    ) {
      result++;
    }
  }
  console.log(result);
}

main();
