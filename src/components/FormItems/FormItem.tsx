import React, {FC, ReactNode, useEffect} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ErrorMessage, Field, useFormikContext} from 'formik';

interface IFormItemProps {
  submitButtonStyle?: StyleProp<ViewStyle>;
  name?: string;
  children: ReactNode;
  type?: 'submit';
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorMessageTextStyle?: StyleProp<TextStyle>;
  errorMessageViewStyle?: StyleProp<ViewStyle>;
  rules?: Array<{
    required?: boolean;
    message?: string;
    type?: 'email' | 'url' | 'string' | 'number' | 'array' | 'object';
    min?: number;
    max?: number;
    warningOnly?: boolean;
    pattern?: RegExp;
  }>;
}

const FormItem: FC<IFormItemProps> = ({
  name,
  children,
  type,
  label,
  labelStyle,
  submitButtonStyle,
  rules = [],
  errorMessageTextStyle,
  errorMessageViewStyle,
}) => {
  const useForm = useFormikContext();

  useEffect(() => {
    //TO make sure all field are recoded
    //@ts-ignore
    if (name && useForm.values && !useForm.values[name]) {
      useForm.setFieldValue(name, '');
    }
  }, []);

  if (type === 'submit') {
    return (
      <View style={[styles.buttonSubmit, submitButtonStyle]}>
        <Field name="submit">
          {({form}: any) => (
            <TouchableOpacity
              onPress={() => {
                form.submitForm();
              }}>
              {children}
            </TouchableOpacity>
          )}
        </Field>
      </View>
    );
  }
  const validate = (value: any) => {
    // If the field is empty and not required, skip validation
    if (!value && !rules.some(rule => rule.required)) {
      return undefined;
    }

    const min = rules.find(rule => !!rule.min)?.min;
    const max = rules.find(rule => !!rule.max)?.max;

    for (const rule of rules) {
      if (rule.required && !value) {
        return rule.message || 'This field is required';
      }

      if (value) {
        if (rule.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            return rule.message || 'Invalid email';
          }
        }

        if (rule.type === 'url') {
          const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
          if (!urlRegex.test(value) && !rule.warningOnly) {
            return rule.message || 'Invalid URL';
          }
        }

        if (rule.type === 'number') {
          const numericValue = parseFloat(value);
          if (isNaN(numericValue)) {
            return rule.message || 'Value must be a number';
          }
          if (
            numericValue < (min || -Infinity) ||
            numericValue > (max || Infinity)
          ) {
            return rule.message || `Value must be between ${min} and ${max}`;
          }
        }
        if (rule.type === 'array' && Array.isArray(value)) {
          if (value.length < (min || 0)) {
            return rule.message || `Array must have at least ${min} items`;
          }
          if (value.length > (max || Infinity)) {
            return rule.message || `Array must have no more than ${max} items`;
          }
        }

        if (
          rule.type === 'object' &&
          typeof value === 'object' &&
          !Array.isArray(value)
        ) {
          const keys = Object.keys(value);
          if (keys.length < (min || 0)) {
            return rule.message || `Object must have at least ${min} keys`;
          }
          if (keys.length > (max || Infinity)) {
            return rule.message || `Object must have no more than ${max} keys`;
          }
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          return rule.message || 'Invalid format';
        }
      }
    }

    return undefined;
  };

  return (
    <View style={styles.formItem}>
      {label && <Text style={[{marginBottom: 5}, labelStyle]}>{label}</Text>}
      {name ? (
        <Field name={name} validate={validate}>
          {({field, form}: any) => (
            <View>
              {React.cloneElement(children as React.ReactElement<any>, {
                ...field,
                onChangeText: (text: string) => {
                  form.setFieldValue(name, text);
                },
                value: form.values[name],
                onValueChange: (value: boolean) => {
                  form.setFieldValue(name, value);
                },
                onSelect: (value: string) => {
                  form.setFieldValue(name, value);
                },
                onChange: (value: any) => {
                  if (value?.nativeEvent?.text) {
                    return;
                  }
                  form.setFieldValue(name, value);
                },
                onSelectedItemsChange: (value: any) => {
                  form.setFieldValue(name, value);
                },

                onBlur: () => {
                  form.setFieldTouched(name, true);
                },
              })}
              <ErrorMessage name={name}>
                {msg => (
                  <View style={[errorMessageViewStyle]}>
                    <Text style={[styles.errorText, errorMessageTextStyle]}>
                      {msg}
                    </Text>
                  </View>
                )}
              </ErrorMessage>
            </View>
          )}
        </Field>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSubmit: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formItem: {
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
  },
});

export default FormItem;
