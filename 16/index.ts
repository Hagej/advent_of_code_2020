import { readFileSync } from "fs";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file.split("\n\n").map((r) => {
    return r;
  });

  const fields = rows[0]
    .split("\n")
    .reduce((prev: Record<string, Array<{ from: number; to: number }>>, r) => {
      const [field, rangeText] = r.split(": ");
      const rangeValues = rangeText.split(" or ");
      const ranges = rangeValues.map((rv) => {
        const [from, to] = rv.split("-");
        return { from: parseInt(from), to: parseInt(to) };
      });
      return { ...prev, [field]: ranges } as Record<
        string,
        Array<{ from: number; to: number }>
      >;
    }, {});

  const yourTicket = rows[1]
    .split("\n")[1]
    .split(",")
    .map((v) => parseInt(v));

  const otherTickets = rows[2]
    .split("\n")
    .slice(1)
    .map((v) => {
      return v.split(",").map((s) => parseInt(s));
    });

  let errorRate = 0;

  const ranges = Object.values(fields).reduce((prev, v) => [...prev, ...v], []);

  otherTickets.map((t) => {
    t.forEach((v) => {
      if (ranges.every((r) => v < r.from || v > r.to)) {
        errorRate += v;
      }
    });
  });

  console.log(errorRate);
}

main();
