import React, {FC} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import RadiosGroup from '../components/Radios/RadiosGroup.tsx';
import {IRadioButtonProps} from '../../types/interface.ts';

interface IFormRadiosProps extends IRadioButtonProps {
  label?: string;
  options: Array<{label: string; value: string}>;
  value?: string;
  onChange?: (value: string | number) => void;
  labelStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
}

const FormRadioGroup: FC<IFormRadiosProps> = ({
  labelStyle,
  options,
  value,
  label,
  onChange,
  viewStyle,
  ...props
}) => {
  const colorScheme = useColorScheme();

  return (
    <View style={[viewStyle]}>
      {label && (
        <Text
          style={[
            {color: colorScheme === 'dark' ? '#fff' : '#000'},
            labelStyle,
          ]}>
          {label}
        </Text>
      )}
      <RadiosGroup
        {...props}
        value={value}
        options={options}
        onChange={v => {
          onChange?.(v);
        }}
      />
    </View>
  );
};

export default FormRadioGroup;
