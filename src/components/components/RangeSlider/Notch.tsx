import React, {FC, memo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface INotch {
  viewStyle?: StyleProp<ViewStyle>;
}

const Notch: FC<INotch> = ({viewStyle}) => {
  return <View style={[styles.root, viewStyle]} />;
};

export default memo(Notch);

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});
