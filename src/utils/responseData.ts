export function responseInfo(response: any) {
  if (Object.keys(response ?? {}).length) {
    return response
  }
  return undefined
}

export function responseToBoolean(response: any) {
  if (Object.keys(response ?? {}).length) {
    return true
  } else {
    return false
  }
}
