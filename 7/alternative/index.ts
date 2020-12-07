import { readFileSync } from "fs";
import {
  Graph,
  numArrayCombine,
  strArrayCombine,
  strArrayCompare,
  strArrayEquals,
} from "../../utils";

async function main() {
  let result = 0;
  const file = readFileSync("../input.txt", "utf-8");
  const rows = file.split("\n").map((r) => {
    let row = r.replace(/ bag[s]{0,1}[.]{0,1}/gi, "");
    return row;
  });

  const graph = new Graph();

  rows.map((r, index) => {
    const values = r.split(" contain ");
    const contains = values[1].split(", ");
    contains.forEach((c) => {
      if (c !== "no other") {
        graph.addEdge(values[0], c.substring(2), parseInt(c));
      }
    });
  });

  result = new Set([...containedIn(graph, "shiny gold")]).size - 1;

  console.log("Part A:", result);

  result = containsAmount(graph, "shiny gold");
  console.log("Part B:", result);
}

function containedIn(graph: Graph, target: string): string[] {
  const contained = graph.getParents(target);
  if (contained.length > 0) {
    return contained.reduce(
      (prev, c) => [...prev, ...containedIn(graph, c.parent), target],
      []
    );
  }
  return [target];
}

function containsAmount(graph: Graph, target: string): number {
  const contains = graph.getChildren(target);

  console.log(contains);
  let sum = 0;
  contains.forEach((c) => {
    sum += c.weight * (1 + containsAmount(graph, c.child));
  });
  return sum;
}

main();
