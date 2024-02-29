import React from "react";
import { View, TouchableOpacity, Text, TextInput, RefreshControl, SafeAreaView } from 'react-native';
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import HomeNavigation from "./HomeNavigation";

import { Spacer } from '../utils';
import { SixteenPopupUser } from "../assets/icons/SixteenPopupUser"
import { CalendarWeek } from "../assets/icons/CalendarWeek";
import { PlusCircle } from "../assets/icons/PlusCircle";
import { SolidBars } from "../assets/icons/SolidBars";

import { DailyCalendar } from "./partialViews/DailyCalendar";
import { WeeklyCalendar } from "./partialViews/WeeklyCalendar";
import { MonthlyCalendar } from "./partialViews/MonthlyCalendar";
import { useNavigation } from "@react-navigation/native";
import { ToolBar } from "../components/Toolbar";

import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

export default function HomeScreen ({ navigation, route }) {
    const active = "class";
    const mobile = true;

    const [state, setState] = useState("day");

    const [refreshing, setRefreshing] = useState(false);
    const [showSidebar, toggleShowSidebar] = useState(false);


    const onRefresh = React.useCallback(() => {
        //setRefreshing(false);
    });

    const toggleSidebar = React.useCallback(() => {
        setRefreshing(true);
        if (!showSidebar) { 
            toggleShowSidebar(true);
            setRefreshing(false);
        }
        else { 
            toggleShowSidebar(false);
            setRefreshing(false);
        }
    });

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View >
                    <TouchableOpacity style={styles.profileButton}>
                        <SixteenPopupUser style={styles.elementPopupUser} color="#229FD0"  />
                    </TouchableOpacity>
                    </View>

                    <TextInput style={styles.intention} />
                </View>
                <Spacer size={20} />
                <View style={styles.calendarContainer} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                    <ToolBar
                        mobile={true}
                        property1={state}
                        onRefresh={toggleSidebar}
                        showSidebar={showSidebar}
                    />
                    {state === 'day' && (
                        <DailyCalendar showSidebar={showSidebar} />
                    )}
                    {state === 'week' && (
                        <WeeklyCalendar showSidebar={showSidebar} />
                    )}
                    {state === 'month' && (
                        <MonthlyCalendar month={0} startDay={0} showSidebar={showSidebar} />
                    )}
                </View>
                <View style={styles.iconRoot}>
                    <TouchableOpacity 
                        onPress={() => {
                            setState("day");
                            setRefreshing(true);
                        }}
                    >
                        <Ionicons name={"ellipse"} size={10} style={state === 'day' ? styles.tabActive : styles.tabInactive} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            setState("week");
                            setRefreshing(true);
                        }}
                    >
                        <Ionicons name={"ellipse"} size={10} style={state === 'week' ? styles.tabActive : styles.tabInactive} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            setState("month");
                            setRefreshing(true);
                        }}
                    >
                        <Ionicons name={"ellipse"} size={10} style={state === 'month' ? styles.tabActive : styles.tabInactive} />
                    </TouchableOpacity>
                </View>
            </View>
            <HomeNavigation size={30} iconColor={COLORS({opacity:1}).primary}/>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        backgroundColor: "#FFF",
    },
    container: {
        // flex: 1,
        // justifyContent: "space-between",
        //alignItems: "center",
        padding: SIZES.medium,
        borderRadius: SIZES.xLarge,
        ...SHADOWS.medium,
        shadowColor: COLORS({opacity:1}).indigo,
        //marginBottom: SIZES.xSmall,
    },
    calendarContainer: {
        borderWidth: 1,
        borderColor: '#aad6e7',
        borderRadius: 6,
        height: "80%",
        width: "auto",
        overflow:"hidden",
    },
    elementPopupUser: {
      height: 20,
      position: 'absolute',
      width: 20,
    },
    profileButton: {
      borderColor: '#aad6e7',
      borderRadius: 100,
      height: 75,
      left: 0,
      position: 'absolute',
      width: 75,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS({opacity:1}).lightWhite,
    },
    intention: {
        borderWidth: 1,
        borderColor: '#aad6e7',
        borderRadius: 6,
        height: 75,
        width: 250,
        fontSize: 20,
        color: 'white',
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
    root: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    iconRoot: {
        //alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        //display: "flex",
    },
    icon: {
        color: COLORS({opacity:1}).primary,
        margin: 5,
    },
    tabActive: {
        color: COLORS({opacity:1}).primary,
        margin: 10,
    },
    tabInactive: {
        color: COLORS({opacity:1}).tertiary,
        margin: 10,
    },
  });