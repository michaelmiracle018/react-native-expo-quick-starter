export function responseToBooleanForObject(obj: any, requiredKeys = [] as any) {
  // Check if obj is undefined or not an object
  if (!obj || typeof obj !== 'object') {
    return false
  }

  // Check if the object is empty
  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return false // return false for an empty object
  }

  // Check the length and presence of required keys
  const hasAllKeys = requiredKeys.every((key: any) => obj.hasOwnProperty(key))

  return Object.keys(obj).length > 0 && hasAllKeys
}
