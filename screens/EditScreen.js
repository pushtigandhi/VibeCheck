import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import { ExpandableView, Spacer } from '../utils';
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "./cards/PropertyCards";
import { Scheduler } from "../components/Scheduler";
import { ItemType } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import CollaboratorCard from "./cards/items/CollaboratorCard";
import TaskCard from "./cards/items/TaskCard";
import RecipeCard from "./cards/items/RecipeCard";
import { PATCHitemTEST } from "../API";
import * as ImagePicker from 'expo-image-picker';

import React from "react";

const defaultImage = require("../assets/icon.png");

export default function EditScreen({ navigation, route, expanded=true}) {
  const [disableSave, setDisableSave] = useState(true);

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
  
  const [location, setLocation] = useState('');

  const [tags, setTags] = useState([]);

  const [showDesc, setShowDesc] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  
  const [updatedItem, setUpdatedItem] = useState({});
  
  const [isExpanded, setIsExpanded] = useState(expanded);

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    doRefresh();
  }, [route.params?.item]);

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
    } if (location) {
      item.location = location;
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
    if(params.category) {
      setCategory(params.category);
    }
    if(params.section) {
      setSection(params.section);
    }
    if(params.duration) {
      if(params.duration == 'x')
      {
        const updated = updatedItem;
        delete updated.duration;
        setUpdatedItem(updated);
        
      }
      else {
        setUpdatedItem({... updatedItem, priority: params.duration});
      }
    }
    if(params.startDate) {
      if(params.startDate == 'x')
      {
        const updated = updatedItem;
        delete updated.startDate;
        setUpdatedItem(updated);
        
      }
      else {
        setUpdatedItem({... updatedItem, priority: params.startDate});
      }
    }
    if(params.endDate) {
      if(params.endDate == 'x')
      {
        const updated = updatedItem;
        delete updated.endDate;
        setUpdatedItem(updated);
        
      }
      else {
        setUpdatedItem({... updatedItem, priority: params.endDate});
      }
    }
    if(params.priority) {
      if(params.priority == 'x')
      {
        const updated = updatedItem;
        delete updated.priority;
        setUpdatedItem(updated);
        
      }
      else {
        setUpdatedItem({... updatedItem, priority: params.priority});
      }
    }
    if(params.repeat) {
      if(params.repeat == 'x')
      {
        const updated = updatedItem;
        delete updated.repeat;
        setUpdatedItem(updated);
        
      }
      else {
        setUpdatedItem({... updatedItem, repeat: params.repeat});
      }
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
      if(params.servings == 'x')
      {
        const updated = updatedItem;
        delete updated.servings;
        setUpdatedItem(updated);
        
      }
      else {
        setUpdatedItem({... updatedItem, servings: params.servings});
      }
    }
  }

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
        } if (item.favicon) {
          setFavicon(item.favicon);
        } if (item.notes) {
          setNotes(item.notes);
        } if (item.location) {
          setLocation(item.location);
        }
      }
    }
  }, [route.params?.item]); // Update category and section when item changes

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}>
      <SafeAreaView>
      <GestureHandlerRootView>
        <ScrollView scrollEnabled={true}>
          <View style={styles.imageBox}>
            <TouchableOpacity onPress={() => (navigation.goBack())} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightRed}]} > 
              <Ionicons name={"close-outline"} size={SIZES.xxLarge} style={styles.iconInverted}/> 
            </TouchableOpacity>
            <TouchableOpacity style={{alignConten: "center"}}
              onPress={(newFavicon) => (
                pickImage(),
                setFavicon(newFavicon)
              )}
            >
              <Image
                source={favicon ? { uri: favicon.uri } : defaultImage}
                style={[styles.border, { width: 140, height: 140}]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={doRefresh} style={[styles.button, {backgroundColor: disableSave ? COLORS({opacity:0.7}).lightGreen : COLORS({opacity:1}).lightGreen}]} disabled={disableSave} >
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
            <Text style={{fontSize: SIZES.xLarge, marginRight: SIZES.xxSmall}}>{icon}</Text>
            <TextInput style={{width: "100%", fontSize: SIZES.xLarge, color: COLORS({opacity:0.9}).primary}}
              {...(title ? { defaultValue: title } : { placeholder: "Title" })}
              onChangeText={(newTitle) => (
                setTitle(newTitle),
                newTitle ? setDisableSave(false) : setDisableSave(true)
              )}
            />
          </View>

          <View style={styles.divider}/>

          {showDesc == false && (
            <TouchableOpacity style={[styles.row, styles.divider]} onPress={()=>(setShowDesc(true))}>
              <Ionicons name={"menu-outline"} size={SIZES.xLarge} style={styles.icon}/>
              <Text style={styles.property}>Add Description</Text>
            </TouchableOpacity>
          )}
          {showDesc == true && (
            <>
            <View style={[styles.row, styles.description]}>
            <Ionicons name={"menu-outline"} size={SIZES.xLarge} style={[styles.icon, {marginRight: SIZES.xxSmall}]}/>
            <TextInput style={{width: "100%", fontSize: SIZES.medium, color: COLORS({opacity:0.9}).primary}}
              {...(description ? { defaultValue: description } : { placeholder: "Enter a description..." })} 
              onChangeText={(newDescription) => (
                  setDescription(newDescription)
              )}
              multiline
            />
          </View>
            <TouchableOpacity style={[styles.row, styles.divider, {marginTop: SIZES.small}]}
              onPress={() => (setDescription(null), setShowDesc(false))}
            >
              <Ionicons name={"close-outline"} size={20} style={styles.icon} />
              <Text>Remove</Text>
            </TouchableOpacity>
          </>
          )}

          {itemType == ItemType.Event && (
            <>
            {showLocation == false && (
              <TouchableOpacity style={[styles.row, styles.divider]} onPress={()=>(setShowLocation(true))}>
                <Ionicons name={"location-outline"} size={SIZES.xLarge} style={styles.icon}/>
                <Text style={styles.property}>Add Location</Text>
              </TouchableOpacity>
            )}
            {showLocation == true && (
              <>
              <View style={[styles.row, styles.description]}>
                <Ionicons name={"location-outline"} size={SIZES.xLarge} style={[styles.icon, {marginRight: SIZES.xxSmall}]}/>
                <TextInput style={styles.location} 
                  {...(location ? { defaultValue: location.toString() } : { placeholder: "Location" })} 
                  onChangeText={(newLocation) => (setLocation(newLocation))}
                />
              </View>
              <TouchableOpacity style={[styles.row, styles.divider, {marginTop: SIZES.small}]}
                onPress={() => (setShowLocation(false))}
              >
                <Ionicons name={"close-outline"} size={20} style={styles.icon} />
                <Text>Remove</Text>
              </TouchableOpacity>
              </>
            )}
            </>
          )}

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
          <ExpandableView expanded={isExpanded} view={PropertyCard} params={{"item": route.params?.item, "itemType": itemType, "setFn": updateNewItem, "isEditable": route.params?.isEditable }} vh={300} />

          <TouchableOpacity
              onPress={() => {
                  setShowScheduler(!showScheduler);
                }}
              style={styles.propContainer}
          >
            <View style={[styles.row, {justifyContent: "space-between"}]}>
              <View style={styles.row}>
                <Ionicons name={"calendar-outline"} size={SIZES.xLarge} style={styles.icon}/> 
                <Text style={styles.label} numberOfLines={1}>Schedule</Text>
              </View>
              <View>
                {showScheduler ? (
                    <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
                ) : (
                    <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
                )}
              </View>
            </View>
          </TouchableOpacity>
          <ExpandableView expanded={showScheduler} view={Scheduler} params={{"item": route.params?.item, "setFn": updateNewItem}} vh={260} />

          {itemType === ItemType.Event && (
            <CollaboratorCard item={route.params?.item} setFn={updateNewItem} />
          )}

          {(itemType === ItemType.Task || itemType === ItemType.Event) && (
            <TaskCard item={route.params?.item} setFn={updateNewItem} />
          )}

          {itemType === ItemType.Recipe && (
            <RecipeCard item={route.params?.item} setFn={updateNewItem} />
          )}


          {(showNotes == false && itemType !== ItemType.Page) && (
            <>
              <View style={styles.divider}/>
              <TouchableOpacity style={[styles.row, styles.divider]} onPress={()=>(setShowNotes(true))}>
                <Ionicons name={"document-outline"} size={SIZES.xLarge} style={styles.icon}/>
                <Text style={styles.property}>Add Notes</Text>
              </TouchableOpacity>
            </>
          )}
          {(showNotes == true || itemType === ItemType.Page) && (
            <>
              <TextInput style={styles.notes} 
                multiline
                {...(notes ? { defaultValue: notes } : { placeholder: "Notes" })} 
                onChangeText={(newNotes) => setNotes(newNotes)}
              />
              {itemType !== ItemType.Page && (
                <TouchableOpacity style={[styles.row, styles.divider, {marginTop: SIZES.xSmall}]}
                  onPress={() => (setNotes(null), setShowNotes(false))}
                >
                  <Ionicons name={"close-outline"} size={20} style={styles.icon} />
                  <Text>Remove</Text>
                </TouchableOpacity>
              )}
            </>
          )}

        </ScrollView>
      </GestureHandlerRootView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS({opacity:1}).white,
    flex:1,
  },
  row: {
      flexDirection: "row",
      alignItems: "center",
  },
  title:{
      padding: SIZES.medium,
      margin: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS({opacity:0.5}).darkBlue,
      borderRadius: SIZES.medium,
  },
  description:{
      padding: SIZES.medium,
      marginHorizontal: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS({opacity:0.5}).darkBlue,
      borderRadius: SIZES.medium,
  },
  notes:{
    fontSize: SIZES.medium,
    minHeight: 200,
    color: COLORS({opacity:0.9}).darkBlue,
    padding: SIZES.medium,
    margin: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.medium,
  },
  property: {
    fontSize: SIZES.medium, 
    color: COLORS({opacity:0.9}).primary
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
    margin: SIZES.medium,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: SIZES.medium/2,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
    padding: SIZES.medium,
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
  addButtonIcon: {
    height: SIZES.xxLarge,
    margin: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.small,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.xSmall,
    borderBottomWidth: 1,
    borderColor: COLORS({opacity:0.7}).primary,
    marginBottom: SIZES.xSmall,
    marginHorizontal: SIZES.xLarge,
  },
});