import React from 'react'
import {ScrollView, ScrollViewProps} from 'react-native'

type CustomScrollViewProps = ScrollViewProps & {
  // Add any custom props if needed, for example:
  customProp?: string
}

const CustomScrollView: React.FC<CustomScrollViewProps> = props => {
  return <ScrollView {...props}>{props.children}</ScrollView>
}

export default CustomScrollView
