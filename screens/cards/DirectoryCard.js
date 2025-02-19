import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput,
        StyleSheet, Animated, FlatList, ScrollView } from 'react-native';
import { COLORS, SHADOWS, FONT, textSIZES, ViewType, ItemType } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { ExpandableView } from "../../utils";
import { GETitems, GETitemsTEST } from "../../API";
import { SafeAreaView } from "react-native-safe-area-context";

const expandedCard = ({navigation, category, sections}) => {
  const [showAddSection, setShowAddSection] = useState(false);

  async function getSectionItemsFromAPI(section) {
    //console.log("GEt item");
    try {
      let items_ = await GETitems(ItemType.Item, { category: category.title, section: section.title });
      return items_;
    } catch (error) {
      console.log("error fetching item");
      console.log(error);
      return [];
    }
  }

  async function onSelectSection(section) {
    let items;
    await getSectionItemsFromAPI(section).then((items_) => {
      items = items_;
      console.log(items);
    }).catch((err) => {
      alert(err.message)
    });
    
    // if(section.view == ViewType.Default) {
    //   //console.log(section.view);
    //   navigation.navigate("DefaultView", {"category": category.title, "section": section.title, "item": items})
    // }
    // else if(section.view == ViewType.Schedule) {
    //   //console.log(section.view);
    //   navigation.navigate("ScheduleView", {"category": category.title, "section": section.title, "item": items})
    // }
    // else if(section.view == ViewType.Checklist) {
    //   //console.log(section.view);
    //   navigation.navigate("ChecklistView", {"category": category.title, "section": section.title, "item": items[0]})
    // }
  }
  
  function onClose() {
    setShowAddSection(false);
  }

  return (
    <ScrollView style={styles.expandedContainer}>
      <TouchableOpacity style={styles.addButtonIcon} onPress={() => (setShowAddSection(true))}>
        <Ionicons name={"add-circle"} size={textSIZES.large} style={styles.iconInverted} />
      </TouchableOpacity>
      {/* <Modal visible={showAddSection} animationType="slide" onRequestClose={onClose}>
        <SelectView onClose={onClose} />
      </Modal> */}
      
      {sections.map(section => (
        <TouchableOpacity style={styles.sectionContainer} key={section["_id"] + "_root"}
          onPress={() => {
            onSelectSection(section);
          }}
        >
          <Text style={styles.section} numberOfLines={1}>{section.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
};

const RenameModal = ({ onCloseRenameModal, newTitle, setNewTitle, renameCategory }) => {
  const handleRename = () => {
    renameCategory();
  };

  return (
    <View>
      <Text>Rename Category</Text>
      <TextInput
        placeholder="Enter new category title"
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TouchableOpacity onPress={handleRename}>
        <Text>Rename</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCloseRenameModal}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const DirectoryCard = ({navigation, category, sections}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  
  async function deleteCategory(category) { 
    const newCategories = categories.filter((c) => c.title != category.title);
    setCategories(newCategories);
    await saveDirectoryToStorage(newCategories);  
  }

  async function renameCategory(categories) { 
    if (newTitle.trim() === "") {
      alert("Please enter a new title for the category");
      return;
    }
  
    const newCategories = categories.map((c) => {
      if(c.title == category.title) {
        c.title = newTitle;
      }
      return c;
    });
  
    setCategories(newCategories);
    await saveDirectoryToStorage(newCategories);
  
    setNewTitle("");
    onCloseRenameModal();
  }

  const [showOptions, setShowOptions] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const handleRenameCategory = () => {
    setShowRenameModal(true);
  };

  const onCloseOptions = () => {
    setShowOptions(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
        style={styles.titleContainer}
      >
        <Text style={styles.title} numberOfLines={1}>{category.title}</Text>
        <TouchableOpacity onPress={() => setShowOptions(true)}>
          <Ionicons name={"ellipsis-vertical-outline"} size={textSIZES.medium} style={styles.icon}/>
        </TouchableOpacity>
      </TouchableOpacity>
      <ExpandableView expanded={isExpanded} view={expandedCard} params={{navigation, category, sections}} vh={200} />


      <Modal visible={showOptions} animationType="slide" onRequestClose={onCloseOptions}>
        <SafeAreaView style={styles.modalContainer}>
          <TouchableOpacity style={styles.button} 
            //onPress={handleRenameCategory}
          >
            <Text style={styles.buttonText}>Rename</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} 
            //onPress={onCloseOptions}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={onCloseOptions}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
   // width: '100%',
    padding: textSIZES.small,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderBottomLeftRadius: textSIZES.xLarge,
    borderBottomRightRadius: textSIZES.xLarge,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sectionContainer: {
    margin: textSIZES.tiny,
    marginBottom: textSIZES.xxSmall,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: textSIZES.xSmall,
  },
  modalContainer: { 
    margin: textSIZES.xxLarge,
    padding: textSIZES.small,
  },
  title: {
    fontSize: textSIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
  },
  expandedContainer: {
    backgroundColor: COLORS({opacity:1}).lightWhite,
    paddingBottom: textSIZES.small,
    paddingHorizontal: textSIZES.small,
    marginHorizontal: textSIZES.small,
    flex: 1,
    overflow: 'scroll',
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  addButtonIcon: {
    height: textSIZES.xxLarge,
    margin: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).secondary,
    borderRadius: textSIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: textSIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
    margin: textSIZES.xxSmall,
  },
  buttonText: { 
    fontSize: textSIZES.medium,
    margin: textSIZES.xSmall,
  },
  removeButton: {
    backgroundColor: COLORS({opacity:1}).lightRed, 
    padding: textSIZES.xxSmall, 
    borderRadius: textSIZES.xxSmall,
    marginLeft: textSIZES.xxSmall,
    alignItems: 'center',
  },
});

export default DirectoryCard