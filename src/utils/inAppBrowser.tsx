import {Linking} from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import Colors from '~/constants/Colors'

export function useOpenLink() {
  const openLink = React.useCallback(
    ({url, urlType}: {url: string; urlType: string}) => {
      if (urlType === 'in_app_browser') {
        WebBrowser.openBrowserAsync(url, {
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
          toolbarColor: Colors.primary,
          createTask: false,
          enableDefaultShareMenuItem: false,
          showTitle: false,
        })
        return
      }
      if (urlType === 'link') {
        Linking.openURL(url)
        return
      }
    },
    [],
  )
  return openLink
}
