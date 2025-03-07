import {forwardRef, useCallback, useEffect, useImperativeHandle} from 'react'
import {TouchableOpacity, StyleSheet, View} from 'react-native'
import Input from './components/Input'
import CheckBox from './components/CheckBox'
import Dropdown from './components/Dropdown/Dropdown'
import DropdownFlatList from './components/List/DropdownFlatList'
import DropdownSectionList from './components/List/DropdownSectionList'
import CustomModal from './components/CustomModal'
import {colors} from './styles/colors'
import {DEFAULT_OPTION_LABEL, DEFAULT_OPTION_VALUE} from './constants'
import type {
  DropdownProps,
  DropdownSelectHandle,
  TSelectedItem,
} from './types/index.types'
import {extractPropertyFromArray, getLabelsOfSelectedItems} from './utils'
import {
  useSelectionHandler,
  useModal,
  useSearch,
  useIndexOfSelectedItem,
  useSelectAll,
} from './hooks'
import {Separator} from '../ui/separator'

export const DropdownSelect = forwardRef<DropdownSelectHandle, DropdownProps>(
  (
    {
      testID,
      placeholder,
      canUnSelect = true,
      label,
      error,
      helperText,
      options,
      optionLabel = DEFAULT_OPTION_LABEL,
      optionValue = DEFAULT_OPTION_VALUE,
      onValueChange,
      isMultiple = false,
      selectedValue = isMultiple ? [] : '',
      isSearchable,
      dropdownIcon,
      labelStyle,
      placeholderStyle,
      dropdownStyle,
      dropdownIconStyle,
      dropdownContainerStyle,
      dropdownErrorStyle,
      dropdownErrorTextStyle,
      dropdownHelperTextStyle,
      selectedItemStyle,
      multipleSelectedItemStyle,
      primaryColor = colors.gray,
      modalOptionsContainerStyle,
      disabled = false,
      listHeaderComponent,
      listFooterComponent,
      listComponentStyles,
      listEmptyComponent,
      listControls,
      searchControls,
      modalControls,
      checkboxControls,
      autoCloseOnSelect = true,
      maxSelectableItems,
      ...rest
    },
    ref,
  ) => {
    /*===========================================
     * Search
     *==========================================*/
    const {
      searchValue,
      setSearchValue,
      setFilteredOptions,
      filteredOptions,
      isSectionList,
    } = useSearch({
      initialOptions: options,
      optionLabel,
      optionValue,
      searchCallback: useCallback(
        value => searchControls?.searchCallback?.(value),
        [searchControls],
      ),
    })

    /*===========================================
     * setIndexOfSelectedItem - For ScrollToIndex
     *==========================================*/
    const {listIndex, setListIndex, setIndexOfSelectedItem} =
      useIndexOfSelectedItem({
        options,
        optionLabel,
        isSectionList,
      })

    /*===========================================
     * Reset component states
     *==========================================*/
    const resetOptionsRelatedState = useCallback(() => {
      setSearchValue('')
      setFilteredOptions(options)
      setListIndex({itemIndex: -1, sectionIndex: -1})
    }, [options, setFilteredOptions, setListIndex, setSearchValue])

    /*===========================================
     * Modal
     *==========================================*/
    const {isVisible, openModal, closeModal} = useModal({
      resetOptionsRelatedState,
      disabled,
      modalControls,
    })

    /*===========================================
     * Expose the methods to the parent using
     * useImperativeHandle
     *==========================================*/
    useImperativeHandle(ref, () => ({
      open: () => openModal(),
      close: () => closeModal(),
    }))

    /*===========================================
     * Single and multiple selection Hook
     *==========================================*/
    const {
      selectedItem,
      selectedItems,
      setSelectedItem,
      setSelectedItems,
      handleSingleSelection,
      handleMultipleSelections,
    } = useSelectionHandler({
      initialSelectedValue: selectedValue,
      isMultiple,
      maxSelectableItems,
      onValueChange,
      closeModal: () => closeModal(),
      canUnSelect,
      autoCloseOnSelect,
    })

    useEffect(() => {
      isMultiple
        ? setSelectedItems(selectedValue as TSelectedItem[])
        : setSelectedItem(selectedValue as TSelectedItem)

      return () => {}
    }, [
      selectedValue,
      setSelectedItems,
      setSelectedItem,
      isMultiple,
      onValueChange,
    ])

    /*===========================================
     * List type
     *==========================================*/
    const ListTypeComponent = isSectionList
      ? DropdownSectionList
      : DropdownFlatList
    const modifiedSectionData = extractPropertyFromArray(
      filteredOptions,
      'data',
    )?.flat()

    /**
     * `options` is the original array, it never changes. (Do not use except you really need the original array) .
     * `filteredOptions` is a copy of options but can be mutated by `setFilteredOptions`, as a result, the value may change.
     * `modifiedOptions` should only be used for computations. It has the same structure for both `FlatList` and `SectionList`
     */
    const modifiedOptions = isSectionList
      ? modifiedSectionData
      : filteredOptions

    /*===========================================
     * Select all Hook
     *==========================================*/
    const {selectAll, handleSelectAll} = useSelectAll({
      options: modifiedOptions,
      selectedItems,
      isMultiple,
      onValueChange,
      listControls,
      optionValue,
    })

    return (
      <>
        <Dropdown
          testID={testID}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          error={error}
          labelsOfSelectedItems={getLabelsOfSelectedItems({
            isMultiple,
            optionLabel,
            optionValue,
            selectedItem,
            selectedItems,
            modifiedOptions,
          })}
          selectedItem={selectedItem}
          selectedItems={selectedItems}
          openModal={() => openModal()}
          closeModal={() => closeModal()}
          labelStyle={labelStyle}
          dropdownIcon={dropdownIcon}
          dropdownStyle={dropdownStyle}
          dropdownIconStyle={dropdownIconStyle}
          dropdownContainerStyle={dropdownContainerStyle}
          dropdownErrorStyle={dropdownErrorStyle}
          dropdownErrorTextStyle={dropdownErrorTextStyle}
          dropdownHelperTextStyle={dropdownHelperTextStyle}
          selectedItemStyle={selectedItemStyle}
          multipleSelectedItemStyle={multipleSelectedItemStyle}
          isMultiple={isMultiple}
          primaryColor={primaryColor}
          disabled={disabled}
          placeholderStyle={placeholderStyle}
          setIndexOfSelectedItem={setIndexOfSelectedItem}
          {...rest}
        />
        <CustomModal
          visible={isVisible}
          onRequestClose={() => closeModal()}
          modalControls={modalControls}
          modalOptionsContainerStyle={modalOptionsContainerStyle}>
          <View className="mt-4">{listHeaderComponent}</View>

          <ListTypeComponent
            ListHeaderComponent={
              <>
                {isSearchable && (
                  <Input
                    value={searchValue}
                    onChangeText={(text: string) => setSearchValue(text)}
                    style={[searchControls?.textInputStyle, {height: 10}]}
                    primaryColor={primaryColor}
                    textInputContainerStyle={
                      searchControls?.textInputContainerStyle
                    }
                    placeholder={
                      searchControls?.textInputProps?.placeholder || 'Search'
                    }
                    {...searchControls?.textInputProps}
                  />
                )}
                {!listControls?.hideSelectAll &&
                  isMultiple &&
                  modifiedOptions?.length > 1 && (
                    <View style={styles.optionsContainerStyle}>
                      <TouchableOpacity accessible={false}>
                        <CheckBox
                          value={selectAll}
                          label={
                            selectAll
                              ? listControls?.unselectAllText || 'Clear all'
                              : listControls?.selectAllText || 'Select all'
                          }
                          onChange={() => handleSelectAll()}
                          primaryColor={primaryColor}
                          checkboxControls={checkboxControls}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                <Separator className="mt-0 bg-gray-200" />
              </>
            }
            ListFooterComponent={listFooterComponent}
            listComponentStyles={listComponentStyles}
            options={filteredOptions}
            optionLabel={optionLabel}
            optionValue={optionValue}
            isMultiple={isMultiple}
            isSearchable={isSearchable}
            selectedItems={selectedItems}
            selectedItem={selectedItem}
            handleMultipleSelections={handleMultipleSelections}
            handleSingleSelection={handleSingleSelection}
            primaryColor={primaryColor}
            checkboxControls={checkboxControls}
            listIndex={listIndex}
            listEmptyComponent={listEmptyComponent}
            emptyListMessage={listControls?.emptyListMessage}
          />
        </CustomModal>
      </>
    )
  },
)
const styles = StyleSheet.create({
  optionsContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
})

export default DropdownSelect
