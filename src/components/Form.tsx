import React from 'react';
import {View} from 'react-native';

const FormComponent = () => {
  return <View style={styles.formContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});

export default FormComponent;
