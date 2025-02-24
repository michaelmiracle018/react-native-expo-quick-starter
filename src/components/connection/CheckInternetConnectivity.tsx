import React, {useState, useEffect} from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import PropTypes from 'prop-types'
import MessageBar from './MessageBar'

interface Props {
  children: React.ReactNode
  position: string
  duration: number
  notConnectedMessage: string
  notConnectedTextColor: string
  notConnectedBackgroundColor: string
  connectedMessage: string
  connectedTextColor: string
  connectedBackgroundColor: string
  style: ViewStyle | any
}

const CheckInternetConnectivity = (props: Props) => {
  const [isConnected, setIsConnected] = useState<any>(true)
  const [notConnectedShown, setNotConnectedShown] = useState(false)

  const duration = props.duration ? props.duration : 5000
  const style = props.style ? props.style : {}

  const [showBackOnline, setShowBackOnline] = useState(false)
  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
      if (isConnected && notConnectedShown) {
        setShowBackOnline(true)
        setTimeout(() => {
          setShowBackOnline(false)
        }, duration)
      } else if (!isConnected) {
        setShowBackOnline(false)
        setNotConnectedShown(true)
      }
    })
    return () => {
      // Unsubscribe
      unsubscribe()
    }
  }, [isConnected])
  const position = props.position ? props.position : 'bottom'
  const connectedMessage = props.connectedMessage
    ? props.connectedMessage
    : 'Back Online'
  const connectedTextColor = props.connectedTextColor
    ? props.connectedTextColor
    : 'white'
  const connectedBackgroundColor = props.connectedBackgroundColor
    ? props.connectedBackgroundColor
    : 'green'
  const notConnectedMessage = props.notConnectedMessage
    ? props.notConnectedMessage
    : 'No Connection'
  const notConnectedTextColor = props.notConnectedTextColor
    ? props.notConnectedTextColor
    : 'white'
  const notConnectedBackgroundColor = props.notConnectedBackgroundColor
    ? props.notConnectedBackgroundColor
    : 'grey'
  return (
    <>
      {position === 'bottom' && <View style={{flex: 1}}>{props.children}</View>}
      {!isConnected && (
        <MessageBar
          message={notConnectedMessage}
          textColor={notConnectedTextColor}
          backgroundColor={notConnectedBackgroundColor}
          style={style}
        />
      )}
      {showBackOnline && (
        <MessageBar
          message={connectedMessage}
          textColor={connectedTextColor}
          backgroundColor={connectedBackgroundColor}
          style={style}
        />
      )}
      {position === 'top' && <View style={{flex: 1}}>{props.children}</View>}
    </>
  )
}

CheckInternetConnectivity.propTypes = {
  position: PropTypes.string,
  duration: PropTypes.number,
  style: PropTypes.object,
  connectedMessage: PropTypes.string,
  connectedTextColor: PropTypes.string,
  connectedBackgroundColor: PropTypes.string,
  notConnectedMessage: PropTypes.string,
  notConnectedTextColor: PropTypes.string,
  notConnectedBackgroundColor: PropTypes.string,
}

export default CheckInternetConnectivity
