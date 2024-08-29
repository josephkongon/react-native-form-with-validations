import React, {FC, ReactNode, useEffect, useState} from 'react';
import {useColorScheme, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

interface IDropdownSelectForm {
  items: IItems[];
  placeholder?: string;
  value?: string;
  onSelect?: (value: string) => void;
  borderColor?: string;
  selectedColor?: string;
  buttonStyle?: any;
  search?: boolean;
  searchPlaceHolder?: string;
  disabled?: boolean;
  borderRadios?: string;
  rightIcon?: ReactNode;
}

interface IItems {
  label: string;
  value: string;
}

const DropdownSelectForm: FC<IDropdownSelectForm> = ({
  items,
  placeholder,
  value,
  onSelect,
  selectedColor,
  borderColor,
  buttonStyle,
  search,
  searchPlaceHolder,
  disabled,
  borderRadios,
  rightIcon,
}) => {
  const colorScheme = useColorScheme();
  const [defaultSelect, setDefaultSelect] = useState<number | undefined>();
  useEffect(() => {
    if (items.length) {
      const getIndex = items.findIndex(item => item.value === value);
      setDefaultSelect(getIndex);
    }
  }, [value, items]);

  return (
    <View>
      <SelectDropdown
        disabled={disabled}
        dropdownStyle={{
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        }}
        search={search}
        searchInputTxtColor={colorScheme === 'dark' ? '#fff' : '#000'}
        searchPlaceHolder={searchPlaceHolder || 'Search'}
        searchInputStyle={{
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        }}
        buttonStyle={{
          width: '100%',
          padding: 0,
          borderWidth: 0.8,
          borderRadius: borderRadios || 10,
          backgroundColor: 'transparent',
          borderColor: borderColor
            ? borderColor
            : colorScheme === 'dark'
            ? '#fff'
            : '#000',
        }}
        defaultButtonText={placeholder}
        data={items}
        buttonTextStyle={[
          {
            paddingVertical: 10,
            textAlign: 'left',
            color: colorScheme === 'dark' ? '#fff' : '#000',
          },
          buttonStyle,
        ]}
        selectedRowTextStyle={{
          color: selectedColor
            ? selectedColor
            : colorScheme === 'dark'
            ? '#fff'
            : '#000',
          fontWeight: '700',
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderColor: selectedColor
            ? selectedColor
            : colorScheme === 'dark'
            ? '#fff'
            : '#000',
        }}
        rowTextStyle={{
          padding: 0,
          margin: 0,
          color: selectedColor
            ? selectedColor
            : colorScheme === 'dark'
            ? '#fff'
            : '#000',
        }}
        defaultValueByIndex={defaultSelect}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.label;
        }}
        rowTextForSelection={(item, index) => {
          return item.label;
        }}
        dropdownIconPosition={'right'}
        onSelect={(e: string) => {
          onSelect?.(e);
        }}
        renderDropdownIcon={() => {
          return <>{rightIcon ? rightIcon : <></>}</>;
        }}
      />
    </View>
  );
};

export default DropdownSelectForm;
