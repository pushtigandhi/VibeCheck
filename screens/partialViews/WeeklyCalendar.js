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

import { Dimensions } from 'react-native';

const slotHeight = (Dimensions.get('window').height - 300) / 7;

export const WeeklyCalendar = ({navigation, date}) => {

  const [items, setItems] = useState([]);

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
  }, [date])


  const days = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardsContainer} //key={item["_id"] + "_root"} 
      onPress={() => {
        navigation.navigate("Item", {item});
      }}
    >
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.row}>
        <View style={{ justifyContent: "center"}}>
          <Text style={{ fontSize: SIZES.small}}>{item.icon}</Text>
        </View>
        <Text style={styles.timeLabel}>{String(new Date(item.startDate).getHours())}:{new Date(item.startDate).getMinutes() < 10 ? String("0"+ new Date(item.startDate).getMinutes()) : String(new Date(item.startDate).getMinutes())}</Text>
        <Text style={styles.timeLabel}>-</Text>
        <Text style={styles.timeLabel}>{String(new Date(item.endDate).getHours())}:{new Date(item.endDate).getMinutes() < 10 ? String("0"+ new Date(item.endDate).getMinutes()) : String(new Date(item.endDate).getMinutes())}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.column}>
      {days.map((day) => (
        <View style={[styles.row, {borderBottomWidth: 0.5, borderColor: COLORS({opacity:1}).lightGrey}]}>
          <View style={styles.label} key={day}>
            <Text style={styles.span}>{day.slice(0,1)}</Text>
          </View>
          <FlatList
            data={items[day]}
            renderItem={renderItem}
            keyExtractor={(item) => item["_id"] + "_key"} 
            style={styles.calendarView}
            horizontal={true}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    //marginBottom: SIZES.medium,
    backgroundColor: COLORS({opacity:1}).white,// "#FFF",
    borderRadius: SIZES.xSmall,
    ...SHADOWS.xSmall,
    shadowColor: COLORS({opacity:1}).indigo,
    width: 100, //slotWidth - SIZES.xSmall,
    height: slotHeight - SIZES.xSmall, 
    padding: SIZES.tiny,
    marginHorizontal: SIZES.tiny,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarView: {
    margin: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    //paddingLeft: 10,
    width: SIZES.xLarge, //slotWidth,
    height: slotHeight,
    alignItems: "center",
    justifyContent: "center",
    //borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: COLORS({opacity:1}).lightGrey,
    //marginHorizontal: SIZES.xSmall,
    //padding: SIZES.xxSmall,
  },
  span: {
    fontWeight: 'bold',
    color: COLORS({opacity: 1}).primary,
  },
  title: {
    fontWeight: "200",
    marginBottom: SIZES.xxSmall,
    fontSize: SIZES.small,
  },
  time: {
    padding: SIZES.xSmall,
    flexDirection: "column",
    alignItems: "right",
  },
  timeLabel: {
    fontWeight: "200",
    fontSize: SIZES.small,
  }
});
