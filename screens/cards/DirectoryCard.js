import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal,
        StyleSheet, Animated, FlatList, ScrollView } from 'react-native';
import { COLORS, SHADOWS, FONT, textSIZES, ViewType, ItemType } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { ExpandableView } from "../../utils";
import SelectView from "../SelectView";
import { GETitems, GETitemsTEST } from "../../API";

const expandedCard = ({navigation, category, sections}) => {
  const [showAddSection, setShowAddSection] = useState(false);

  async function getSectionItemsFromAPI(section) {
    console.log("GEt item");
    try {
      let items_ = await GETitemsTEST(ItemType.Item, { category: category.title, section: section.title });
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
      items = items_
    }).catch((err) => {
      alert(err.message)
    });
    
    if(section.view == ViewType.Default) {
      console.log(section.view);
      navigation.navigate("DefaultView", {"category": category.title, "section": section.title, "item": items})
    }
    else if(section.view == ViewType.Schedule) {
      console.log(section.view);
      navigation.navigate("ScheduleView", {"category": category.title, "section": section.title, "item": items})
    }
    else if(section.view == ViewType.Checklist) {
      console.log(section.view);
      navigation.navigate("ChecklistView", {"category": category.title, "section": section.title, "item": items[0]})
    }
  }
  
  function onClose() {
    setShowAddSection(false);
  }
  
  // useEffect(() => {
  //   async function fetchSection() {
  //     await getSectionItemsFromAPI().then((item_) => {
  //       setItem(item_);
  //     }).catch((err) => {
  //       alert(err.message)
  //     });
  //   }
  //   fetchSection();
  // }, [])

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

const DirectoryCard = ({navigation, category, sections}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  async function DELETEcategory() {
    try {
      console.log("Delete category");
    } catch (err) {
      console.log("get me failed. "+err);
    }
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
            setIsExpanded(!isExpanded);
          }}
          style={styles.titleContainer}
      >
        <View style={styles.row}>
          <Ionicons name={"list-circle"} size={30} style={styles.icon}/>
          <Text style={styles.title} numberOfLines={1}>{category.title}</Text>
        </View>
        {/* <TouchableOpacity>
          <Ionicons name={"cog"} size={30} style={styles.icon}/>
        </TouchableOpacity> */}
      </TouchableOpacity>
      <ExpandableView expanded={isExpanded} view={expandedCard} params={{navigation, category, sections}} vh={200} />
    </>
  )
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
});

export default DirectoryCard