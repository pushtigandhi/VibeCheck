import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import { ExpandableView, Spacer } from '../utils';
import Layout from "../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "./cards/PropertyCards";

export default function ItemPage({item}) {

  const [isExpanded, setIsExpanded] = useState(true);

  //TODO:
  /*
    - CHECK ITEM TYPE
    - ADD DIFFERENT FIELDS BASED ON ITEM TYPE
    - ADD FUNCTIONALITY FOR SAVING/UPDATING THE FIELDS
  */

  return (
    <SafeAreaView style={styles.infoContainer}>
      <TouchableOpacity
        onPress={() => {
            setIsExpanded(!isExpanded);
          }}
          style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>Properties</Text>
        <Ionicons name={"information-circle-outline"} size={SIZES.xLarge} style={styles.icon}/> 
      </View>
      </TouchableOpacity>
      <ExpandableView expanded={isExpanded} view={PropertyCard} params={{item}} vh={500} />

      
      {/*<Spacer size={20} />

      <View style={styles.infoContainer}>
        <Text style={styles.label}>
          <Ionicons name={"square-outline"} size={20} color={"#80adad"}/> Checklist:
        </Text>
        <FlatList 
          data={[1,2,3,4,5]}
          renderItem={({item}) => (
          <Text>{item}</Text>
          )}
          keyExtractor={() => {}}
          contentContainerStyle={{ columnGap: SIZES.medium }}
        /> 
      </View>*/}
    
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

//export default TaskCard