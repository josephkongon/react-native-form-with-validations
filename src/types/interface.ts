import {
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {ReactNode} from 'react';

export interface InputElementType {
  disabled?: boolean;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  mode?: 'flat' | 'outlined';
  multiline?: boolean;
  numberOfLines?: number;
  iconShow?: boolean;
  iconName?: string;
  iconPosition?: 'left' | 'right';
  activeUnderlineColor?: string;
  height?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  width?: number;
  maxLength?: number;
  onChangeText?: (text: string) => void;
  value?: string;
  onBlur?: () => void;
  textInputStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  borderColor?: string;
  password?: boolean;
}

export interface IRadioButtonProps {
  selected?: boolean;
  onPress?: (i: string | number) => void;
  label?: string;
  color?: string;
  checkIconSize?: number;
  circleSize?: number;
  checkedCircleSize?: number;
  mode?: 'android' | 'ios';
}
