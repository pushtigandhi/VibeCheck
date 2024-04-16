import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity,
        StyleSheet, Animated, FlatList, ScrollView } from 'react-native';
import { COLORS, SHADOWS, FONT, SIZES, ViewType } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../utils";
import { ExpandableView } from "../../utils";

const expandedCard = ({navigation, category, sections}) => {
  return (
    <ScrollView style={styles.expandedContainer}>
      {sections.map(section => (
        <TouchableOpacity style={styles.sectionContainer} key={section["_id"] + "_root"}
          onPress={() => {
            if(section.view == ViewType.Default) {
              navigation.navigate("ItemScreen", {"isSection": true, "category": category, "section": section})
            }
            else if(section.view == ViewType.Schedule) {
              navigation.navigate("ScheduleView", {"isSection": true, "category": category, "section": section})
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
      </TouchableOpacity>
      <ExpandableView expanded={isExpanded} view={expandedCard} params={{navigation, category, sections}} vh={150} />
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
  },
  sectionContainer: {
    margin: SIZES.tiny,
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
    borderRadius: SIZES.medium,
    flex: 1,
    overflow: 'scroll',
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
});

export default DirectoryCard