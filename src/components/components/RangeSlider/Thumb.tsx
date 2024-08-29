import React, {memo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

const THUMB_RADIUS_LOW = 12;
const THUMB_RADIUS_HIGH = 16;

interface IThumb {
  name: 'low' | 'high';
  rootHighStyle?: StyleProp<ViewStyle>;
  lowHighStyle?: StyleProp<ViewStyle>;
}

const Thumb = ({name, rootHighStyle, lowHighStyle}: IThumb) => {
  return (
    <View
      style={
        name === 'high'
          ? [styles.rootHigh, rootHighStyle]
          : [styles.rootLow, lowHighStyle]
      }
    />
  );
};

const styles = StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#aaaaaa',
  },
  rootHigh: {
    width: THUMB_RADIUS_HIGH * 2,
    height: THUMB_RADIUS_HIGH * 2,
    borderRadius: THUMB_RADIUS_HIGH,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
  },
});

export default memo(Thumb);
