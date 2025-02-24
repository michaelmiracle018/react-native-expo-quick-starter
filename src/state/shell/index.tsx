import React from 'react'
import {Provider as ShellLayoutProvder} from '../shell-layout'
import {Provider as MinimalModeProvider} from '../minimal-mode'

export function Provider({children}: React.PropsWithChildren<{}>) {
  return (
    <ShellLayoutProvder>
      <MinimalModeProvider>
        {/* <DrawerOpenProvider>
        <DrawerSwipableProvider>
            <ColorModeProvider>
              <OnboardingProvider> */}
        {children}
        {/* </OnboardingProvider>
            </ColorModeProvider>
            </DrawerSwipableProvider>
            </DrawerOpenProvider> */}
      </MinimalModeProvider>
    </ShellLayoutProvder>
  )
}
