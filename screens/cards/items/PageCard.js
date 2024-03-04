import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../../constants";
import { ExpandableView, Spacer } from '../../../utils';
import { taskProperties } from "../PropertyCards";
import Layout from "../../../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "../PropertyCards";

export const PageCard = ({task, expanded=false}) => {
  const [isPropExpanded, setIsPropExpanded] = useState(expanded);
  const [isSubtaskExpanded, setIsSubtaskExpanded] = useState(true);
  const [isInstructionExpanded, setIsInstructionExpanded] = useState(true);

  return (
    <View style={styles.infoContainer}>
        <TouchableOpacity
            onPress={() => {
            setIsPropExpanded(!isPropExpanded);
            }}
            style={styles.titleContainer}
        >
            <View style={styles.row}>
            <Text style={styles.label}>Properties</Text>
            <Ionicons name={"information-circle-outline"} size={SIZES.xLarge} style={styles.icon}/> 
            </View>
        </TouchableOpacity>
        <ExpandableView expanded={isPropExpanded} view={PropertyCard} params={{task}} vh={500} />
        <View style={styles.row}>
            <Text style={styles.label}>Text</Text>
            <Ionicons name={"checkbox-outline"} size={SIZES.xLarge} style={styles.icon}/> 
        </View>
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
icon: {
  marginRight: SIZES.xxSmall,
  color: COLORS({opacity:0.8}).darkBlue,
},
row: {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
},
expandedContainer: {
  width: '90%',
  margin: SIZES.xSmall,
  paddingBottom: SIZES.medium,
  paddingHorizontal: SIZES.medium,
  flex: 1,
},
item: {
  fontSize: SIZES.mlarge,
  fontFamily: FONT.regular,
  color: COLORS({opacity:1}).darkBlue,
},
});

export default TaskCard