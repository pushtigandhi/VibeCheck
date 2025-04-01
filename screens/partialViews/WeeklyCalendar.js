import React, { useEffect, useState } from "react";
import { ToolBar } from "../../components/Toolbar";
//import { CalendarDaySmall } from "../../components/CalendarDaySmall";
import { Spacer } from "../../utils/index";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { textSIZES, viewSIZES, COLORS, FONT, SHADOWS } from "../../constants";
import { GETitems, GETweek } from "../../API";
import { ItemType } from "../../constants";

import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';

import { Dimensions } from 'react-native';

const slotHeight = (Dimensions.get('window').height - 300) / 7;

export const WeeklyCalendar = ({navigation, date, filter, refreshing, itemList}) => {
  const [items, setItems] = useState([]);

  async function getItemsFromAPI(filter={}) {
    try {
      // Create a new filter object to avoid modifying the original
      const apiFilter = { ...filter };

      // Ensure we have valid dates for the week
      const startOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
      const endOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
      
      apiFilter.startgt = startOfWeek;
      apiFilter.startlt = endOfWeek;

      let items_ = await GETweek(apiFilter);
      console.log(items_);
      return items_;
    } catch (error) {
      console.log("error fetching items");
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      try {
        const items_ = await getItemsFromAPI(filter);
        if (isMounted) {
          setItems(items_);
        }
      } catch (err) {
        console.error("Error fetching items:", err);
        if (isMounted) {
          setItems({});
        }
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, [date, refreshing, filter]); // Added filter and month to dependencies

  const days = ["Sunday ", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <View style={styles.column}>
      {days.map((day) => (
        <View style={[styles.row, {borderBottomWidth: 0.5, borderColor: COLORS({opacity:1}).lightGrey}]}>
          <View style={styles.label} key={day}>
            <Text style={styles.span}>{day.slice(0,1)}</Text>
          </View>
          <FlatList
            data={items[day]}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.cardsContainer} //key={item["_id"] + "_root"} 
                onPress={() => {
                  navigation.navigate("Item", {item});
                }}
              >
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.row}>
                  <View style={{ justifyContent: "center"}}>
                    <Text style={{ fontSize: textSIZES.xSmall}}>{item.icon}</Text>
                  </View>
                  <Text style={styles.timeLabel}>{String(new Date(item.startDate).getHours())}:{new Date(item.startDate).getMinutes() < 10 ? String("0"+ new Date(item.startDate).getMinutes()) : String(new Date(item.startDate).getMinutes())}</Text>
                  <Text style={styles.timeLabel}>-</Text>
                  <Text style={styles.timeLabel}>{String(new Date(item.endDate).getHours())}:{new Date(item.endDate).getMinutes() < 10 ? String("0"+ new Date(item.endDate).getMinutes()) : String(new Date(item.endDate).getMinutes())}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item["_id"]} 
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
    borderColor: COLORS({opacity:1}).lightGrey,
    backgroundColor: COLORS({opacity:0.1}).lightGrey,
    borderWidth: 0.51,
    borderRadius: textSIZES.xxSmall,
    width: 100, //slotWidth - textSIZES.xSmall,
    height: slotHeight - textSIZES.xSmall, 
    padding: textSIZES.tiny,
    marginHorizontal: textSIZES.xxSmall,
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
    width: textSIZES.xLarge, //slotWidth,
    height: slotHeight,
    alignItems: "center",
    justifyContent: "center",
    //borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: COLORS({opacity:1}).lightGrey,
    //marginHorizontal: textSIZES.xSmall,
    //padding: textSIZES.xxSmall,
  },
  span: {
    fontWeight: 'bold',
    color: COLORS({opacity: 1}).primary,
  },
  title: {
    fontWeight: "200",
    marginBottom: textSIZES.xxSmall,
    fontSize: textSIZES.xSmall,
  },
  time: {
    padding: textSIZES.xSmall,
    flexDirection: "column",
    alignItems: "right",
  },
  timeLabel: {
    fontWeight: "200",
    fontSize: textSIZES.xSmall,
  }
});
