import {View, StyleSheet} from 'react-native'
import {Text} from '../ui/text'

const MessageBar = (props: any) => {
  return (
    <View
      style={{
        ...styles.screen,
        ...props.style,
        backgroundColor: props.backgroundColor,
      }}
      className="py-4">
      <View style={styles.center}>
        <Text style={{color: props.textColor}}>{props.message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 0.03,
  },
  center: {
    paddingVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default MessageBar
