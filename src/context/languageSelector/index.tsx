/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react'
import {getLocales} from 'expo-localization'
import {LanguageProps} from '~/types'
import {getDataFromStorage} from '~/utils/storageData'

const LanguageContext = React.createContext<{
  selectedLanguage: null | LanguageProps
}>({
  selectedLanguage: null,
})

const LanguageControlContext = React.createContext<{
  handleSelectedLanguage: (lang: LanguageProps) => void
}>({
  handleSelectedLanguage: () => {},
})

export function Provider({children}: React.PropsWithChildren<{}>) {
  const [selectedLanguage, setSelectedLanguage] = React.useState<
    null | LanguageProps | any
  >(null)

  const handleSelectedLanguage = (lang: LanguageProps) => {
    setSelectedLanguage(lang)
  }

  const deviceLanguage = getLocales()[0].languageCode

  const getStoredLanguage = async () => {
    const data = await getDataFromStorage('selectedLanguage')
    if (data) {
      setSelectedLanguage(data?.lang)
    } else {
      let langFromDevice
      if (deviceLanguage === 'en') {
        langFromDevice = {
          code2: deviceLanguage,
          name: 'English',
          type: 'English',
        }
      } else if (deviceLanguage === 'fr') {
        langFromDevice = {
          code2: deviceLanguage,
          name: 'Français – French',
          type: 'French',
        }
      } else {
        langFromDevice = {
          code2: deviceLanguage,
          name: 'Français – French',
          type: 'French',
        }
      }
      setSelectedLanguage(langFromDevice)
    }
  }

  useEffect(() => {
    getStoredLanguage()
  }, [deviceLanguage])

  const state = React.useMemo(
    () => ({
      selectedLanguage,
    }),
    [selectedLanguage],
  )

  const methods = React.useMemo(
    () => ({
      handleSelectedLanguage,
    }),
    [handleSelectedLanguage],
  )

  return (
    <LanguageContext.Provider value={state}>
      <LanguageControlContext.Provider value={methods}>
        {children}
      </LanguageControlContext.Provider>
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  return React.useContext(LanguageContext)
}

export function useLanguageControlsContext() {
  return React.useContext(LanguageControlContext)
}
