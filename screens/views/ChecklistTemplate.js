import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, 
    RefreshControl, ScrollView, Image, Modal } from "react-native";

import HomeNavigation from "../HomeNavigation";
import { GETitems, GETitemsTEST } from "../../API";
import { COLORS, SIZES, SHADOWS, FONT, ItemType, ViewType } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { TabView, TabBar, ToolBar, SceneMap } from 'react-native-tab-view';

import { CalendarView } from "../partialViews/CalendarView";


const defaultImage = require("../../assets/icon.png");

const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];

const Checklist = ({items}) => {
    const [subtasks, setSubtasks] = useState(items);
    
    return (
      <ScrollView style={styles.expandedContainer}>
        <View style={styles.addButtonIcon} >
            <Ionicons name={"add-circle"} size={SIZES.large} style={styles.iconInverted} />
        </View>
        
        {(subtasks.map(item => (
          <View style={styles.cardsContainer} key={item["_id"]} >
            <View style={styles.row}>
              {item.isChecked ? (
                <Ionicons name={"checkbox-outline"} size={SIZES.large} style={styles.icon}/> 
              ) : (
                <Ionicons name={"square-outline"} size={SIZES.large} style={styles.icon}/>
              )}
              <Text style={styles.item} numberOfLines={1}>{item.title}</Text>
            </View>
          </View>
        )))}
      </ScrollView>
    )
  };

const Notes = ({items}) => {
    const [notes, setNotes] = useState(null);

    return (
        <ScrollView style={styles.expandedContainer}>
            <TextInput style={styles.notes} 
                multiline
                {...(notes ? { defaultValue: notes } : { placeholder: "Notes" })} 
                onChangeText={(newNotes) => setNotes(newNotes)}
              />
        </ScrollView>
    )
};


export default function ChecklistTemplate ({navigation, route, scrollEnabled = true}) {
  const [title, setTitle] = useState("Title");
  const [items, setItems] = useState([{
    "_id": "65dffbe64102392ebb5783b064s7irtu",
    "title": "test item 4",
    "category": "Backlog",
    "section": "All",
    "icon": "📍",
    "tags": [
        "new"
    ],
    "notes": [],
    "owner": "65dffad64102392ebb57839b",
    "duration": "30",
    "startDate": "2024-03-29T05:15:00.000Z",
    "endDate": "2024-03-13T07:08:05.326Z",
    "createdAt": "2024-02-29T03:37:10.111Z",
    "updatedAt": "2024-02-29T03:37:10.111Z",
    "__v": 0
}]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'checklist' },
    { key: 'notes' },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'checklist':
        return <Checklist items={items} />;
      case 'notes':
        return <Notes items={items} />;
      default:
        return null;
    }
  };
  const renderIcon = ({ route, focused, color }) => {
    let iconName;
  
    if (route.key === 'checklist') {
      iconName = focused ? 'checkbox' : 'checkbox-outline';
    } else if (route.key === 'notes') {
      iconName = focused ? 'reader' : 'reader-outline';
    }
  
    // Return the icon component
    return <Ionicons name={iconName} size={30} color={COLORS({opacity:1}).primary} />;
  };

  const [type, setTypeOptions] = useState("All");

  const typeOptions = [
    {label: "All", value: "All"},
    {label: "Day", value: "Day"},
    {label: "Week", value: "Week"},
    {label: "Month", value: "Month"}
  ];
    useEffect(() => {
        const indexOfTypeOption = Object.values(typeOptions).indexOf("type");
        setTypeOptions(Object.keys(typeOptions)[indexOfTypeOption]);

    }, [type]); // run only once

  return (
    <SafeAreaView style={styles.screen}>
        <View style={[styles.propContainer]}>
            <View style={[styles.row, {justifyContent: "space-between"}]}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.row}>
                    <View style={[styles.row, styles.searchInput]} >
                        <Ionicons name={"search-outline"} size={20} style={styles.iconInverted} />
                    </View>
                    <View style={styles.filterButtonIcon}>
                     <Ionicons name={"funnel-outline"} size={20} style={styles.iconInverted}/>
                    </View>
                </View>
            </View>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: 20 }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              renderIcon={renderIcon} // Pass the renderIcon function to render icons
              style={{ backgroundColor: 'white' }}
            />
          )}
        />
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
    marginVertical: SIZES.xxLarge,
    marginHorizontal: SIZES.small,
    padding: SIZES.small,
    borderWidth: 1, 
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: SIZES.xxSmall,
  },
  filterButtonIcon: {
    height: SIZES.xxLarge,
    width: SIZES.xxLarge,
    marginRight: SIZES.small,
    borderRadius: SIZES.xxSmall,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    height: SIZES.xxLarge,
    borderRadius: SIZES.xxSmall,
    //marginHorizontal: SIZES.medium,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: COLORS({opacity:0.5}).secondary,
  },
  sectionContainer: {
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
  },
  expandedContainer: {
    paddingBottom: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    flex: 1,
    overflow: 'scroll',
  },
  row: {
    flexDirection: "row",
    //justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
    margin: SIZES.xxSmall,
  },
  propContainer: {
    paddingHorizontal: SIZES.large,
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderRadius: SIZES.medium,
    backgroundColor: "#FFF"
  },
  imageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: SIZES.Small,
  },
  dayCardContainer: {
    flex: 1,
    padding: SIZES.xxSmall,
    marginLeft: SIZES.xSmall,
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
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    marginHorizontal: SIZES.medium,
    backgroundColor: COLORS({opacity:1}).lightWhite,// "#FFF",
    borderRadius: SIZES.small,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  addButtonIcon: {
    height: SIZES.xxLarge,
    margin: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
    alignItems: "center",
    justifyContent: "center",
},
});