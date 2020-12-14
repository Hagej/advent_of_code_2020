export function sum(a: number[]) {
  return a.reduce((sum, cur) => sum + cur, 0);
}

export function product(a: number[]) {
  return a.reduce((sum, cur) => sum * cur, 1);
}
