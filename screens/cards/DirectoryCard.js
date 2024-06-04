import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal,
        StyleSheet, Animated, FlatList, ScrollView } from 'react-native';
import { COLORS, SHADOWS, FONT, SIZES, ViewType } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { ExpandableView } from "../../utils";
import SelectView from "../SelectView";

const expandedCard = ({navigation, category, sections}) => {
  const [showAddSection, setShowAddSection] = useState(false);
  function onClose() {
    setShowAddSection(false);
  } 

  return (
    <ScrollView style={styles.expandedContainer}>
      <TouchableOpacity style={styles.addButtonIcon} onPress={() => (setShowAddSection(true))}>
        <Ionicons name={"add-circle"} size={SIZES.large} style={styles.iconInverted} />
      </TouchableOpacity>
      {/* <Modal visible={showAddSection} animationType="slide" onRequestClose={onClose}>
        <SelectView onClose={onClose} />
      </Modal> */}
      
      {sections.map(section => (
        <TouchableOpacity style={styles.sectionContainer} key={section["_id"] + "_root"}
          onPress={() => {
            if(section.view == ViewType.Default) {
              console.log(section.view);
              navigation.navigate("ItemScreen", {"category": category, "section": section})
            }
            else if(section.view == ViewType.Schedule) {
              console.log(section.view);
              //navigation.navigate("ScheduleView", {"category": category, "section": section})
            }
            else if(section.view == ViewType.Checklist) {
              console.log(section.view);
              //navigation.navigate("ChecklistView", {"category": category, "section": section})
            }
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
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderBottomLeftRadius: SIZES.xLarge,
    borderBottomRightRadius: SIZES.xLarge,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sectionContainer: {
    margin: SIZES.tiny,
    marginBottom: SIZES.xxSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: SIZES.xSmall,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
  },
  expandedContainer: {
    backgroundColor: COLORS({opacity:1}).lightWhite,
    paddingBottom: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    marginHorizontal: SIZES.medium,
    borderBottomLeftRadius: SIZES.xLarge,
    borderBottomRightRadius: SIZES.xLarge,
    flex: 1,
    overflow: 'scroll',
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  addButtonIcon: {
    height: SIZES.xxLarge,
    margin: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).secondary,
    borderRadius: SIZES.small,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
    margin: SIZES.xxSmall,
  },
});

export default DirectoryCard