import React, { useEffect, useState } from "react";

import { COLORS, textSIZES, viewSIZES } from "../../constants";
import { GETitems, GETmonthTEST } from "../../API";
import { ItemType } from "../../constants";

import { View, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Dimensions } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const slotWidth = (Dimensions.get('window').width - 20) / 7;
const slotHeight = (Dimensions.get('window').height - 308) / 6;

export const MonthlyCalendar = ({navigation, date, month, onRefresh, filter, refreshing}) => {

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
      let items_ = await GETmonthTEST(filter);
      return items_;
    } catch (error) {
      console.log("error fetching items");
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    getItemsFromAPI(filter).then((items_) => {
      setItems(items_);
    }).catch((err) => {
      alert(err.message)
    })
  }, [date, refreshing]) // only run once on load

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
            <Text style={{color: COLORS({opacity: 1}).primary, fontSize: textSIZES.xSmall}}>{day}</Text>
            {!!items[day] && items[day].slice(0, 2).map((item, index) => (
              <TouchableOpacity key={index} numberOfLines={1} style={[styles.title, {backgroundColor: "white"}]} 
                onPress={() => {
                  navigation.navigate("Item", {item});
                }}
              >
                <Text style={{fontSize: textSIZES.xSmall}}>{item.title}</Text>
              </TouchableOpacity>
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
    fontWeight: '500',
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
    borderRadius: textSIZES.tiny,
    borderColor: COLORS({ opacity: 1 }).primary, 
    borderWidth: 0.5, 
    marginBottom: textSIZES.tiny, 
    overflow: 'hidden'
  },
  time: {
    color: COLORS({opacity: 1}).primary,
  },
});
