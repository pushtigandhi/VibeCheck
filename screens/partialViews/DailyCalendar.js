import React, { useEffect, useState } from "react";
import { SIZES, COLORS, FONT, SHADOWS } from "../../constants";
import { GETitems, GETitemsTEST, GETtodayTEST } from "../../API";
import { ItemType } from "../../constants";
import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';

export const DailyCalendar = ({navigation, date, filter, refreshing}) => {
  const [items, setItems] = useState([]);
  const [today, setToday] = useState(new Date());

  async function getItemsFromAPI(filter={}) {
    try {
      let items_ = await GETtodayTEST(today, filter);
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
  }, [date, refreshing])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Item", {"item": item});
      }}
      key={item["_id"] + "root"} 
      style={styles.cardsContainer}
    >
      <View style={{flexDirection: "row"}}>
        <View style={styles.time}>
          <Text style={styles.timeLabel}>{String(new Date(item.startDate).getHours())}:{new Date(item.startDate).getMinutes() < 10 ? String("0"+ new Date(item.startDate).getMinutes()) : String(new Date(item.startDate).getMinutes())}</Text>
          <Text style={styles.timeLabel}>{String(new Date(item.endDate).getHours())}:{new Date(item.endDate).getMinutes() < 10 ? String("0"+ new Date(item.endDate).getMinutes()) : String(new Date(item.endDate).getMinutes())}</Text>
        </View>
        <View style={{ justifyContent: "center"}}>
          <Text style={{ fontSize: SIZES.xLarge}}>{item.icon}</Text>
        </View>
        <View style={styles.dayCardContainer}>
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
        </View>
      </View>
    </TouchableOpacity>
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
    borderColor: COLORS({opacity:1}).lightGrey,
    backgroundColor: COLORS({opacity:0.1}).lightGrey,
    borderRadius: SIZES.small,
    borderWidth:0.51,
    alignContent: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayCardContainer: {
    flex: 1,
    padding: SIZES.xxSmall,
    marginLeft: SIZES.xSmall,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
  },
  prop: {
    fontWeight: "200",
  },
  time: {
    padding: SIZES.xSmall,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "right",
  },
  timeLabel: {
    fontWeight: "200",
    fontSize: SIZES.medium,
  }
});
