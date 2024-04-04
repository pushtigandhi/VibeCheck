import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../../constants";
import { ExpandableView, Spacer } from '../../../utils';
import { taskProperties } from "../PropertyCards";
import Layout from "../../../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "../PropertyCards";

const expandedSubTaskCard = ({originalSubtasks, setFn}) => {
  const [subtasks, setSubtasks] = useState(originalSubtasks);

  const toggleSubtask = (id) => {
    const updatedSubtasks = subtasks.map((subtask) => {
      if (subtask["_id"] === id) {
        return { ...subtask, isChecked: !subtask.isChecked };
      }
      return subtask;
    });
    setSubtasks(updatedSubtasks);
    setFn({"subtasks": updatedSubtasks}); // Indicate that changes have been made
  };
  
  return (
    <View style={styles.expandedContainer}>
      <TouchableOpacity style={styles.addButtonIcon} >
        <Ionicons name={"add-circle"} size={SIZES.large} style={styles.iconInverted} />
      </TouchableOpacity>
      {subtasks.length > 0 ? (subtasks.map(item => (
        <TouchableOpacity style={styles.subtaskContainer} key={item["_id"]} 
          onPress={() => toggleSubtask(item["_id"])}
        >
          <View style={styles.row}>
            {item.isChecked ? (
              <Ionicons name={"checkbox-outline"} size={SIZES.large} style={styles.icon}/> 
            ) : (
              <Ionicons name={"square-outline"} size={SIZES.large} style={styles.icon}/>
            )}
            <Text style={styles.item} numberOfLines={1}>{item.task}</Text>
          </View>
        </TouchableOpacity>
      ))) : (
        <View>
          <Text style={[styles.item, {marginRight: SIZES.small}]} numberOfLines={1}>None</Text>
        </View>
      )}
    </View>
  )
};

const TaskCard = ({item, setFn, expanded=false}) => {
  //const [isPropExpanded, setIsPropExpanded] = useState(expanded);
  const [isSubtaskExpanded, setIsSubtaskExpanded] = useState(true);
  const [isPressable, setIsPressable] = useState(true);

  return (
    <View style={styles.infoContainer}>
      <TouchableOpacity
        onPress={() => {
          setIsSubtaskExpanded(!isSubtaskExpanded);
        }}
        style={styles.propContainer}
        disabled={!isPressable}
      >
        <View style={[styles.row, {justifyContent: "space-between"}]}>
          <View style={styles.row}>
            <Ionicons name={"checkbox-outline"} size={SIZES.xLarge} style={styles.icon}/> 
            <Text style={styles.label} numberOfLines={1}>Subtasks</Text>
          </View>
          <View>
            {isSubtaskExpanded ? (
                <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
            ) : (
                <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <ExpandableView expanded={isSubtaskExpanded} view={expandedSubTaskCard} params={{"originalSubtasks": item.subtasks, "setFn": setFn}} vh={300} />
    </View>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium/2,
  },
  label: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
  },
  icon: {
    //marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).darkBlue,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  expandedContainer: {
    width: '90%',
    margin: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium/2,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    padding: SIZES.medium,
    flex: 1,
  },
  addButtonIcon: {
    height: SIZES.xxLarge,
    margin: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    fontSize: SIZES.mlarge,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  propContainer: {
    width: '90%',
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderBottomWidth: 1,
    borderRadius: SIZES.medium,
    marginHorizontal: SIZES.medium,
  },
  subtaskContainer: {
    margin: SIZES.xxSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).lightWhite,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
});

export default TaskCard