/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import {Modal, View} from 'react-native'
import React from 'react'
import {cn} from '~/lib/utils'

const ModalDisplay = React.forwardRef<
  React.ElementRef<typeof Modal>,
  React.ComponentPropsWithoutRef<typeof Modal>
>(({className, children, visible, animationType = 'fade', ...props}, ref) => {
  const [showModal, setShowModal] = React.useState(visible)
  const toggleModal = () => {
    if (visible) {
      setShowModal(true)
    } else {
      setTimeout(() => setShowModal(false), 200)
    }
  }
  React.useEffect(() => {
    toggleModal()
  }, [visible])

  return (
    <Modal
      ref={ref}
      animationType={animationType}
      transparent={true}
      visible={showModal}
      statusBarTranslucent
      {...props}>
      <View
        className={cn(
          'flex-1 justify-center items-center p-2',
          animationType !== 'slide' && 'bg-zinc-50/80 dark:bg-zinc-900/80',
        )}>
        <View
          className={cn(
            'bg-background rounded-2xl p-5 border border-border shadow-lg shadow-foreground/5 w-[97%]',
            className,
          )}>
          {children}
        </View>
      </View>
    </Modal>
  )
})

export default ModalDisplay
