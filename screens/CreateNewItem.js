import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, FONT, textSIZES, SHADOWS, ItemType, viewSIZES } from "../constants";
import React, { useEffect, useState } from "react";
import { PropertyCard } from "../screens/cards/PropertyCards";
import ItemList from "../components/ItemList";
import * as ImagePicker from 'expo-image-picker';
import { Scheduler } from "../components/Scheduler";
import { PATCHitem, DELETEitem, POSTitem } from "../API";
import SingleSelectDropdown from "../components/SingleSelectDropdown";
import { ListType } from "../constants/default";
import { useNavigation } from '@react-navigation/native';

const defaultImage = require("../assets/icon.png");
const listTypes = [{"label": ListType.Items, "value": ListType.Items}, {"label": ListType.Contacts, "value": ListType.Contacts}];

export default function CreateNewItem({ item = null, onClose, isScheduler=false }) {
    const [title, setTitle] = useState("Untitled");
    const [description, setDescription] = useState(null);
    const [favicon, setFavicon] = useState(null);
    const [icon, setIcon] = useState('');
    const [notes, setNotes] = useState(null);
    const [location, setLocation] = useState('');
    const [lists, setLists] = useState([]);
    const [tags, setTags] = useState([]);

    const [newListTitle, setNewListTitle] = useState('');
    const [newListType, setNewListType] = useState('');

    const [showScheduler, setShowScheduler] = useState(isScheduler);
    const [showLists, setShowLists] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    const [updatedItem, setUpdatedItem] = useState({});
  
    const [isExpanded, setIsExpanded] = useState(true);

    const [isNew, setIsNew] = useState(true);

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

    const navigation = useNavigation();
    
    const dropdownOptions = [
        { id: 'new', label: 'New', icon: 'add', action: () => console.log('New action') },
        { id: 'item', label: 'Item', icon: 'cube', action: () => console.log('Item action') },
        { id: 'event', label: 'Event', icon: 'search', action: () => console.log('Event action') },
        { id: 'task', label: 'Task', icon: 'list', action: () => console.log('Task action') },
        { id: 'page', label: 'Page', icon: 'document', action: () => console.log('Page action') },
        { id: 'recipe', label: 'Recipe', icon: 'restaurant', action: () => console.log('Recipe action') },
    ];

    
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
            setUpdatedItem(({ duration, ...rest }) => rest);
          }
          else {
            setUpdatedItem({... updatedItem, duration: params.duration});
          }
        }
        if(params.priority) {
          if(params.priority == 'x')
          {
            setUpdatedItem(({ priority, ...rest }) => rest);
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
            setUpdatedItem(({ servings, ...rest }) => rest);
          }
          else {
            setUpdatedItem({... updatedItem, servings: params.servings});
          }
        }
        if (params.addSchedule) {
            setUpdatedItem({... updatedItem, startDate: params.startDate, endDate: params.endDate, repeat: params.repeat});
        }
        if(params.cancelSchedule) {
            setUpdatedItem(({ startDate, endDate, repeat, ...rest }) => rest);
            setShowScheduler(false);
        }
        if(params.originalSchedule) {
            setUpdatedItem({... updatedItem, startDate: item.startDate, endDate: item.endDate, repeat: item.repeat});
        }
        if(params.tags) {
            setUpdatedItem({... updatedItem, tags: params.tags.split(/\s+|,/)
          .map((tag) => tag.trim())
          .filter((tag) => tag !== "")});
        }
    }
    
    function onSave() {
        const obj = {
            ...updatedItem,
            title: title,
            ...(description && { description: description }),
            ...(favicon && { favicon: favicon }),
            ...(location ? { location: location } : { location: null }),
            ...(notes && { notes: notes }),
            ...(icon && { icon: icon })
        }
        if(isNew){
            POSTitem(item.itemType ? item.itemType : ItemType.Item, {
                ...obj
            })
            .then((item_) => {
                //alert("Success!");
            }).catch((error) => {
                console.log(error);
            });

        } else {
            PATCHitem(item.itemType ? item.itemType : ItemType.Item, {
                ...obj
            }, item._id)
            .then((item_) => {
                //alert("Success!");

            }).catch((error) => {
                console.log(error);
            });
        }

        onClose();
    };

    function onDelete() {
        DELETEitem(item.itemType ? item.itemType : ItemType.Item, item._id)
        .then((item_) => {
            //alert("Success!");
        }).catch((error) => {
            console.log(error);
        });
        onClose('delete');
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
        })();
    
        if (item) {
            if(item.itemType)
                setIcon(item.icon.toString());
          if (item["_id"]) {
            setIsNew(false);
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
            if (item.lists) {
                setLists(item.lists);
                setShowLists(true);
              }
          }
          setUpdatedItem({... item});
        }
    }, [item]); // Update category and section when item changes

    return (
        <ScrollView style={styles.container} scrollEnabled={true}>
            <View style={styles.imageBox}>
                {!item["_id"] ? (
                    <TouchableOpacity onPress={() => (onClose())} style={[styles.button]} > 
                        <Ionicons name={"close"} size={textSIZES.large} style={styles.icon}/> 
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => (onClose())} style={[styles.button]} > 
                        <Ionicons name={"arrow-back"} size={textSIZES.large} style={styles.icon}/> 
                    </TouchableOpacity>
                )}
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
                <TouchableOpacity onPress={() => (onSave())} style={[styles.button]} >
                    <Ionicons name={"checkmark"} size={textSIZES.xxLarge} style={styles.icon}/> 
                </TouchableOpacity>
            </View>

            <View style={[styles.row, styles.title, { justifyContent: "space-between" }]}>
                <View style={styles.row}>
                    <TouchableOpacity
                        onPress={() => setShowDropdown(!showDropdown)}
                        style={styles.dropdownTrigger}
                    >
                        <Ionicons name="cube" size={textSIZES.xLarge} style={styles.icon}/>
                        {showDropdown && (
                            <View style={styles.dropdownMenu}>
                                <ScrollView style={styles.dropdownScrollView} showsVerticalScrollIndicator={true}>
                                    {dropdownOptions.map((option) => (
                                        <TouchableOpacity
                                            key={option.id}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                option.action();
                                                setShowDropdown(false);
                                            }}
                                        >
                                            <Ionicons name={option.icon} size={textSIZES.small} style={styles.dropdownIcon}/>
                                            <Text style={styles.dropdownText}>{option.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </TouchableOpacity>
                    <TextInput style={{ fontSize: textSIZES.large, color: COLORS({opacity:0.9}).primary}} defaultValue={ title } 
                        onChangeText={(newTitle) => (setTitle(newTitle))}
                    />
                </View>
                <View style={styles.row}>
                <TouchableOpacity
                        onPress={() => {
                            setIsExpanded(!isExpanded);
                            }}
                        style={styles.propContainer}
                    >
                        <Ionicons name={isExpanded ? "information-circle" : "information-circle-outline"} size={textSIZES.xxLarge} style={styles.icon}/> 
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setShowScheduler(!showScheduler);
                        }}
                        style={styles.propContainer}
                    >
                        <Ionicons name={showScheduler ? "calendar" : "calendar-outline"} size={textSIZES.xLarge} style={styles.icon}/> 
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setShowLists(!showLists);
                        }}
                        style={styles.propContainer}
                    >
                        <Ionicons name={showLists ? "list-circle" : "list-circle-outline"} size={textSIZES.xxLarge} style={styles.icon}/> 
                    </TouchableOpacity>
                </View>
            </View>
            {showLists && (
                <View style={styles.listContainer}>
                    <Text style={{color: COLORS({opacity:1}).primary, fontSize: textSIZES.small, fontWeight: "bold", marginHorizontal: textSIZES.xSmall, marginBottom: textSIZES.xSmall}}>New List</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter Title"
                        value={newListTitle}    
                        onChangeText={(newTitle) => setNewListTitle(newTitle)}
                    />
                    <SingleSelectDropdown
                        options={listTypes}
                        selectedValue={newListType}
                        placeholder="Select List Type"
                        hideSearch={true}
                        setFn={(itemValue) => setNewListType(itemValue)}
                    />
                    <View style={[styles.row, {justifyContent: "space-between"}]}>
                        <TouchableOpacity onPress={() => {
                            setShowLists(false)
                            setNewListTitle('')
                            setNewListType('')
                        }} style={[styles.addListButton, {borderWidth: 0.5, borderColor: COLORS({opacity:1}).primary}]} >
                            <Text style={{fontSize: textSIZES.small, fontWeight: "bold"}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setLists([...lists, {name: newListTitle, type: newListType, items: []}]);
                            setShowLists(false);
                            setNewListTitle('');
                            setNewListType('');
                        }} style={[styles.addListButton, {borderWidth: 0.5, borderColor: COLORS({opacity:1}).primary}]} >
                            <Text style={{fontSize: textSIZES.small, fontWeight: "bold"}}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {isExpanded && (
                <>
                    <PropertyCard itemType={item.itemType} item={updatedItem} setFn={updateNewItem}/>
                </>
            )}
            {showScheduler && (
                <>
                    <Scheduler item={updatedItem} setFn={updateNewItem} />
                </>
            )}
            
            <View style={[styles.description]}>
                <Text style={{ color: COLORS({opacity:0.7}).primary, marginBottom: textSIZES.xxSmall}}>Description</Text>
                <TextInput style={{flex:1}}
                    {...(description && { defaultValue: description })} 
                    onChangeText={(newDescription) => {
                        setDescription(newDescription)
                        if(newDescription.length == 0) {
                            const updated = updatedItem;
                            delete updated.description;
                            setUpdatedItem(updated);
                        }
                    }}
                    multiline
                />
            </View>
            <View style={[styles.row, styles.description, {marginBottom: textSIZES.small}]}>
                <Ionicons name={"location-outline"} size={textSIZES.xLarge} style={[styles.icon, {marginRight: textSIZES.xxSmall}]}/>
                <TextInput style={[styles.location, {flex: 1}]} 
                {...(location && { defaultValue: location })} 
                onChangeText={(newLocation) => {
                    setLocation(newLocation)
                    if(newLocation.length == 0) {
                        const updated = updatedItem;
                        delete updated.location;
                        setUpdatedItem(updated);
                    }
                }}
                />
            </View>

            {lists && lists.length > 0 && (
                <>
                    {lists.map((list, index) => (
                        <View key={index} style={{marginBottom: textSIZES.small}}>
                            <ItemList item={list} setFn={updateNewItem} isEditable={true} />
                        </View>
                    ))}
                </>
            )}

            <KeyboardAvoidingView behavior="padding" >
                <GestureHandlerRootView>
                    <View style={[styles.notes]}>
                        <Text style={{ color: COLORS({opacity:0.7}).primary, marginBottom: textSIZES.xxSmall}}>Notes</Text>
                        <TextInput style={{flex:1}}
                            {...(notes && { defaultValue: notes })} 
                            onChangeText={(newNotes) => {
                                setNotes(newNotes)
                                if(newNotes.length == 0) {
                                    const updated = updatedItem;
                                    delete updated.notes;
                                    setUpdatedItem(updated);
                                }
                            }}
                            multiline
                        />
                    </View>
                </GestureHandlerRootView>
            </KeyboardAvoidingView>

            {!isNew && (
                <TouchableOpacity onPress={() => ConfirmCancelPrompt()} style={[styles.removeButton, {borderWidth: 0.5, borderColor: COLORS({opacity:1}).primary, marginHorizontal: textSIZES.xLarge, marginTop: textSIZES.xSmall, marginBottom: textSIZES.xLarge}]}>
                    <Text style={{fontSize: textSIZES.small, fontWeight: "bold"}}>Delete</Text>
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
        height: viewSIZES.xxSmall,
        width: viewSIZES.xxSmall,
        padding: textSIZES.xSmall,
        marginHorizontal: textSIZES.xSmall,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: textSIZES.small,
        backgroundColor: COLORS({opacity:1}).white,
        shadowColor: COLORS({opacity:1}).black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
        borderWidth: 0.5,
        padding: 15,
        borderRadius: textSIZES.xSmall,
        width: '100%'
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
        padding: textSIZES.xxSmall,
        margin: textSIZES.small,
        borderBottomWidth: 1,
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
    propertyButton:{
        fontSize: textSIZES.small,
        color: COLORS({opacity:1}).primary,
    },
    propContainer: {
        marginHorizontal: textSIZES.xxSmall,
        marginVertical: textSIZES.tiny,
    },
    addListButton: {
        borderRadius: textSIZES.xxSmall,
        padding: textSIZES.xSmall, 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: textSIZES.xSmall,
        marginHorizontal: textSIZES.xSmall,
        flex: 1,
        //backgroundColor: COLORS({opacity:1}).navy,
    },
    listContainer: {
        marginHorizontal: textSIZES.small,
        marginBottom: textSIZES.small,
        padding: textSIZES.xSmall,
        backgroundColor: COLORS({opacity:1}).lightWhite,
        borderRadius: textSIZES.small/2,
        borderWidth: 1,
        borderColor: COLORS({opacity:1}).primary,
        maxHeight: 800,
    },
    dropdownTrigger: {
        position: 'relative',
        marginRight: textSIZES.xxSmall,
    },
    dropdownMenu: {
        position: 'absolute',
        bottom: textSIZES.xLarge,
        left: 0,
        backgroundColor: COLORS({opacity:1}).white,
        borderRadius: textSIZES.xSmall,
        borderWidth: 1,
        borderColor: 'rgba(35, 73, 146, 0.3)',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1000,
        minWidth: 120,
        maxHeight: 100,
    },
    dropdownScrollView: {
        maxHeight: 200,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: textSIZES.xSmall,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(35, 73, 146, 0.1)',
    },
    dropdownIcon: {
        color: 'var(--secondary)',
        marginRight: textSIZES.xxSmall,
    },
    dropdownText: {
        fontSize: textSIZES.small,
        color: 'var(--primary)',
        fontWeight: '500',
    }
});