import React, { useEffect, useState } from "react";
import { textSIZES, viewSIZES, COLORS, FONT, SHADOWS } from "../../constants";
import { GETitems, GETitemsTEST, GETtoday } from "../../API";
import { ItemType } from "../../constants";
import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';

export const DailyCalendar = ({navigation, date, filter}) => {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  async function getItemsFromAPI(filter={}) {
    try {
      // Create a new filter object to avoid modifying the original
      const apiFilter = { ...filter };

      // Ensure we have valid dates for the day
      const dategt = new Date(date);
      dategt.setHours(0, 0, 0, 0); // Set to midnight

      const datelt = new Date(dategt);
      datelt.setDate(datelt.getDate() + 1);
      datelt.setHours(0, 0, 0, 0); // Set to midnight

      apiFilter.startgt = dategt; 
      apiFilter.startlt = datelt;

      let items_ = await GETtoday(apiFilter);
      return items_;
    } catch (error) {
      console.log("error fetching items");
      console.log(error);
      return [];
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
          setItems([]);
        }
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, [date, filter]); // Added filter to dependencies

  return (
    <View style={{backgroundColor: COLORS({opacity:1}).white}}>
      <FlatList
          data={items}
          renderItem={({ item }) => (
          <TouchableHighlight underlayColor={COLORS({opacity:0.2}).lightGrey}
            onPress={() => {
              navigation.navigate("Item", {"item": item, "doRefresh": doRefresh});
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
                <Text style={{ fontSize: textSIZES.xLarge}}>{item.icon}</Text>
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
          </TouchableHighlight>
          )}
          keyExtractor={(item) => item["_id"]} 
          style={styles.calendarView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    marginBottom: textSIZES.small,
    borderColor: COLORS({opacity:1}).lightGrey,
    backgroundColor: COLORS({opacity:0.1}).white,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.small,
    shadowColor: COLORS({opacity:1}).shadow,
    borderWidth:0.50,
    alignContent: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayCardContainer: {
    flex: 1,
    padding: textSIZES.xxSmall,
    marginLeft: textSIZES.xSmall,
  },
  title: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
  },
  prop: {
    fontWeight: "200",
  },
  time: {
    padding: textSIZES.xSmall,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "right",
  },
  timeLabel: {
    fontWeight: "200",
    fontSize: textSIZES.small,
  }
});
