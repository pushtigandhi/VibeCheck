import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, 
    RefreshControl, ScrollView, Image, Modal } from "react-native";

import HomeNavigation from "../HomeNavigation";
import { GETitems, GETitemsTEST } from "../../API";
import { COLORS, textSIZES, SHADOWS, FONT, ItemType, ViewType, viewSIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { TabView, TabBar, ToolBar, SceneMap } from 'react-native-tab-view';

const defaultImage = require("../../assets/icon.png");

const Checklist = ({items}) => {
    const [subtasks, setSubtasks] = useState(items);
    
    return (
      <ScrollView style={styles.expandedContainer}>
        <View style={styles.addButtonIcon} >
            <Ionicons name={"add-circle"} size={textSIZES.large} style={styles.iconInverted} />
        </View>
        
        {(subtasks.map(item => (
          <View style={styles.cardsContainer} key={item["_id"]} >
            <View style={styles.row}>
              {item.isChecked ? (
                <Ionicons name={"checkbox-outline"} size={textSIZES.large} style={styles.icon}/> 
              ) : (
                <Ionicons name={"square-outline"} size={textSIZES.large} style={styles.icon}/>
              )}
              <Text style={styles.item} numberOfLines={1}>{item.title}</Text>
            </View>
          </View>
        )))}
      </ScrollView>
    )
  };

const Notes = () => {

    return (
        <ScrollView style={styles.expandedContainer}>
            <Text style={styles.notes}>Your notes here.</Text>
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
        return <Notes />;
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

  return (
    <SafeAreaView style={styles.screen}>
        <View style={[styles.propContainer]}>
            <View style={[styles.row, {justifyContent: "space-between"}]}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.row}>
                    <View style={[styles.row, styles.searchInput]} >
                        <Ionicons name={"search-outline"} size={20} style={styles.iconInverted} />
                    </View>
                    {/* <View style={styles.filterButtonIcon}>
                     <Ionicons name={"options-outline"} size={20} style={styles.iconInverted}/>
                    </View> */}
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
    marginVertical: textSIZES.xxLarge,
    marginHorizontal: textSIZES.xSmall,
    padding: textSIZES.xSmall,
    borderWidth: 1, 
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xxSmall,
  },
  filterButtonIcon: {
    height: textSIZES.xxLarge,
    width: textSIZES.xxLarge,
    marginRight: textSIZES.xSmall,
    borderRadius: textSIZES.xxSmall,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    height: textSIZES.xxLarge,
    borderRadius: textSIZES.xxSmall,
    //marginHorizontal: textSIZES.small,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    marginRight: textSIZES.xSmall,
    borderRadius: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).secondary,
  },
  sectionContainer: {
    margin: textSIZES.xSmall,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  title: {
    fontSize: textSIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
  },
  expandedContainer: {
    paddingBottom: textSIZES.small,
    paddingHorizontal: textSIZES.small,
    flex: 1,
    overflow: 'scroll',
  },
  row: {
    flexDirection: "row",
    //justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: textSIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
    margin: textSIZES.xxSmall,
  },
  propContainer: {
    paddingHorizontal: textSIZES.large,
    padding: textSIZES.small,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderRadius: textSIZES.small,
    backgroundColor: "#FFF"
  },
  imageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: textSIZES.Small,
  },
  dayCardContainer: {
    flex: 1,
    padding: textSIZES.xxSmall,
    marginLeft: textSIZES.xSmall,
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
  },
  cardsContainer: {
    marginTop: textSIZES.small,
    marginHorizontal: textSIZES.small,
    backgroundColor: COLORS({opacity:1}).lightWhite,// "#FFF",
    borderRadius: textSIZES.xSmall,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  addButtonIcon: {
    height: textSIZES.xxLarge,
    margin: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
    alignItems: "center",
    justifyContent: "center",
},
});