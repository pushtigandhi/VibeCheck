import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import { ExpandableView, Spacer } from '../utils';
import Layout from "../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "./cards/PropertyCards";
import * as df  from "../constants/default";

export default function NewItem({navigation}) {

  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <SafeAreaView style={styles.infoContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Item", {item: df.defaultItem})
        }}
        style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>{df.ItemType.Item}</Text>
        <Text style={{fontSize: SIZES.xLarge}}>{df.defaultItem.icon}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Item", {item: df.defaultTask});
        }}
        style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>{df.ItemType.Task}</Text>
        <Text style={{fontSize: SIZES.xLarge}}>{df.defaultTask.icon}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Item", {item: df.defaultEvent});
        }}
        style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>{df.ItemType.Event}</Text>
        <Text style={{fontSize: SIZES.xLarge}}>{df.defaultEvent.icon}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Item", {item: df.defaultPage});
        }}
        style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>{df.ItemType.Page}</Text>
        <Text style={{fontSize: SIZES.xLarge}}>{df.defaultPage.icon}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Item", {item: df.defaultRecipe});
        }}
        style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>{df.ItemType.Recipe}</Text>
        <Text style={{fontSize: SIZES.xLarge}}>{df.defaultRecipe.icon}</Text>
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