/* eslint-disable react-hooks/rules-of-hooks */
import {Toast} from 'react-native-toast-notifications'

export function displayErrorMessage(error: any) {
  const errorMessage = error?.response?.data?.message

  Toast.hideAll()
  if (errorMessage === 'Invalid token') {
    return
  }
  if (error?.message.includes('Network Error')) {
    Toast.show(`An error occurred, please try again!`, {
      type: 'custom_toast_without_title',
      animationDuration: 300,
      normalColor: 'error',
      placement: 'bottom',
    })
  } else {
    Toast.show(`${errorMessage}`, {
      type: 'custom_toast_without_title',
      animationDuration: 300,
      normalColor: 'error',
      placement: 'bottom',
    })
  }
}
