import React, {FC} from 'react';
import {View} from 'react-native';
import RadioButton from './RadioButton.tsx';
import {IRadioButtonProps} from '~src/types/interface.ts';

interface IRadiosGroupProps extends IRadioButtonProps {
  options: Array<{label: string; value: string}>;
  value?: string;
  onChange?: (value: string) => void;
}

const RadiosGroup: FC<IRadiosGroupProps> = ({
  options,
  value,
  onChange,
  ...props
}) => {
  return (
    <View>
      {options.map((option, index) => {
        return (
          <RadioButton
            {...props}
            selected={option.value === value}
            key={index}
            label={option.label}
            onPress={() => {
              onChange?.(option.value);
            }}
          />
        );
      })}
    </View>
  );
};

export default RadiosGroup;
