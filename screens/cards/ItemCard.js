import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Modal,
        StyleSheet, SafeAreaView, KeyboardAvoidingView, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, SHADOWS, FONT, textSIZES, ItemType, viewSIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import TaskCard from "./TaskCard";
import RecipeCard from "./RecipeCard";
import { ExpandableView } from "../../utils";
import { PATCHitem, GETitemsByIDs } from "../../API";
import CreateNewItem from "../CreateNewItem";
import BacklogCard from "./BacklogCard";
import ListView from "../views/ListView";
import React from "react";

const defaultImage = require("../../assets/icon.png");

const Properties = ({ item = null, itemType }) => {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
  
    const size = 25;
  
    useEffect(() => {
      if(item.duration){
        const hours = Math.floor(item.duration / 60);
        const minutes = item.duration % 60;
        setHour(hours);
        setMinute(minutes);
      }
    }, []); // Update category and section when item changes
  
    return (
      <SafeAreaView style={styles.infoContainer}>
        <View style={[styles.row, styles.property, {marginVertical: textSIZES.xxSmall}]}>
          <Ionicons name={"folder-open-outline"} size={size} style={[styles.icon, {margin: textSIZES.xxSmall}]} />
          <Text style={[styles.property, {marginLeft: textSIZES.xSmall}]}>{item.category}</Text>
        </View>
        
        <View style={styles.divider}/>

        <View style={[styles.row, styles.property, {marginVertical: textSIZES.xxSmall}]}>
          <Ionicons name={"bookmark-outline"} size={size} style={[styles.icon, {margin: textSIZES.xxSmall}]} />
          <Text style={[styles.property, {marginLeft: textSIZES.xSmall}]}>{item.section}</Text>
        </View>

        {item.startDate && (
          <>
            <View style={styles.divider}/>

            <View style={[styles.row, styles.property, {marginVertical: textSIZES.xxSmall}]}>
              <Ionicons name={"calendar-outline"} size={size} style={[styles.icon, {margin: textSIZES.xxSmall}]} />
              <Text style={[styles.property, {marginLeft: textSIZES.xSmall}]}>{new Date(item.startDate).toDateString()}</Text>
            </View>

            <View style={styles.divider}/>

            <View style={[styles.row, styles.property, {marginVertical: textSIZES.xxSmall}]}>
              <Ionicons name={"alarm-outline"} size={size} style={[styles.icon, {margin: textSIZES.xxSmall}]} />
              <Text style={[styles.property, {marginLeft: textSIZES.xSmall}]}>{String(new Date(item.startDate).getHours())}:{new Date(item.startDate).getMinutes() < 10 ? String("0"+ new Date(item.startDate).getMinutes()) : String(new Date(item.startDate).getMinutes())} - {String(new Date(item.endDate).getHours())}:{new Date(item.endDate).getMinutes() < 10 ? String("0"+ new Date(item.endDate).getMinutes()) : String(new Date(item.endDate).getMinutes())}</Text>
            </View>
          </>
        )}
        {/* {endDate && (
          <>
            <View style={styles.divider}/>
           
            <View style={[styles.row, styles.property, {marginVertical: textSIZES.xxSmall}]}>
            </View>
          </>
        )} */}

        {item.duration && (
          <>
            <View style={styles.divider}/>

            <View style={[styles.row, styles.property, {marginVertical: textSIZES.xxSmall}]}>  
              <Ionicons name={"timer-outline"} size={size} style={[styles.icon, {margin: textSIZES.xxSmall}]}/>    
            
              <View style={styles.duration}>
                <Text style={{fontSize: textSIZES.small}}>{hour}</Text>
              </View>
            
                <Text style={styles.property}>Hours</Text>
            
              <View style={styles.duration}>
                <Text style={{fontSize: textSIZES.small}}>{minute}</Text>
              </View>
              
              <Text style={styles.property}>Minutes</Text>
            </View>
          </>
        )}

        {item.priority && (
          <>
            <View style={styles.divider}/>
            
            <View style={[styles.row, styles.property, {marginVertical: textSIZES.xxSmall}]}>
              {(itemType === ItemType.Recipe) ? (
                <Ionicons name={"star-half-outline"} size={size} style={[styles.icon, {margin: textSIZES.xxSmall}]}/>
              ) : (
                <Ionicons name={"alert-outline"} size={size} style={[styles.icon, {margin: textSIZES.xxSmall}]}/>
              )}
              {item.priority === 'LOW' && (
                <View style={[styles.row, styles.box]}>
                  <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                </View>
              )}
              {item.priority === 'MED' && (
                <View style={[styles.row, styles.box]}>
                  <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                  <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                </View>
              ) }
              {item.priority === 'HIGH' && (
                <View style={[styles.row, styles.box]}>
                  <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                  <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                  <Ionicons name={"star-outline"} size={15} style={styles.icon} />
                </View>
              )}
            </View>
          </>
        )}

        {item.servings && (
          <>
            <View style={styles.divider}/>

            <View style={[styles.row, styles.property, {marginVertical: textSIZES.xxSmall}]}>
              <Ionicons name={"restaurant-outline"} size={size} style={[styles.icon, {margin: textSIZES.xxSmall}]} />
              <Text style={[styles.property, styles.box, {marginLeft: textSIZES.xSmall}]}>{item.servings}</Text>
            </View>
          </>
        )}

        {item.tags && item.tags.length > 0 && (
          <>
            <View style={styles.divider}/>

            <View style={styles.row}>
              <Text style={[styles.icon, {margin: textSIZES.xxSmall, marginLeft: textSIZES.xSmall, fontSize: textSIZES.xLarge}]}>#</Text>
              {item.tags.map(tag => (
                <View style={styles.tag}>
                  <Text style={styles.property} numberOfLines={1}>{tag}</Text>
                </View>
              ))}
            </View>
          </>
        )}

      </SafeAreaView>
    )
};

