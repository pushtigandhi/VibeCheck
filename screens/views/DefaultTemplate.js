import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal,Dimensions } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const defaultTestItems = [
  {
      "_id": "65dffbe64102392ebb5783b0",
      "category": "Backlog", 
      "description": "Description of what the item is. ", 
      "favicon": {"assetId": "A763AC6D-6F2C-46F2-93A6-5B8E616CC06C/L0/001", "base64": null, "duration": null, "exif": null, "fileName": "IMG_0707.jpg", "fileSize": 1536094, "height": 2002, "mimeType": "image/jpeg", "type": "image", "uri": "file:///var/mobile/Containers/Data/Application/2B539751-A0AE-44FE-B0A5-919A07440921/Library/Caches/ExponentExperienceData/@anonymous/VibeCheck-c25b1d4f-7003-4b9f-8017-6562b5a94a07/ImagePicker/4E780BC8-D48C-4176-9570-17ACAECCBADF.jpg", "width": 2002}, 
      "icon": "📦", 
      "notes": "Remember important info about the item. ", 
      "section": "All", 
      "title": "Item",
      "owner": "65dffad64102392ebb57839b",
      "duration": "30",
      "startDate": "2024-03-29T10:00:00.000Z",
      "endDate": "2024-03-29T13:08:05.326Z",
      "repeat": "DAILY",
      "createdAt": "2024-02-29T03:37:10.111Z",
      "updatedAt": "2024-02-29T03:37:10.111Z",
      "__v": 0
  },
  {
      "category": "Backlog", 
      "description": "Description of the task. ", 
      "icon": "📋", 
      "notes": "Important details about the task.", 
      "priority": "HIGH", 
      "section": "All", 
      "title": "Task",
      "_id": "65dffbe64102392ebb5783b01235436457",
      "itemType": "Task",
      "subtasks": [{"isChecked": false, "task": "first subtask", "_id": "65e134a91635ad960dab35ytsdc1c"},
      {"isChecked": false, "task": "2 subtask", "_id": "65e134a91635ad960dabsrhjdc1c"}],
      "contacts": [{"isChecked": false, "task": "4 subtask", "_id": "65e134a91635ad96tdku0dabdc1c"},
      {"isChecked": false, "task": "5 subtask", "_id": "65e134a91635ad96nhdtt0dabdc1c"}],
      "owner": "65dffad64102392ebb57839b",
      "duration": "150",
      "startDate": "2024-03-29T14:30:00.000Z",
      "endDate": "2024-03-13T17:00:05.326Z",
      "createdAt": "2024-02-29T03:37:10.111Z",
      "updatedAt": "2024-02-29T03:37:10.111Z",
      "__v": 0
  },{
      "category": "Backlog", 
      "description": "Description of the event. ", 
      "favicon": {"assetId": "89BA16EB-A861-4651-848B-33B0D9E412E5/L0/001", "base64": null, "duration": null, "exif": null, "fileName": "IMG_1345.jpg", "fileSize": 3784860, "height": 4032, "mimeType": "image/jpeg", "type": "image", "uri": "file:///var/mobile/Containers/Data/Application/2B539751-A0AE-44FE-B0A5-919A07440921/Library/Caches/ExponentExperienceData/@anonymous/VibeCheck-c25b1d4f-7003-4b9f-8017-6562b5a94a07/ImagePicker/F223FEC7-EEF1-40AE-AAA2-F16ED2247BEB.jpg", "width": 3024}, 
      "icon": "📍", 
      "section": "All", 
      "title": "Event",
      "_id": "65dffbe64102392ebb5783b056478",
      "contacts": [],
      "subtasks": [],
      "owner": "65dffad64102392ebb57839b",
      "duration": "60",
      "itemType": "Event",
      "startDate": "2024-03-29T18:15:00.000Z",
      "endDate": "2024-03-29T19:15:05.326Z",
      "createdAt": "2024-02-29T03:37:10.111Z",
      "updatedAt": "2024-02-29T03:37:10.111Z",
      "__v": 0
  },{
      "_id": "65dffbe64102392ebb5783b0xtu",
      "icon": '\u{1F4C4}',
      "title": "Daily Reflection",
      "category": "Backlog",
      "section": "All",
      "itemType": "Page",
      "repeat": "DAILY",
      "notes": "Journal prompt here.",
      "owner": "65dffad64102392ebb57839b",
      "startDate": "2024-03-29T20:00:00.000Z",
      "endDate": "2024-03-13T20:30:00.326Z",
      "createdAt": "2024-02-29T03:37:10.111Z",
      "updatedAt": "2024-02-29T03:37:10.111Z",
      "__v": 0
  },{
      "_id": "65dffbe64102392ebb5b0xtu",
      "title": "Dinner - Recipe",
      "category": "Cooking",
      "section": "Recipes",
      "favicon": {"assetId": "53493CEF-3F13-4D9C-8E4B-0C84C7E47D7C/L0/001", "base64": null, "duration": null, "exif": null, "fileName": "IMG_1124.jpg", "fileSize": 6554812, "height": 4032, "mimeType": "image/jpeg", "type": "image", "uri": "file:///var/mobile/Containers/Data/Application/2B539751-A0AE-44FE-B0A5-919A07440921/Library/Caches/ExponentExperienceData/@anonymous/VibeCheck-c25b1d4f-7003-4b9f-8017-6562b5a94a07/ImagePicker/7D7072D5-940D-4730-B4ED-47727C1578B3.jpg", "width": 3024},
      "itemType": "Recipe",
      "icon": '\u{1F37D}',
      "servings": 3,
      "repeat": "WEEKLY",
      "priority": "HIGH",
      "ingredients" : [{"isChecked": false, "task": "2 cups all puprose flour", "_id": "65e134a91635ad960dab35ytsdc1c"},
          {"isChecked": false, "task": "1 cup water", "_id": "65e134a91635ad960dabsrhjdc1c"},
          {"isChecked": false, "task": "1tbsp yeast", "_id": "65e134a91635ad960dabsrhjwew1c"},
      ],
      "instructions": [{"isChecked": false, "task": "Mix ingredients and knead dough", "_id": "65e134a91635ad960dab35ytsdc1c"},
      {"isChecked": false, "task": "Rest for 30 mins", "_id": "65e134a91635ad960dabsrhjdc1c"},
      {"isChecked": false, "task": "Separate dough into 4", "_id": "65e134a91635ad960dabsrhjwew1c"},
      {"isChecked": false, "task": "Preheat oven to 350F", "_id": "65e134a91635ad960dab35ytsdc1c"}],
      "owner": "65dffad64102392ebb57839b",
      "startDate": "2024-03-29T22:00:00.000Z",
      "endDate": "2024-03-13T23:30:00.326Z",
      "createdAt": "2024-02-29T03:37:10.111Z",
      "updatedAt": "2024-02-29T03:37:10.111Z",
      "__v": 0
  },
]

