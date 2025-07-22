import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal,
        StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';
import { COLORS, SHADOWS, FONT, textSIZES, viewSIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import * as df  from "../constants/default";
import CreateNewItem from "./CreateNewItem";

export default function NewItem({navigation, onBack=null, isScheduler=false}) {
  function goHome() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.infoContainer}>
      <CreateNewItem item={df.defaultItem} onClose={goHome} isScheduler={isScheduler} />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    flex:1,
    backgroundColor: COLORS({opacity:1}).white,
    marginTop: -50,
  },
  titleContainer: {
    padding: textSIZES.small,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
  },
  sectionContainer: {
    margin: textSIZES.xSmall,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  title: {
    fontSize: textSIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
  },
  expandedContainer: {
    paddingBottom: textSIZES.small,
    paddingHorizontal: textSIZES.small,
    flex: 1,
    overflow: 'scroll',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: COLORS({opacity:0.8}).primary,
  },
  label:{
    fontSize: textSIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
    margin: textSIZES.xSmall,
  },
  button: {
    height: viewSIZES.xxSmall,
    width: viewSIZES.xxSmall,
    padding: textSIZES.xSmall,
    marginHorizontal: textSIZES.xSmall,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: textSIZES.small,
    borderColor: COLORS({opacity:1}).primary,
  },
});