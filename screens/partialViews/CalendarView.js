import React, { useEffect, useState } from "react";
import { textSIZES, viewSIZES, COLORS, FONT, SHADOWS } from "../../constants";
import { GETitems, GETitemsTEST, GETtodayTEST, GETscheduled } from "../../API";
import { ItemType } from "../../constants";
import { DailyCalendar } from "./DailyCalendar";
import { WeeklyCalendar } from "./WeeklyCalendar";
import { MonthlyCalendar } from "./MonthlyCalendar";
import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, Dimensions, RefreshControl,
    Modal, SafeAreaView } from 'react-native';

import { ToolBar } from "../../components/Toolbar";
import FilterModal from "../../components/FilterModal";
import NewItem from "../NewItem";
import { Sidebar } from "../../components/Sidebar";
import { Ionicons } from "@expo/vector-icons";

export const CalendarView = ({navigation, isHome=false, refresh=false}) => {
    const calendarHeight = Dimensions.get('window').height - 300;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filterVisible, setFilterVisible] = useState(false);
    const [filter, setFilter] = useState({});
 
    const [state, setState] = useState("day");
    const [items, setItems] = useState([]);

    const [refreshing, setRefreshing] = useState(false);
    const [showSidebar, toggleShowSidebar] = useState(false);

    const onRefresh = React.useCallback((updatedDate, state) => {
        setSelectedDate(updatedDate);
        setState(state);
    }, [refresh]);

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

    function closeFilter() {
        setRefreshing(!refreshing);
        setFilterVisible(false);
    }

    function handleFilterUpdate(updatedFilter) {
        setFilter(updatedFilter);
        setRefreshing(!refreshing);
    }

    function doSearch({search}) {
        //console.log(search);
       // setSearchBar(false);
    }
    
    useEffect(() => {
    },[refreshing, selectedDate, state])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.calendarContainer} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <ToolBar mobile={true} state={state} date={selectedDate}
                    toggleSidebar={toggleSidebar}
                    showSidebar={showSidebar}
                    onRefresh={onRefresh}
                    setFilterVisible={setFilterVisible}
                    doSearch={doSearch}
                    isHome={isHome}
                    navigation={navigation}
                />
                <Modal visible={filterVisible} animationType="slide" onRequestClose={closeFilter}>
                    <FilterModal 
                        closeFilter={closeFilter} 
                        doSearch={handleFilterUpdate} 
                        filter={filter} 
                        setFilter={setFilter} 
                    />
                </Modal>
                <View style={styles.iconRoot}>
                    <TouchableOpacity
                        disabled={state === "day" ? true : false} 
                        onPress={() => {
                            setRefreshing(!refreshing);
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
                            setRefreshing(!refreshing);
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
                            setRefreshing(!refreshing);
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
                        <DailyCalendar navigation={navigation} date={selectedDate} filter={filter} />
                    )}
                    {state === 'week' && (
                        <WeeklyCalendar navigation={navigation} date={selectedDate} filter={filter} />
                    )}
                    {state === 'month' && (
                        <MonthlyCalendar navigation={navigation} date={selectedDate} month={selectedDate.getMonth()} filter={filter} />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        backgroundColor: "#FFF",
    },
    calendarContainer: {
        top:0,
        paddingHorizontal: textSIZES.xSmall,
        marginTop: textSIZES.xxSmall,
    },
    profileButton: {
      borderColor: COLORS({opacity:1}).primary,
      borderRadius: 100,
      marginHorizontal: textSIZES.small,
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
        borderRadius: textSIZES.xxSmall,
        height: 75,
        marginRight: textSIZES.small,
        //width: 250,
        flex: 1,
        fontSize: textSIZES.large,
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
        //height: textSIZES.xSmall,
    },
    icon: {
        color: COLORS({opacity:1}).primary,
        margin: 5,
    },
    tabActive: {
        padding: textSIZES.xxSmall,
        backgroundColor: COLORS({opacity:1}).primary,
        margin: 10,
        color: COLORS({opacity: 1}).white,
        fontWeight: "bold",
    },
    tabInactive: {
        padding: textSIZES.xxSmall,
        backgroundColor: COLORS({opacity:0.5}).primary,
        margin: 10,
        color: COLORS({opacity: 1}).white,
        fontWeight: "normal",
    },
    cardsContainer: {
        marginBottom: textSIZES.small,
        backgroundColor: COLORS({opacity:1}).lightWhite,// "#FFF",
        borderRadius: textSIZES.xSmall,
        ...SHADOWS.xSmall,
        shadowColor: COLORS({opacity:1}).shadow,
    },
    
});
