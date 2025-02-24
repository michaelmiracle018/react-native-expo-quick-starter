import {useEffect, useState} from 'react'

const useWait = (delay = 100) => {
  const [waitValue, setWaitValue] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setWaitValue(true)
    }, delay)

    return () => {
      clearTimeout(id)
    }
  }, [delay])

  return waitValue
}
export default useWait
