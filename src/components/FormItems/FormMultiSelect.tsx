import React, {FC} from 'react';
import {View} from 'react-native';
import MultiSelect from '~src/components/components/MultiSelect';

interface Items {
  label: string;
  value: string | number;
}

interface IProps {
  items: Items[];
  onSelectedItemsChange?: (selectedValues: (string | number)[]) => void;
  value?: any;
}

const FormMultiSelect: FC<IProps> = ({value, onSelectedItemsChange, items}) => {
  return (
    <View>
      <MultiSelect
        items={items}
        onSelectionChange={onSelectedItemsChange}
        placeholder="Select items"
        value={value}
      />
    </View>
  );
};

export default FormMultiSelect;
