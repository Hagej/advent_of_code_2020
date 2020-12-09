import { readFileSync } from "fs";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const groups = file.split("\n\n").map((r) => {
    return r;
  });

  groups.map((r, index) => {
    const answers = r.split("\n");

    const uniques = new Set<string>();
    answers.map((ans, index) => {
      const person = ans.split("");
      if (index === 0) {
        person.forEach((a) => uniques.add(a));
      } else {
        uniques.forEach((a) => {
          if (!person.includes(a)) uniques.delete(a);
        });
      }
    });
    result += uniques.size;
  });

  console.log(result);
}

main();
