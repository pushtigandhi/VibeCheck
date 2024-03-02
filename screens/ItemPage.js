import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import { ExpandableView, Spacer } from '../utils';
import Layout from "../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "./cards/PropertyCards";
import { ItemType } from "../API";
import { ScrollView } from "react-native-gesture-handler";
import { expandedTaskCard } from "./cards/items/TaskCard";

export default function ItemPage({route}) {
  const { item } = route.params;
  const { title, description, tags, itemType} = item;

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
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
        <ExpandableView expanded={isExpanded} view={PropertyCard} params={{item}} vh={500} />

        {!!itemType && itemType === ItemType.Task && (
          <View style={styles.propContainer}>
           {expandedTaskCard({task: item})}
          </View>
        )}
        
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
    borderBottomLeftRadius: SIZES.xLarge,
    borderBottomRightRadius: SIZES.xLarge,
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
});