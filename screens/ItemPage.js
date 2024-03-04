import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import { ExpandableView, Spacer } from '../utils';
import Layout from "../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "./cards/PropertyCards";
import { ItemType } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import { expandedSubTaskCard } from "./cards/items/TaskCard";
import TaskCard from "./cards/items/TaskCard";
import { PATCHitemTEST } from "../API";

import React from "react";

const BRAND_ICON = require("../assets/icon.png")

export default function ItemPage({ navigation, route}) {
  const { item } = route.params;
  const { title, description, favicon, icon, tags, itemType, _id } = item;

  const [isExpanded, setIsExpanded] = useState(true);
  
  const [itemTitle, setItemTitle] = useState('Title');
  const [itemDesc, setItemDesc] = useState('Description');
  const [itemIcon, setItemIcon] = useState(icon.toString());
  const [notes, setNotes] = useState('');

  const [hasChanges, setHasChanges] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [newItem, setNewItem] = useState({});

  function updateNewItem(params) {
    if(params.subtasks) {
      setNewItem({... newItem, subtasks: params.subtasks});
    }
  }

  function doRefresh() {
    console.log(newItem);
    setRefreshing(true);
    PATCHitemTEST(itemType, {
        ...newItem
      }, _id)
      .then((item_) => {
          setRefreshing(false);
    }).catch((error) => {
        console.log(error);
        setRefreshing(false);
    });
  };

  useEffect(() => {
    doRefresh();
  }, [item]);

  const onRefresh = React.useCallback(() => {
    doRefresh();
  }, [item]);

  //const [isEmoji, setIsEmoji] = useState(false);

  // Regex to check for emojis. This pattern covers a wide range of emojis but might not be exhaustive.
  //const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

  // const handleIconChange = (newIcon) => {
  //   if(setIsEmoji(emojiRegex.test(newIcon))) {
  //     setItemIcon(newIcon);
  //   };
  // };

  useEffect(() => {
    if (!!_id) {
      setNewItem(item);
    }
    if (title) {
      setItemTitle(title);
    }
    if(description)
      setItemDesc(description);
  }, [item]); // Update category and section when item changes

  return (
    <SafeAreaView style={styles.container}>
    <GestureHandlerRootView>
      <ScrollView scrollEnabled={true}>
        <View style={styles.imageBox}>
          <TouchableOpacity style={styles.cancel}>
            <Ionicons name={"close-outline"} size={SIZES.xxLarge} style={styles.iconInverted}/> 
          </TouchableOpacity>
          <TouchableOpacity>
            {!!favicon ? (
              <Image
                source={BRAND_ICON}
                style={[styles.border, { width: 140, height: 140}]}
              />
            ) : (
              <Ionicons name={"camera-outline"} size={80} style={[styles.border,styles.icon, {padding: 30}]}/> 
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={doRefresh} style={styles.save}>
            <Ionicons name={"checkmark-outline"} size={SIZES.xxLarge} style={styles.iconInverted}/> 
          </TouchableOpacity>
        </View>
        <View style={[styles.row, styles.title]}>
          {/* TODO: SELECT NEW ICON
          <TextInput
            style={{fontSize: SIZES.xLarge, borderRightWidth: 1, borderBlockColor: COLORS({opacity:1}).navy}}
            onChangeText={handleIconChange}
            value={itemIcon}
            placeholder={itemIcon}
          /> */}
          <Text style={{fontSize: SIZES.xLarge}}>{itemIcon}</Text>
          <TextInput style={{width: "100%", fontSize: SIZES.xLarge}}
              placeholder={itemTitle}>
          </TextInput>
        </View>
        {/* <Text style={styles.title}>{itemTitle}</Text> */}
        <TextInput style={styles.description} 
            placeholder={itemDesc}>
        </TextInput>

        <TouchableOpacity
            onPress={() => {
                setIsExpanded(!isExpanded);
              }}
            style={styles.propContainer}
        >
          <View style={[styles.row, {justifyContent: "space-between"}]}>
            <View style={styles.row}>
              <Ionicons name={"information-circle-outline"} size={SIZES.xLarge} style={styles.icon}/> 
              <Text style={styles.label} numberOfLines={1}>Properties</Text>
            </View>
            <View>
              {isExpanded ? (
                  <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
              ) : (
                  <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <ExpandableView expanded={isExpanded} view={PropertyCard} params={{item}} vh={300} />
        {itemType === ItemType.Task && (
          <TaskCard task={item} setFn={updateNewItem} />
        )}
        {itemType === ItemType.Page && (
          <View style={styles.propContainer}>
            <TextInput style={styles.description}
              placeholder="Add text here"
            ></TextInput>
          </View>
        )}
        {!!notes && (
          <Text>{notes}</Text>
        )}
      </ScrollView>
    </GestureHandlerRootView>
    </SafeAreaView>
    
  )
};

const styles = StyleSheet.create({
  container: {
      width: "100%",
      padding: SIZES.medium,
      backgroundColor: "#FFF",
      height: "100%",
  },
  row: {
      flexDirection: "row",
      //justifyContent: "space-between",
      alignItems: "center",
  },
  title:{
      fontSize: SIZES.xLarge,
      //fontFamily: FONT.regular,
      color: COLORS({opacity:0.9}).darkBlue,
      padding: SIZES.medium,
      margin: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS({opacity:1}).navy,
      borderRadius: SIZES.medium,
  },
  description:{
      fontSize: SIZES.medium,
      //fontFamily: FONT.regular,
      color: COLORS({opacity:0.9}).darkBlue,
      padding: SIZES.medium,
      marginHorizontal: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS({opacity:1}).navy,
      borderRadius: SIZES.medium,
  },
  propContainer: {
    width: '90%',
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderBottomWidth: 1,
    borderRadius: SIZES.medium,
    marginHorizontal: SIZES.medium,
  },
  label: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  expandedContainer: {
    paddingBottom: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    flex: 1,
    overflow: 'scroll',
  },
  imageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: SIZES.Small,
  },
  border: {
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    borderRadius: SIZES.medium
  },
  icon: {
    color: COLORS({opacity:0.8}).darkBlue,
  },
  iconInverted: {
    color: COLORS({opacity:0.8}).white,
  },
  cancel: {
    height: SIZES.xLarge * 2,
    padding: SIZES.xSmall,
    margin: SIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS({opacity:1}).lightRed,
    borderRadius: SIZES.medium
  },
  save: {
    height: SIZES.xLarge * 2,
    padding: SIZES.xSmall,
    margin: SIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS({opacity:1}).lightGreen,
    borderRadius: SIZES.medium
  },
});