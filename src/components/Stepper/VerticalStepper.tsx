import React from 'react'
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
} from 'react-native'
import {StepIndicatorProps} from './stepTypes'
import Colors from '~/constants/Colors'
import {Text} from '../ui/text'
import {cn} from '~/lib/utils'
import {useLanguageContext} from '~/context/languageSelector'
import {isIOS} from '~/lib/platform/detection'

const STEP_STATUS = {
  CURRENT: 'current',
  FINISHED: 'finished',
  UNFINISHED: 'unfinished',
}

interface DefaultStepIndicatorStyles {
  stepIndicatorSize: number
  currentStepIndicatorSize: number
  separatorStrokeWidth: number
  separatorStrokeUnfinishedWidth: number
  separatorStrokeFinishedWidth: number
  currentStepStrokeWidth: number
  stepStrokeWidth: number
  stepStrokeCurrentColor: string
  stepStrokeFinishedColor: string
  stepStrokeUnFinishedColor: string
  separatorFinishedColor: string
  separatorUnFinishedColor: string
  stepIndicatorFinishedColor: string
  stepIndicatorUnFinishedColor: string
  stepIndicatorCurrentColor: string
  stepIndicatorLabelFontSize: number
  currentStepIndicatorLabelFontSize: number
  stepIndicatorLabelCurrentColor: string
  stepIndicatorLabelFinishedColor: string
  stepIndicatorLabelUnFinishedColor: string
  labelColor: string
  labelSize: number
  labelAlign:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'baseline'
    | undefined
  currentStepLabelColor: string
  labelFontFamily?: string
}
const defaultStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 3,
  separatorStrokeUnfinishedWidth: 0,
  separatorStrokeFinishedWidth: 0,
  currentStepStrokeWidth: 2,
  stepStrokeWidth: 0,
  stepStrokeCurrentColor: '#4aae4f',
  stepStrokeFinishedColor: '#4aae4f',
  stepStrokeUnFinishedColor: '#4aae4f',
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#fff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#000000',
  labelSize: 13,
  labelAlign: 'center',
  currentStepLabelColor: '#4aae4f',
  pendingColor: '#FFF',
}

