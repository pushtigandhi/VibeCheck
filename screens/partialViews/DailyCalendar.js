import React, { useEffect, useState } from "react";
import { Spacer } from "../../utils/index";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { SIZES, COLORS, FONT, SHADOWS } from "../../constants";
import { Sidebar } from "../../components/Sidebar";
import { GETitems, GETitemsTEST } from "../../API";
import { ItemType } from "../../constants";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";

export const DailyCalendar = ({showSidebar = false}) => {
  const [items, setItems] = useState([]);
  const [startDate, setStartDate] = useState([]);

  async function getItemsFromAPI() {
    try {
      let items_ = await GETitemsTEST(ItemType.Item);
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
        {showSidebar && (
          <Sidebar />
        )}

        <ScrollView 
          style={styles.calendarView}
          scrollEnabled={true}
        >
          {items.map((item) => (
            <View style={styles.cardsContainer} key={item["_id"] + "_root"}>
              <View style={{flexDirection: "row"}}>
                <View style={{flexDirection: "column", alignItems: "center"}}>
                  <View style={styles.label}>
                    <DateTimePicker
                      value={new Date(item.startDate)}
                      mode={"time"} // or "date" or "time"
                      is24Hour={true}
                      display="default"
                      disabled={true}
                    />
                  </View>
                  <Text style={{ fontSize: SIZES.xxLarge}}>{item.icon}</Text>
                  <View style={styles.label}>
                    <DateTimePicker
                      value={new Date(item.endDate)}
                      mode={"time"} // or "date" or "time"
                      is24Hour={true}
                      display="default"
                      disabled={true}
                    />
                  </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Item", {item});
                    }}
                    key={item["_id"] + "root"} 
                    style={styles.dayCardContainer}
                >
                  <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                  {!!item.subtasks && item.subtasks.length > 0 && (
                    <Text>Subtasks: {item.subtasks.length}</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    padding: SIZES.medium,
    marginTop: SIZES.medium,
    backgroundColor: "#FFF",
    borderRadius: SIZES.small,
    ...SHADOWS.xSmall,
    shadowColor: COLORS({opacity:1}).indigo,
  },
  calendarView: {
    padding: 10,
    width: "100%",
    height: "100%"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
   // backgroundColor: COLORS({opacity:0.5}).primary,
   //width: "30%",
    borderWidth: 1,
    borderColor: COLORS({opacity: 1}).darkBlue,
    borderRadius: SIZES.xSmall,
    // ...SHADOWS.medium,
    // shadowColor: COLORS({opacity:1}).indigo,
  },
  dayCardContainer: {
    flex: 1,
    //padding: SIZES.medium,
    marginLeft: SIZES.xSmall,
    // borderRadius: SIZES.small,
    // ...SHADOWS.xSmall,
    // shadowColor: COLORS({opacity:1}).indigo,
  },
  title: {
    fontSize: SIZES.xLarge,
    //fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
});
