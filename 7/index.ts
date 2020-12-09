import { readFileSync } from "fs";

let bagMapping: Record<
  string,
  { bag: string; amount: number }[] | undefined
> = {};
async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file.split("\n").map((r) => {
    let row = r.replace(/ bag[s]{0,1}[.]{0,1}/gi, "");
    return row;
  });

  rows.map((r, index) => {
    const data = containsBags(r);
    bagMapping = { ...bagMapping, [data[0]]: data[1] };
  });

  result = bagAmount("shiny gold");

  console.log(result);
}

function bagAmount(name: string): number {
  const bag = bagMapping[name];
  if (bag) {
    let sum = 0;
    bag.forEach((b) => {
      sum += b.amount * (1 + bagAmount(b.bag));
    });
    return sum;
  }
  return 0;
}

function containsBags(
  bagRule: string
): [string, { bag: string; amount: number }[] | undefined] {
  const values = bagRule.split(" contain ");
  const bag = values[0];
  const contains = values[1].split(", ");
  let bags;
  if (contains[0] === "no other") bags = undefined;
  else {
    bags = contains.map((c) => {
      return {
        amount: parseInt(c),
        bag: c.substring(2),
      };
    });
  }

  return [bag, bags];
}

function containsBag(needle: string, hayStack: string): boolean {
  const bag = bagMapping[hayStack];
  if (bag) {
    const bags = bag.map((b) => b.bag);
    if (bags.includes(needle)) {
      return true;
    } else {
      return bags.some((b) => containsBag(needle, b));
    }
  }
  return false;
}

main();
