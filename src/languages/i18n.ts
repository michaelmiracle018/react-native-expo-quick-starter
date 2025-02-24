// import '@formatjs/intl-locale/polyfill'
// import '@formatjs/intl-pluralrules/polyfill'
// import '@formatjs/intl-pluralrules/locale-data/en'
// import '@formatjs/intl-locale/polyfill-force'
// import '@formatjs/intl-pluralrules/polyfill-force'

import {useEffect} from 'react'
import {i18n} from '@lingui/core'
import {messages as messagesFr} from '~/languages/locale/locales/fr/messages'
import {messages as messagesEn} from '~/languages/locale/locales/en/messages'
import {LanguageProps} from '~/types'
import {useLanguageContext} from '~/context/languageSelector'

export async function dynamicActivate(locale: LanguageProps | null) {
  switch (locale?.code2) {
    case 'fr': {
      i18n.loadAndActivate({locale: 'fr', messages: messagesFr})
      await import('@formatjs/intl-pluralrules/locale-data/fr')
      break
    }
    default: {
      i18n.loadAndActivate({locale: 'en', messages: messagesEn})
      break
    }
  }
}

export async function useLocaleLanguage() {
  const {selectedLanguage} = useLanguageContext()
  useEffect(() => {
    dynamicActivate(selectedLanguage)
  }, [selectedLanguage])
}
