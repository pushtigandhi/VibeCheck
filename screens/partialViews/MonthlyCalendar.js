import React, { useEffect, useState } from "react";

import { COLORS, textSIZES, viewSIZES } from "../../constants";
import { GETitems, GETmonth } from "../../API";
import { ItemType } from "../../constants";

import { View, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Dimensions } from 'react-native';
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

const slotWidth = (Dimensions.get('window').width - 20) / 7;
const slotHeight = (Dimensions.get('window').height - 308) / 6;

export const MonthlyCalendar = ({navigation, date, month, onRefresh, filter}) => {

  const [refreshing, setRefreshing] = useState(false);

  const startOfMonth = new Date(date.getFullYear(), month, 1); // Get the start of the current month
  const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const daysOfWeek = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
  const daysOfMonth = Array.from({ length: daysInEachMonth[month] }, (_, index) => index + 1);

  const emptySlotsBefore = Array.from({ length: startOfMonth.getDay() }, (_, index) => (
      <View key={`empty-before-${index}`} style={styles.slot}>
          <Text>{''}</Text>
      </View>
  ));

  const endDay = (startOfMonth.getDay() - 1 + daysInEachMonth[month]) % 7;
  
  const emptySlotsAfter = Array.from({ length: 6 - endDay }, (_, index) => (
      <View key={`empty-after-${index}`} style={styles.slot}>
          <Text>{''}</Text>
      </View>
  ));

  const [items, setItems] = useState([]);

  async function getItemsFromAPI(filter={}) {
    try {
      // Create a new filter object to avoid modifying the original
      const apiFilter = { ...filter };
      
      // Ensure we have valid dates for the month
      const startOfMonth = new Date(date.getFullYear(), month, 1);
      const endOfMonth = new Date(date.getFullYear(), month + 1, 0);
      
      apiFilter.startgt = startOfMonth;
      apiFilter.startlt = endOfMonth;

      let items_ = await GETmonth(apiFilter);
      return items_;
    } catch (error) {
      console.log("error fetching items");
      console.log(error);
      return {};
    }
  }

  function doRefresh() {
    setRefreshing(true);
    getItemsFromAPI(filter);
    setRefreshing(false);
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
  }, [date, filter, month]); // Added filter to dependencies

  return (
    <GestureHandlerRootView style={{alignItems: "center"}}>
      <View style={styles.row}>
        {daysOfWeek.map(day => (
          <View key={day} style={styles.label}>
              <Text style={styles.span}>{day.slice(0,1)}</Text>
          </View>
        ))}
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {emptySlotsBefore}
        {daysOfMonth.map(day => (
          <View key={day} style={styles.slot}>
            <Text style={{color: COLORS({opacity: 1}).primary, fontWeight: 'bold', fontSize: textSIZES.xSmall}}>{day}</Text>
            {!!items[day] && items[day].slice(0, 2).map((item, index) => (
              <TouchableHighlight underlayColor={COLORS({opacity:0.2}).lightGrey} key={index} numberOfLines={1} style={[styles.title]} 
                onPress={() => (navigation.navigate("Item", {"item": item, "doRefresh": doRefresh}))}
              >
                <Text style={{fontSize: textSIZES.xSmall}}>{item.title}</Text>
              </TouchableHighlight>
            ))}
            {!!items[day] && items[day].length > 2 && (
              <TouchableOpacity onPress={() => (onRefresh(new Date(date.getFullYear(), date.getMonth(), Number(day)), "day"))}>
                <Text style={{fontSize: textSIZES.xSmall, marginTop: textSIZES.tiny}}>Show All</Text>
              </TouchableOpacity>
            )}  
          </View>
        ))}
        {emptySlotsAfter}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  label: {
    width: slotWidth,
    height: textSIZES.xLarge,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderColor: COLORS({ opacity: 1 }).white,
    borderBottomWidth: 0.5,
    backgroundColor: COLORS({ opacity: 0.8 }).primary,
  },
  content: {
    alignContent: "center",
    padding: 10,
    borderWidth: 0.5,
  },
  span: {
    fontWeight: '700',
    //fontSize: 16,
    color: COLORS({ opacity: 1 }).lightWhite,
  },
  slot: {
    height: slotHeight,
    width: slotWidth,
    alignItems: 'center', 
    borderRightWidth: 0.5,
    borderColor: COLORS({opacity: 1}).lightGrey,
    borderBottomWidth: 0.5,
  },
  title: {
    width: slotWidth-textSIZES.xxSmall, 
    height: (slotHeight-textSIZES.xxLarge)/2, 
    justifyContent: 'center',
    alignItems: 'center', 
    marginBottom: textSIZES.tiny,
    borderColor: COLORS({opacity:1}).lightGrey,
    backgroundColor: COLORS({opacity:0.1}).white,
    borderRadius: textSIZES.xxSmall,
    borderWidth:0.50,
    alignContent: "center",
    overflow: 'hidden'
  },
  time: {
    color: COLORS({opacity: 1}).primary,
  },
});
