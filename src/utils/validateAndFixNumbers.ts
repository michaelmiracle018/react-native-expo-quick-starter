export function validateAndFixNumbers(
  input: string | number | undefined,
): string | number | boolean {
  // Convert the input to a string for validation
  let value = String(input)

  // Check if the value contains only valid numeric characters
  if (!/^\d*\.?\d*$/.test(value)) {
    return false // Invalid value
  }

  // Prevent more than one dot
  const dotCount = (value.match(/\./g) || []).length
  if (dotCount > 1) {
    return false // Invalid value
  }

  // Remove trailing dot, if any
  if (value.endsWith('.')) {
    value = value.slice(0, -1)
  }

  // Convert back to a number if it is purely numeric
  return value.includes('.') ? value : Number(value)
}
