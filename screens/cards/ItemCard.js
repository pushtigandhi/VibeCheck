import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Modal,
        StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, SHADOWS, FONT, SIZES, ItemType } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import CollaboratorCard from "./CollaboratorCard";
import TaskCard from "./TaskCard";
import RecipeCard from "./RecipeCard";
import { PATCHitemTEST } from "../../API";
import CreateNewItem from "../CreateNewItem";

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
        <View style={[styles.row, styles.property, {marginVertical: SIZES.xxSmall}]}>
          <Ionicons name={"folder-open-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />
          <Text style={[styles.property, {marginLeft: SIZES.small}]}>{item.category}</Text>
        </View>
        
        <View style={styles.divider}/>

        <View style={[styles.row, styles.property, {marginVertical: SIZES.xxSmall}]}>
          <Ionicons name={"bookmark-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />
          <Text style={[styles.property, {marginLeft: SIZES.small}]}>{item.section}</Text>
        </View>

        {item.startDate && (
          <>
            <View style={styles.divider}/>

            <View style={[styles.row, styles.property, {marginVertical: SIZES.xxSmall}]}>
              <Ionicons name={"calendar-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />
              <Text style={[styles.property, {marginLeft: SIZES.small}]}>{new Date(item.startDate).toDateString()}</Text>
            </View>

            <View style={styles.divider}/>

            <View style={[styles.row, styles.property, {marginVertical: SIZES.xxSmall}]}>
              <Ionicons name={"alarm-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />
              <Text style={[styles.property, {marginLeft: SIZES.small}]}>{String(new Date(item.startDate).getHours())}:{new Date(item.startDate).getMinutes() < 10 ? String("0"+ new Date(item.startDate).getMinutes()) : String(new Date(item.startDate).getMinutes())} - {String(new Date(item.endDate).getHours())}:{new Date(item.endDate).getMinutes() < 10 ? String("0"+ new Date(item.endDate).getMinutes()) : String(new Date(item.endDate).getMinutes())}</Text>
            </View>
          </>
        )}
        {/* {endDate && (
          <>
            <View style={styles.divider}/>
           
            <View style={[styles.row, styles.property, {marginVertical: SIZES.xxSmall}]}>
            </View>
          </>
        )} */}

        {item.duration && (
          <>
            <View style={styles.divider}/>

            <View style={[styles.row, styles.property, {marginVertical: SIZES.xxSmall}]}>  
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
          </>
        )}

        {item.priority && (
          <>
            <View style={styles.divider}/>
            
            <View style={[styles.row, styles.property, {marginVertical: SIZES.xxSmall}]}>
              {(itemType === ItemType.Recipe) ? (
                <Ionicons name={"star-half-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
              ) : (
                <Ionicons name={"alert-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
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

            <View style={[styles.row, styles.property, {marginVertical: SIZES.xxSmall}]}>
              <Ionicons name={"restaurant-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />
              <Text style={[styles.property, styles.box, {marginLeft: SIZES.small}]}>{item.servings}</Text>
            </View>
          </>
        )}

        {item.tags && item.tags.length > 0 && (
          <>
            <View style={styles.divider}/>

            <View style={styles.row}>
              <Text style={[styles.icon, {margin: SIZES.xxSmall, marginLeft: SIZES.small, fontSize: SIZES.xLarge}]}>#</Text>
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

  const [itemType, setItemType] = useState('');

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [icon, setIcon] = useState(null);
  const [notes, setNotes] = useState(null);
  const [location, setLocation] = useState('');
  const [isScheduler, setIsScheduler] = useState(false);

  const [isExpanded, setIsExpanded] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [showCreateNew, setShowCreateNew] = useState(false);
  function closeCreateNew() {
    setShowCreateNew(false);
}

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
    navigation.goBack();
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
      } if (item.startDate) {
        setIsScheduler(true);
      }
    }
  }, [route.params?.item]); // Update category and section when item changes

  return (
   
      <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <ScrollView scrollEnabled={true}>
          <View style={styles.imageBox}>
            <TouchableOpacity onPress={() => (onGoBack())} style={[styles.button]} > 
                <Ionicons name={"arrow-back-outline"} size={SIZES.large} style={styles.icon}/> 
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
                <Ionicons name={"pencil-outline"} size={SIZES.large} style={styles.icon}/> 
            </TouchableOpacity>
          </View>
          
          <View style={[styles.row, styles.title]}>
            <Text style={{fontSize: SIZES.xLarge, marginRight: SIZES.xxSmall}}>{icon}</Text>
            <Text style={{width: "100%", fontSize: SIZES.xLarge}}>
              {title}
            </Text>
          </View>


          {description && (
            <View style={[styles.row, styles.description]}>
              <Ionicons name={"menu-outline"} size={SIZES.xLarge} style={[styles.icon, {marginRight: SIZES.xxSmall}]}/>
              <Text style={{width: "100%", fontSize: SIZES.medium}}>
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

          <View style={styles.divider}/>

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

          {isExpanded && (
            <Properties itemType={itemType} item={route.params?.item} />
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

          {notes && (
            <>
              <View style={[styles.row, {marginTop: SIZES.xSmall, marginLeft: SIZES.xLarge}]}>
                  <Ionicons name={"document-outline"} size={SIZES.xLarge} style={styles.icon}/>
                  <Text style={styles.label}>Notes</Text>
              </View>
              <Text style={styles.notes}>{notes}</Text>
            </>
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
      padding: SIZES.medium,
      margin: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS({opacity:0.5}).primary,
      borderRadius: SIZES.medium,
  },
  description:{
      padding: SIZES.medium,
      marginHorizontal: SIZES.medium,
      marginBottom: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS({opacity:0.5}).primary,
      borderRadius: SIZES.medium,
  },
  notes:{
    fontSize: SIZES.medium,
    //color: COLORS({opacity:0.9}).primary,
    padding: SIZES.medium,
    margin: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS({opacity:0.5}).primary,
    borderRadius: SIZES.medium,
  },
  property: {
    fontSize: SIZES.medium, 
    //color: COLORS({opacity:0.9}).primary
  },
  propContainer: {
    flex: 1,
    paddingVertical: SIZES.xxSmall,
    marginHorizontal: SIZES.xLarge,
  },
  label: {
    paddingVertical: SIZES.xxSmall,
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
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
    color: COLORS({opacity:0.8}).primary,
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
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: SIZES.small,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    paddingHorizontal: SIZES.medium,
    borderBottomWidth: 1,
    borderColor: COLORS({opacity:0.7}).primary,
    marginBottom: SIZES.tiny,
    marginHorizontal: SIZES.xLarge,
  },
  infoContainer: {
    marginHorizontal: SIZES.medium,
    marginBottom: SIZES.medium,
    padding: SIZES.small,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: SIZES.medium/2,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).primary,
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
    marginHorizontal: SIZES.xSmall,
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
    paddingHorizontal: SIZES.medium,
    marginHorizontal: SIZES.xLarge,
  },
  time: {
    padding: SIZES.xSmall,
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
    borderRadius: SIZES.xxSmall,
    marginVertical: SIZES.xxSmall,
    marginRight: SIZES.small,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.xxSmall,
  },
});