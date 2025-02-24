import {View, TouchableOpacity} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

export default function ScrolToTop({
  scrollTopHandler,
  styles,
}: {
  scrollTopHandler: () => void
  styles: any
}) {
  return (
    <TouchableOpacity onPress={scrollTopHandler} style={styles}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}>
        <MaterialIcons
          name="keyboard-double-arrow-up"
          size={30}
          color="white"
        />
      </View>
    </TouchableOpacity>
  )
}
