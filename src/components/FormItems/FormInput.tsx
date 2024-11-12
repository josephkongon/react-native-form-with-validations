import React, {FC} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {InputElementType} from '../../types/interface';

const FormInput: FC<InputElementType> = ({
  placeholder,
  onChangeText,
  keyboardType,
  multiline,
  numberOfLines,
  disabled,
  height,
  autoCapitalize,
  width,
  maxLength,
  value,
  onBlur,
  textInputStyle,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  leftIcon,
  borderColor,
  password,
  viewStyle,
  hidePasswordIcon,
  viewPasswordIcon,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const [isSecure, setIsSecure] = React.useState(password);

  return (
    <View
      style={[
        styles.container,
        {
          height: height || 50,
          width,
          gap: 5,
          borderColor: borderColor
            ? borderColor
            : colorScheme === 'dark'
            ? '#fff'
            : '#000',
        },
        viewStyle,
      ]}>
      {leftIcon && (
        <TouchableOpacity onPress={onLeftIconPress} style={styles.leftIcon}>
          {leftIcon}
        </TouchableOpacity>
      )}
      <TextInput
        autoCapitalize={autoCapitalize}
        editable={!disabled}
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={isSecure}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#888"
        style={[
          styles.input,
          {
            height: height || 50,
            width: width,
            paddingLeft: leftIcon ? 40 : 10,
            paddingRight: rightIcon ? 40 : 10,
          },
          textInputStyle,
        ]}
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...props}
      />
      {password ? (
        <TouchableOpacity
          onPress={() => setIsSecure(prevState => !prevState)}
          style={styles.rightIcon}>
          {isSecure ? viewPasswordIcon : hidePasswordIcon}
        </TouchableOpacity>
      ) : (
        <>
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.rightIcon}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,

    borderRadius: 5,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  leftIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
});

export default FormInput;
