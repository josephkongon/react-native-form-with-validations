import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

export const Checkbox = ({label, value, onValueChange}: any) => {
  return (
    <View style={styles.checkboxContainer}>
      <Text>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
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
