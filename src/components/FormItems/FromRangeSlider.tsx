/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useCallback} from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import RangeSlider, {SliderProps} from 'rn-range-slider';
import Thumb from '~src/components/components/RangeSlider/Thumb.tsx';
import Rail from '~src/components/components/RangeSlider/Rail.tsx';
import RailSelected from '~src/components/components/RangeSlider/RailSelected.tsx';
import Label from '~src/components/components/RangeSlider/Label.tsx';
import Notch from '~src/components/components/RangeSlider/Notch.tsx';

interface IFormRangeSlider
  extends Omit<
    SliderProps,
    'FormRangeSlider' | 'renderThumb' | 'renderRail' | 'renderRailSelected'
  > {
  onSelect?: (value: number[]) => void;
  rootHighStyle?: StyleProp<ViewStyle>;
  lowHighStyle?: StyleProp<ViewStyle>;
  railViewStyle?: StyleProp<ViewStyle>;
  railSelectedViewStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  labelViewStyle?: StyleProp<ViewStyle>;
  notchViewStyle?: StyleProp<ViewStyle>;
}

const FormRangeSlider: FC<IFormRangeSlider> = ({
  onSelect,
  rootHighStyle,
  railSelectedViewStyle,
  railViewStyle,
  labelStyle,
  labelViewStyle,
  notchViewStyle,
  lowHighStyle,
  ...props
}) => {
  const renderThumb = useCallback(
    (name: 'low' | 'high') => (
      <Thumb
        lowHighStyle={lowHighStyle}
        rootHighStyle={rootHighStyle}
        name={name}
      />
    ),
    [],
  );
  const renderRail = useCallback(() => <Rail viewStyle={railViewStyle} />, []);

  const renderRailSelected = useCallback(
    () => <RailSelected viewStyle={railSelectedViewStyle} />,
    [],
  );
  const renderLabel = useCallback(
    (value: number) => (
      <Label
        viewStyle={labelViewStyle}
        textStyle={labelStyle}
        text={value.toString()}
      />
    ),
    [],
  );
  const renderNotch = useCallback(
    () => <Notch viewStyle={notchViewStyle} />,
    [],
  );

  const handleValueChange = useCallback((low: number, high: number) => {
    onSelect?.([low, high]);
  }, []);
  return (
    <View style={{marginTop: 25}}>
      <RangeSlider
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
        {...props}
      />
    </View>
  );
};

export default FormRangeSlider;
