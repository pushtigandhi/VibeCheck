import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import { ExpandableView, Spacer } from '../utils';
import Layout from "../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "./cards/PropertyCards";
import { ItemType } from "../API";

export default function NewItem({navigation, item}) {

  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <SafeAreaView style={styles.infoContainer}>
      <TouchableOpacity
        onPress={() => {
          }}
          style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>{ItemType.Item}</Text>
        <Ionicons name={"information-circle-outline"} size={SIZES.xLarge} style={styles.icon}/> 
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Item", {item: {"itemType" : ItemType.Item}});
          }}
          style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>{ItemType.Task}</Text>
        <Ionicons name={"information-circle-outline"} size={SIZES.xLarge} style={styles.icon}/> 
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          }}
          style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>{ItemType.Event}</Text>
        <Ionicons name={"information-circle-outline"} size={SIZES.xLarge} style={styles.icon}/> 
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          }}
          style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>{ItemType.Page}</Text>
        <Ionicons name={"information-circle-outline"} size={SIZES.xLarge} style={styles.icon}/> 
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          }}
          style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>{ItemType.Recipe}</Text>
        <Ionicons name={"information-circle-outline"} size={SIZES.xLarge} style={styles.icon}/> 
      </View>
      </TouchableOpacity>
    </SafeAreaView>
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
    color: COLORS({opacity:1}).white,
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
  label:{
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).navy,
    margin: SIZES.xSmall,
  },
});