import {useContext, useEffect} from 'react';
import {FormikContext} from 'formik';

/**
 * Custom hook to listen to form value changes and state
 * @param callback Function to be called whenever the form values change
 */
const useFormListener = (callback: (values: any) => void) => {
  const formik = useContext(FormikContext);

  useEffect(() => {
    if (formik) {
      callback(formik.values);
    }
  }, [formik.values, callback]);
};

export default useFormListener;
