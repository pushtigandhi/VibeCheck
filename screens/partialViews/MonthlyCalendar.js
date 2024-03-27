import React, { useEffect, useState } from "react";
import { Spacer } from "../../utils/index";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { COLORS, SIZES } from "../../constants";
import { Sidebar } from "../../components/Sidebar";

import { GETitems, GETmonthTEST } from "../../API";
import { ItemType } from "../../constants";

import { View, StyleSheet, Text, ScrollView } from 'react-native';

import { Dimensions } from 'react-native';

const slotWidth = (Dimensions.get('window').width -36) / 7;
const slotHeight = (Dimensions.get('window').height - 330) / 6;

export const MonthlyCalendar = ({navigation, date, month}) => {

  const startOfMonth = new Date(date.getFullYear(), month, 1); // Get the start of the current month

  const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const daysOfMonth = Array.from({ length: daysInEachMonth[month] }, (_, index) => index + 1);

  const emptySlotsBefore = Array.from({ length: startOfMonth.getDay() }, (_, index) => (
      <View key={`empty-before-${index}`} style={styles.slot}>
          <Text>{''}</Text>
      </View>
  ));

  const endDay = (startOfMonth.getDay() - 1 + daysInEachMonth[month]) % 7;

  console.log(endDay);
  
  const emptySlotsAfter = Array.from({ length: 6 - endDay }, (_, index) => (
      <View key={`empty-after-${index}`} style={styles.slot}>
          <Text>{''}</Text>
      </View>
  ));

  const [items, setItems] = useState([]);

  async function getItemsFromAPI() {
    try {
      let items_ = await GETmonthTEST(ItemType.Item);
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

  return (
    <View>
      {/* <ScrollView horizontal={true} scrollEnabled={true}> */}
        {/* <View style={{ width: 700 }}> */}
          <View style={styles.row}>
            {daysOfWeek.map(day => (
            <View key={day} style={styles.label}>
                <Text style={styles.span}>{day}</Text>
            </View>
            ))}
          </View>
          {/* <ScrollView scrollEnabled={true}> */}
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {emptySlotsBefore}

              {daysOfMonth.map(day => (
              <View key={day} style={styles.slot}>
                <Text style={{color: COLORS({opacity: 1}).primary, fontSize: SIZES.xSmall}}>{day}</Text>
                {/*{items.map(item => (
                  <Text>Hello</Text>
                ))}*/}
                 {!!items[day] && items[day].slice(0, 3).map((item, index) => (
                  <View key={index} numberOfLines={1} style={[styles.title, {backgroundColor: "white"}]}>
                    <Text style={{fontSize: SIZES.xSmall}}>{item.title}</Text>
                  </View>
                ))}  
              </View>
              ))}
              {emptySlotsAfter}
            </View>
          {/* </ScrollView> */}
        {/* </View> */}
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  calendarView: {
    width: 500,
  },
  row: {
    flexDirection: "row",
  },
  label: {
    width: slotWidth,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderColor: COLORS({ opacity: 1 }).white,
    borderBottomWidth: 0.5,
    backgroundColor: COLORS({ opacity: 0.8 }).darkBlue,
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
    //justifyContent: 'center', 
    padding: SIZES.tiny,
    borderRightWidth: 0.5,
    borderColor: COLORS({opacity: 1}).lightGrey,
    borderBottomWidth: 0.5,
  },
  dayCardContainer: {
    height: 25,
    width: 50,
    padding: 2,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS({opacity: 1}).tertiary,
    borderRadius: SIZES.xSmall,
    //...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
  },
  time: {
      color: COLORS({opacity: 1}).primary,
  },
  title: {
    width: slotWidth-SIZES.xSmall, 
    height: (slotHeight-SIZES.xLarge)/ 3, 
    borderRadius: SIZES.tiny,
    borderColor: COLORS({ opacity: 1 }).darkBlue, 
    borderWidth: 0.5, 
    padding: SIZES.tiny,
    marginBottom: SIZES.tiny, 
    overflow: 'hidden'
  }
});
