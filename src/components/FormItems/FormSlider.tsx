import React, {FC} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Slider, {SliderProps} from '@react-native-community/slider';

interface IFormSliderProps extends SliderProps {
  label?: string;
  sliderStyle?: StyleProp<ViewStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  value?: number;
  labelStyle?: StyleProp<TextStyle>;
  minimumValue: number;
  maximumValue: number;
}

const FormSlider: FC<IFormSliderProps> = ({
  sliderStyle,
  label,
  value,
  labelStyle,
  disabled,
  viewStyle,
  minimumValue,
  maximumValue,
  ...props
}) => {
  const colorScheme = useColorScheme();

  return (
    <View style={[{gap: 5}, viewStyle]}>
      {label && (
        <Text
          style={[
            {color: colorScheme === 'dark' ? '#fff' : '#000'},
            labelStyle,
          ]}>
          {label}
        </Text>
      )}
      <View style={{}}>
        <Text
          style={[
            {color: colorScheme === 'dark' ? '#fff' : '#000'},
            labelStyle,
          ]}>
          {value}
        </Text>
      </View>
      <Slider
        disabled={disabled}
        value={value}
        style={[{height: 40}, sliderStyle]}
        minimumTrackTintColor="#cccccc"
        maximumTrackTintColor="#000000"
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        {...props}
      />
    </View>
  );
};

export default FormSlider;
