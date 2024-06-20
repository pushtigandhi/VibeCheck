import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { textSIZES, viewSIZES } from "../constants";

export default function HomeNavigation({ size, iconColor }) {
  const navigation = useNavigation();

  return (
    <View
      style={styles.root}
    >
      {/* Placeholders */}
      <TouchableOpacity onPress={() => navigation.navigate("Directory")} style={styles.iconRoot} >
        <Ionicons name={"list-outline"} size={size} color={iconColor} style={styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Contacts")} style={styles.iconRoot} >
        <Ionicons name={"people-outline"} size={size} color={iconColor} style={styles.icon}/>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate("VibeCheck")} style={styles.iconRoot} >
        <Ionicons name={"fitness-outline"} size={size} color={iconColor} style={styles.icon}/>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.iconRoot} >
        <Ionicons name={"home-outline"} size={size} color={iconColor} style={styles.icon}/>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate({name: "Profile", params: {isOwnProfile: true}})} style={styles.iconRoot}>
        <Ionicons name={"folder-open-outline"} size={size} color={iconColor} style={styles.icon}/>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigation.navigate("Backlog")} style={styles.iconRoot}>
        <Ionicons name={"folder-open-outline"} size={size} color={iconColor} style={styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("New")} style={styles.iconRoot} >
        <Ionicons name={"add-outline"} size={size} color={iconColor} style={styles.icon}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: textSIZES.xSmall,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  iconRoot: {
    alignItems: "center",
    display: "flex",
  },
  icon: {

  }
});