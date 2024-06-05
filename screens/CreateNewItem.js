import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, FONT, SIZES, SHADOWS, ItemType } from "../constants";
import React, { useEffect, useState } from "react";
import { PropertyCard } from "../screens/cards/PropertyCards";
import CollaboratorCard from "./cards/items/CollaboratorCard";
import TaskCard from "./cards/items/TaskCard";
import RecipeCard from "./cards/items/RecipeCard";
import * as ImagePicker from 'expo-image-picker';

import { PATCHitemTEST } from "../API";

const defaultImage = require("../assets/icon.png");

export default function CreateNewItem({ item = null, onClose }) {
    const [itemType, setItemType] = useState(ItemType.Item);
    
    const [title, setTitle] = useState("Untitled");
    const [description, setDescription] = useState(null);
    const [favicon, setFavicon] = useState(null);
    const [icon, setIcon] = useState('');
    const [notes, setNotes] = useState(null);
    const [location, setLocation] = useState('');

    const [tags, setTags] = useState([]);
  
    const [showDesc, setShowDesc] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    
    const [updatedItem, setUpdatedItem] = useState({});
  
    const [isExpanded, setIsExpanded] = useState(true);
    const [isNew, setIsNew] = useState(true);

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

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

    function updateNewItem(params) {
        if(params.category) {
          setUpdatedItem({... updatedItem, category: params.category});
        }
        if(params.section) {
            setUpdatedItem({... updatedItem, section: params.section});
        }
        if(params.duration) {
          if(params.duration == 'x')
          {
            const updated = updatedItem;
            delete updated.duration;
            setUpdatedItem(updated);
            
          }
          else {
            setUpdatedItem({... updatedItem, duration: params.duration});
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
    

    function onSave() {
        if(isNew){
            console.log("New: " + updatedItem);

        } else {
            console.log("Edit: " + updatedItem);

            PATCHitemTEST(itemType, {
                ...updatedItem
            }, item._id)
            .then((item_) => {
                //alert("Success!");
            }).catch((error) => {
                console.log(error);
            });
        }
    };

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
    
        if (item) {
            if(item.ItemType)
                setItemType(item.itemType);
          setIcon(item.icon.toString());
          console.log("item: " + itemType + " " + item.category  + " " +item.section);
          if (item["_id"]) {
            setIsNew(false);
            setTitle(item.title);
            if (item.description) {
              setDescription(item.description);
              setShowDesc(true);
            } if (item.favicon) {
              setFavicon(item.favicon);
            } if (item.notes) {
              setNotes(item.notes);
              setShowNotes(true);
            } if (item.location) {
              setLocation(item.location);
              setShowLocation(true);
            }
          }
          setUpdatedItem({... item});
        }
    }, [item]); // Update category and section when item changes
   
    return (
        <ScrollView style={styles.container} scrollEnabled={true}>
            <View style={styles.imageBox}>
                <TouchableOpacity onPress={() => (onClose())} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightRed}]} > 
                    <Ionicons name={"close-outline"} size={SIZES.xxLarge} style={styles.iconInverse}/> 
                </TouchableOpacity>
                <TouchableOpacity style={{alignContent: "center"}}
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
                <TouchableOpacity onPress={() => (onSave())} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightGreen}]} >
                    <Ionicons name={"checkmark-outline"} size={SIZES.xxLarge} style={styles.iconInverse}/> 
                </TouchableOpacity>
            </View>

            <View style={[styles.row, styles.title]}>
                <Text style={{fontSize: SIZES.xLarge, marginRight: SIZES.xxSmall}}>{icon}</Text>
                <TextInput style={{width: "100%", fontSize: SIZES.xLarge, color: COLORS({opacity:0.9}).primary}} defaultValue={ title } 
                    onChangeText={(newTitle) => (setTitle(newTitle))}
                />
            </View>

            <View style={styles.divider}/>

            {showDesc == false && (
                <TouchableOpacity style={[styles.row, styles.label]} onPress={()=>(setShowDesc(true))}>
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
                    <TouchableOpacity style={[styles.row, styles.removeButton]}
                        onPress={() => (setDescription(null), setShowDesc(false))}
                    >
                        <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
                        <Text style={{color: COLORS({opacity:1}).white}}>Remove</Text>
                    </TouchableOpacity>
                </>
            )}

            <View style={styles.divider}/>

            {itemType == ItemType.Event && (
            <>
                {showLocation == false && (
                    <>
                    <TouchableOpacity style={[styles.row, styles.label]} onPress={()=>(setShowLocation(true))}>
                        <Ionicons name={"location-outline"} size={SIZES.xLarge} style={styles.icon}/>
                        <Text style={styles.property}>Add Location</Text>
                    </TouchableOpacity>

                    <View style={styles.divider}/>
                    </>
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
                    <TouchableOpacity style={[styles.row, styles.removeButton, {marginTop: SIZES.xxSmall}]}
                        onPress={() => (setShowLocation(false))}
                    >
                        <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
                        <Text style={{color: COLORS({opacity:1}).white}}>Remove</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.divider}/>
                    </>
                )}
            </>
            )}

            <TouchableOpacity style={[styles.row, styles.label, {justifyContent: "space-between"}]}
              onPress={() => {
                  setIsExpanded(!isExpanded);
                }}
            >
                <View style={styles.row}>
                    <Ionicons name={"information-circle-outline"} size={SIZES.xLarge} style={styles.icon}/> 
                    <Text style={styles.property} numberOfLines={1}>Properties</Text>
                </View>
                <View>
                    {isExpanded ? (
                        <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
                    ) : (
                        <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
                    )}
                </View>
            </TouchableOpacity>
            {isExpanded && (
                <>
                    <View style={styles.divider}/>
                    <PropertyCard itemType={itemType} item={updatedItem} setFn={updateNewItem}/>
                </>
            )}

            <View style={styles.divider}/>

            {itemType === ItemType.Event && (
                <>
                    <CollaboratorCard item={item} setFn={updateNewItem} />
                    <View style={styles.divider}/>
                </>
            )}

            {(itemType === ItemType.Task || itemType === ItemType.Event) && (
                <>
                    <TaskCard item={item} setFn={updateNewItem} />
                    <View style={styles.divider}/>
                </>
            )}

            {itemType === ItemType.Recipe && (
                <>
                    <RecipeCard item={item} setFn={updateNewItem} />
                    <View style={styles.divider}/>
                </>
            )}


            {(showNotes == false && itemType !== ItemType.Page) && (
                <>
                <TouchableOpacity style={[styles.row, styles.label]} onPress={()=>(setShowNotes(true))}>
                    <Ionicons name={"document-outline"} size={SIZES.xLarge} style={styles.icon}/>
                    <Text style={styles.property}>Add Notes</Text>
                </TouchableOpacity>
                <View style={styles.divider}/>
                </>
            )}
            {(showNotes == true || itemType === ItemType.Page) && (
                <KeyboardAvoidingView behavior="padding" >
                <GestureHandlerRootView>
                <TextInput style={styles.notes} 
                    multiline
                    {...(notes ? { defaultValue: notes } : { placeholder: "Notes" })} 
                    onChangeText={(newNotes) => setNotes(newNotes)}
                />
                {itemType !== ItemType.Page && (
                    <TouchableOpacity style={[styles.row, styles.removeButton]}
                        onPress={() => (setNotes(null), setShowNotes(false))}
                    >
                        <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
                        <Text style={{color: COLORS({opacity:1}).white}}>Remove</Text>
                    </TouchableOpacity>
                )}
                </GestureHandlerRootView>
                </KeyboardAvoidingView>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS({opacity:1}).white,
        marginTop: 50,
        //flex:1,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "space-between",
    },
    header: {
        display: "flex",
        marginTop: SIZES.small,
        paddingTop: SIZES.xxLarge,
        paddingHorizontal: SIZES.xSmall,
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: SIZES.large,
        alignSelf: "center",
        color: COLORS({opacity:1}).white,
    },
    sortText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: SIZES.medium,
        marginHorizontal: SIZES.medium,
        color: "black",
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
    searchButton: {
        // marginRight: 90,
        // marginLeft: 90,
        marginHorizontal: 50,
        marginTop: SIZES.xSmall,
        marginBottom: 25,
        paddingTop: SIZES.xSmall,
        paddingBottom: SIZES.xSmall,
        backgroundColor: COLORS({opacity: 1}).secondary,
        borderRadius: SIZES.small,
    },
    searchButtonText: {
        fontSize: SIZES.large,
        alignSelf: "center",
        color: COLORS({opacity:1}).lightWhite,
    },
    root: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: COLORS({opacity:1}).white,
    },
    innerRoot: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        paddingHorizontal: 20,
    },
    closeIcon: {
        alignSelf: "center",
    },
    textInput: {
        borderColor: COLORS({opacity:1}).primary,
        backgroundColor: "white",
        borderRadius: SIZES.xSmall,
        borderWidth: 2,
        padding: 15,
        borderRadius: SIZES.xSmall,
        width: 260
    },
    
    icon: {
        //margin: SIZES.xxSmall,
        color: COLORS({opacity:0.8}).primary,
    },
    iconInverse: {
        //margin: SIZES.xxSmall,
        color: COLORS({opacity:1}).lightWhite,
    },
    box: {
        borderWidth: 0.5,
        borderColor: COLORS({opacity:1}).primary,
        borderRadius: SIZES.xxSmall,
        padding: SIZES.small, 
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.xxSmall,
    },
    selectedBox: {
        backgroundColor: COLORS({opacity:1}).secondary,
    },
    unselectedBox: {
      backgroundColor: COLORS({opacity:1}).lightWhite,
    },
    selectedText: {
     color: COLORS({opacity:1}).lightWhite,
    },
    unselectedText: {
     color: COLORS({opacity:1}).secondary,
    },
    section: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: COLORS({opacity:1}).primary,
    },
    removeButton: {
        backgroundColor: COLORS({opacity:1}).lightRed, 
        padding: SIZES.small, 
        borderRadius: SIZES.xxSmall,
        marginHorizontal: SIZES.medium,
        alignItems: 'center',
    },
    duration: {
        backgroundColor: COLORS({opacity:0.5}).lightGrey,
        padding: SIZES.xSmall,
        borderRadius: SIZES.xSmall,
        marginLeft: SIZES.xSmall,
    },
    picker: {
        width: 100,
        height: 150,
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
    title:{
        padding: SIZES.medium,
        margin: SIZES.medium,
        marginBottom: 0,
        borderWidth: 1,
        borderColor: COLORS({opacity:0.5}).primary,
        borderRadius: SIZES.medium,
    },
    description:{
        padding: SIZES.medium,
        margin: SIZES.medium,
        marginTop: 0,
        marginBottom: SIZES.xSmall,
        borderWidth: 1,
        borderColor: COLORS({opacity:0.5}).primary,
        borderRadius: SIZES.medium,
    },
    notes:{
        fontSize: SIZES.medium,
        minHeight: 200,
        color: COLORS({opacity:0.9}).primary,
        padding: SIZES.medium,
        margin: SIZES.medium,
        marginTop: 0,
        borderWidth: 1,
        borderColor: COLORS({opacity:0.5}).primary,
        borderRadius: SIZES.medium,
    },
    divider: {
        paddingHorizontal: SIZES.medium,
        paddingBottom: SIZES.xSmall,
        borderBottomWidth: 1,
        borderColor: COLORS({opacity:0.7}).primary,
        marginBottom: SIZES.xSmall,
        marginHorizontal: SIZES.xLarge,
    },
    label:{
        paddingVertical: SIZES.xxSmall,
        marginHorizontal: SIZES.xLarge,
    },
    property:{
        fontSize: SIZES.medium,
        color: COLORS({opacity:1}).primary,
    },
});