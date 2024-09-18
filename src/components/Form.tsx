import React, {FC, ReactNode, useContext, useEffect, useRef} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Formik, FormikContext, FormikHelpers, FormikProps} from 'formik';
import {FormikConfig} from 'formik/dist/types';

interface IFormProps
  extends Omit<FormikConfig<any>, 'initialValues' | 'onSubmit'> {
  children: ReactNode;
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  initialValues: any;
  style?: StyleProp<ViewStyle>;
  formWatch?: (values: any) => void;
}

const Form: FC<IFormProps> = ({
  children,
  onSubmit,
  initialValues,
  style,
  formWatch,
  ...FormConfig
}) => {
  return (
    <View style={style}>
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
            <FormWatch callback={formWatch} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const FormWatch = ({callback}: {callback?: (i: any) => void}) => {
  const formik = useContext(FormikContext);
  const prevValuesRef = useRef(formik?.values);

  useEffect(() => {
    if (formik && formik.values !== prevValuesRef.current) {
      prevValuesRef.current = formik.values;
      callback?.(formik.values);
    }
  }, [formik?.values, callback]);

  return null;
};

export default Form;
