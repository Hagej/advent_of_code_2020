export class Graph {
  adjList: Array<{ from: string; to: string; weight: number }> = [];

  constructor(values?: Array<{ from: string; to: string; weight: number }>) {
    if (values) {
      this.adjList = [...values];
    }
  }

  addEdge(from: string, to: string, weight: number) {
    this.adjList.push({ from, to, weight });
  }

  getChildren(value: string): { child: string; weight: number }[] {
    return this.adjList
      .filter((a) => a.from === value)
      .map((a) => ({ child: a.to, weight: a.weight }));
  }

  getParents(value: string): { parent: string; weight: number }[] {
    return this.adjList
      .filter((a) => a.to === value)
      .map((a) => ({ parent: a.from, weight: a.weight }));
  }
}
