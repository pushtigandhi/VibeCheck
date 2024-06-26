import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal,Dimensions,
  KeyboardAvoidingView, GestureHandlerRootView, TouchableWithoutFeedback
 } from "react-native";
import { COLORS, FONT, textSIZES, SHADOWS, viewSIZES } from "../../constants";
import { GETitems, GETitemsTEST } from "../../API";
import { ItemType } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../../components/FilterModal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const defaultImage = require("../../assets/icon.png");
const Checklist = ({item, setFn}) => {
  const [subtasks, setSubtasks] = useState(item.subtasks);

  const [showInput, setShowInput] = useState(false);
  const [newSubtask, setNewSubtask] = useState('New');

  const onSave = () => {
    setSubtasks([... subtasks, { task: newSubtask, isChecked: false }])
  }

  async function addNewSubtask() {
    const subtask = {
      task: newSubtask,
      isChecked: false
    };

    //console.log(subtask);

    // getProfileID().then((profileID) => {
    //   console.log(profileID)
    //   (async () => {
    //     POSTaddCategoryTEST(profileID, {
    //       ...category,
    //       _id: null
    //     }).then((newCategory) => {
    //       if (!!newCategory) {
    //         alert("Success!");
    //       } else {
    //         alert("Failed.");
    //       }
    //     });
    //   })()
    // }).catch((err) => {
    //     alert(err.message)
    // })
  }

  const toggleSubtask = (id) => {
    const updatedSubtasks = subtasks.map((subtask) => {
      if (subtask["_id"] === id) {
        return { ...subtask, isChecked: !subtask.isChecked };
      }
      return subtask;
    });
    setSubtasks(updatedSubtasks);
    setFn({"subtasks": updatedSubtasks}); // Indicate that changes have been made
  };
  
  return (
    <>
      <TouchableOpacity style={styles.addButton} onPress={() => (setShowInput(true))}>
          <Ionicons name={"add-circle"} size={textSIZES.large} color={COLORS({opacity:1}).white} />
      </TouchableOpacity>
      <ScrollView>
        {showInput==true && (
          <View style={styles.newSection}>
            <TextInput style={styles.inputBox}
              value={newSubtask}
              onChangeText={setNewSubtask}
              returnKeyType='default'
            /> 
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightRed, flex: 1}]} onPress={() => setShowInput(false)}>
                <Ionicons name={"close-outline"} size={textSIZES.small} style={styles.iconInverse}/> 
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightGreen, flex: 1}]} onPress={addNewSubtask}>
                <Ionicons name={"checkmark-outline"} size={textSIZES.small} style={styles.iconInverse}/> 
              </TouchableOpacity>
            </View>
            
          </View>
        )}
        
        {subtasks && subtasks.length > 0 && (subtasks.map(item => (
          <TouchableOpacity style={styles.subtaskContainer} key={item["_id"]} 
            onPress={() => toggleSubtask(item["_id"])}
          >
            <View style={styles.row}>
              {item.isChecked ? (
                <Ionicons name={"checkbox-outline"} size={textSIZES.xLarge} style={styles.icon}/> 
              ) : (
                <Ionicons name={"square-outline"} size={textSIZES.xLarge} style={styles.icon}/>
              )}
              <Text style={styles.task} numberOfLines={1}>{item.task}</Text>
            </View>
          </TouchableOpacity>
        )))}
      </ScrollView>
    </>
  )
};

const Notes = ({item, setFn}) => {
  const [notes, setNotes] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  const onSave = () => {
    setFn({"notes": notes}); // Indicate that changes have been made
    setIsEditable(false);
  };

  const onCancel = () => {
    setNotes(item.notes);
    setIsEditable(false);
  }

  useEffect(() => {
    setNotes(item.notes);
  }, []);

  return (
    <>
      <View style={{flexDirection: 'row-reverse'}}>
      {isEditable ? (
        <>
          <TouchableOpacity onPress={() => (onCancel())} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightRed}]} > 
            <Ionicons name={"close-outline"} size={textSIZES.large} color={COLORS({opacity:1}).white} /> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => (onSave())} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightGreen}]} >
              <Ionicons name={"checkmark-outline"} size={textSIZES.large} color={COLORS({opacity:1}).white} /> 
          </TouchableOpacity>
        </>
      ):(
        <TouchableOpacity onPress={() => (setIsEditable(true))} style={[styles.button, { backgroundColor: COLORS({opacity:1}).tertiary }]}>
          <Ionicons name={"pencil"} size={textSIZES.large} color={COLORS({opacity:1}).white} />
        </TouchableOpacity>
      )}
        
      </View>
      
      <KeyboardAwareScrollView
        style={styles.notesContainer}
        contentContainerStyle={styles.scrollViewContent}
        enableOnAndroid={true}
       // extraHeight={150}  // Adjust the extra height as needed
      >
        <TextInput
          style={styles.notes}
          multiline
          value={notes}
          placeholder="Notes"
          onChangeText={setNotes}
          editable={isEditable}
        />
      </KeyboardAwareScrollView>
    </>
  )
};

