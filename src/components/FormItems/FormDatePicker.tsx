import React, {FC, useEffect} from 'react';
import {
  Text,
  TouchableNativeFeedback,
  useColorScheme,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface IFormDatePickerProps {
  mode: 'date' | 'time' | 'datetime';
  onChange?: (date: number) => void;
  label: string;
  value?: number | string | Date;
  borderColor?: string;
  textColor?: string;
  rightColor?: string;
  borderRadios?: string;
}

const FormDatePicker: FC<IFormDatePickerProps> = ({
  mode,
  onChange,
  label,
  borderColor,
  value,
  textColor,
  rightColor,
  borderRadios,
}) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<number>();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (typeof value === 'number') {
      setDate(value);
    } else if (typeof value === 'string') {
      setDate(new Date(value).getTime());
    } else if (value instanceof Date) {
      setDate(value.getTime());
    }
  }, [value]);

  console.log(value);
  return (
    <View style={{flex: 1}}>
      <TouchableNativeFeedback
        onPress={() => {
          setOpen(prevState => !prevState);
        }}>
        <View
          style={{
            height: 60,
            borderWidth: 0.5,
            borderRadius: borderRadios || 8,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            borderColor: borderColor
              ? borderColor
              : colorScheme === 'dark'
              ? '#fff'
              : '#000',
          }}>
          <View
            style={{
              height: '100%',
              width: 8,
              backgroundColor: rightColor || '#ff7a2a',
              borderTopLeftRadius: borderRadios || 8,
              borderBottomLeftRadius: borderRadios || 8,
            }}
          />
          <Text
            style={{
              color: textColor
                ? textColor
                : colorScheme === 'dark'
                ? '#fff'
                : '#000',
              fontSize: 18,
              fontWeight: '500',
            }}>
            {date ? new Date(date).toLocaleString() : label}
          </Text>
        </View>
      </TouchableNativeFeedback>
      {open && (
        <DateTimePicker
          mode={mode}
          value={date ? new Date(date) : new Date()}
          onChange={dateTime => {
            setOpen(false);
            //@ts-ignore
            if (mode === 'date') {
              onChange?.(new Date(dateTime.nativeEvent.timestamp).getTime());
            }
            if (mode === 'time') {
              onChange?.(new Date(dateTime.nativeEvent.timestamp).getTime());
            }
          }}
        />
      )}
    </View>
  );
};

export default FormDatePicker;
