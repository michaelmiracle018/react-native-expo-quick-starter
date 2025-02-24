export function isValidPin(pin: string | any): boolean {
  // Check if the PIN is numeric and of valid length (e.g., 6 digits)
  if (!/^\d{6}$/.test(pin)) {
    return false
  }

  // Check for sequential order (ascending or descending)
  const isSequential = (pin: string): boolean => {
    const digits = pin.split('').map(Number)
    const ascending = digits.every(
      (d, i, arr) => i === 0 || d === arr[i - 1] + 1,
    )
    const descending = digits.every(
      (d, i, arr) => i === 0 || d === arr[i - 1] - 1,
    )
    return ascending || descending
  }

  if (isSequential(pin)) {
    return false
  }

  // Check if any number appears more than 2 times
  const countOccurrences = (pin: string | any): boolean => {
    const frequency: {[key: string]: number} = {}
    for (const digit of pin) {
      frequency[digit] = (frequency[digit] || 0) + 1
      if (frequency[digit] > 2) {
        return true
      }
    }
    return false
  }

  if (countOccurrences(pin)) {
    return false
  }

  // If all checks pass, the PIN is valid
  return true
}

export const isPinValid = (pin: string): boolean => {
  // Check if PIN length is less than 6 or not a number
  if (pin.length !== 6 || !/^\d+$/.test(pin)) return false

  // Check for sequential order (e.g., 123456)
  const isSequential = pin === pin.split('').sort().join('')

  // Check for reverse sequential order (e.g., 987654)
  const isReverseSequential = pin === pin.split('').sort().reverse().join('')

  // Check if any number appears more than twice
  const numFrequency = pin
    .split('')
    .reduce<Record<string, number>>((acc, digit) => {
      acc[digit] = (acc[digit] || 0) + 1
      return acc
    }, {})
  const hasTooManyRepeats = Object.values(numFrequency).some(count => count > 2)

  return !isSequential && !isReverseSequential && !hasTooManyRepeats
}
