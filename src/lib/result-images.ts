export function getResultImagePath(code: string) {
  return `/results/${code.toUpperCase()}.png`;
}
