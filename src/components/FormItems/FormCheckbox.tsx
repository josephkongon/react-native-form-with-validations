import React, {FC} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import CheckBox, {CheckBoxProps} from '@react-native-community/checkbox';

interface IFormCheckboxProps extends CheckBoxProps {
  label?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  viewStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  checkboxStyle?: StyleProp<ViewStyle>;
}

const FormCheckbox: FC<IFormCheckboxProps> = ({
  value,
  onValueChange,
  label,
  disabled,
  viewStyle,
  labelStyle,
  checkboxStyle,
  ...props
}) => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        {display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5},
        viewStyle,
      ]}>
      <CheckBox
        {...props}
        style={[{}, checkboxStyle]}
        disabled={disabled}
        value={value}
        onValueChange={newValue => onValueChange?.(newValue)}
      />
      {label && (
        <Text
          style={[
            {color: colorScheme === 'dark' ? '#fff' : '#000'},
            labelStyle,
          ]}>
          {label}
        </Text>
      )}
    </View>
  );
};

export default FormCheckbox;
