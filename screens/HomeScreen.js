import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Keyboard,
    FlatList, RefreshControl, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import HomeNavigation from "./HomeNavigation";

import { Spacer } from '../utils';

import { DailyCalendar } from "./partialViews/DailyCalendar";
import { WeeklyCalendar } from "./partialViews/WeeklyCalendar";
import { MonthlyCalendar } from "./partialViews/MonthlyCalendar";
import { useNavigation } from "@react-navigation/native";
import { ToolBar } from "../components/Toolbar";

import DateTimePicker from '@react-native-community/datetimepicker';

import { Ionicons } from "@expo/vector-icons";

import { GETtodayTEST, GETweekTEST, GETmonthTEST } from "../API";
import { ItemType } from "../constants";

import { Dimensions } from 'react-native';

import { Sidebar } from "../components/Sidebar";

export default function HomeScreen ({ navigation, route }) {
    const calendarHeight = Dimensions.get('window').height - 333;
    const [today, setToday] = useState(new Date());

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

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={styles.screen}>
             <View style={[styles.row, {flex: 0, height: 75, marginBottom: SIZES.xxSmall}]}>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name={"person"} size={SIZES.xxLarge} style={{color: COLORS({opacity:1}).darkBlue}}/>
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <TextInput style={styles.intention} />
                </TouchableWithoutFeedback>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.calendarContainer} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                    <ToolBar
                        mobile={true}
                        state={state}
                        onRefresh={toggleSidebar}
                        showSidebar={showSidebar}
                        date={today}
                    />
                    <View style={styles.iconRoot}>
                        <TouchableOpacity
                            disabled={state === "day" ? true : false} 
                            onPress={() => {
                                setRefreshing(true);
                                setState("day");
                            }}
                            style={{flex:1}}
                        >
                            <Text style={state === 'day' ? styles.tabActive : styles.tabInactive} >DAY</Text>
                            {/* <Ionicons name={"ellipse"} size={10} style={state === 'day' ? styles.tabActive : styles.tabInactive} /> */}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            disabled={state === "week" ? true : false} 
                            onPress={() => {
                                setRefreshing(true);
                                setState("week");
                            }}
                            style={{flex:1}}

                        >
                            <Text style={state === 'week' ? styles.tabActive : styles.tabInactive} >WEEK</Text>
                            {/* <Ionicons name={"ellipse"} size={10} style={state === 'week' ? styles.tabActive : styles.tabInactive} /> */}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            disabled={state === "month" ? true : false} 
                            onPress={() => {
                                setRefreshing(true);
                                setState("month");
                            }}
                            style={{flex:1}}
                        >
                            <Text style={state === 'month' ? styles.tabActive : styles.tabInactive} >MONTH</Text>
                            {/* <Ionicons name={"ellipse"} size={10} style={state === 'month' ? styles.tabActive : styles.tabInactive} /> */}
                        </TouchableOpacity>
                    </View>
                    {showSidebar && (
                        <Sidebar />
                    )}
                    <View style={{height: calendarHeight}} >
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
                </View>
            </View>
            <HomeNavigation style={{flex: 0}} size={SIZES.xxLarge} iconColor={COLORS({opacity:1}).primary}/> 
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        // height: '100%',
        // width: '100%',
        flex:1,
        backgroundColor: "#FFF",
    },
    calendarContainer: {
        top:0,
        paddingHorizontal: SIZES.medium,
        marginTop: SIZES.xxSmall,
    },
    profileButton: {
      borderColor: COLORS({opacity:1}).darkBlue,
      borderRadius: 100,
      marginHorizontal: SIZES.medium,
      height: 75,
      width: 75,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS({opacity:1}).lightWhite,
    },
    intention: {
        borderWidth: 1,
        borderColor: COLORS({opacity:1}).darkBlue,
        borderRadius: SIZES.xxSmall,
        height: 75,
        marginRight: SIZES.medium,
        //width: 250,
        flex: 1,
        fontSize: SIZES.large,
        color: 'white',
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    column: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    iconRoot: {
        //flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        //height: SIZES.xSmall,
    },
    icon: {
        color: COLORS({opacity:1}).darkBlue,
        margin: 5,
    },
    tabActive: {
        padding: SIZES.xxSmall,
        backgroundColor: COLORS({opacity:1}).darkBlue,
        margin: 10,
        color: COLORS({opacity: 1}).white,
        fontWeight: "bold",
    },
    tabInactive: {
        padding: SIZES.xxSmall,
        backgroundColor: COLORS({opacity:0.5}).darkBlue,
        margin: 10,
        color: COLORS({opacity: 1}).white,
        fontWeight: "normal",
    },
});