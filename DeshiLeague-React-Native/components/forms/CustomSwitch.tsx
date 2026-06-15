
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  trackColor?: {
    false?: string;
    true?: string;
  };
  thumbColor?: {
    false?: string;
    true?: string;
  };
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  trackColor = {
    false: '#3e3e3e',
    true: '#4a4a4a',
  },
  thumbColor = {
    false: '#ffffff',
    true: '#ffffff',
  },
  size = 'medium',
  style,
}) => {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: 40,
          height: 20,
          thumbSize: 16,
          thumbMargin: 2,
        };
      case 'large':
        return {
          width: 60,
          height: 30,
          thumbSize: 26,
          thumbMargin: 2,
        };
      default: // medium
        return {
          width: 50,
          height: 24,
          thumbSize: 20,
          thumbMargin: 2,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const trackStyle = {
    width: sizeStyles.width,
    height: sizeStyles.height,
    backgroundColor: value
      ? trackColor.true || '#4a4a4a'
      : trackColor.false || '#3e3e3e',
  };

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      sizeStyles.thumbMargin,
      sizeStyles.width - sizeStyles.thumbSize - sizeStyles.thumbMargin,
    ],
  });

  const thumbStyle = {
    width: sizeStyles.thumbSize,
    height: sizeStyles.thumbSize,
    backgroundColor: value
      ? thumbColor.true || '#ffffff'
      : thumbColor.false || '#ffffff',
    transform: [{ translateX: thumbTranslateX }],
  };

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={[styles.track, trackStyle, disabled && styles.disabled]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  thumb: {
    borderRadius: 10,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabled: {
    opacity: 0.5,
  },
});