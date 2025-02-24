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
import {isIOS} from '~/lib/platform/detection'
import {Text} from '../ui/text'

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
const defaultStyles: DefaultStepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  separatorStrokeUnfinishedWidth: 0,
  separatorStrokeFinishedWidth: 0,
  currentStepStrokeWidth: 5,
  stepStrokeWidth: 0,
  stepStrokeCurrentColor: '#0ecb81',
  stepStrokeFinishedColor: '#0ecb81',
  stepStrokeUnFinishedColor: '#0ecb81',
  separatorFinishedColor: '#0ecb81',
  separatorUnFinishedColor: '#b7f3da',
  stepIndicatorFinishedColor: '#0ecb81',
  stepIndicatorUnFinishedColor: '#b7f3da',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#fff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#000000',
  labelSize: 13,
  labelAlign: 'center',
  currentStepLabelColor: '#0ecb81',
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
  const [customStyles, setCustomStyles] =
    React.useState<DefaultStepIndicatorStyles>({
      ...defaultStyles,
      ...customStylesFromProps,
    })

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

  const stepPressed = (position: number) => {
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
    var labelViews = labels.map((label, index) => {
      const selectedStepLabelStyle =
        index === currentPosition
          ? {color: customStyles.currentStepLabelColor}
          : {color: customStyles.labelColor}
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
                label,
                currentPosition,
              })
            ) : (
              <Text
                style={[
                  styles.stepLabel,
                  selectedStepLabelStyle,
                  {
                    fontSize: customStyles.labelSize,
                    fontFamily: customStyles.labelFontFamily,
                  },
                ]}>
                {label}
              </Text>
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
      <React.Fragment key={position}>
        <Animated.View style={[styles.step, stepStyle]}>
          {/* {renderCustomStepIndicator ? (
          renderCustomStepIndicator({
            position,
            stepStatus: getStepStatus(position),
            })
            ) : ( */}
          <Text style={indicatorLabelStyle}>{`${position + 1}`}</Text>
          {/* )} */}
        </Animated.View>
      </React.Fragment>
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
    <View className="flex-center">
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
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: isIOS ? 500 : 410,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "space-bewteen",
    backgroundColor: 'rgba(1,0,0,0)',
  },
  stepLabelsContainer: {
    justifyContent: 'space-between',
  },
  step: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  stepContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  stepLabelItem: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    // justifyContent: "center",
  },
})
export default React.memo(StepIndicator)
