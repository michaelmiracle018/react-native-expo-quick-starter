export function truncateString(str: string, maxLength: number = 15): string {
  return str?.length > maxLength ? str.slice(0, maxLength) + '...' : str
}
