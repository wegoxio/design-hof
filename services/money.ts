/** Design HOF displays USD with Spanish thousands separators: $1.250. */
export function formatUsd(value: number): string {
  const integer = Math.round(value).toString();
  return `$${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}
