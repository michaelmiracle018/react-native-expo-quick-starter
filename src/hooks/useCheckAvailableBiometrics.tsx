import * as LocalAuthentication from 'expo-local-authentication'
import {useLingui} from '@lingui/react'
import {useToast} from 'react-native-toast-notifications'
import {t} from '@lingui/macro'

export function useCheckAvailableBiometrics() {
  const {i18n} = useLingui()
  const toast = useToast()

  const checkAvailableBiometrics = async () => {
    toast.hideAll()
    try {
      const savedBiometric = await LocalAuthentication.isEnrolledAsync()
      if (!savedBiometric) {
        toast.show(
          t(
            i18n,
          )`No biometric records found. Enable one in your phone settings`,
          {
            animationDuration: 300,
          },
        )
        return
      }
      return savedBiometric
    } catch (error) {
      toast.show(t(i18n)`An error occured`, {
        animationDuration: 300,
      })
    }
  }

  return {checkAvailableBiometrics}
}
