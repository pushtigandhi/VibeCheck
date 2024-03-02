import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import { ExpandableView, Spacer } from '../utils';
import Layout from "../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "./cards/PropertyCards";
import { ItemType } from "../API";
import { ScrollView } from "react-native-gesture-handler";
import { expandedSubTaskCard } from "./cards/items/TaskCard";

const BRAND_ICON = require("../assets/icon.png")

export default function ItemPage({route}) {
  const { item } = route.params;
  const { title, description, favicon, tags, itemType,} = item;

  const [isExpanded, setIsExpanded] = useState(true);

  const [notes, setNotes] = useState('');

  return (
    <SafeAreaView style={styles.container}>
    <GestureHandlerRootView>
      <ScrollView scrollEnabled={true}>
        <View style={styles.imageBox}>
          <Image
            source={BRAND_ICON}
            style={[styles.border, { width: 140, height: 140}]}
          />
        </View>
          {/* <View style={styles.imageBox}>
            <Text style={[styles.border, {fontSize: 140}]}>{item.icon}</Text>
          </View> */}
        <Text style={styles.title}>{title}</Text>
        {!!description && (<Text style={styles.description}>{description}</Text>)}

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
        <ExpandableView expanded={isExpanded} view={PropertyCard} params={{item}} vh={300} />

        {!!itemType && itemType === ItemType.Task && (
          <View>
            <View style={[styles.propContainer, styles.row]}>
              <Text style={styles.label} numberOfLines={1}>Subtasks</Text>
              <Ionicons name={"checkbox-outline"} size={SIZES.xLarge} style={styles.icon}/> 
            </View>
            {expandedSubTaskCard({task: item})}
          </View>
        )}
        {!!notes && (
          <Text>{notes}</Text>
        )}
      </ScrollView>
    </GestureHandlerRootView>
    </SafeAreaView>
    
  )
};

const styles = StyleSheet.create({
  container: {
      width: "100%",
      padding: SIZES.medium,
      backgroundColor: "#FFF",
      height: "100%",
  },
  row: {
      flexDirection: "row",
      //justifyContent: "space-between",
      alignItems: "center",
  },
  title:{
      fontSize: SIZES.xLarge,
      //fontFamily: FONT.regular,
      color: COLORS({opacity:0.9}).darkBlue,
      padding: SIZES.medium,
      margin: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS({opacity:1}).navy,
      borderRadius: SIZES.medium,
  },
  description:{
      fontSize: SIZES.medium,
      //fontFamily: FONT.regular,
      color: COLORS({opacity:0.9}).darkBlue,
      padding: SIZES.medium,
      marginHorizontal: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS({opacity:1}).navy,
      borderRadius: SIZES.medium,
  },
  propContainer: {
    width: '90%',
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderBottomWidth: 1,
    borderRadius: SIZES.medium,
    marginHorizontal: SIZES.medium,
  },
  label: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  expandedContainer: {
    paddingBottom: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    flex: 1,
    overflow: 'scroll',
  },
  imageBox: {
    alignItems: "center",
    justifyContent: "center",
    
  },
  border: {
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    borderRadius: SIZES.medium
  }
});