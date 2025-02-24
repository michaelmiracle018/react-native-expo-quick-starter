import {Ionicons} from '@expo/vector-icons'
import {Trans} from '@lingui/macro'
import {TouchableOpacity, View} from 'react-native'
import {Button} from '~/components/ui/button'
import {Separator} from '~/components/ui/separator'
import {Text} from '~/components/ui/text'
import Colors from '~/constants/Colors'
import {useModalControls} from '~/context/BottomModal'
import {
  useLanguageContext,
  useLanguageControlsContext,
} from '~/context/languageSelector'
import {APP_LANGUAGES} from '~/languages/languages'
import {X} from '~/lib/icons/X'
import {LanguageProps} from '~/types'
import {storeDataInStorage} from '~/utils/storageData'

export const snapPoints = ['40%']

export function Component({}: {}) {
  const {closeModal} = useModalControls()
  const {handleSelectedLanguage} = useLanguageControlsContext()
  const {selectedLanguage} = useLanguageContext()

  const handleSelectLanguage = (lang: LanguageProps) => {
    storeDataInStorage('selectedLanguage', {
      lang,
    })
    handleSelectedLanguage(lang)
    // setShowModal(false)
  }
  return (
    <View>
      <View className="spacing-1">
        <View className="flex flex-row justify-between items-center ">
          <Text className="text-black font-semibold text-xl">
            <Trans>Select a language</Trans>
          </Text>
          <Button
            variant={'ghost'}
            className="rounded-full"
            onPress={closeModal}>
            <X className="text-black" size={25} />
          </Button>
        </View>
      </View>
      <Separator />
      <View className="spacing-1 mt-10">
        {APP_LANGUAGES.map(lang => {
          return (
            <TouchableOpacity
              key={lang.code2}
              onPress={() => {
                closeModal()
                handleSelectLanguage(lang)
              }}
              style={{borderRadius: 4}}>
              <View className="flex-row justify-between items-center py-4">
                <Text className="font-bold">{lang.name}</Text>
                {selectedLanguage?.type === lang?.type && (
                  <Ionicons
                    name="checkmark-done"
                    size={20}
                    color={Colors.light_green}
                  />
                )}
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}