export default function ScheduleView ({navigation, route, scrollEnabled = true}) {
  const [title, setTitle] = useState([]);
  
  const [item, setItem] = useState(route.params?.item);
  const [filter, setFilter] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [expandSearchBar, setSearchBar] = useState(false);

  function closeFilter() {
    setRefreshing(!refreshing);
    setFilterVisible(false);
  }

  function doSearch() {
    //console.log(search);
    setSearchBar(false);
  }

  function updateNewItem(params) {
  }

  async function getSectionItemsFromAPI() {
    //console.log("GEt item");
    try {
      let items = await GETitemsTEST(ItemType.Item, filter);
      return items[0];
    } catch (error) {
      console.log("error fetching item");
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    setTitle(route.params?.section);
    setFilter({... filter, category: route.params?.category, section: route.params?.section});
  }, []) // only run once on load

  const [selectedTab, setSelectedTab] = useState('Checkbox');
  const renderTab = () => {
    switch (selectedTab) {
      case 'Checkbox':
        return <Checklist item={item} setFn={updateNewItem} />;
      case 'Notes':
        return <Notes item={item} setFn={updateNewItem} />;
      default:
        return <Checklist item={item} setFn={updateNewItem} />;
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.row, styles.propContainer, {justifyContent: "space-between"}]}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={[styles.row, styles.searchInput]}
          onPress={() => {
            setSearchBar(!expandSearchBar);
          }}
        >
          <Ionicons name={"search-outline"} size={20} style={styles.iconInverted} />
          {expandSearchBar && (
            <TextInput style={{width: textSIZES.xxLarge*4, fontSize: textSIZES.small, color: COLORS({opacity:1}).primary}} 
              {...(search ? { defaultValue: search } : { placeholder: "search" })}
              onChangeText={(newSearch) => (setSearch(newSearch))}
              returnKeyType='search'
              onSubmitEditing={() => (doSearch())}
            />
          )}
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
            onPress={() => {
              setFilterVisible(true);
            }}
            style={styles.filterButtonIcon}
          >
            <Ionicons name={"options-outline"} size={20} style={styles.iconInverted}/>
          </TouchableOpacity> */}
      <Modal visible={filterVisible} animationType="slide" onRequestClose={closeFilter}>
        <FilterModal closeFilter={closeFilter} filter={filter} setFilter={setFilter} />
      </Modal>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Checkbox' && styles.activeTab]}
          onPress={() => setSelectedTab('Checkbox')}
        >
          {selectedTab === 'Checkbox' ? 
            (
              <Ionicons name={"checkbox"} size={textSIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
            ) 
          : (
              <Ionicons name={"checkbox-outline"} size={textSIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
            )
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Notes' && styles.activeTab]}
          onPress={() => setSelectedTab('Notes')}
        >
          {selectedTab === 'Notes' ? 
            (
              <Ionicons name={"reader"} size={textSIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
            ) 
          : (
              <Ionicons name={"reader-outline"} size={textSIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
            )
          }
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {renderTab()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  filterButtonIcon: {
    height: textSIZES.xxLarge,
    width: textSIZES.xxLarge,
    borderRadius: textSIZES.xxSmall,
    backgroundColor: COLORS({opacity:0.7}).secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    height: textSIZES.xxLarge,
    borderRadius: textSIZES.xxSmall,
    marginHorizontal: textSIZES.small,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    //marginRight: textSIZES.xSmall,
    borderRadius: textSIZES.xSmall,
    width: textSIZES.xxLarge,
    height: textSIZES.xxLarge,
    backgroundColor: COLORS({opacity:0.8}).tertiary,
  },
  title: {
    fontSize: textSIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  row: {
    flexDirection: "row",
    //justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: textSIZES.xSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
    margin: textSIZES.xxSmall,
  },
  propContainer: {
    paddingHorizontal: textSIZES.large,
    paddingBottom: textSIZES.small,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderRadius: textSIZES.small,
    backgroundColor: "#FFF"
  },
  cardsContainer: {
    marginTop: textSIZES.small,
    marginHorizontal: textSIZES.small,
    borderColor: COLORS({opacity:1}).lightGrey,// "#FFF",
    borderRadius: textSIZES.xSmall,
    borderWidth:0.50,
    alignContent: "center"
  },
  itemTitle: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
  },
  prop: {
    fontWeight: "200",
  },
  time: {
    padding: textSIZES.xSmall,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "right",
  },
  timeLabel: {
    fontWeight: "200",
    fontSize: textSIZES.small,
  },
  dayCardContainer: {
    flex: 1,
    padding: textSIZES.xxSmall,
    marginLeft: textSIZES.xSmall,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor:  COLORS({opacity:1}).lightWhite,
    paddingVertical: textSIZES.xxSmall,
  },
  tab: {
    paddingVertical: textSIZES.xxSmall,
    paddingHorizontal: textSIZES.large,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS({opacity:0.8}).primary,
  },
  contentContainer: {
    flex: 1,
  },
  notesContainer: {
    marginTop: textSIZES.xxSmall,
  },
  notes: {
    padding: textSIZES.small,
    fontSize: textSIZES.small,
    flex:1,
    minHeight: 500,
    borderTopWidth: 1,
    borderColor: COLORS({opacity:1}).tertiary
  },
  button: {
    padding: textSIZES.xSmall, 
    backgroundColor: COLORS({opacity:1}).tertiary, 
    borderRadius: textSIZES.xSmall, 
    marginRight: textSIZES.xxSmall,
    alignItems: 'center',
  },
  newSection: {
    margin: textSIZES.xSmall
  },
  inputBox: {
    margin: textSIZES.xSmall,
    padding: textSIZES.xSmall,
    borderWidth: 0.5,
    borderRadius: textSIZES.xSmall,
    borderColor: COLORS({opacity:1}).primary,
    fontSize: textSIZES.small,
  },
  icon: {
    marginRight: textSIZES.xxSmall,
    color: COLORS({opacity:0.8}).indigo,
  },
  iconInverse: {
      //margin: textSIZES.xxSmall,
      color: COLORS({opacity:1}).lightWhite,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: textSIZES.xSmall,
  },
  subtaskContainer: {
    margin: textSIZES.xxSmall,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.1}).lightGrey,
    borderRadius: textSIZES.xSmall,
    borderColor: COLORS({opacity:0.5}).lightGrey,
    borderWidth: 1,
  },
  task: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    fontWeight: '200',
    color: COLORS({opacity:1}).indigo,
  },
});