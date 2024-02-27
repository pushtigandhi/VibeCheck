import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity,
        StyleSheet, Animated, FlatList, ScrollView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../utils";
import { ExpandableView } from "../../utils";

const expandedCard = ({sections}) => {
  return (
    <ScrollView style={styles.expandedContainer}>
      {sections.map(section => (
        <TouchableOpacity style={styles.sectionContainer} key={section + "_root"}>
            <Text style={styles.section} numberOfLines={1}>{section}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
};

const DirectoryCard = ({category, sections}) => {
    const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
            setIsExpanded(!isExpanded);
          }}
          style={styles.titleContainer}
      >
        <View style={styles.row}>
          <View>
            <Ionicons name={"list-circle"} size={30} style={styles.icon}/>
            <Text style={styles.title} numberOfLines={1}>{category.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ExpandableView expanded={isExpanded} view={expandedCard} params={{sections}} vh={300} />
    </View>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    margin: SIZES.xSmall,
    backgroundColor: "#FFF",
    borderRadius: SIZES.xLarge,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
  },
  titleContainer: {
    width: '100%',
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderBottomWidth: 1,
    borderBottomLeftRadius: SIZES.xLarge,
    borderBottomRightRadius: SIZES.xLarge,
  },
  sectionContainer: {
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  section: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  expandedContainer: {
    paddingBottom: SIZES.medium,
    paddingHorizontal: SIZES.medium,
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
    color: COLORS({opacity:0.8}).darkBlue,
  },
});

export default DirectoryCard