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
import { TaskCard } from "../cards/items/TaskCard";

import { View, StyleSheet, Text, ScrollView } from 'react-native';

export const DailyCalendar = () => {

  // const [items, setItems] = useState([]);
  // const [title, setTitle] = useState("");

  const hours = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00"]
  //, "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    //        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
  
  return (
    <View>
        <ToolBar
        calendarButtonsIcon={<CalendarWeek color="#229FD0" />}
        //calendarButtonsClass="tool-bar-3"
        //className={styles.toolBarInstance}
        mobile={true}
        override={<PlusCircle color="white" />}
        property1="day"
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
          {hours.map((hour) => (
            <View style={styles.cardsContainer}>
              <View style={styles.row}>
                <View style={styles.label}>
                  <Text style={styles.time}>{hour}</Text>
                </View>
                <View style={styles.dayCardContainer}>
                    <Text style={styles.title}>title</Text>
                </View> 
              </View>
            </View>
          ))}
        </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: SIZES.medium,
  },
  calendarView: {
    padding: 10,
    width: 500,
  },
  row: {
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    width: "10%",
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
