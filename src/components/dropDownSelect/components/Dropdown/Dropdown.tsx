import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import DropdownSelectedItemsView from './DropdownSelectedItemsView'
import {colors} from '../../styles/colors'
import {typography} from '../../styles/typography'

const Dropdown = ({
  testID,
  label,
  placeholder,
  helperText,
  error,
  labelsOfSelectedItems,
  openModal,
  closeModal,
  isMultiple,
  selectedItem,
  selectedItems,
  dropdownIcon,
  labelStyle,
  dropdownStyle,
  dropdownIconStyle,
  dropdownContainerStyle,
  selectedItemStyle,
  placeholderStyle,
  multipleSelectedItemStyle,
  dropdownErrorStyle,
  dropdownErrorTextStyle,
  dropdownHelperTextStyle,
  primaryColor,
  disabled,
  setIndexOfSelectedItem,
}: any) => {
  return (
    <View
      style={[styles.dropdownInputContainer, dropdownContainerStyle]}
      accessibilityRole="combobox"
      pointerEvents="box-none"
      testID={testID}>
      {label && label !== '' && (
        <Text
          style={[labelStyle]}
          className="native:text-lg text-foreground font-medium leading-none  mb-4">
          {label}
        </Text>
      )}

      <DropdownSelectedItemsView
        placeholder={placeholder}
        error={error}
        labelsOfSelectedItems={labelsOfSelectedItems}
        openModal={openModal}
        closeModal={closeModal}
        isMultiple={isMultiple}
        selectedItem={selectedItem}
        selectedItems={selectedItems}
        dropdownIcon={dropdownIcon}
        dropdownStyle={dropdownStyle}
        dropdownIconStyle={dropdownIconStyle}
        selectedItemStyle={selectedItemStyle}
        multipleSelectedItemStyle={multipleSelectedItemStyle}
        dropdownErrorStyle={dropdownErrorStyle}
        primaryColor={primaryColor}
        disabled={disabled}
        placeholderStyle={placeholderStyle}
        setIndexOfSelectedItem={setIndexOfSelectedItem}
      />

      {error && error !== '' && (
        <Text style={[styles.error, dropdownErrorTextStyle]}>{error}</Text>
      )}

      {helperText && helperText !== '' && !error && (
        <Text style={[styles.helper, dropdownHelperTextStyle]}>
          {helperText}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {marginBottom: 16, color: colors.gray, ...typography.caption},
  error: {color: colors.red, marginTop: 8, ...typography.caption},
  helper: {marginTop: 8, color: colors.primary, ...typography.caption},
  dropdownInputContainer: {marginBottom: 23, width: '100%'},
  blackText: {color: colors.black},
})

export default Dropdown
