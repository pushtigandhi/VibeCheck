import React, { useEffect, useState } from "react";
import { ToolBar } from "../../components/Toolbar";
import { SolidBars } from "../../assets/icons/SolidBars";
import { CalendarWeek } from "../../assets/icons/CalendarWeek";
import { PlusCircle } from "../../assets/icons/PlusCircle";
//import { CalendarDaySmall } from "../../components/CalendarDaySmall";
import { Spacer } from "../../utils/index";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { SIZES, COLORS, FONT, SHADOWS } from "../../constants";
import { GETitems, GETweekTEST } from "../../API";
import { ItemType } from "../../constants";

import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const WeeklyCalendar = ({showSidebar = false}) => {

  const [items, setItems] = useState([]);
  const [startDate, setStartDate] = useState([]);

  async function getItemsFromAPI() {
    try {
      let items_ = await GETweekTEST(ItemType.Item);
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


  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardsContainer} key={item["_id"] + "_root"} 
      onPress={() => {
        navigation.navigate("Item", {item});
    }}>
        <>
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
        </>
        <View style={{flexDirection: "row"}}>
          <View style={{ justifyContent: "center"}}>
            <Text style={{ fontSize: SIZES.medium}}>{item.icon}</Text>
          </View>
          <View style={{flexDirection: "column", alignItems: "right"}}>
            <Text>{String(new Date(item.startDate).getHours())}:{new Date(item.startDate).getMinutes() < 10 ? String("0"+ new Date(item.startDate).getMinutes()) : String(new Date(item.startDate).getMinutes())}</Text>
            <Text>{String(new Date(item.endDate).getHours())}:{new Date(item.endDate).getMinutes() < 10 ? String("0"+ new Date(item.endDate).getMinutes()) : String(new Date(item.endDate).getMinutes())}</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}> 
      <ScrollView
        scrollEnabled={true}
        horizontal={true}
      >
        <View style={styles.row}>
          {days.map((day) => (
            <View style={styles.column}>
              <View style={styles.label} key={day}>
                <Text style={styles.span}>{day}</Text>
              </View>
              <FlatList
                data={items[day]}
                renderItem={renderItem}
                keyExtractor={(item) => item["_id"]} 
                style={styles.calendarView}
              />
            </View>
          ))}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    marginBottom: SIZES.medium,
    backgroundColor: COLORS({opacity:1}).white,// "#FFF",
    borderRadius: SIZES.small,
    ...SHADOWS.xSmall,
    shadowColor: COLORS({opacity:1}).indigo,
    width: 100,
    padding: SIZES.xxSmall,
    marginHorizontal: SIZES.xSmall,
  },
  calendarView: {
    margin: 0,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    borderLeftWidth: 0.5,
    borderColor: COLORS({opacity:1}).lightGrey,
  },
  label: {
    //paddingLeft: 10,
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.5, 
    borderBottomWidth: 0.5,
    borderColor: COLORS({opacity:1}).lightGrey,
    marginHorizontal: SIZES.xSmall,
    padding: SIZES.xxSmall,
  },
  span: {
    fontWeight: '500',
    //fontSize: 16,
    color: "#229FD0",
  },
  time: {
      color: COLORS({opacity: 1}).primary,
  },
  title: {
      //fontSize: SIZES.small,
      color: COLORS({opacity: 1}).primary,
      //overflow: 'hidden'
  },
  prop: {
    color: COLORS({opacity:1}).darkBlue,
  }
});
