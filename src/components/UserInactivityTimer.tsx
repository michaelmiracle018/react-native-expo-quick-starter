/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import UserInactivity from 'react-native-user-inactivity'
import {useModalControls} from '~/context/BottomModal'

export const UserInactivityTimer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [active, setActive] = useState(true)
  const {openModal, closeAllModals} = useModalControls()

  useEffect(() => {
    if (!active) {
      closeAllModals()
      openModal({name: 'lock-modal'})
    }
  }, [active])

  return (
    <View style={{flex: 1}}>
      <UserInactivity
        isActive={active}
        timeForInactivity={3000 * 60}
        onAction={isActive => {
          setActive(isActive)
        }}
        style={{flex: 1}}>
        {children}
      </UserInactivity>
    </View>
  )
}
