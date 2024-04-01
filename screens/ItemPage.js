import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import { ExpandableView, Spacer } from '../utils';
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "./cards/PropertyCards";
import { ItemType } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import { expandedSubTaskCard } from "./cards/items/TaskCard";
import TaskCard from "./cards/items/TaskCard";
import EventCard from "./cards/items/EventCard";
import RecipeCard from "./cards/items/RecipeCard";
import { PATCHitemTEST } from "../API";
import * as ImagePicker from 'expo-image-picker';

import React from "react";

const defaultImage = require("../assets/icon.png");

export default function ItemPage({ navigation, route, expanded=true}) {
  const [enableSave, setEnableSave] = useState(true);
  const [enableCancel, setEnableCancel] = useState(true);

  const [itemType, setItemType] = useState('');

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [icon, setIcon] = useState('');
  const [notes, setNotes] = useState(null);
  const [category, setCategory] = useState('');
  const [section, setSection] = useState('');
  const [duration, setDuration] = useState(15);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  
  const [updatedItem, setUpdatedItem] = useState({});
  
  const [isExpanded, setIsExpanded] = useState(expanded);

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    doRefresh();
  }, [route.params?.item]);

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

    if (route.params?.item) {
      const { item } = route.params;
      setItemType(item.itemType);
      setCategory(item.category);
      setSection(item.section);
      setIcon(item.icon.toString());
      if (item["_id"]) {
        setIsExpanded(false);
        setTitle(item.title);
        if (item.description) {
          setDescription(item.description);
        } 
      }
    }
  }, [route.params?.item]); // Update category and section when item changes

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality:1,
    });

    if (!pickerResult.canceled) {
      const img = pickerResult.assets[0]; // Accessing the first selected asset
      setFavicon(img); // Using the uri from the first asset
    }

    if (hasGalleryPermission === false) {
      return <Text>Access to photo library not granted</Text>
    }
  };

  function doRefresh() {
    let item = {
      title: title,
      category: category,
      section: section,
      icon: icon,
    };

    if (description) {
      item.description = description;
    } if (favicon) {
      item.favicon = favicon;
    } if (notes) {
      item.notes = notes;
    } if (updatedItem.repeat) {
      item.repeat = updatedItem.repeat;
    } if (updatedItem.priority) {
      item.priority = updatedItem.priority;
    } if (updatedItem.ingredients) {
      item.ingredients = updatedItem.ingredients;
    } if (updatedItem.instructions) {
      item.instructions = updatedItem.instructions;
    } if (updatedItem.servings) {
      item.servings = updatedItem.servings;
    } if (updatedItem.location) {
      item.location = updatedItem.location;
    }

    if(itemType === ItemType.Task || itemType === ItemType.Event) {
      item.startDate = startDate;
      item.duration = duration;
      item.endDate = new Date(endDate.setMinutes(endDate.getMinutes() + duration));
    }

    setRefreshing(true);
    if(!validatePostFields(item)){
      return;
    };
    console.log(item);
    // PATCHitemTEST(itemType, {
    //     ...item
    //   }, _id)
    //   .then((item_) => {
    //       setRefreshing(false);
    // }).catch((error) => {
    //     console.log(error);
    //     setRefreshing(false);
    // });
  };
  
  function validatePostFields(item) {
    if (!item.title) {
      alert("Please add a Title");
      return false;
    }
    return true;
  }

  function updateNewItem(params) {
    setEnableCancel(false);

    if(params.category) {
      setCategory(params.category);
    }
    if(params.section) {
      setSection(params.section);
    }
    if(params.duration) {
      setDuration(params.duration);
    }
    if(params.startDate) {
      setStartDate(params.startDate);
      setEndDate(params.startDate);
    }
    if(params.priority) {
      setPriority(params.priority);
    }
    if(params.repeat) {
      setRepeat(params.repeat);
    }
    // if(params.tags) {
    //   setUpdatedItem({... updatedItem, "tags": params.tags});
    // }
    if(params.subtasks) {
      setUpdatedItem({... updatedItem, subtasks: params.subtasks});
    }
    if(params.ingredients) {
      setUpdatedItem({... updatedItem, ingredients: params.ingredients});
    }
    if(params.instructions) {
      setUpdatedItem({... updatedItem, instructions: params.instructions});
    }
    if(params.servings) {
      setUpdatedItem({... updatedItem, servings: params.servings});
    }
    if(params.location) {
      setUpdatedItem({... updatedItem, location: params.location});
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}>
      <SafeAreaView>
      <GestureHandlerRootView>
        <ScrollView scrollEnabled={true}>
          <View style={styles.imageBox}>
            <TouchableOpacity onPress={() => (navigation.goBack())} style={[styles.button, {backgroundColor: enableCancel ? COLORS({opacity:0.7}).lightRed : COLORS({opacity:1}).lightRed}]} disabled={enableCancel} > 
              <Ionicons name={"close-outline"} size={SIZES.xxLarge} style={styles.iconInverted}/> 
            </TouchableOpacity>
            <TouchableOpacity style={{alignConten: "center"}}
              onPress={(newFavicon) => (
                pickImage(),
                setFavicon(newFavicon),
                setEnableCancel(false)
                //updateNewItem({"favicon": newFavicon})
              )}
            >
              <Image
                source={favicon ? { uri: favicon.uri } : defaultImage}
                style={[styles.border, { width: 140, height: 140}]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={doRefresh} style={[styles.button, {backgroundColor: enableSave ? COLORS({opacity:0.7}).lightGreen : COLORS({opacity:1}).lightGreen}]} disabled={enableSave} >
              <Ionicons name={"checkmark-outline"} size={SIZES.xxLarge} style={styles.iconInverted}/> 
            </TouchableOpacity>
          </View>
          
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
          <ExpandableView expanded={isExpanded} view={PropertyCard} params={{"item": route.params?.item, "itemType": itemType, "setFn": updateNewItem}} vh={300} />

          <View style={[styles.row, styles.title]}>
            {/* TODO: SELECT NEW ICON
            <TextInput
              style={{fontSize: SIZES.xLarge, borderRightWidth: 1, borderBlockColor: COLORS({opacity:1}).navy}}
              onChangeText={handleIconChange}
              value={itemIcon}
              placeholder={itemIcon}
            /> */}
            <Text style={{fontSize: SIZES.xLarge, marginRight: SIZES.xxSmall}}>{icon}</Text>
            <TextInput style={{width: "100%", fontSize: SIZES.xLarge, color: COLORS({opacity:0.9}).darkBlue}}
              {...(title ? { defaultValue: title } : { placeholder: "Title" })}
              onChangeText={(newTitle) => (
                setTitle(newTitle), 
                setEnableCancel(false),
                !!newTitle ? setEnableSave(false) :  setEnableSave(true)
              )}
            />
          </View>
          {!(itemType === ItemType.Page) && (
            <TextInput style={styles.description}
              multiline 
              {...(description ? { defaultValue: description } : { placeholder: "Description" })} 
              onChangeText={(newDescription) => (
                setDescription(newDescription),
                setEnableCancel(false)
              )}
            />
          )}

          {itemType === ItemType.Event && (
            <View>
              <Spacer size={10} />
              <EventCard item={route.params?.item} setFn={updateNewItem} />
            </View>
          )}

          {(itemType === ItemType.Task || itemType === ItemType.Event) && (
            <TaskCard item={route.params?.item} setFn={updateNewItem} />
          )}
          
          {itemType === ItemType.Page && (
            <TextInput style={styles.notes} 
              multiline
              {...(notes ? { defaultValue: itemNotes } : { placeholder: "Notes" })} 
              onChangeText={(newNotes) => setNotes(newNotes)}
            />
          )}

          {itemType === ItemType.Recipe && (
            <RecipeCard item={route.params?.item} setFn={updateNewItem} />
          )}

        </ScrollView>
      </GestureHandlerRootView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    //width: "100%",
    backgroundColor: COLORS({opacity:1}).white,
    //height: "100%",
    flex:1,
  },
  row: {
      flexDirection: "row",
      //justifyContent: "space-between",
      alignItems: "center",
  },
  title:{
      //fontSize: SIZES.xLarge,
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
  notes:{
    fontSize: SIZES.medium,
    height: 400,
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