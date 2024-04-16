import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Modal,
        StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import { ExpandableView, Spacer } from '../utils';
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "./cards/PropertyCards";
import { ItemType } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import CollaboratorCard from "./cards/items/CollaboratorCard";
import TaskCard from "./cards/items/TaskCard";
import RecipeCard from "./cards/items/RecipeCard";
import { PATCHitemTEST } from "../API";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import React from "react";

const defaultImage = require("../assets/icon.png");

const Properties = ({ item = null, itemType }) => {
    const [category, setCategory] = useState(null);
    const [section, setSection] = useState(null);
    const [priority, setPriority] = useState(null);
    const [serving, setServing] = useState(null);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
  
    const size = 25;
  
    useEffect(() => {
        setCategory(item.category);
        setSection(item.section);
        if (item.priority) {
            setPriority(item.priority);
        } if(item.duration){
            const hours = Math.floor(item.duration / 60);
            const minutes = item.duration % 60;
            setHour(hours);
            setMinute(minutes);
        } if(item.servings){
            setServing(item.servings.toString());
        }
    }, []); // Update category and section when item changes
  
    return (
      <SafeAreaView style={styles.infoContainer}>
        <View style={[styles.row, styles.property]}>
            <Ionicons name={"folder-open-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />
            <Text style={[styles.property, {marginLeft: SIZES.small}]}>{category}</Text>
        </View>
        <View style={[styles.row, styles.property]}>
            <Ionicons name={"bookmark-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />
            <Text style={[styles.property, {marginLeft: SIZES.small}]}>{section}</Text>
        </View>

        {item.duration && (
            <View style={[styles.row, styles.property, {marginBottom: SIZES.xxSmall}]}>
                <Ionicons name={"timer-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]}/>    
            
              <View style={styles.duration}>
                <Text style={{fontSize: SIZES.medium}}>{hour}</Text>
              </View>
            
                <Text style={styles.property}>Hours</Text>
            
              <View style={styles.duration}>
                <Text style={{fontSize: SIZES.medium}}>{minute}</Text>
              </View>
            
                <Text style={styles.property}>Minutes</Text>
          </View>
        )}

        {priority && (
            <View style={[styles.row, styles.property, {marginBottom: SIZES.xxSmall}]}>
            {(itemType === ItemType.Recipe) ? (
                <Ionicons name={"star-half-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
            ) : (
                <Ionicons name={"alert-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
            )}
            {priority === 'LOW' && (
                <View style={[styles.row, styles.box]}>
                    <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                </View>
            )}
            {priority === 'MED' && (
                <View style={[styles.row, styles.box]}>
                    <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                    <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                </View>
            )}
            {priority === 'HIGH' && (
                <View style={[styles.row, styles.box]}>
                    <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                    <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                    <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                </View>
            )}
            </View>
        )}
        
        {serving && (
            <View style={[styles.row, styles.property, {marginBottom: SIZES.xxSmall}]}>
                <Ionicons name={"restaurant-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />
                <Text style={[styles.property, styles.box, {marginLeft: SIZES.small}]}>{serving}</Text>
            </View>
        )}

      </SafeAreaView>
    )
};

const Scheduler = ({ item = null }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [repeat, setRepeat] = useState(null);
  
    const size = 25;
  
    useEffect(() => {
      if (item) {
        if(!!item.startDate){
          const parsedDate = new Date(item.startDate);
          setStartDate(parsedDate);
        }
        if(!!item.endDate){
          const parsedDate = new Date(item.endDate);
          setEndDate(parsedDate);
        }
        if(!!item.repeat){
          setRepeat(item.repeat);
        }
      }
    }, []); // Update category and section when item changes
  
    return (
      <SafeAreaView style={styles.infoContainer}>
        {startDate && (
            <View style={styles.row}>
                <Text style={{color: COLORS({opacity:0.8}).secondary, fontSize: SIZES.medium, marginLeft: SIZES.small}}>Start Date: </Text>
                
                <DateTimePicker
                    value={startDate}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    disabled={true}
                />
                <DateTimePicker
                    value={startDate}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    disabled={true}
                />
            </View>
        )}
        {endDate && (
            <View style={[styles.row, {marginTop: SIZES.small}]}>
                <Text style={{color: COLORS({opacity:0.8}).secondary, fontSize: SIZES.medium, marginLeft: SIZES.small}}>End Date: </Text>

                <DateTimePicker
                    value={endDate}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    disabled={true}
                />
                <DateTimePicker
                    value={endDate}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    disabled={true}
                />
            </View>
        )}
  
        {repeat && (
            <View style={[styles.row, styles.property]}>
                <Ionicons name={"repeat-outline"} size={25} style={[styles.icon, {margin: SIZES.xSmall}]}/>
                <Text style={[styles.box, styles.selectedText]}>{repeat}</Text>
            </View>
        )}
      </SafeAreaView>
    )
};

export default function ItemCard({ navigation, route }) {
  const [disableSave, setDisableSave] = useState(true);

  const [itemType, setItemType] = useState('');

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [icon, setIcon] = useState(null);
  const [notes, setNotes] = useState(null);
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState([]);

  const [showScheduler, setShowScheduler] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [updatedItem, setUpdatedItem] = useState({});

  function updateNewItem(params) {
    if(params.subtasks) {
      setUpdatedItem({... updatedItem, subtasks: params.subtasks});
    }
    if(params.ingredients) {
      setUpdatedItem({... updatedItem, ingredients: params.ingredients});
    }
    if(params.instructions) {
      setUpdatedItem({... updatedItem, instructions: params.instructions});
    }
  }

  function goHome() {
    navigation.navigate('Home', { refresh: Math.random() });
  }

  function onGoBack() {
    if(Object.keys(updatedItem).length > 0) {
        PATCHitemTEST(itemType, {
            ...route.params?.item,
            ...updatedItem
        }, route.params?.item._id)
        .then((item_) => {
            //alert("Success!");
        }).catch((error) => {
            console.log(error);
        });
    }
    goHome();
    //navigation.goBack();
  }

  const onRefresh = React.useCallback(() => {
    doRefresh();
  }, [route.params?.item]);

  useEffect(() => {
    if (route.params?.item) {
        const { item } = route.params;

        if(item.itemType) {
            setItemType(item.itemType);
        }
      
        setTitle(item.title);
        setIcon(item.icon.toString());
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
  }, [route.params?.item]); // Update category and section when item changes

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}>
      <SafeAreaView>
      <GestureHandlerRootView>
        <ScrollView scrollEnabled={true}>
          <View style={styles.imageBox}>
            <TouchableOpacity onPress={() => (onGoBack())} style={[styles.button]} > 
                <Ionicons name={"arrow-back-outline"} size={SIZES.large} style={styles.icon}/> 
            </TouchableOpacity>
            {favicon && (
                <>
                <TouchableOpacity style={{alignConten: "center"}} onPress={() => setModalVisible(true)}
                    // onPress={(newFavicon) => (
                    //   pickImage(),
                    //   setFavicon(newFavicon)
                    // )}
                >
                    <Image
                    source={favicon ? { uri: favicon.uri } : defaultImage}
                    style={[styles.border, { width: 140, height: 140}]}
                    />
                </TouchableOpacity>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
                        <Image
                        source={favicon ? { uri: favicon.uri } : defaultImage}
                        style={styles.fullImage}
                        resizeMode="contain" // or "cover" depending on your preference
                        />
                    </TouchableOpacity>
                </Modal>
                </>
            )}
            <TouchableOpacity style={[styles.button]}
                onPress={() => {
                    navigation.navigate("EditItem", {"item": route.params?.item});
                }}  
            >
                <Ionicons name={"pencil-outline"} size={SIZES.large} style={styles.icon}/> 
            </TouchableOpacity>
          </View>
          
          <View style={[styles.row, styles.title]}>
            <Text style={{fontSize: SIZES.xLarge, marginRight: SIZES.xxSmall}}>{icon}</Text>
            <Text style={{width: "100%", fontSize: SIZES.xLarge, color: COLORS({opacity:0.9}).primary}}>
                {title}
            </Text>
          </View>


          {description && (
            <View style={[styles.row, styles.description]}>
                <Ionicons name={"menu-outline"} size={SIZES.xLarge} style={[styles.icon, {marginRight: SIZES.xxSmall}]}/>
                <Text style={{width: "100%", fontSize: SIZES.medium, color: COLORS({opacity:0.9}).primary}}>
                    {description}
                </Text>
            </View>
          )}

          {location && (
            <View style={[styles.row, styles.description]}>
                <Ionicons name={"location-outline"} size={SIZES.xLarge} style={[styles.icon, {marginRight: SIZES.xxSmall}]}/>
                <Text style={styles.location}>{location}</Text>
            </View>
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
          <ExpandableView expanded={isExpanded} view={Properties} params={{"item": route.params?.item, "itemType": itemType }} vh={230} />

          {route.params?.item.startDate && (
            <>
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
                <ExpandableView expanded={showScheduler} view={Scheduler} params={{"item": route.params?.item}} vh={180} />
            </>
          )} 
          

          {itemType === ItemType.Event && (
            <CollaboratorCard item={route.params?.item} setFn={updateNewItem} isEditable={false} />
          )}

          {(itemType === ItemType.Task || itemType === ItemType.Event) && (
            <TaskCard item={route.params?.item} setFn={updateNewItem} isEditable={false} />
          )}

          {itemType === ItemType.Recipe && (
            <RecipeCard item={route.params?.item} setFn={updateNewItem} isEditable={false} />
          )}

          {notes && (
            <>
                <View style={[styles.row, styles.divider, {marginTop: SIZES.xSmall}]}>
                    <Ionicons name={"document-outline"} size={SIZES.xLarge} style={styles.icon}/>
                    <Text style={styles.property}>Notes</Text>
                </View>
                <Text style={styles.notes}>{notes}</Text>
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
    height: SIZES.xLarge * 2,
    width: SIZES.xLarge * 2,
    padding: SIZES.xSmall,
    marginHorizontal: SIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1, 
    borderColor: COLORS({opacity:1}).primary,
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
    marginBottom: SIZES.tiny,
    marginHorizontal: SIZES.xLarge,
  },
  infoContainer: {
    margin: SIZES.medium,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: SIZES.medium/2,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  box: {
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: SIZES.small,
    padding: SIZES.xSmall,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.xxSmall,
  },
  selectedBox: {
    backgroundColor: COLORS({opacity:1}).secondary,
  },
  selectedText: {
    color: COLORS({opacity:1}).secondary,
  },
  duration: {
    backgroundColor: COLORS({opacity:0.5}).lightGrey,
    padding: SIZES.xSmall,
    borderRadius: SIZES.xSmall,
    marginLeft: SIZES.xSmall,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // semi-transparent background
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});