import React from "react";
import { View, TouchableOpacity, Text, TextInput, 
    FlatList, RefreshControl, SafeAreaView } from 'react-native';
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

import DateTimePicker from '@react-native-community/datetimepicker';

import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

import { GETtodayTEST, GETweekTEST, GETmonthTEST } from "../API";
import { ItemType } from "../constants";

import { Dimensions } from 'react-native';

export default function HomeScreen ({ navigation, route }) {
    const calendarHeight = Dimensions.get('window').height - 330;    
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

    const [items, setItems] = useState([]);

    async function getItemsFromAPI() {
        try {
        let items_ = await GETtodayTEST(ItemType.Item);
        return items_;
        } catch (error) {
        console.log("error fetching items");
        console.log(error);
        return [];
        }
    }

    useEffect(() => {
        getItemsFromAPI().then((items_) => {
        setItems(items_);
        }).catch((err) => {
        alert(err.message)
        })
    }, []) // only run once on load

    const renderItem = ({ item }) => (
        <>{state === 'day' && (
            <View style={styles.cardsContainer} key={item["_id"] + "_root"}>
              <View style={{flexDirection: "row"}}>
                <View style={{flexDirection: "column", alignItems: "center"}}>
                  <DateTimePicker
                    value={new Date(item.startDate)}
                    mode={"time"} // or "date" or "time"
                    is24Hour={true}
                    display="default"
                    disabled={true}
                  />
                  <DateTimePicker
                    value={new Date(item.endDate)}
                    mode={"time"} // or "date" or "time"
                    is24Hour={true}
                    display="default"
                    disabled={true}
                  />
                </View>
                <View style={{ justifyContent: "center"}}>
                  <Text style={{ fontSize: SIZES.xxLarge}}>{item.icon}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Item", {item});
                    }}
                    key={item["_id"] + "root"} 
                    style={styles.dayCardContainer}
                >
                  <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                  {!!item.location && (
                    <Text style={styles.prop}>Location: {item.location}</Text>
                  )}
                  {!!item.subtasks && item.subtasks.length > 0 && (
                    <Text style={styles.prop}>Subtasks: {item.subtasks.length}</Text>
                  )}
                  {!!item.priority && (
                    <Text style={styles.prop}>Priority: {item.priority}</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
        )}
        {state === 'week' && (
            <WeeklyCalendar showSidebar={showSidebar} />
        )}
        {state === 'month' && (
            <MonthlyCalendar month={0} startDay={0} showSidebar={showSidebar} />
        )}</>
    );

    return (
        <SafeAreaView style={styles.screen}>
             <View style={[styles.row, {flex: 0, height: 75}]}>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name={"person"} size={SIZES.xxLarge} style={{color: COLORS({opacity:1}).darkBlue}}/>
                </TouchableOpacity>
                <TextInput style={styles.intention} />
            </View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
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
                    <View style={styles.iconRoot}>
                        <TouchableOpacity 
                            onPress={() => {
                                setState("day");
                                setRefreshing(true);
                            }}
                            style={{flex:1}}
                        >
                            <Text style={state === 'day' ? styles.tabActive : styles.tabInactive} >DAY</Text>
                            {/* <Ionicons name={"ellipse"} size={10} style={state === 'day' ? styles.tabActive : styles.tabInactive} /> */}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {
                                setState("week");
                                setRefreshing(true);
                            }}
                            style={{flex:1}}

                        >
                            <Text style={state === 'week' ? styles.tabActive : styles.tabInactive} >WEEK</Text>
                            {/* <Ionicons name={"ellipse"} size={10} style={state === 'week' ? styles.tabActive : styles.tabInactive} /> */}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {
                                setState("month");
                                setRefreshing(true);
                            }}
                            style={{flex:1}}
                        >
                            <Text style={state === 'month' ? styles.tabActive : styles.tabInactive} >MONTH</Text>
                            {/* <Ionicons name={"ellipse"} size={10} style={state === 'month' ? styles.tabActive : styles.tabInactive} /> */}
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item) => item["_id"]} 
                        style={{height: calendarHeight}}
                    />
                    
                    {/*{state === 'day' && (
                        <DailyCalendar showSidebar={showSidebar} />
                    )}
                    {state === 'week' && (
                        <WeeklyCalendar showSidebar={showSidebar} />
                    )}
                    {state === 'month' && (
                        <MonthlyCalendar month={0} startDay={0} showSidebar={showSidebar} />
                    )}*/}
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
    container: {
        // flex: 1,
        // justifyContent: "space-between",
        //alignItems: "center",
       // flexBasis: 'auto',
        top:0,
        //flex: 1,
        paddingHorizontal: SIZES.medium,
        marginTop: SIZES.xxSmall,
    },
    calendarContainer: {
        borderWidth: 1,
        borderColor: COLORS({opacity:1}).darkBlue,
        borderRadius: SIZES.small,
        //flex: 8,
        //height: "auto",
        //width: "auto",
        overflow:"hidden",
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