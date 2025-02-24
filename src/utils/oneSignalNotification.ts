import {OneSignal, LogLevel} from 'react-native-onesignal'
import Constants from 'expo-constants'

type OneSignalProps = {
  userId: string
  emailId: string
}

export function oneSignalNotify({userId, emailId}: OneSignalProps) {
  // ? REGISTER NOTIFICATION FOR USER
  // ! THIS THROW ERROR ON DEVELOPMENT BUT NOT PRODUCTION, SO DON'T WORRY ABOUT IT
  OneSignal.Debug.setLogLevel(LogLevel.Verbose)
  OneSignal.initialize(Constants?.expoConfig?.extra?.oneSignalAppId)
  OneSignal.InAppMessages.setPaused(false)
  OneSignal.login(userId)
  OneSignal.User.addEmail(emailId)
  // ? Also need to enable notifications to complete OneSignal setup
  // ! THIS THROW ERROR ON DEVELOPMENT BUT NOT PRODUCTION, SO DON'T WORRY ABOUT IT
  OneSignal.Notifications.requestPermission(true)
}
