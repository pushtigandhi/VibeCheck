import React from "react";
import { View, Text } from 'react-native';
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";
// import {
//     HomeNavigation, ScreenHeaderBtn, Welcome
// } from '../components/index';

import { Spacer } from '../utils';
import HomeNavigation from "./HomeNavigation";

export default function HomeScreen () {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeMessage}>Hello, Pushti</Text>
            </View>
            <Spacer size={20} />
            <HomeNavigation size={50}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    welcomeMessage: {
        //fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
        textAlign: 'center'
      },
});