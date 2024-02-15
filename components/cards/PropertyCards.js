import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../constants";
import { MyDateTimePicker, PhoneNumberInput, ExpandableView } from '../../utils';
//import Layout from "../../../_layout";
import { Ionicons } from "@expo/vector-icons";

const taskProperties = () => {
    return (
      <View style={styles.infoContainer}>
       
        <TouchableOpacity>
          <Text style={styles.label}>
            <Ionicons name={"folder-open-outline"} size={20} color={"#80adad"}/> Folder
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.label}>
            <Ionicons name={"bookmark-outline"} size={20} color={"#80adad"}/> Label
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.label}>
            <Ionicons name={"list-outline"} size={20} color={"#80adad"}/> Tags
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.label}>
            <Ionicons name={"calendar-outline"} size={20} color={"#80adad"}/> Complete By
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.label}>
            <Ionicons name={"star-outline"} size={20} color={"#80adad"}/> Priority
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.label}>
            <Ionicons name={"repeat-outline"} size={20} color={"#80adad"}/> Repeat
          </Text>
        </TouchableOpacity>
      
       </View>
    )
};

const styles = StyleSheet.create({
  infoContainer: {
    padding: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium/2,
  },
  label:{
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    margin: SIZES.xSmall,
  },
});

export { taskProperties }