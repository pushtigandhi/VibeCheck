import React from "react";
import { View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
// import {
//     HomeNavigation, ScreenHeaderBtn, Welcome
// } from '../components/index';

import { Spacer } from '../utils';
import { SixteenPopupUser } from "../assets/icons/SixteenPopupUser"
import { Frame } from "./cards/DailyCalendar";

export default function HomeScreen () {
    const active = "class";
    const mobile = true;
    const property = "day";
    const serachIconButtonColor = "#6A778B";
    return (
        <View style={styles.container}>
            <Spacer size={40} />
            <View style={styles.row}>
                <View >
                <TouchableOpacity style={styles.profileButton}>
                    <SixteenPopupUser style={styles.elementPopupUser} color="#229FD0"  />
                </TouchableOpacity>
                </View>

                <View style={styles.intention}>

                </View>
            </View>
            <Spacer size={20} />

            <View 
                style={[
                        styles.row,
                        styles.overlapGroup,
                    ]}
            >
                <Frame />
            </View>
            <Spacer size={20} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: "space-between",
        //alignItems: "center",
        padding: SIZES.medium,
        borderRadius: SIZES.xLarge,
        backgroundColor: "#FFF",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
        marginBottom: SIZES.xSmall,
    },
    overlapGroup: {
        borderWidth: 1,
        borderColor: '#aad6e7',
        borderRadius: 6,
        height: 100,
        width: 450,
    },
    elementPopupUser: {
      height: 34,
      position: 'absolute',
      width: 33,
    },
    profileButton: {
      borderColor: '#aad6e7',
      borderRadius: 100,
      height: 100,
      left: 0,
      position: 'absolute',
      width: 100,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    intention: {
        borderWidth: 1,
        borderColor: '#aad6e7',
        borderRadius: 6,
        height: 100,
        width: 250,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        //alignItems: "baseline",
    },
    column: {
        flexDirection: "column",
        justifyContent: "space-between",
        //alignItems: "baseline",
    },
  });