const ListView = ({ items }) => (
  <FlatList
    scrollEnabled={true}
    data={items}
    renderItem={({item}) => (
      <TouchableOpacity style={styles.cardContainer} key={item["_id"] + "_root"} >
        <View style={styles.row}>
          <Text style={{ fontSize: SIZES.regular}}>{item.icon}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )}
  /> 
);

const GalleryView = ({ items }) => (
  <FlatList
    scrollEnabled={true}
    data={items}
    numColumns={2} 
    renderItem={({item}) => (
      <TouchableOpacity style={styles.cardContainer} key={item["_id"] + "_root"} >
        <View style={styles.imageBox}>
          <Image
              source={item.favicon ? { uri: item.favicon.uri } : defaultImage}
              style={[styles.border, { width: 140, height: 140}]}
          />
        </View>
        <View style={[styles.row]}>
          <Text style={{fontSize: SIZES.xLarge}}>{item.icon}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
);

const defaultImage = require("../../assets/icon.png");

export default function DefaultTemplate () {
  const [selectedTab, setSelectedTab] = useState('List');

  const renderTab = () => {
    switch (selectedTab) {
      case 'List':
        return <ListView items={defaultTestItems} />;
      case 'Gallery':
        return <GalleryView items={defaultTestItems} />;
      default:
        return <ListView items={defaultTestItems} />;
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.row, styles.propContainer, {justifyContent: "space-between"}]}>
        <Text style={styles.title}>Title</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.row, styles.searchInput]} >
            <Ionicons name={"search-outline"} size={20} style={styles.iconInverted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButtonIcon} >
            <Ionicons name={"funnel-outline"} size={20} style={styles.iconInverted}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.row, styles.addButton]} >
            <Ionicons name={"add-circle"} size={20} style={styles.iconInverted}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'List' && styles.activeTab]}
          onPress={() => setSelectedTab('List')}
        >
          {selectedTab === 'List' ? 
            (
              <Ionicons name={"list-circle"} size={SIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
            ) 
          : (
              <Ionicons name={"list-circle-outline"} size={SIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
            )
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Gallery' && styles.activeTab]}
          onPress={() => setSelectedTab('Gallery')}
        >
          {selectedTab === 'Gallery' ? 
            (
              <Ionicons name={"image"} size={SIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
            ) 
          : (
              <Ionicons name={"image-outline"} size={SIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
            )
          }
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {renderTab()}
      </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  cardContainer: {
    margin: SIZES.xSmall,
    marginBottom: SIZES.tiny,
    backgroundColor: "#FFF",
    ...SHADOWS.small,
    shadowColor: COLORS({opacity:1}).shadow,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
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
    paddingVertical: SIZES.medium,
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS({opacity:0.8}).primary,
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
});