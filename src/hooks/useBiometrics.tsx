import * as LocalAuthentication from 'expo-local-authentication'
import {useToast} from 'react-native-toast-notifications'
import {useLingui} from '@lingui/react'
import {t} from '@lingui/macro'
import {isIOS} from '~/lib/platform/detection'

export const useBiometrics = () => {
  const {i18n} = useLingui()
  const toast = useToast()

  // const [availableBiometrics, setAvailableBiometrics] = useState(false)

  const enableBiometricAuth = async (): Promise<boolean> => {
    toast.hideAll()
    try {
      const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync()
      if (!isBiometricAvailable) {
        toast.show(
          t(i18n)`Your device does not support biometric authentication.`,
          {
            animationDuration: 300,
          },
        )
        return false
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t(i18n)`Verify your biometrics`,
        cancelLabel: 'Cancel',
        disableDeviceFallback: isIOS ? false : true,
        biometricsSecurityLevel: 'strong',
      })

      if (result.success) {
        return true
      } else {
        toast.hideAll()
        toast.show(t(i18n)`Authentication cancelled.`, {
          animationDuration: 300,
        })

        return false
      }
    } catch (error) {
      toast.show(
        t(i18n)`An error occurred while enabling biometric authentication.`,
        {
          animationDuration: 300,
        },
      )
      return false
    }
  }

  return {
    enableBiometricAuth,
  }
}
