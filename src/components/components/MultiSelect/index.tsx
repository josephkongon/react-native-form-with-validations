import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

const {height: screenHeight} = Dimensions.get('window');

type Item = {
  label: string;
  value: string | number;
  disable?: boolean;
};

type MultiSelectProps = {
  items: Item[];
  onSelectionChange?: (selectedValues: (string | number)[]) => void;
  placeholder?: string;
  primaryColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  value?: (string | number)[];
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  items,
  onSelectionChange,
  placeholder,
  primaryColor = '#3498db',
  buttonStyle,
  value,
}) => {
  const colorSchema = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (value) {
      setSelectedValues(value);
    }
  }, []);

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Toggle item selection
  const toggleItem = (item: Item) => {
    const updatedSelectedValues = selectedValues.includes(item.value)
      ? selectedValues.filter(v => v !== item.value)
      : [...selectedValues, item.value];

    setSelectedValues(updatedSelectedValues);
    onSelectionChange?.(updatedSelectedValues);
  };

  const removeItem = (value: string | number) => {
    const updatedSelectedValues = selectedValues.filter(v => v !== value);
    setSelectedValues(updatedSelectedValues);
    onSelectionChange?.(updatedSelectedValues);
  };

  const renderItem = ({item}: {item: Item}) => {
    const isSelected = selectedValues.includes(item.value);
    const isDisabled = item.disable;

    return (
      <TouchableOpacity
        style={[
          styles.item,
          isDisabled && styles.disabledItem, // Apply disabled styling
        ]}
        onPress={() => !isDisabled && toggleItem(item)} // Only toggle if not disabled
        disabled={isDisabled} // Disable touch interaction
      >
        <Text
          style={[
            styles.itemText,
            {color: colorSchema !== 'dark' ? '#000' : '#fff'},
            isSelected && {color: primaryColor},
            isDisabled && styles.disabledItemText, // Apply text styling for disabled state
          ]}>
          {item.label}
        </Text>
        <Text style={[styles.checkbox, {color: primaryColor}]}>
          {isSelected ? '✓' : '□'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          {
            padding: 14,
            backgroundColor: 'transparent',
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: colorSchema !== 'dark' ? '#000' : '#fff',
          },
          buttonStyle,
        ]}
        onPress={() => setModalVisible(true)}>
        <View style={styles.selectedItemsContainer}>
          {selectedValues.length > 0 ? (
            selectedValues.map(value => {
              const item = items.find(i => i.value === value);
              if (item) {
                return (
                  <TouchableOpacity
                    key={value}
                    style={[
                      {
                        padding: 10,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: colorSchema !== 'dark' ? '#000' : '#fff',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 5,
                      },
                      {borderColor: primaryColor},
                    ]}
                    onPress={() => removeItem(value)}>
                    <Text
                      style={[
                        {
                          color: colorSchema !== 'dark' ? '#000' : '#fff',
                          fontSize: 14,
                        },
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }
              return null;
            })
          ) : (
            <Text
              style={[
                {fontSize: 16, color: colorSchema !== 'dark' ? '#000' : '#fff'},
              ]}>
              {placeholder}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={[styles.modalContainer]}>
          <View
            style={[
              styles.modalContent,
              {backgroundColor: colorSchema === 'dark' ? '#000' : '#fff'},
            ]}>
            <TextInput
              style={[
                styles.searchBar,
                {color: colorSchema !== 'dark' ? '#000' : '#fff'},
              ]}
              placeholderTextColor={'#ccc'}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={item => item.value.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.itemList}
            />
            <TouchableOpacity
              style={[styles.confirmButton, {backgroundColor: primaryColor}]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MultiSelect;

const styles = StyleSheet.create({
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    maxHeight: screenHeight * 0.7,
    marginHorizontal: 20,

    borderRadius: 8,
    paddingTop: 20,
    paddingBottom: 60,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchBar: {
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  itemList: {
    paddingBottom: 10,
  },
  item: {
    padding: 15,
    paddingRight: 30, // Add space for checkbox on the right
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align checkbox to the right
  },
  checkbox: {
    fontSize: 18,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    flexShrink: 1,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledItem: {
    backgroundColor: '#f0f0f0',
    opacity: 0.6,
  },
  disabledItemText: {
    color: '#a0a0a0',
  },
});
