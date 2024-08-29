import React, {FC} from 'react';
import {StyleProp, TextStyle, View} from 'react-native';
import {Picker, PickerProps} from '@react-native-picker/picker';

interface IFormPickerSelect extends PickerProps {
  items: IItems[];
  value?: string;
  onSelect?: (value: string | number) => void;
  itemStyle?: StyleProp<TextStyle>;
}

interface IItems {
  label: string;
  value: string;
  disabled?: boolean;
}

const FormPickerSelect: FC<IFormPickerSelect> = ({
  items,
  value,
  onSelect,
  itemStyle,
  ...props
}) => {
  return (
    <View>
      <Picker
        placeholder={'Select Language'}
        // mode={'dropdown'}
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => onSelect?.(itemValue)}
        {...props}>
        {items.map((item, index) => {
          return (
            <Picker.Item
              key={index}
              label={item.label}
              value={item.value}
              enabled={item.disabled !== null ? !item.disabled : item.disabled}
              style={[{}, itemStyle]}
            />
          );
        })}
      </Picker>
    </View>
  );
};

export default FormPickerSelect;
