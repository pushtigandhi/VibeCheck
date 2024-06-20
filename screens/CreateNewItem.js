import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, FONT, textSIZES, SHADOWS, ItemType, viewSIZES } from "../constants";
import React, { useEffect, useState } from "react";
import { PropertyCard } from "../screens/cards/PropertyCards";
import CollaboratorCard from "./cards/CollaboratorCard";
import TaskCard from "./cards/TaskCard";
import RecipeCard from "./cards/RecipeCard";
import * as ImagePicker from 'expo-image-picker';
import { Scheduler } from "../components/Scheduler";
import { PATCHitemTEST, DELETEitemTEST } from "../API";

const defaultImage = require("../assets/icon.png");

export default function CreateNewItem({ item = null, onClose, isScheduler=false }) {
    const [title, setTitle] = useState("Untitled");
    const [description, setDescription] = useState(null);
    const [favicon, setFavicon] = useState(null);
    const [icon, setIcon] = useState('');
    const [notes, setNotes] = useState(null);
    const [location, setLocation] = useState('');
  
    const [showDesc, setShowDesc] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showScheduler, setShowScheduler] = useState(isScheduler);
    
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
        if(params.notes) {
            if(params.notes == 'x')
            {
              const updated = updatedItem;
              delete updated.notes;
              setUpdatedItem(updated);
            }
            else {
              setUpdatedItem({... updatedItem, notes: notes});
            }
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
        if (params.startDate) {
            setUpdatedItem({... updatedItem, startDate: params.startDate});
        }
        if (params.endDate) {
            setUpdatedItem({... updatedItem, endDate: params.endDate});
        }
        if(params.repeat) {
            setUpdatedItem({... updatedItem, repeat: params.repeat});
        }
    }
    
    function onSave() {
        if(isNew){
            //console.log("New: " + updatedItem);

        } else {
            //console.log("Edit: " + updatedItem);

            PATCHitemTEST(item.itemType, {
                ...updatedItem
            }, item._id)
            .then((item_) => {
                //alert("Success!");
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    function onDelete() {
        DELETEitemTEST(item.itemType, item._id)
        .then((item_) => {
            //alert("Success!");
        }).catch((error) => {
            console.log(error);
        });
    };

    const ConfirmCancelPrompt = () => {
        Alert.alert(
        "Confirm Action",
        "Are you sure you want to proceed?",
        [
            {
            text: "Cancel",
            style: "cancel"
            },
            {
            text: "OK",
            onPress: () => onDelete()
            }
        ],
        { cancelable: false }
        );
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
            //console.log(item.itemType);
            if(item.ItemType)
                setItemType(item.itemType);
          setIcon(item.icon.toString());
          //console.log("item: " + item.itemType + " " + item.category  + " " +item.section);
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
                    <Ionicons name={"close-outline"} size={textSIZES.xxLarge} style={styles.iconInverse}/> 
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
                    <Ionicons name={"checkmark-outline"} size={textSIZES.xxLarge} style={styles.iconInverse}/> 
                </TouchableOpacity>
            </View>

            <View style={[styles.row, styles.title]}>
                <Text style={{fontSize: textSIZES.xLarge, marginRight: textSIZES.xxSmall}}>{icon}</Text>
                <TextInput style={{width: "100%", fontSize: textSIZES.xLarge, color: COLORS({opacity:0.9}).primary}} defaultValue={ title } 
                    onChangeText={(newTitle) => (setTitle(newTitle))}
                />
            </View>

            <View style={styles.divider}/>

            {showDesc == false && (
                <TouchableOpacity style={[styles.row, styles.label]} onPress={()=>(setShowDesc(true))}>
                    <Ionicons name={"menu-outline"} size={textSIZES.xLarge} style={styles.icon}/>
                    <Text style={styles.property}>Add Description</Text>
                </TouchableOpacity>
            )}
            {showDesc == true && (
                <>
                    <View style={[styles.row, styles.description]}>
                        <Ionicons name={"menu-outline"} size={textSIZES.xLarge} style={[styles.icon, {marginRight: textSIZES.xxSmall}]}/>
                        <TextInput style={{width: "100%", fontSize: textSIZES.small, color: COLORS({opacity:0.9}).primary}}
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
                        <Ionicons name={"close-outline"} size={20} style={styles.icon} />
                        <Text style={styles.unselectedText}>Remove</Text>
                    </TouchableOpacity>
                </>
            )}

            <View style={styles.divider}/>

            {item.itemType == ItemType.Event && (
            <>
                {showLocation == false && (
                    <>
                    <TouchableOpacity style={[styles.row, styles.label]} onPress={()=>(setShowLocation(true))}>
                        <Ionicons name={"location-outline"} size={textSIZES.xLarge} style={styles.icon}/>
                        <Text style={styles.property}>Add Location</Text>
                    </TouchableOpacity>

                    <View style={styles.divider}/>
                    </>
                )}
                {showLocation == true && (
                    <>
                    <View style={[styles.row, styles.description]}>
                        <Ionicons name={"location-outline"} size={textSIZES.xLarge} style={[styles.icon, {marginRight: textSIZES.xxSmall}]}/>
                        <TextInput style={styles.location} 
                        {...(location ? { defaultValue: location.toString() } : { placeholder: "Location" })} 
                        onChangeText={(newLocation) => (setLocation(newLocation))}
                        />
                    </View>
                    <TouchableOpacity style={[styles.row, styles.removeButton, {marginTop: textSIZES.xxSmall}]}
                        onPress={() => (setShowLocation(false))}
                    >
                        <Ionicons name={"close-outline"} size={20} style={styles.icon} />
                        <Text style={styles.unselectedText}>Remove</Text>
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
                    <Ionicons name={"information-circle-outline"} size={textSIZES.xLarge} style={styles.icon}/> 
                    <Text style={styles.property} numberOfLines={1}>Properties</Text>
                </View>
                <View>
                    {isExpanded ? (
                        <Ionicons name="chevron-up-outline" size={textSIZES.xLarge} style={styles.icon}/>
                    ) : (
                        <Ionicons name="chevron-down-outline" size={textSIZES.xLarge} style={styles.icon}/>
                    )}
                </View>
            </TouchableOpacity>
            {isExpanded && (
                <>
                    <View style={styles.divider}/>
                    <PropertyCard itemType={item.itemType} item={updatedItem} setFn={updateNewItem} isScheduler={isScheduler} />
                    {showScheduler && (
                        <View style={styles.infoContainer}>
                          <Scheduler item={item} setFn={updateNewItem} />
                        </View>
                    )}
                </>
            )}

            <View style={styles.divider}/>

            {item.itemType === ItemType.Event && (
                <>
                    <CollaboratorCard item={item} setFn={updateNewItem} />
                    <View style={styles.divider}/>
                </>
            )}

            {(item.itemType === ItemType.Task || item.itemType === ItemType.Event) && (
                <>
                    <TaskCard item={item} setFn={updateNewItem} />
                    <View style={styles.divider}/>
                </>
            )}

            {item.itemType === ItemType.Recipe && (
                <>
                    <RecipeCard item={item} setFn={updateNewItem} />
                    <View style={styles.divider}/>
                </>
            )}

            {(showNotes == false && item.itemType !== ItemType.Page) && (
                <>
                <TouchableOpacity style={[styles.row, styles.label]} onPress={()=>(setShowNotes(true))}>
                    <Ionicons name={"document-outline"} size={textSIZES.xLarge} style={styles.icon}/>
                    <Text style={styles.property}>Add Notes</Text>
                </TouchableOpacity>
                <View style={styles.divider}/>
                </>
            )}
            {(showNotes == true || item.itemType === ItemType.Page) && (
                <KeyboardAvoidingView behavior="padding" >
                <GestureHandlerRootView>
                <TextInput style={styles.notes} 
                    multiline
                    {...(notes ? { defaultValue: notes } : { placeholder: "Notes" })} 
                    onChangeText={(newNotes) => setNotes(newNotes)}
                />
                {item.itemType !== ItemType.Page && (
                    <TouchableOpacity style={[styles.row, styles.removeButton]}
                        onPress={() => (setNotes(null), setShowNotes(false))}
                    >
                        <Ionicons name={"close-outline"} size={20} style={styles.icon} />
                        <Text style={styles.unselectedText}>Remove</Text>
                    </TouchableOpacity>
                )}
                </GestureHandlerRootView>
                </KeyboardAvoidingView>
            )}

            {!isNew && (
                <TouchableOpacity onPress={() => ConfirmCancelPrompt()} style={[styles.removeButton, {backgroundColor: COLORS({opacity:1}).lightRed, margin: textSIZES.xSmall}]}>
                    <Text style={styles.iconInverse}>Delete</Text>
                </TouchableOpacity>
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
        marginTop: textSIZES.xSmall,
        paddingTop: textSIZES.xxLarge,
        paddingHorizontal: textSIZES.xSmall,
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: textSIZES.large,
        alignSelf: "center",
        color: COLORS({opacity:1}).white,
    },
    sortText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: textSIZES.small,
        marginHorizontal: textSIZES.small,
        color: "black",
    },
    button: {
        height: viewSIZES.xSmall,
        width: viewSIZES.xSmall,
        padding: textSIZES.xSmall,
        marginHorizontal: textSIZES.xSmall,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: textSIZES.small
    },
    searchButton: {
        // marginRight: 90,
        // marginLeft: 90,
        marginHorizontal: 50,
        marginTop: textSIZES.xSmall,
        marginBottom: 25,
        paddingTop: textSIZES.xSmall,
        paddingBottom: textSIZES.xSmall,
        backgroundColor: COLORS({opacity: 1}).secondary,
        borderRadius: textSIZES.xSmall,
    },
    searchButtonText: {
        fontSize: textSIZES.large,
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
        borderRadius: textSIZES.xSmall,
        borderWidth: 2,
        padding: 15,
        borderRadius: textSIZES.xSmall,
        width: 260
    },
    icon: {
        //margin: textSIZES.xxSmall,
        color: COLORS({opacity:1}).secondary,
    },
    iconInverse: {
        //margin: textSIZES.xxSmall,
        color: COLORS({opacity:1}).lightWhite,
    },
    box: {
        borderWidth: 0.5,
        borderColor: COLORS({opacity:1}).primary,
        borderRadius: textSIZES.xxSmall,
        padding: textSIZES.xSmall, 
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: textSIZES.xxSmall,
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
        fontSize: textSIZES.small,
        fontFamily: FONT.regular,
        color: COLORS({opacity:1}).primary,
    },
    removeButton: {
        backgroundColor: COLORS({opacity:0.3}).lightGrey, 
        padding: textSIZES.xSmall, 
        borderRadius: textSIZES.xxSmall,
        marginHorizontal: textSIZES.small,
        alignItems: 'center',
    },
    duration: {
        backgroundColor: COLORS({opacity:0.5}).lightGrey,
        padding: textSIZES.xSmall,
        borderRadius: textSIZES.xSmall,
        marginLeft: textSIZES.xSmall,
    },
    picker: {
        width: 100,
        height: 150,
    },
    imageBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: textSIZES.Small,
    },
    border: {
        borderWidth: 1,
        borderColor: COLORS({opacity:1}).navy,
        borderRadius: textSIZES.small
    },
    title:{
        padding: textSIZES.small,
        margin: textSIZES.small,
        marginBottom: 0,
        borderWidth: 1,
        borderColor: COLORS({opacity:0.5}).primary,
        borderRadius: textSIZES.small,
    },
    description:{
        padding: textSIZES.small,
        margin: textSIZES.small,
        marginTop: 0,
        marginBottom: textSIZES.xSmall,
        borderWidth: 1,
        borderColor: COLORS({opacity:0.5}).primary,
        borderRadius: textSIZES.small,
    },
    notes:{
        fontSize: textSIZES.small,
        minHeight: 200,
        color: COLORS({opacity:0.9}).primary,
        padding: textSIZES.small,
        margin: textSIZES.small,
        marginTop: 0,
        borderWidth: 1,
        borderColor: COLORS({opacity:0.5}).primary,
        borderRadius: textSIZES.small,
    },
    divider: {
        paddingHorizontal: textSIZES.small,
        paddingBottom: textSIZES.xSmall,
        borderBottomWidth: 1,
        borderColor: COLORS({opacity:0.7}).primary,
        marginBottom: textSIZES.xSmall,
        marginHorizontal: textSIZES.xLarge,
    },
    label:{
        paddingVertical: textSIZES.xxSmall,
        marginHorizontal: textSIZES.xLarge,
    },
    property:{
        fontSize: textSIZES.small,
        color: COLORS({opacity:1}).primary,
    },
    infoContainer: {
        marginHorizontal: textSIZES.small,
        marginVertical: textSIZES.xSmall,
        backgroundColor: COLORS({opacity:1}).lightWhite,
        borderRadius: textSIZES.small/2,
        ...SHADOWS.medium,
        shadowColor: COLORS({opacity:1}).shadow,
    },
});