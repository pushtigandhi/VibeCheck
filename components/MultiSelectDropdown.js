import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { COLORS, SIZES } from '../constants';
import { Ionicons } from "@expo/vector-icons";

const MultiSelectDropdown = ({ data, placeholder="Select items", defaultValue=[], icon }) => {
  const [selected, setSelected] = useState(defaultValue);

  const renderItem = item => {
    return (
        
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        {/* <AntDesign style={styles.icon} color="black" name="Safety" size={20} /> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selected}
        search
        searchPlaceholder="Search..."
        onChange={item => {
          setSelected(item);
        }}
        renderLeftIcon={() => (
            <>{icon}</>
        )}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <Ionicons name={"close-circle-sharp"} size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MultiSelectDropdown;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 40,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: SIZES.medium,
    color: COLORS({opacity:1}).navy,
  },
  selectedTextStyle: {
    fontSize: SIZES.medium,
    color: COLORS({opacity:1}).navy,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
    color: COLORS({opacity:1}).navy,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: SIZES.small,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: SIZES.medium,
  },
});