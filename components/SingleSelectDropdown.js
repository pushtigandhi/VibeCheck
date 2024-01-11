import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS, SIZES } from '../constants';
import { Ionicons } from "@expo/vector-icons";


const SingleSelectDropdown = ({ data, placeholder="Select item", defaultValue="", icon }) => {
    const [value, setValue] = useState(defaultValue);

    const renderItem = item => {
        return (
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
            {/* {item.value === value && (
                <Ionicons name={"folder-open-outline"} size={20} style={styles.icon} />
            )} */}
        </View>
        );
    };

    return (
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.containerStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
            setValue(item.value);
        }}
        renderLeftIcon={() => (
            <>{icon}</>
        )}
        renderItem={renderItem}
        />
    );
};

export default SingleSelectDropdown;

const styles = StyleSheet.create({
    dropdown: {
        margin: SIZES.small,
        height: 40,
        backgroundColor: COLORS({opacity:1}).lightWhite,
        borderRadius: SIZES.xSmall,
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
    textItem: {
        flex: 1,
        fontSize: SIZES.medium,
        color: COLORS({opacity:1}).navy,
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
        borderRadius: SIZES.small,
    },
    containerStyle: {
        borderBottomLeftRadius:SIZES.small,
        borderBottomRightRadius:SIZES.small,
    },
});