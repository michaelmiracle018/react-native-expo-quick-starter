import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import {colors} from '../../styles/colors'
import {inputStyles} from '../../styles/input'
import {useLingui} from '@lingui/react'
import {t} from '@lingui/macro'
import {cn} from '~/lib/utils'

const DropdownSelectedItemsView = ({
  placeholder,
  error,
  labelsOfSelectedItems,
  openModal,
  isMultiple,
  selectedItem,
  selectedItems,
  dropdownIcon,
  dropdownStyle,
  dropdownIconStyle,
  selectedItemStyle,
  placeholderStyle,
  multipleSelectedItemStyle,
  dropdownErrorStyle,
  primaryColor,
  disabled,
  setIndexOfSelectedItem,
}: any) => {
  const openActions = (label: string) => {
    openModal()
    setIndexOfSelectedItem(label) // immediately scrolls to list item with the specified label when modal
  }
  const {i18n} = useLingui()

  return (
    <Pressable
      onPress={() => openModal()}
      style={[
        {
          ...inputStyles.inputFocusState,
          borderColor: primaryColor,
        },
        {...inputStyles.input, ...dropdownStyle},
        error && //this must be last
          error !== '' && {
            ...inputStyles.inputFocusErrorState,
            ...dropdownErrorStyle,
          },
      ]}
      disabled={disabled}
      aria-disabled={disabled}
      testID="react-native-input-select-dropdown-input-container">
      <ScrollView
        horizontal
        alwaysBounceHorizontal
        showsHorizontalScrollIndicator={false}>
        <View
          style={styles.selectedItemsContainer}
          onStartShouldSetResponder={() => true}>
          {isMultiple ? (
            labelsOfSelectedItems?.map((label: string, i: number) => (
              <DropdownContent
                onPress={() => openActions(label)}
                key={`react-native-input-select-list-item-${Math.random()}-${i}`}
                style={[
                  styles.selectedItems,
                  {backgroundColor: primaryColor},
                  multipleSelectedItemStyle,
                ]}
                label={label}
                disabled={disabled}
              />
            ))
          ) : (
            <DropdownContent
              onPress={() => openActions(labelsOfSelectedItems)}
              style={[styles.blackText, selectedItemStyle]}
              label={labelsOfSelectedItems}
              disabled={disabled}
            />
          )}
          {selectedItem === '' && selectedItems?.length === 0 && (
            <DropdownContent
              onPress={() => openModal()}
              style={[styles.blackText, placeholderStyle]}
              label={placeholder ?? t(i18n)`Select an option`}
              disabled={disabled}
            />
          )}
        </View>
      </ScrollView>
      <View style={[styles.iconStyle, dropdownIconStyle]}>
        {dropdownIcon || (
          <Image source={require('../../../../../assets/arrow-down.png')} />
        )}
      </View>
    </Pressable>
  )
}

const DropdownContent = ({onPress, style, label, ...rest}: any) => {
  return (
    <TouchableOpacity onPress={() => onPress()} {...rest}>
      <Text style={style} className={cn('text-primary text-lg')}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconStyle: {position: 'absolute', right: 20, top: 22},
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  selectedItems: {
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginRight: 10,
    overflow: 'hidden',
  },
  blackText: {color: colors.black},
})

export default DropdownSelectedItemsView
