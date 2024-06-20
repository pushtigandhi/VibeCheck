import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SHADOWS, FONT, textSIZES, viewSIZES } from "../../constants";
import { ExpandableView, Spacer } from '../../utils';
import { Ionicons } from "@expo/vector-icons";

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
          <Ionicons name={"add-circle"} size={textSIZES.large} style={styles.iconInverted} />
        </TouchableOpacity>
      )}
      
      {subtasks.length > 0 ? (subtasks.map(item => (
        <TouchableOpacity style={styles.subtaskContainer} key={item["_id"]} 
          onPress={() => toggleSubtask(item["_id"])}
        >
          <View style={styles.row}>
            {item.isChecked ? (
              <Ionicons name={"checkbox-outline"} size={textSIZES.large} style={styles.icon}/> 
            ) : (
              <Ionicons name={"square-outline"} size={textSIZES.large} style={styles.icon}/>
            )}
            <Text style={styles.item} numberOfLines={1}>{item.task}</Text>
          </View>
        </TouchableOpacity>
      ))) : (
        <View>
          <Text style={[styles.item, {marginRight: textSIZES.xSmall}]} numberOfLines={1}>None</Text>
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
        <View style={[styles.row, {justifyContent: "space-between"}, {flex: 2}]}>
          <View style={styles.row}>
            <Ionicons name={"checkbox-outline"} size={textSIZES.xLarge} style={styles.icon}/> 
            <Text style={styles.label} numberOfLines={1}>Subtasks</Text>
          </View>

          {item.subtasks.length > 0 && (
          <TouchableOpacity onPress={() => (setUnSelect(true))} style={[styles.box, {flex: 1}]} disabled={!isSubtaskExpanded}>
            <Text style={{fontSize: textSIZES.small, color: COLORS({opacity:1}).white}}>Unselect All</Text>
          </TouchableOpacity>
        )}

          <TouchableOpacity style={styles.row} onPress={() => {
            setIsSubtaskExpanded(!isSubtaskExpanded);
          }}>
            {isSubtaskExpanded ? (
              <Ionicons name="chevron-up-outline" size={textSIZES.xLarge} style={styles.icon}/>
            ) : (
              <Ionicons name="chevron-down-outline" size={textSIZES.xLarge} style={styles.icon}/>
            )}
          </TouchableOpacity>
        </View>
        
      </View>
      <ExpandableView expanded={isSubtaskExpanded} view={expandedSubTaskCard} 
        params={{"originalSubtasks": item.subtasks, "setFn": setFn, "isEditable": isEditable, "unSelect": unSelect, "setUnSelect": setUnSelect}} vh={300} />
    </View>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: COLORS.lightWhite,
  },
  label: {
    fontSize: textSIZES.small,
    //fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
  },
  icon: {
    //marginRight: textSIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  expandedContainer: {
    margin: textSIZES.small,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: textSIZES.small/2,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).primary,
    padding: textSIZES.small,
    paddingBottom: textSIZES.xxLarge,
    flex: 1,
  },
  addButtonIcon: {
    height: textSIZES.xxLarge,
    margin: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    fontWeight: '200',
    //color: COLORS({opacity:1}).primary,
  },
  propContainer: {
    flex: 1,
    paddingVertical: textSIZES.xxSmall,
    marginHorizontal: textSIZES.xLarge,
  },
  subtaskContainer: {
    margin: textSIZES.xxSmall,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).white,
    borderRadius: textSIZES.xSmall,
    borderColor: COLORS({opacity:0.5}).lightGrey,
    borderWidth: 1,
  },
  box: {
    backgroundColor: COLORS({opacity:1}).secondary,
    borderRadius: textSIZES.xxSmall,
    padding: textSIZES.xxSmall,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: textSIZES.large,
  },
});

export default TaskCard