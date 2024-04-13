import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView,
        StyleSheet, Animated, FlatList } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../../constants";
import { ExpandableView, Spacer } from '../../../utils';
import { taskProperties } from "../PropertyCards";
import Layout from "../../../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "../PropertyCards";

const expandedSubTaskCard = ({originalSubtasks, setFn, isEditable, unSelect = false, setUnSelect}) => {
  const [subtasks, setSubtasks] = useState(originalSubtasks);

  const unSelectAll = () => {
    const updatedSubtasks = subtasks.map((subtask) => {
        return { ...subtask, isChecked: false };
    });
    setSubtasks(updatedSubtasks);
    setFn({"subtasks": updatedSubtasks});
    setUnSelect(false);
  };

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

  useEffect(() => {
    if(unSelect == true) {
      unSelectAll();
    }
  }, [unSelect]);
  
  return (
    <ScrollView style={styles.expandedContainer}>
      {isEditable==true && (
        <TouchableOpacity style={styles.addButtonIcon} >
          <Ionicons name={"add-circle"} size={SIZES.large} style={styles.iconInverted} />
        </TouchableOpacity>
      )}
      
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
    </ScrollView>
  )
};

const TaskCard = ({item, setFn, isEditable=true}) => {
  //const [isPropExpanded, setIsPropExpanded] = useState(expanded);
  const [isSubtaskExpanded, setIsSubtaskExpanded] = useState(true);
  const [unSelect, setUnSelect] = useState(false);

  return (
    <View style={styles.infoContainer}>
      <View style={[styles.row, styles.propContainer, {justifyContent: "space-between"}]}>
        <TouchableOpacity style={[styles.row, {flex: 2}]} onPress={() => {
          setIsSubtaskExpanded(!isSubtaskExpanded);
        }}>
          <View style={styles.row}>
            <Ionicons name={"checkbox-outline"} size={SIZES.xLarge} style={styles.icon}/> 
            <Text style={styles.label} numberOfLines={1}>Subtasks</Text>
          </View>
          <View style={styles.row}>
            
            {isSubtaskExpanded ? (
                <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
            ) : (
                <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
            )}
          </View>
        </TouchableOpacity>
        {item.subtasks.length > 0 && (
          <TouchableOpacity onPress={() => (setUnSelect(true))} style={[styles.box, {flex: 1}]} disabled={!isSubtaskExpanded}>
            <Text style={{fontSize: SIZES.medium, color: COLORS({opacity:1}).white}}>Unselect All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ExpandableView expanded={isSubtaskExpanded} view={expandedSubTaskCard} 
        params={{"originalSubtasks": item.subtasks, "setFn": setFn, "isEditable": isEditable, "unSelect": unSelect, "setUnSelect": setUnSelect}} vh={300} />
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
    margin: SIZES.medium,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: SIZES.medium/2,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    padding: SIZES.medium,
    paddingBottom: SIZES.xxLarge,
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
    flex: 1,
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderBottomWidth: 1,
    borderRadius: SIZES.medium,
    marginHorizontal: SIZES.medium,
  },
  subtaskContainer: {
    margin: SIZES.xxSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).white,
    borderRadius: SIZES.small,
    borderColor: COLORS({opacity:0.5}).lightGrey,
    borderWidth: 1,
  },
  box: {
    backgroundColor: COLORS({opacity:1}).secondary,
    borderRadius: SIZES.xxSmall,
    padding: SIZES.xSmall,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.xxSmall,
  },
});

export default TaskCard