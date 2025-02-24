import {StyleSheet} from 'react-native'
import {colors} from './colors'

export const inputStyles: any = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    borderColor: colors.dark,
    borderWidth: 1,
    color: colors.dark,
    width: '100%',
    minHeight: 40,
  },
  inputFocusErrorState: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.red,
  },
  inputFocusState: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.primary,
  },
})
