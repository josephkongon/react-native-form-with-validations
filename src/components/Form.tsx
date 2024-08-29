import React, {FC, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import {FormikConfig} from 'formik/dist/types';

interface IFormProps
  extends Omit<FormikConfig<any>, 'initialValues' | 'onSubmit'> {
  children: ReactNode;
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  initialValues: any;
}

const Form: FC<IFormProps> = ({
  children,
  onSubmit,
  initialValues,
  ...FormConfig
}) => {
  return (
    <View style={styles.formContainer}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} {...FormConfig}>
        {(formikProps: FormikProps<any>) => (
          <View>
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                // @ts-ignore
                return React.cloneElement(child, {formikProps});
              }
              return child;
            })}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
});

export default Form;
