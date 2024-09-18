import {useContext, useEffect, useRef} from 'react';
import {FormikContext} from 'formik';

/**
 * Custom hook to listen to form value changes and state
 * @param callback Function to be called whenever the form values change
 */
const useFormListener = (callback: (values: any) => void) => {
  const formik = useContext(FormikContext);
  const prevValuesRef = useRef(formik?.values);

  useEffect(() => {
    if (formik && formik.values !== prevValuesRef.current) {
      prevValuesRef.current = formik.values;
      callback?.(formik.values);
    }
  }, [formik?.values, callback]);
};

export default useFormListener;
