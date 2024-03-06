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
import * as ImagePicker from 'expo-image-picker';

import React from "react";

const defaultImage = require("../assets/icon.png")

export default function ItemPage({ navigation, route}) {
  const { item } = route.params;
  const { title, description, favicon, icon, tags, notes, itemType, _id } = item;

  const [isExpanded, setIsExpanded] = useState(true);
  
  const [itemTitle, setItemTitle] = useState('Title');
  const [itemDesc, setItemDesc] = useState('Description');
  const [itemIcon, setItemIcon] = useState(icon.toString());
  const [itemNotes, setItemNotes] = useState('Notes');

  const [itemFavicon, setItemFavicon] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);


  const [hasChanges, setHasChanges] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [newItem, setNewItem] = useState({});

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
    (async () => {
      let galleryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (galleryStatus.status !== 'granted')
      {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        galleryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
      }
      setHasGalleryPermission(galleryStatus.status == 'granted');
    })

    if (!!_id) {
      setNewItem(item);
    }
    if (title) {
      setItemTitle(title);
    }
    if(description) {
      setItemDesc(description);
    }
    if(favicon) {
      setItemFavicon(favicon);
    }
  }, [item]); // Update category and section when item changes

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality:1,
    });

    if (!pickerResult.canceled) {
      const img = pickerResult.assets[0]; // Accessing the first selected asset
      setItemFavicon(img); // Using the uri from the first asset
    }

    if (hasGalleryPermission === false) {
      return <Text>Access to photo library not granted</Text>
    }
  };

  function doRefresh() {
    setRefreshing(true);
    if(!validatePostFields()){
      return;
    };
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
  
  function validatePostFields() {
    if (!newItem.title) {
      alert("Please add a Title");
      return false;
    }
    return true;
  }

  function updateNewItem(params) {
    if(params.title) {
      setNewItem({... newItem, "title": params.title});
    }
    if(params.description) {
      setNewItem({... newItem, "description": params.description});
    }
    if(params.favicon) {
      setNewItem({... newItem, "favicon": params.favicon});
    }
    if(params.category) {
      setNewItem({... newItem, "category": params.category});
    }
    if(params.section) {
      setNewItem({... newItem, "section": params.section});
    }
    if(params.duration) {
      setNewItem({... newItem, "duration": params.duration});
    }
    if(params.startDate) {
      setNewItem({... newItem, "startDate": params.startDate});
    }
    if(params.priority) {
      setNewItem({... newItem, "priority": params.priority});
    }
    if(params.repeat) {
      setNewItem({... newItem, "repeat": params.repeat});
    }
    if(params.tags) {
      setNewItem({... newItem, "tags": params.tags});
    }
    if(params.notes) {
      setNewItem({... newItem, "notes": params.notes});
    }
    if(params.subtasks) {
      setNewItem({... newItem, subtasks: params.subtasks});
    }
  }

  return (
    <SafeAreaView style={styles.container}>
    <GestureHandlerRootView>
      <ScrollView scrollEnabled={true}>
        <View style={styles.imageBox}>
          <TouchableOpacity onPress={() => (navigation.goBack())} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightRed}]}>
            <Ionicons name={"close-outline"} size={SIZES.xxLarge} style={styles.iconInverted}/> 
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={(newFavicon) => (
              pickImage(),
              updateNewItem({"favicon": newFavicon})
            )}
          >
            <Image
              source={itemFavicon ? { uri: itemFavicon.uri } : defaultImage}
              style={[styles.border, { width: 140, height: 140}]}
            />
            {/* ) : (
              <Ionicons name={"camera-outline"} size={80} style={[styles.border,styles.icon, {padding: 30}]}/> 
            )} */}
          </TouchableOpacity>
          <TouchableOpacity onPress={doRefresh} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightGreen}]}>
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
          <TextInput style={{width: "100%", fontSize: SIZES.xLarge, color: COLORS({opacity:0.9}).darkBlue}}
            {...(title ? { defaultValue: itemTitle } : { placeholder: itemTitle })}
            onChangeText={(newTitle) => (
              updateNewItem({"title": newTitle})
            )}
          />
        </View>
        <TextInput style={styles.description} 
          {...(description ? { defaultValue: itemDesc } : { placeholder: itemDesc })} 
          onChangeText={(newDescription) => (
            updateNewItem({"description": newDescription})
          )}
        />
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
        <ExpandableView expanded={isExpanded} view={PropertyCard} params={{"item": item, "itemType": itemType, "setFn": updateNewItem}} vh={300} />

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
        <Spacer size={SIZES.xSmall} />
        <TextInput style={styles.description} 
          {...(notes ? { defaultValue: itemNotes } : { placeholder: itemNotes })} 
          onChangeText={(newNotes) => (
            updateNewItem({"notes": newNotes})
          )}
        />
      </ScrollView>
    </GestureHandlerRootView>
    </SafeAreaView>
    
  )
};

const styles = StyleSheet.create({
  container: {
      width: "100%",
      padding: SIZES.medium,
      backgroundColor: COLORS({opacity:1}).white,
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
      padding: SIZES.medium,
      margin: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS({opacity:0.5}).darkBlue,
      borderRadius: SIZES.medium,
  },
  description:{
      fontSize: SIZES.medium,
      //fontFamily: FONT.regular,
      color: COLORS({opacity:0.9}).darkBlue,
      padding: SIZES.medium,
      marginHorizontal: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS({opacity:0.5}).darkBlue,
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
  button: {
    height: SIZES.xxLarge * 2,
    width: SIZES.xxLarge * 2,
    padding: SIZES.xSmall,
    marginHorizontal: SIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.medium
  },
});