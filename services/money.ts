/** Design HOF displays USD with Spanish thousands separators: $1.250. */
export function formatUsd(value: number): string {
  return `$${Math.round(value).toLocaleString("es-ES")}`;
}
