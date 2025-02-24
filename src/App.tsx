import {enableFreeze} from 'react-native-screens'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import {StatusBar} from 'expo-status-bar'
import '../global.css'
import {store} from './reduxStore/store'
import {Provider} from 'react-redux'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Splash from './lib/Splash'
import React from 'react'
import {QueryProvider} from './query-data/react-query'
import Toastify from './components/Toast/Toastify'
import {Provider as LanguageProvider} from './context/languageSelector'
import I18nProvider from './languages/i18nProvider'

import {Provider as PortalProvider} from './bottomSheetModals/Portal'
import {BottomSheetProvider} from './bottomSheetModals/BottomSheetPortal'
import {ModalsContainer} from './bottomSheetModals/Modal'
import {Provider as ModalStateProvider} from './context/BottomModal'
import {Provider as DetachModalStateProvider} from './context/DetachModal'
import {Provider as HomeBadgeProvider} from '~/state/home-badge'
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native'
import {Provider as ShellStateProvider} from '~/state/shell'

import '../reanimatedConfig'
import {PortalHost} from '@rn-primitives/portal'
import CheckInternetConnectivity from './components/connection/CheckInternetConnectivity'
import {DetachModalsContainer} from './bottomSheetModals/DetachModal'
import {MagicModalPortal} from './magicModal'
import {Shell} from './view/shell'
import {useColorScheme} from './lib/useColorScheme'
import {NAV_THEME} from './lib/constants'
import {Platform} from 'react-native'
import {setAndroidNavigationBar} from './lib/android-navigation-bar'
const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
}

function InnerApp() {
  enableFreeze(true)
  const {colorScheme, isDarkColorScheme} = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)
  const hasMounted = React.useRef(false)
  const useIsomorphicLayoutEffect = React.useLayoutEffect

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return
    }
    setAndroidNavigationBar(colorScheme)
    setIsColorSchemeLoaded(true)
    hasMounted.current = true
  }, [])

  if (!isColorSchemeLoaded) {
    return null
  }

  return (
    <>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar
          style={isDarkColorScheme ? 'light' : 'dark'}
          backgroundColor={
            isDarkColorScheme ? 'hsl(220 61% 1%)' : 'hsl(0 0% 100%)'
          }
        />

        <Provider store={store}>
          <GestureHandlerRootView className="h-full">
            <React.Fragment key={'KKK'}>
              <QueryProvider currentDid={'HHHH'}>
                <Splash>
                  <ThemeProvider
                    value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
                    <Toastify>
                      <CheckInternetConnectivity
                        position="bottom"
                        duration={1000} // In milliseconds
                        notConnectedMessage="Not connected to Internet!"
                        notConnectedTextColor="white"
                        notConnectedBackgroundColor="grey"
                        connectedMessage="Connected to Internet!"
                        connectedTextColor="white"
                        connectedBackgroundColor="#0ecb81">
                        <ShellStateProvider>
                          <HomeBadgeProvider>
                            <Shell />
                          </HomeBadgeProvider>
                        </ShellStateProvider>
                        <PortalHost />
                        <DetachModalsContainer />
                        <MagicModalPortal />
                      </CheckInternetConnectivity>
                    </Toastify>
                  </ThemeProvider>
                </Splash>
              </QueryProvider>
            </React.Fragment>
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    </>
  )
}

export default function App() {
  return (
    <>
      <LanguageProvider>
        <DetachModalStateProvider>
          <ModalStateProvider>
            <PortalProvider>
              <BottomSheetProvider>
                <I18nProvider>
                  <InnerApp />
                </I18nProvider>
              </BottomSheetProvider>
            </PortalProvider>
          </ModalStateProvider>
        </DetachModalStateProvider>
      </LanguageProvider>
    </>
  )
}