export default function ItemCard({ navigation, route }) {
  const [item, setItem] = useState(route.params?.item);
  const [itemType, setItemType] = useState('');

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [icon, setIcon] = useState(null);
  const [notes, setNotes] = useState(null);
  const [location, setLocation] = useState('');
  const [isScheduler, setIsScheduler] = useState(false);
  const [lists, setLists] = useState(null);

  const [isExpanded, setIsExpanded] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
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

  const [showCreateNew, setShowCreateNew] = useState(false);
  function closeCreateNew(op = null) {
    setShowCreateNew(false);
    
    if (op === 'delete') {
      onGoBack();
    }
  }

  function onGoBack() {
    route.params?.doRefresh();
    navigation.goBack();
  }

  function doRefresh() {
  }

  useEffect(() => {

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
      } if (item.startDate) {
        setIsScheduler(true);
      }
      if (item.lists) {
        (async () => {  // Create async IIFE
          const lists = [];
          for (const list of item.lists) {
            const items = await GETitemsByIDs(itemType, list.ids);
            //console.log(items);
            lists.push({name: list.name, ids: items, type: list.type});
          }
          item.lists = lists;
          setLists(lists);
        })();
      }
  }, [route.params?.item]); // Update category and section when item changes

  return (
   
      <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <ScrollView scrollEnabled={true}>
          <View style={styles.imageBox}>
            <TouchableOpacity onPress={() => (onGoBack())} style={[styles.button]} > 
                <Ionicons name={"arrow-back-outline"} size={textSIZES.large} style={styles.icon}/> 
            </TouchableOpacity>
            {favicon && (
                <>
                <TouchableOpacity style={{alignContent: "center"}} onPress={() => setModalVisible(true)}>
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
                    //navigation.navigate("EditItem", {"item": route.params?.item});
                    setShowCreateNew(true);
                }}  
            >
                <Ionicons name={"create-outline"} size={textSIZES.large} style={styles.icon}/> 
            </TouchableOpacity>
          </View>
          
          <View style={[styles.row, styles.title, { justifyContent: "space-between" }]}>
            <View style={styles.row}>
              <Text style={{fontSize: textSIZES.large, marginRight: textSIZES.xxSmall}}>{icon}</Text>
              <Text style={{fontSize: textSIZES.medium}}>
                {title}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                  setIsExpanded(!isExpanded);
                }}
              //style={styles.propContainer}
            >
              <Ionicons name={isExpanded ? "information-circle" : "information-circle-outline"} size={textSIZES.xLarge} style={styles.icon}/> 
            </TouchableOpacity>
          </View>

          {isExpanded && (
            <Properties itemType={itemType} item={route.params?.item} />
          )}


          {description && (
            <>
              <TouchableOpacity 
                onPress={() => {
                  setIsDescriptionExpanded(!isDescriptionExpanded);
                }}
                style={styles.cardContainer} >
                <ExpandableView expanded={isDescriptionExpanded} view=
                  {(expandedCard = () => {
                    return (
                      <>
                        <Text style={{ color: COLORS({opacity:0.7}).primary, marginBottom: textSIZES.xxSmall}}>Description</Text>
                        <Text style={{flex:1, fontSize: textSIZES.small}}>
                          {description}
                        </Text>
                      </>
                    )
                  })}
                  vh={300} vh0={viewSIZES.xSmall} />
              </TouchableOpacity>
            </>
          )}

          {location && (
            <>
              <TouchableOpacity onPress={() => setIsLocationExpanded(!isLocationExpanded)} style={styles.cardContainer}>
                <ExpandableView expanded={isLocationExpanded} view=
                  {(expandedCard = () => {
                    return (
                      <>
                        <Text style={{ color: COLORS({opacity:0.7}).primary, marginBottom: textSIZES.xxSmall}}>Location</Text>
                        <Text style={{flex:1, fontSize: textSIZES.small}}>
                          {location}
                        </Text>
                      </>
                    )
                  })}
                  vh={300} vh0={viewSIZES.xSmall} />
              </TouchableOpacity>
            </>
          )}
          
          <View style={styles.divider} />
          
          {itemType === ItemType.Event && (
            <>
              <CollaboratorCard item={route.params?.item} setFn={updateNewItem} isEditable={false} />
              <View style={styles.divider}/>
            </>
          )}

          {(itemType === ItemType.Task || itemType === ItemType.Event) && (
            <>
              <TaskCard item={route.params?.item} setFn={updateNewItem} isEditable={false} />
              <View style={styles.divider}/>
            </>
          )}

          {itemType === ItemType.Recipe && (
            <>
              <RecipeCard item={route.params?.item} setFn={updateNewItem} isEditable={false} />
              <View style={styles.divider}/>
            </>
          )}
    
          {lists && lists.length > 0 && (
            <>
              {lists.map((list, index) => (
                <View key={index} style={styles.listContainer}>
                  <ListView item={list} setFn={updateNewItem} isEditable={false} />
                </View>
              ))}
            </>
          )}

          {notes && notes.length > 0 && (
            <View style={styles.notes}>
              <Text style={{ color: COLORS({opacity:0.7}).primary, marginBottom: textSIZES.xxSmall}}>Notes</Text>
              <Text>{notes}</Text>
            </View>
          )}

        </ScrollView>
        <Modal visible={showCreateNew} animationType="slide" onRequestClose={closeCreateNew} >
          <CreateNewItem item={route.params?.item} onClose={closeCreateNew} isScheduler={isScheduler} />
        </Modal>
      </GestureHandlerRootView>
      </SafeAreaView>
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
      padding: textSIZES.xxSmall,
      margin: textSIZES.small,
      borderBottomWidth: 1,
      borderColor: COLORS({opacity:0.5}).primary,
      borderRadius: textSIZES.small,
  },
  description:{
      // marginHorizontal: textSIZES.small,
      // marginBottom: textSIZES.small,
      // borderColor: COLORS({opacity:0.5}).primary,
      // borderRadius: textSIZES.small,
  },
  notes:{
    fontSize: textSIZES.small,
    //color: COLORS({opacity:0.9}).primary,
    padding: textSIZES.small,
    margin: textSIZES.small,
    borderWidth: 1,
    borderColor: COLORS({opacity:0.5}).primary,
    borderRadius: textSIZES.small,
  },
  property: {
    fontSize: textSIZES.small, 
    //color: COLORS({opacity:0.9}).primary
  },
  propContainer: {
    flex: 1,
    paddingVertical: textSIZES.xxSmall,
    marginHorizontal: textSIZES.xLarge,
  },
  label: {
    paddingVertical: textSIZES.xSmall,
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  expandedContainer: {
    margin: textSIZES.small,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: textSIZES.small/2,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
    padding: textSIZES.small,
    flex: 1,
    overflow: 'scroll',
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
  icon: {
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:0.8}).white,
  },
  button: {
    height: viewSIZES.xxSmall,
    width: viewSIZES.xxSmall,
    padding: textSIZES.xSmall,
    marginHorizontal: textSIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 1, 
    //borderColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  addButtonIcon: {
    height: textSIZES.xxLarge,
    margin: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: textSIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    paddingHorizontal: textSIZES.small,
    borderBottomWidth: 1,
    borderColor: COLORS({opacity:0.7}).primary,
    marginBottom: textSIZES.tiny,
    marginHorizontal: textSIZES.xLarge,
  },
  infoContainer: {
    marginHorizontal: textSIZES.small,
    marginBottom: textSIZES.small,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: textSIZES.small/2,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).primary,
  },
  box: {
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xSmall,
    padding: textSIZES.xSmall,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: textSIZES.xxSmall,
  },
  selectedBox: {
    backgroundColor: COLORS({opacity:1}).secondary,
  },
  selectedText: {
    color: COLORS({opacity:1}).secondary,
  },
  duration: {
    backgroundColor: COLORS({opacity:0.5}).lightGrey,
    padding: textSIZES.xSmall,
    borderRadius: textSIZES.xSmall,
    marginHorizontal: textSIZES.xSmall,
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
  heading: {
    paddingHorizontal: textSIZES.small,
    marginHorizontal: textSIZES.xLarge,
  },
  time: {
    padding: textSIZES.xSmall,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "right",
  },
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderWidth:0.5,
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xxSmall,
    marginVertical: textSIZES.xxSmall,
    marginRight: textSIZES.xSmall,
    paddingHorizontal: textSIZES.xSmall,
    paddingVertical: textSIZES.xxSmall,
  },
  cardContainer: {
    marginHorizontal: textSIZES.small,
    marginBottom: textSIZES.small,
    backgroundColor: COLORS({opacity:1}).white,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
    padding: textSIZES.small,
    paddingBottom: 0,
  },
  listContainer: {
    marginTop: textSIZES.small,
    marginHorizontal: textSIZES.small,
    backgroundColor: COLORS.lightWhite,
    borderRadius: textSIZES.small/2,
    // ...SHADOWS.medium,
    // shadowColor: COLORS({opacity:1}).shadow,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    paddingBottom: textSIZES.small,
    flex: 1,
  },
});
