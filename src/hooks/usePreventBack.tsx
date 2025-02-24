import {useEffect} from 'react'
import {BackHandler} from 'react-native'

/**
 * usePreventBack - A custom hook to prevent the hardware back button functionality
 * @param preventBack - Boolean indicating whether to prevent back navigation
 */
export const usePreventBack = (preventBack: boolean): void => {
  useEffect(() => {
    const handleBackPress = (): boolean => {
      if (preventBack) {
        // Return true to prevent the back action
        return true
      }
      // Return false to allow default behavior
      return false
    }

    // Add event listener
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    // Cleanup event listener on unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
    }
  }, [preventBack])
}
