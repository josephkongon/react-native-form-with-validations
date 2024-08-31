/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {
  DropdownSelectForm,
  Form,
  FormCheckbox,
  FormDatePicker,
  FormInput,
  FormItem,
  FormMultiSelect,
  FormPickerSelect,
  FormRadioGroup,
  FormRangeSlider,
  FormSlider,
  FormSwitch,
} from './src/components';
import {items} from './src/types/constands.ts';

function App(): React.JSX.Element {
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    acceptTerms: true,
    options: '',
    date: '',
    radios: '',
  });

  const handleSubmit = (values: any) => {
    console.log({values});
  };
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Form initialValues={initialValues} onSubmit={handleSubmit}>
          <FormItem name="name" label={'Name'} rules={[{required: true}]}>
            <FormInput placeholder="Name" />
          </FormItem>

          <FormItem
            name="email"
            rules={[
              {required: true, message: 'Please enter your email'},
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
              {},
            ]}
            label={'Email'}>
            <FormInput placeholder="Email" />
          </FormItem>

          <FormItem
            rules={[{required: true}]}
            name="password"
            label={'Password'}>
            <FormInput placeholder="Password" password={true} />
          </FormItem>

          <FormItem
            name="regexp"
            label={'Regexp'}
            rules={[
              {
                pattern: new RegExp(/^(\d+|\*)\.(\d+|\*)\.(\d+|\*)$/),
                message: 'Patten does not match',
              },
            ]}>
            <FormInput placeholder="5*" />
          </FormItem>

          <FormItem
            name="age"
            rules={[{type: 'number', message: 'Age must be a number'}]}
            label={'Age'}>
            <FormInput placeholder="Age" />
          </FormItem>

          <FormItem
            name="url"
            label={'Url'}
            rules={[{type: 'url', message: 'url is not valid'}]}>
            <FormInput placeholder="Url" />
          </FormItem>

          <FormItem name="acceptTerms">
            <FormSwitch label={'Nice'} />
          </FormItem>

          <FormItem name="check">
            <FormCheckbox label={'Check box'} />
          </FormItem>

          <FormItem name="radios">
            <FormRadioGroup
              mode={'ios'}
              options={[
                {label: 'Option 1', value: '1'},
                {label: 'Option 2', value: '2'},
                {label: 'Option 3', value: '3'},
              ]}
              label={'Radios select'}
            />
          </FormItem>

          <FormItem name="slider" rules={[]}>
            <FormSlider
              // step={1}
              maximumValue={100}
              minimumValue={0}
              label={'Select Distance'}
            />
          </FormItem>

          <FormItem name="range" rules={[]}>
            <FormRangeSlider min={1} max={100} step={1} />
          </FormItem>

          <FormItem name="options" label={'Select an option'}>
            <DropdownSelectForm
              search={true}
              items={[
                {label: 'Text1', value: '1'},
                {label: 'Text2', value: '2'},
                {label: 'Text3', value: '3'},
              ]}
              placeholder={'Select Option'}
            />
          </FormItem>

          <FormItem name="pickerSelect" label={'Picker Select'}>
            <FormPickerSelect
              mode={'dialog'}
              items={[
                {label: 'Text1', value: '1'},
                {label: 'Text2', value: '2'},
                {label: 'Text3', value: '3'},
              ]}
            />
          </FormItem>

          <FormItem name="multiSelect" label={'Select items'}>
            <FormMultiSelect items={items} />
          </FormItem>

          <FormItem name="date" label={'Pick a date'}>
            <FormDatePicker label={'Pick a date'} mode={'date'} />
          </FormItem>
          <FormItem type="submit">
            <View
              style={{
                width: 250,
                height: 50,
                backgroundColor: 'blue',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>Submit</Text>
            </View>
          </FormItem>
        </Form>
        {/*<FormDatePicker />*/}
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
