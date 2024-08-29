// RadioButton.tsx
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {IRadioButtonProps} from '~src/types/interface.ts';

const RadioButton: React.FC<IRadioButtonProps> = ({
  selected = false,
  onPress,
  label,
  color = '#007bff',
  checkIconSize = 32,
  circleSize = 25,
  checkedCircleSize = 15,
  mode = Platform.OS === 'ios' ? 'ios' : 'android',
}) => {
  const colorSchema = useColorScheme();
  const scaleAnim = useRef(new Animated.Value(0)).current; // For Android
  const opacityAnim = useRef(new Animated.Value(0)).current; // For iOS

  useEffect(() => {
    if (mode === 'ios') {
      Animated.timing(opacityAnim, {
        toValue: selected ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: selected ? 1 : 0,
        useNativeDriver: true,
      }).start();
    }
  }, [selected, mode, opacityAnim, scaleAnim]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View
        style={[
          styles.circle,
          {
            borderWidth: mode === 'ios' ? 0 : 2,
            borderColor: color,
            width: circleSize,
            height: circleSize,
            borderRadius: mode === 'ios' ? 0 : circleSize / 2,
          },
        ]}>
        {mode === 'ios' ? (
          <Animated.View
            style={[
              styles.iosCheckIcon,
              {
                opacity: opacityAnim,
                transform: [
                  {
                    scale: opacityAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    }),
                  },
                ],
              },
            ]}>
            <Text style={{fontSize: 15, color: color}}>✔</Text>
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              styles.checkedCircle,
              {
                backgroundColor: color,
                width: checkedCircleSize,
                height: checkedCircleSize,
                borderRadius: checkedCircleSize / 2,
                transform: [
                  {
                    scale: scaleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              },
            ]}
          />
        )}
      </View>
      {label && (
        <Text
          style={[
            styles.label,
            {color: colorSchema === 'dark' ? '#fff' : '#000'},
          ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  iosCheckIcon: {
    // Center the icon within the circle
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default RadioButton;
