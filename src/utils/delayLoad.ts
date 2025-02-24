export const delayLoad = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
