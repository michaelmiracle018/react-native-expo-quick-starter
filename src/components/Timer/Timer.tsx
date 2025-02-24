import {useState, useEffect, memo} from 'react'
import {Text} from '../ui/text'

interface Props {
  timeStamp: string
  timeToStop: number
}

const useTimer = ({timeStamp, timeToStop}: Props) => {
  const targetTime = new Date(timeStamp)
  targetTime.setMinutes(targetTime.getMinutes() + timeToStop) // Add 5 minutes to the target time

  const [timeLeft, setTimeLeft] = useState<number>(
    targetTime.getTime() - new Date().getTime(),
  )

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date().getTime()
      const timeDifference = targetTime.getTime() - currentTime
      if (timeDifference <= 0) {
        clearInterval(timer)
        setTimeLeft(0)
      } else {
        setTimeLeft(timeDifference)
      }
    }, 1000)

    return () => clearInterval(timer) // Cleanup the interval on component unmount
  }, [targetTime])

  const formatTime = (timeInMs: number) => {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60))
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeInMs % (1000 * 60)) / 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  if (timeLeft <= 0) {
    return
  }

  return <Text>{timeLeft > 0 ? formatTime(timeLeft) : null}</Text>
}

export default memo(useTimer)
