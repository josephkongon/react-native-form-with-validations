# React Native Form Library

This library provides a set of customizable form components for React Native, making it easier to build forms with
various types of input fields and validation rules.

## Installation

yarn add react-native-easy-forms
npm install react-native-easy-forms

## Components

### `Form`

The `Form` component is the container for all form items. It manages form state, validation, and submission.

- **Props:**
    - `initialValues` (object): Initial values for the form fields.
    - `onSubmit` (function): Callback function to handle form submission.

### `FormItem`

The `FormItem` component is used to wrap individual form fields. It handles validation rules and labels.

- **Props:**
    - `name` (string): The name of the form field. This should match the key in `initialValues`.
    - `label` (string): The label for the form field.
    - `rules` (array): Validation rules for the form field. Each rule is an object that may contain:
        - `required` (boolean): Whether the field is required.
        - `message` (string): The error message to display if the validation fails.
        - `type` (string): The type of validation (e.g., 'email', 'number', 'url').
        - `pattern` (RegExp): A regular expression for custom validation.

### `FormInput`

The `FormInput` component is a text input field.

- **Props:**
    - `placeholder` (string): Placeholder text for the input field.
    - `password` (boolean): Whether the input is a password field.

### `FormSwitch`

The `FormSwitch` component is a switch toggle.

- **Props:**
    - `label` (string): The label for the switch.

### `FormCheckbox`

The `FormCheckbox` component is a checkbox input.

- **Props:**
    - `label` (string): The label for the checkbox.

### `FormRadioGroup`

The `FormRadioGroup` component is a group of radio buttons.

- **Props:**
    - `mode` (string): The display mode ('ios' or 'android').
    - `options` (array): An array of options, where each option is an object with `label` and `value` properties.
    - `label` (string): The label for the radio group.

### `FormSlider`

The `FormSlider` component is a slider input.

- **Props:**
    - `maximumValue` (number): The maximum value for the slider.
    - `minimumValue` (number): The minimum value for the slider.
    - `label` (string): The label for the slider.

### `FormRangeSlider`

The `FormRangeSlider` component is a range slider input.

- **Props:**
    - `min` (number): The minimum value for the range slider.
    - `max` (number): The maximum value for the range slider.
    - `step` (number): The step value for the range slider.

### `FormPickerSelect`

The `FormPickerSelect` component is a picker select input.

- **Props:**
    - `mode` (string): The display mode ('dialog' or 'dropdown').
    - `items` (array): An array of items, where each item is an object with `label` and `value` properties.

### `DropdownSelectForm`

The `DropdownSelectForm` component is a dropdown select input.

- **Props:**
    - `search` (boolean): Whether to enable search functionality.
    - `items` (array): An array of items, where each item is an object with `label` and `value` properties.
    - `placeholder` (string): The placeholder text for the dropdown.

### `FormMultiSelect`

The `FormMultiSelect` component is a multi-select input.

- **Props:**
    - `items` (array): An array of items, where each item is an object with `label` and `value` properties.

### `FormDatePicker`

The `FormDatePicker` component is a date picker input.

- **Props:**
    - `label` (string): The label for the date picker.
    - `mode` (string): The display mode ('date' or 'datetime').

## Usage

Here's a sample usage of the library:

```javascript

function App() {
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    acceptTerms: true,
    options: '',
    date: '',
    radios: '',
  });

  const handleSubmit = (values) => {
    console.log({values});
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Form initialValues={initialValues} onSubmit={handleSubmit}>
          <FormItem name="name" label={'Name'}>
            <FormInput placeholder="Name"/>
          </FormItem>
          {/* Add other FormItem components here */}
          <FormItem type="submit">
            <Text>Submit</Text>
          </FormItem>
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;


```

## With validation

-RegExp

```
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
```

-Number

```
       <FormItem
            name="age"
             rules={[{type: 'number', message: 'Age must be a number'}]}
            label={'Age'}>
            <FormInput placeholder="Age" />
          </FormItem>
```

-URL

```
      <FormItem
            name="url"
            label={'Url'}
            rules={[{type: 'url', message: 'url is not valid'}]}>
            <FormInput placeholder="Url" />
          </FormItem>
```

-Email

```
 <FormItem
            name="email"
            rules={[
              {required: false, message: 'Please enter your email'},
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
            ]}
            label={'Email'}>
            <FormInput placeholder="Email" />
          </FormItem>
```

-Password

```
      <FormItem name="password" label={'Password'}>
            <FormInput placeholder="Password" password={true} />
          </FormItem>
```
