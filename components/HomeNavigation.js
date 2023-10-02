import React from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeNavigation({ size }) {
  const navigation = useNavigation();

  return (
    <View
      style={styles.root}
    >
      {/* Placeholders */}
      <TouchableOpacity onPress={() => navigation.navigate("Directory")} style={styles.iconRoot} >
        <Ionicons name={"list-circle"} size={size} color={"#80adad"} style={styles.group}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ContactList")} style={styles.iconRoot} >
        <Ionicons name={"people-circle"} size={size} color={"#80adad"} style={styles.group}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("VibeCheck")} style={styles.iconRoot} >
        <Ionicons name={"fitness-outline"} size={size} color={"#80adad"} style={styles.group}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate({name: "Profile", params: {isOwnProfile: true}})} style={styles.iconRoot}>
        <Ionicons name={"person-circle"} size={size} color={"#80adad"} style={styles.group}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Post")} style={styles.iconRoot} >
        <Ionicons name={"add-circle"} size={size} color={"#80adad"} style={styles.group}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconRoot: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  }
});