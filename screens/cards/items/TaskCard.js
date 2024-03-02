import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../../constants";
import { ExpandableView, Spacer } from '../../../utils';
import { taskProperties } from "../PropertyCards";
import Layout from "../../../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "../PropertyCards";

export const expandedTaskCard = ({task}) => {
  const [subtasks, setSubtasks] = useState(task.subtasks);

  function checkToggle(subtaskID) {
    
  }

  return (
    <View style={styles.expandedContainer}>
      <View style={[styles.row, {borderBottomWidth: 1, borderBottomColor: COLORS({opacity:1}).darkBlue}]}>
        <Text style={styles.section}>Subtasks</Text>
        <Ionicons name={"checkbox-outline"} size={SIZES.large} style={styles.icon}/> 
      </View>
      {subtasks.length > 0 && subtasks.map(item => (
        <View style={styles.row} key={item["_id"] + "_root"}>
          <TouchableOpacity style={styles.sectionContainer} key={item["_id"]} 
            onPress={() => {
              item.isChecked == !item.isChecked
            }}
          >
            {item.isChecked ? (
              <Ionicons name={"checkbox-outline"} size={SIZES.large} style={styles.icon}/> 
            ) : (
              <Ionicons name={"square-outline"} size={SIZES.large} style={styles.icon}/>
            )}
          </TouchableOpacity>
          <Text style={styles.item} numberOfLines={1}>{item.task}</Text>
        </View>
      ))}

    </View>
  )
};

export const TaskCard = ({task, expanded=false}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <View style={styles.infoContainer}>
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
      <TouchableOpacity
        onPress={() => {
            setIsExpanded(!isExpanded);
          }}
          style={styles.titleContainer}
      >
      <View style={styles.row}>
        <Text style={styles.label}>Checklist</Text>
        <Ionicons name={"checkbox-outline"} size={SIZES.small} style={styles.icon}/> 
      </View>
      </TouchableOpacity>
      {expandedTaskCard({task})}
      {/* <ExpandableView expanded={isExpanded} view={expandedCard} params={{task}} vh={300} /> */}

      
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
    
     </View>
  )
};

const styles = StyleSheet.create({
infoContainer: {
  backgroundColor: COLORS.lightWhite,
  borderRadius: SIZES.medium/2,
},
label:{
  fontSize: SIZES.medium,
  fontFamily: FONT.regular,
  color: "#B3AEC6",
  margin: SIZES.xSmall,
  flexDirection: "row",
  justifyContent: "center",
},
section: {
  fontSize: SIZES.large,
  fontFamily: FONT.regular,
  color: COLORS({opacity:1}).darkBlue,
  
},
icon: {
  marginRight: SIZES.xxSmall,
  color: COLORS({opacity:0.8}).darkBlue,
},
row: {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
},
});

export default TaskCard