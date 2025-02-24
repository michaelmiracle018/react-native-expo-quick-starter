export function checkIsNumber(str: any) {
  var pattern = /^(\d*\.?\d*)$/.test(str) && str !== '.'
  return pattern // returns a boolean
}
