import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Switch,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface FormSwitchProps {
  label?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  switchStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const FormSwitch = ({
  value,
  label,
  onValueChange,
  viewStyle,
  switchStyle,
  textStyle,
  disabled,
}: FormSwitchProps) => {
  return (
    <View style={[styles.checkboxContainer, viewStyle]}>
      {label && <Text style={[textStyle]}>{label}</Text>}
      <Switch
        disabled={disabled}
        style={[switchStyle]}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
