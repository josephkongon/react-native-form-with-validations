import React, {memo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface IRailSelected {
  viewStyle?: StyleProp<ViewStyle>;
}

const RailSelected = ({viewStyle}: IRailSelected) => {
  return <View style={[styles.root, viewStyle]} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 4,
    backgroundColor: '#4499ff',
    borderRadius: 2,
  },
});
