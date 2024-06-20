import React, { useState } from "react";
import { EventType } from "expo-linking";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { COLORS, textSIZES, viewSIZES } from "../constants";
import { Spacer } from "../utils";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';


export const Sidebar = () => {

    return (
        <View style={styles.sidebar}>
            <Text>Coming soon!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebar: {
        // alignItems: 'flex-start',
        backgroundColor: COLORS({opacity:1}).lightWhite,
        borderRightWidth: 1,
        // display: 'flex',
        // flexDirection: 'column',
        // height: 1024,
        // position: 'relative',
        marginHorizontal: viewSIZES.small,
        flex: 1,
    },
});