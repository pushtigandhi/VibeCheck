import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Keyboard, Modal,
    FlatList, RefreshControl, SafeAreaView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import HomeNavigation from "./HomeNavigation";

import { Spacer } from '../utils';

import { DailyCalendar } from "./partialViews/DailyCalendar";
import { WeeklyCalendar } from "./partialViews/WeeklyCalendar";
import { MonthlyCalendar } from "./partialViews/MonthlyCalendar";
import { useNavigation } from "@react-navigation/native";
import { ToolBar } from "../components/Toolbar";

import { Ionicons } from "@expo/vector-icons";

import { ItemType } from "../constants";

import { Dimensions } from 'react-native';

import { GETdirectoryTEST, doOnStart } from "../API";

//import { directoryList } from "../API";
import FilterModal from "../components/FilterModal";
import ScheduleItem from "./ScheduleItem";
import MiniTools from "../components/MiniTools";
import { refresh } from "@react-native-community/netinfo";
import NewItem from "./NewItem";
import { CalendarView } from "./partialViews/CalendarView";

export default function HomeScreen ({ navigation, route }) {
    const [filter, setFilter] = useState({});
    const [state, setState] = useState("day");
    const [refreshing, setRefreshing] = useState(false);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    
    useEffect(() => {
        doOnStart();
    }, [])

    return (
        <SafeAreaView style={styles.screen}>
            <View style={[styles.row, {flex: 0, height: 75}]}>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name={"person"} size={SIZES.xxLarge} style={{color: COLORS({opacity:1}).primary}}/>
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <TextInput style={styles.intention} />
                </TouchableWithoutFeedback>
            </View>
            <CalendarView navigation={navigation} filter={filter} setFilter={setFilter} isHome={true} />
            
            <HomeNavigation style={{flex: 0}} size={SIZES.xxLarge} iconColor={COLORS({opacity:1}).primary}/> 
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        backgroundColor: "#FFF",
    },
    calendarContainer: {
        top:0,
        paddingHorizontal: SIZES.xSmall,
        marginTop: SIZES.xxSmall,
    },
    profileButton: {
      borderColor: COLORS({opacity:1}).primary,
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
        borderColor: COLORS({opacity:1}).primary,
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
        color: COLORS({opacity:1}).primary,
        margin: 5,
    },
    tabActive: {
        padding: SIZES.xxSmall,
        backgroundColor: COLORS({opacity:1}).primary,
        margin: 10,
        color: COLORS({opacity: 1}).white,
        fontWeight: "bold",
    },
    tabInactive: {
        padding: SIZES.xxSmall,
        backgroundColor: COLORS({opacity:0.5}).primary,
        margin: 10,
        color: COLORS({opacity: 1}).white,
        fontWeight: "normal",
    },
});