import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  pointerEventsBoxNone: {
    pointerEvents: 'box-none',
  },
  childrenWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})
