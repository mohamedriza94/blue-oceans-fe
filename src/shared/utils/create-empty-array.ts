export function createEmptyArray(size: number, value: any = null): any[] {
  return new Array(size).fill(value);
}
