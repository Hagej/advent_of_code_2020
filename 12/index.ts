import { readFileSync } from "fs";

async function main() {
  let result = 0;
  const file = readFileSync(process.argv[2], "utf-8");
  const rows = file.split("\n").map((r) => {
    return { instruction: r.charAt(0), value: parseInt(r.substring(1)) };
  });

  const Directions = ["E", "S", "W", "N"] as const;
  type Direction = typeof Directions[number];

  const Quadrants = ["NE", "SE", "SW", "NW"] as const;
  type Quadrant = typeof Quadrants[number];
  const quadToInts: Record<Quadrant, [number, number]> = {
    NE: [1, 1],
    SE: [1, -1],
    SW: [-1, -1],
    NW: [-1, 1],
  };

  let sx = 0;
  let sy = 0;

  let wx = 10;
  let wy = 1;

  function moveShip(amplitude: number) {
    sx += wx * amplitude;
    sy += wy * amplitude;
  }

  function moveWaypoint(direction: Direction, value: number) {
    if (direction === "E") wx += value;
    if (direction === "N") wy += value;
    if (direction === "S") wy -= value;
    if (direction === "W") wx -= value;
  }

  function rotateWaypoint(direction: "L" | "R", value: number) {
    const steps = value / 90;

    let quadrant = getQuadrant(wx, wy);
    if (steps === 1 || steps === 3) {
      const temp = wx;
      wx = wy;
      wy = temp;
    }
    const i = Quadrants.findIndex((q) => q === quadrant);
    const step = direction === "L" ? i - steps : i + steps;
    quadrant = Quadrants[step < 0 ? 4 + step : step % 4];
    wx = Math.abs(wx) * quadToInts[quadrant][0];
    wy = Math.abs(wy) * quadToInts[quadrant][1];
  }

  function getQuadrant(x: number, y: number): Quadrant {
    let result = "";
    result += y >= 0 ? "N" : "S";
    result += x >= 0 ? "E" : "W";
    return result as Quadrant;
  }

  rows.map(({ instruction, value }, index) => {
    if (instruction === "F") {
      moveShip(value);
    } else if (instruction === "R" || instruction === "L") {
      rotateWaypoint(instruction, value);
    } else {
      moveWaypoint(instruction as Direction, value);
    }
  });

  result = Math.abs(sx) + Math.abs(sy);

  console.log(result);
}

main();
