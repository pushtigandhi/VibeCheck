import React, { useEffect, useState } from "react";
import { Spacer } from "../../utils/index";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { SIZES, COLORS, FONT, SHADOWS } from "../../constants";
import { Sidebar } from "../../components/Sidebar";
import { GETitems, GETitemsTEST } from "../../API";
import { ItemType } from "../../constants";
import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
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

  const renderItem = ({ item }) => (
    <View style={styles.cardsContainer} key={item["_id"] + "_root"}>
      <View style={{flexDirection: "row"}}>
        <View style={{flexDirection: "column", alignItems: "center"}}>
          <DateTimePicker
            value={new Date(item.startDate)}
            mode={"time"} // or "date" or "time"
            is24Hour={true}
            display="default"
            disabled={true}
          />
          <DateTimePicker
            value={new Date(item.endDate)}
            mode={"time"} // or "date" or "time"
            is24Hour={true}
            display="default"
            disabled={true}
          />
        </View>
        <View style={{ justifyContent: "center"}}>
          <Text style={{ fontSize: SIZES.xxLarge}}>{item.icon}</Text>
        </View>
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Item", {item});
            }}
            key={item["_id"] + "root"} 
            style={styles.dayCardContainer}
        >
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
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item["_id"]} 
          style={styles.calendarView}
      />
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
    padding: SIZES.xxSmall,
    marginLeft: SIZES.xSmall,
    // borderRadius: SIZES.small,
    // ...SHADOWS.xSmall,
    // shadowColor: COLORS({opacity:1}).indigo,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS({opacity:1}).darkBlue,
  },
  prop: {
    color: COLORS({opacity:1}).darkBlue,
  }
});
