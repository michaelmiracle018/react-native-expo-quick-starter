import {useMemo, useState} from 'react'
import {getDataFromStorage} from '../utils/storageData'

export default function useFetchUserFromStorage(key: any) {
  const [storedData, setFormData] = useState(null)
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const fetchStoredData = async () => {
    try {
      setIsLoadingUser(true)
      const data = await getDataFromStorage(key)
      if (data) {
        setFormData(data)
        setIsLoadingUser(false)
      }
    } catch (error) {
      return error
    }
  }
  useMemo(() => {
    fetchStoredData()
  }, [])

  return {storedData, isLoadingUser} as any
}