const StepIndicator = ({
  currentPosition = 0,
  stepCount = 5,
  direction = 'horizontal',
  customStyles: customStylesFromProps = defaultStyles,
  labels = [],
  onPress,
  renderStepIndicator: renderCustomStepIndicator,
  renderLabel,
}: StepIndicatorProps) => {
  const [width, setWidth] = React.useState<number>(0)
  const [height, setHeight] = React.useState<number>(0)
  const [progressBarSize, setProgressBarSize] = React.useState<number>(0)
  const [customStyles, setCustomStyles] = React.useState<
    DefaultStepIndicatorStyles | any
  >({
    ...defaultStyles,
    ...customStylesFromProps,
  })
  const {selectedLanguage} = useLanguageContext()

  const progressAnim = React.useRef(new Animated.Value(0)).current
  const sizeAnim = React.useRef(
    new Animated.Value(customStyles.stepIndicatorSize),
  ).current
  const staleSizeAnim = React.useRef(
    new Animated.Value(customStyles.stepIndicatorSize),
  ).current
  const borderRadiusAnim = React.useRef(
    new Animated.Value(customStyles.stepIndicatorSize / 2),
  ).current

  const stepPressed = (position: number | any) => {
    if (onPress) {
      onPress(position)
    }
  }

  const effectCustomStyles = () => {
    setCustomStyles({...customStyles, ...customStylesFromProps})
  }
  React.useEffect(effectCustomStyles, [customStylesFromProps])

  const effectCurrentPosition = () => {
    onCurrentPositionChanged(currentPosition)
  }
  React.useEffect(effectCurrentPosition, [currentPosition, progressBarSize])

  const renderProgressBarBackground = () => {
    let progressBarBackgroundStyle: ViewStyle = {
      backgroundColor: customStyles.separatorUnFinishedColor,
      position: 'absolute',
    }
    if (direction === 'vertical') {
      progressBarBackgroundStyle = {
        ...progressBarBackgroundStyle,
        left: (width - customStyles.separatorStrokeWidth) / 2,
        top: height / (2 * stepCount),
        bottom: height / (2 * stepCount),
        width:
          customStyles.separatorStrokeUnfinishedWidth === 0
            ? customStyles.separatorStrokeWidth
            : customStyles.separatorStrokeUnfinishedWidth,
      }
    } else {
      progressBarBackgroundStyle = {
        ...progressBarBackgroundStyle,
        top: (height - customStyles.separatorStrokeWidth) / 2,
        left: width / (2 * stepCount),
        right: width / (2 * stepCount),
        height:
          customStyles.separatorStrokeUnfinishedWidth === 0
            ? customStyles.separatorStrokeWidth
            : customStyles.separatorStrokeUnfinishedWidth,
      }
    }
    return (
      <View
        onLayout={event => {
          if (direction === 'vertical') {
            setProgressBarSize(event.nativeEvent.layout.height)
          } else {
            setProgressBarSize(event.nativeEvent.layout.width)
          }
        }}
        style={progressBarBackgroundStyle}
      />
    )
  }
  const getStepStatus = (stepPosition: number) => {
    if (stepPosition === currentPosition) {
      return STEP_STATUS.CURRENT
    } else if (stepPosition < currentPosition) {
      return STEP_STATUS.FINISHED
    } else {
      return STEP_STATUS.UNFINISHED
    }
  }

  const renderProgressBar = () => {
    let progressBarStyle: any = {
      backgroundColor: customStyles.separatorFinishedColor,
      position: 'absolute',
    }
    if (direction === 'vertical') {
      progressBarStyle = {
        ...progressBarStyle,
        left: (width - customStyles.separatorStrokeWidth) / 2,
        top: height / (2 * stepCount),
        bottom: height / (2 * stepCount),
        width:
          customStyles.separatorStrokeFinishedWidth === 0
            ? customStyles.separatorStrokeWidth
            : customStyles.separatorStrokeFinishedWidth,
        height: progressAnim,
      }
    } else {
      progressBarStyle = {
        ...progressBarStyle,
        top: (height - customStyles.separatorStrokeWidth) / 2,
        left: width / (2 * stepCount),
        right: width / (2 * stepCount),
        height:
          customStyles.separatorStrokeFinishedWidth === 0
            ? customStyles.separatorStrokeWidth
            : customStyles.separatorStrokeFinishedWidth,
        width: progressAnim,
      }
    }
    return <Animated.View style={progressBarStyle} />
  }

  const renderStepIndicator = () => {
    let steps = []
    for (let position = 0; position < stepCount; position++) {
      steps.push(
        <TouchableWithoutFeedback
          key={position}
          onPress={() => stepPressed(position)}>
          <View
            style={[
              styles.stepContainer,
              direction === 'vertical'
                ? {flexDirection: 'column'}
                : {flexDirection: 'row'},
            ]}>
            {renderStep(position)}
          </View>
        </TouchableWithoutFeedback>,
      )
    }
    return (
      <View
        onLayout={event => {
          setWidth(event.nativeEvent.layout.width)
          setHeight(event.nativeEvent.layout.height)
        }}
        style={[
          styles.stepIndicatorContainer,
          direction === 'vertical'
            ? {
                flexDirection: 'column',
                width: customStyles.currentStepIndicatorSize,
              }
            : {
                flexDirection: 'row',
                height: customStyles.currentStepIndicatorSize,
              },
        ]}>
        {steps}
      </View>
    )
  }

  const renderStepLabels = () => {
    if (!labels || labels.length === 0) {
      return
    }
    var labelViews = labels.map((item, index) => {
      const selectedStepLabelStyle =
        index === currentPosition ||
        (index !== currentPosition && index > currentPosition)
          ? {color: Colors.dark}
          : {color: customStyles.currentStepLabelColor}
      return (
        <TouchableWithoutFeedback
          style={styles.stepLabelItem}
          key={index}
          onPress={() => stepPressed(index)}>
          <View style={styles.stepLabelItem}>
            {renderLabel ? (
              renderLabel({
                position: index,
                stepStatus: getStepStatus(index),
                label: item.title,
                currentPosition,
              })
            ) : (
              <View
                className={cn(
                  'w-full',
                  selectedLanguage?.name === 'English' ? 'mt-8' : 'mt-12',
                )}>
                <Text
                  className="text-black"
                  style={[
                    styles.stepLabel,
                    selectedStepLabelStyle,
                    {
                      fontSize: customStyles.labelSize,
                      fontFamily: customStyles.labelFontFamily,
                    },
                  ]}>
                  {item.title}
                </Text>
                <Text className="max-w-[22rem] text-black">{item.desc_1}</Text>
                <Text className="max-w-[22rem] text-black">{item.desc_2}</Text>
                <Text className="max-w-[22rem] text-black">{item.desc_3}</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      )
    })

    return (
      <View
        style={[
          styles.stepLabelsContainer,
          direction === 'vertical'
            ? {flexDirection: 'column', paddingHorizontal: 4}
            : {flexDirection: 'row', paddingVertical: 4},
          {alignItems: customStyles.labelAlign},
        ]}>
        {labelViews}
      </View>
    )
  }

  const renderStep = (position: number) => {
    let stepStyle: any
    let indicatorLabelStyle: TextStyle = {}
    switch (getStepStatus(position)) {
      case STEP_STATUS.CURRENT: {
        stepStyle = {
          backgroundColor: customStyles.stepIndicatorFinishedColor,
          borderWidth: customStyles.stepStrokeWidth,
          borderColor: customStyles.stepStrokeFinishedColor,
          height: staleSizeAnim,
          width: staleSizeAnim,
          borderRadius: customStyles.stepIndicatorSize / 2,
          overflow: 'hidden',

          // backgroundColor: customStyles.stepIndicatorCurrentColor,
          // borderWidth: customStyles.currentStepStrokeWidth,
          // borderColor: customStyles.stepStrokeCurrentColor,
          // height: sizeAnim,
          // width: sizeAnim,
          // borderRadius: borderRadiusAnim,
          // overflow: 'hidden',
        }
        indicatorLabelStyle = {
          overflow: 'hidden',
          fontSize: customStyles.currentStepIndicatorLabelFontSize,
          color: customStyles.stepIndicatorLabelCurrentColor,
        }

        break
      }
      case STEP_STATUS.FINISHED: {
        stepStyle = {
          backgroundColor: customStyles.stepIndicatorFinishedColor,
          borderWidth: customStyles.stepStrokeWidth,
          borderColor: customStyles.stepStrokeFinishedColor,
          height: staleSizeAnim,
          width: staleSizeAnim,
          borderRadius: customStyles.stepIndicatorSize / 2,
          overflow: 'hidden',
        }
        indicatorLabelStyle = {
          overflow: 'hidden',
          fontSize: customStyles.stepIndicatorLabelFontSize,
          color: customStyles.stepIndicatorLabelFinishedColor,
        }
        break
      }

      case STEP_STATUS.UNFINISHED: {
        stepStyle = {
          backgroundColor: customStyles.stepIndicatorFinishedColor,
          borderWidth: customStyles.stepStrokeWidth,
          borderColor: customStyles.stepStrokeFinishedColor,
          height: staleSizeAnim,
          width: staleSizeAnim,
          borderRadius: customStyles.stepIndicatorSize / 2,
          overflow: 'hidden',
          // backgroundColor: customStyles.stepIndicatorUnFinishedColor,
          // borderWidth: customStyles.stepStrokeWidth,
          // borderColor: customStyles.stepStrokeUnFinishedColor,
          // height: staleSizeAnim,
          // width: staleSizeAnim,
          // borderRadius: customStyles.stepIndicatorSize / 2,
          // overflow: 'hidden',
        }
        indicatorLabelStyle = {
          overflow: 'hidden',
          fontSize: customStyles.stepIndicatorLabelFontSize,
          color: customStyles.stepIndicatorLabelUnFinishedColor,
        }
        break
      }
      default:
    }

    return (
      <Animated.View key={position} style={[styles.step, stepStyle]}>
        {renderCustomStepIndicator ? (
          renderCustomStepIndicator({
            position,
            stepStatus: getStepStatus(position),
          })
        ) : (
          <Text style={indicatorLabelStyle}>
            {currentPosition >= position + 1 ? `✔` : `${position + 1}`}
          </Text>
        )}
      </Animated.View>
    )
  }

  const onCurrentPositionChanged = (position: number) => {
    if (position > stepCount - 1) {
      position = stepCount - 1
    }
    const animateToPosition = (progressBarSize / (stepCount - 1)) * position
    sizeAnim.setValue(customStyles.stepIndicatorSize)
    staleSizeAnim.setValue(customStyles.stepIndicatorSize)
    borderRadiusAnim.setValue(customStyles.stepIndicatorSize / 2)
    Animated.sequence([
      Animated.timing(progressAnim, {
        toValue: isNaN(animateToPosition) ? 0 : animateToPosition,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(sizeAnim, {
          toValue: customStyles.currentStepIndicatorSize,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(borderRadiusAnim, {
          toValue: customStyles.currentStepIndicatorSize / 2,
          duration: 100,
          useNativeDriver: false,
        }),
      ]),
    ]).start()
  }

  return (
    <View
      style={[
        styles.container,
        direction === 'vertical'
          ? {flexDirection: 'row', flex: 1}
          : {flexDirection: 'column'},
      ]}>
      {width !== 0 && (
        <React.Fragment>
          {renderProgressBarBackground()}
          {renderProgressBar()}
        </React.Fragment>
      )}
      {renderStepIndicator()}
      {labels && renderStepLabels()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stepLabelsContainer: {
    justifyContent: 'space-around',
  },
  step: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  stepContainer: {
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
  },
  stepLabel: {
    fontSize: 12,
    width: isIOS ? 450 : 320,
    fontWeight: '900',
  },
  stepLabelItem: {
    width: '100%',
    height: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
})

export default React.memo(StepIndicator)
