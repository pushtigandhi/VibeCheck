import React from "react";
import { ToolBar } from "../../components/Toolbar";
import { SolidBars } from "../../assets/icons/SolidBars";
import { CalendarWeek } from "../../assets/icons/CalendarWeek";
import { PlusCircle } from "../../assets/icons/PlusCircle";
//import { CalendarDaySmall } from "../../components/CalendarDaySmall";
import { Spacer } from "../../utils/index";
import { SmallCalendar } from "../../components/SmallCalendar";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { COLORS, SIZES } from "../../constants";
import { Sidebar } from "../cards/Sidebar";

import { View, StyleSheet, Text, ScrollView } from 'react-native';

export const MonthlyCalendar = ({month, startDay}) => {

    const months = ["January", "February", "March", "April", 
    "May", "June", "July", "August", "September", "October", 
    "November", "December"];
    
    const weekDays = [
        "Mon","Tue","Wed","Thu","Fri","Sat", "Sun"
    ];

    const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const daysOfWeek = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];

    const daysOfMonth = Array.from({ length: daysInEachMonth[month] }, (_, index) => index + 1);

    const emptySlotsBefore = Array.from({ length: startDay }, (_, index) => (
        <View key={`empty-before-${index}`} style={styles.slot}>
            <Text>{''}</Text>
        </View>
    ));

    const endDay = (startDay + daysInEachMonth[month] - 1) % 7;
    
    const emptySlotsAfter = Array.from({ length: 6 - endDay }, (_, index) => (
        <View key={`empty-after-${index}`} style={styles.slot}>
            <Text>{''}</Text>
        </View>
    ));
    
  return (
    <View style={styles.container}>
        <ToolBar
        calendarButtonsIcon={<CalendarWeek color="#229FD0" />}
        //calendarButtonsClass="tool-bar-3"
        //className={styles.toolBarInstance}
        mobile={true}
        override={<PlusCircle color="white" />}
        property1="month"
        searchIconColor="white"
        //searchPropertyDefaultClassName="tool-bar-2"
        sidebarToggleButtonIcon={<SolidBars color="#229FD0" />}
        //typographyClassName="design-component-instance-node"
        />

        {/* <Sidebar /> */}

        
        <ScrollView horizontal={true} scrollEnabled={true}>
            <View style={{ width: 700 }}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {daysOfWeek.map(day => (
                <View key={day} style={styles.label}>
                    <Text style={styles.span}>{day}</Text>
                </View>
                ))}
                </View>
                <ScrollView scrollEnabled={true}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {emptySlotsBefore}

                {daysOfMonth.map(day => (
                <View key={day} style={styles.slot}>
                    <Text style={{color: "#229FD0"}}>{day}</Text>
                </View>
                
                ))}
                {emptySlotsAfter}
                </View>

                </ScrollView>
            </View>
        
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolBarInstance: {
    borderColor: '#aad6e7',
    width: 'unset',
  },
  iconFontAwesome3: {
    height: 16,
    position: 'relative',
    width: 16,
  },
  designComponentInstanceNode: {
    color: '#229fd0',
  },
  toolBar2: {
    backgroundColor: '#aad6e7',
  },
  toolBar3: {
    backgroundColor: '#229fd0',
  },
  cardsContainer: {
    //marginTop: SIZES.medium,
  },
  calendarView: {
    //padding: 10,
    width: 500,
  },
  row: {
    flexDirection: "row",
    //justifyContent: "space-between",
    //alignItems: "baseline",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#aad6e7",
  },
  label: {
    paddingLeft: 10,
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderColor: COLORS({ opacity: 1 }).white,
    borderBottomWidth: 0.5,
    backgroundColor: COLORS({ opacity: 0.6 }).primary,
  },
  content: {
    alignContent: "center",
    padding: 10,
    borderWidth: 0.5,
  },
  span: {
    fontWeight: '500',
    //fontSize: 16,
    color: COLORS({ opacity: 1 }).lightWhite,
  },
  slot: {
    height: 110,
    width: 100,
    //alignItems: 'center', 
    //justifyContent: 'center', 
    padding: 10,
    borderRightWidth: 0.5,
    borderColor: "#aad6e7",
    borderBottomWidth: 0.5,
  },
});
