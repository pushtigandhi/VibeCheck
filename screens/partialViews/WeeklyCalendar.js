import React from "react";
import { ToolBar } from "../../components/Toolbar";
import { SolidBars } from "../../assets/icons/SolidBars";
import { CalendarWeek } from "../../assets/icons/CalendarWeek";
import { PlusCircle } from "../../assets/icons/PlusCircle";
//import { CalendarDaySmall } from "../../components/CalendarDaySmall";
import { Spacer } from "../../utils/index";
import { SmallCalendar } from "../../components/SmallCalendar";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { SIZES, COLORS } from "../../constants";
import { Sidebar } from "../cards/Sidebar";

import { View, StyleSheet, Text, ScrollView } from 'react-native';

export const WeeklyCalendar = () => {

  // const [items, setItems] = useState([]);
  // const [title, setTitle] = useState("");

  const days = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
  
  return (
    <View style={styles.container}>
        <ToolBar
        calendarButtonsIcon={<CalendarWeek color="#229FD0" />}
        //calendarButtonsClass="tool-bar-3"
        //className={styles.toolBarInstance}
        mobile={true}
        override={<PlusCircle color="white" />}
        property1="week"
        searchIconColor="white"
        //searchPropertyDefaultClassName="tool-bar-2"
        sidebarToggleButtonIcon={<SolidBars color="#229FD0" />}
        //typographyClassName="design-component-instance-node"
        />

        {/* <Sidebar /> */}

        <ScrollView 
          style={styles.calendarView}
          scrollEnabled={true}
        >
          {days.map((day) => (
            <View style={styles.cardsContainer}>
              <View style={styles.row}>
                <View style={styles.label}>
                  <Text style={styles.span}>{day}</Text>
                </View>
                <ScrollView horizontal={true} style={styles.content}>
                  <View style={styles.dayCardContainer}>
                      <Text style={styles.title}>title</Text>
                  </View> 
                </ScrollView>
              </View>
            </View>
          ))}
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
    //paddingLeft: 10,
    width: 50,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderColor: "#aad6e7",
  },
  content: {
    //justifyContent: "center",
    padding: 10,
  },
  span: {
    fontWeight: '500',
    //fontSize: 16,
    color: "#229FD0",
  },
  dayCardContainer: {
    height: 50,
    width: 150,
    padding: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS({opacity: 1}).tertiary,
    borderRadius: SIZES.medium,
    //...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
  },
  time: {
      color: COLORS({opacity: 1}).primary,
  },
  title: {
      fontSize: SIZES.medium,
      color: COLORS({opacity: 1}).primary,
  },
});
