import { readFileSync } from "fs";
import { rootCertificates } from "tls";
import { hasJSDocParameterTags } from "typescript";
import { strArrayCombine } from "../utils";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const [rules, messages] = file.split("\n\n").map((r) => {
    return r.split("\n");
  });

  const ruleMapping: Record<number, string | number[][]> = rules.reduce(
    (prev, val) => {
      const [i, rule] = val.split(": ");
      let value: number[][] | string;
      if (!isNaN(parseInt(rule))) {
        const ruleValues = rule.split(" | ");
        value = ruleValues.map((r) => r.split(" ").map((ri) => parseInt(ri)));
      } else {
        value = rule.replace(/"/g, "");
      }
      return { ...prev, [parseInt(i)]: value };
    },
    {}
  );

  const permutations = getValidPermutations(0);

  result = messages.reduce(
    (sum, m) => (permutations.includes(m) ? sum + 1 : sum),
    0
  );

  function getValidPermutations(index: number): string[] {
    const cur = ruleMapping[index];
    if (typeof cur === "string") {
      return [cur];
    }
    return cur
      .map((c) => {
        return c.reduce(
          (acu, num) => strArrayCombine(acu, getValidPermutations(num)),
          [""]
        );
      })
      .reduce((prev, val) => prev.concat(val), []);
  }
  console.log(result);
}

main();
