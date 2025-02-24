import {StyleSheet} from 'react-native'
import Colors from '~/constants/Colors'
import {isIOS} from '~/lib/platform/detection'

export const generalStyles = StyleSheet.create({
  scrollTopButton: {
    position: 'absolute',
    top: 530,
    right: 10,
    backgroundColor: Colors.grayDark,
    width: isIOS ? 50 : 40,
    height: isIOS ? 50 : 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
})
