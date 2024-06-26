import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS, textSIZES, viewSIZES } from '../constants';
import { Ionicons } from '@expo/vector-icons';

const SingleSelectDropdown = ({ options, placeholder = "Select", icon, setFn, isDisabled=false }) => {
    const [value, setValue] = useState(null);

    const renderItem = (item) => {
        return (
            <View style={[styles.item, 
            {backgroundColor: item.value === value ? COLORS({opacity:1}).lightWhite:COLORS({opacity:1}).white}]}>
                <Text style={styles.textItem}>{item.label}</Text>
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
            data={options}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
                setValue(item.value);
                setFn(item.value);
            }}
            renderLeftIcon={() => icon}
            renderItem={renderItem}
            disable={isDisabled}
        />
    );
};

export default SingleSelectDropdown;

const styles = StyleSheet.create({
    dropdown: {
        margin: textSIZES.xSmall,
        height: 40,
        backgroundColor: COLORS({ opacity: 1 }).lightWhite,
        borderRadius: textSIZES.xSmall,
        padding: textSIZES.xSmall,
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
        color: COLORS({ opacity: 1 }).navy,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: textSIZES.small,
        color: COLORS({ opacity: 1 }).navy,
    },
    placeholderStyle: {
        fontSize: textSIZES.small,
        color: COLORS({ opacity: 1 }).navy,
    },
    selectedTextStyle: {
        fontSize: textSIZES.small,
        color: COLORS({ opacity: 1 }).navy,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderRadius: textSIZES.xSmall,
    },
    containerStyle: {
        borderBottomLeftRadius: textSIZES.xSmall,
        borderBottomRightRadius: textSIZES.xSmall,
    },
});