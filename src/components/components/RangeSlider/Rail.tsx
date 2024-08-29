import React, {memo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface IRail {
  viewStyle?: StyleProp<ViewStyle>;
}

const Rail = ({viewStyle}: IRail) => {
  return <View style={[styles.root, viewStyle]} />;
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7f7f7f',
  },
});
