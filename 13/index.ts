import { readFileSync } from "fs";
import { product } from "../utils";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file.split("\n").map((r) => {
    return r;
  });

  //const earliestDepart = parseInt(rows[0]);
  const busses: Array<number | string> = rows[1]
    .split(",")
    .map((b) => (!isNaN(parseInt(b)) ? parseInt(b) : b));

  // const soonest: { timeToWait: number; id: number } = {
  //   timeToWait: Infinity,
  //   id: 0,
  // };

  // busses.map((b, index) => {
  //   if (typeof b === "number") {
  //     let cur = 0;
  //     while (cur < earliestDepart) {
  //       cur += b;
  //     }
  //     if (cur - earliestDepart < soonest.timeToWait) {
  //       soonest.timeToWait = cur - earliestDepart;
  //       soonest.id = b;
  //     }
  //   }
  // });

  const times = busses
    .map((b, index) => {
      if (typeof b === "number") {
        return { time: b, offset: index };
      }
      return undefined;
    })
    .filter((b) => !!b) as { time: number; offset: number }[];

  console.log(times);

  let time = times[0].time;
  const biggest = times.reduce(
    (prev, cur) => (cur.time > prev.time ? cur : prev),
    { time: 0, offset: 0 }
  );
  let multiplier = 1;
  while (time * multiplier + time < biggest.time) {
    multiplier++;
  }
  let mul = multiplier;
  let i = 1;
  let startTime = 0;
  while (true) {
    startTime += time * mul;
    while (startTime < biggest.time * i - biggest.offset) {
      // console.log(startTime, biggest.time * i);
      startTime += time;
    }
    i++;
    if (times.every((v) => ((time + v.offset) / v.time) % 1 === 0)) break;
  }
  // while (time * multiplier * 1 - biggest.time * i !== biggest.offset) {
  //   console.log(time, biggest, mul, i, time * mul - biggest.time * i);
  //   i++;
  // }

  // i = 1;
  // while (times.some((v) => ((time + v.offset) / v.time) % 1 !== 0)) {
  //   time = times[0].time * mul * i;
  //   i++;
  //   // if (time > 80000000000000) {
  //   //   console.log(time);
  //   // }
  // }

  function getPrimeFactors(n: number) {
    const factors = [];
    let divisor = 2;

    console.log(n);
    while (n >= 2) {
      if (n % divisor === 0) {
        factors.push(divisor);
        n /= divisor;
      } else {
        divisor++;
      }
    }
    console.log(factors);
    return factors.sort((a, b) => b - a);
  }

  console.log(time);
}

main();
