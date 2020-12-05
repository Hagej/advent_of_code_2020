export function strArrayCombine(a: string[], b: (number | string)[]): string[] {
  const result = [];
  for (const aVal of a) {
    for (const bVal of b) {
      result.push(aVal + bVal);
    }
  }
  return result;
}

export function numArrayCombine(a: number[], b: number[]) {
  const result = [];
  for (const aVal of a) {
    for (const bVal of b) {
      result.push(aVal + bVal);
    }
  }
  return result;
}
