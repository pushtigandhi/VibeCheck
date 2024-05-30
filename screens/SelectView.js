import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal,
        StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import * as df  from "../constants/default";
import DefaultTemplate from "./views/DefaultTemplate";
import ScheduleTemplate from "./views/ScheduleTemplate";
import ChecklistTemplate from "./views/ChecklistTemplate";
import { ExpandableView } from "../utils";

export default function SelectView({onClose}) {

  const [isDefaultExpanded, setIsDefaultExpanded] = useState(true);
  const [isScheduledExpanded, setIsScheduledExpanded] = useState(false);
  const [isChecklistExpanded, setIsChecklistExpanded] = useState(false);
  const [title, setTitle] = useState(null);
  const [viewType, setViewType] = useState(null);
  const [disableSave, setDisableSave] = useState(true);

  function close() {
    setIsDefaultExpanded(false);
    setIsScheduledExpanded(false);
    setIsChecklistExpanded(false);
  } 

  function doRefresh() {
    let item = {
      title: title,
      view: viewType,
    };

    console.log(item);
    // PATCHitemTEST(itemType, {
    //     ...item
    //   }, _id)
    //   .then((item_) => {
    //       setRefreshing(false);
    // }).catch((error) => {
    //     console.log(error);
    //     setRefreshing(false);
    // });
  };
  
  return (
    <SafeAreaView style={styles.infoContainer}>
      <View style={styles.imageBox}>
        <TouchableOpacity onPress={() => (onClose())} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightRed}]} > 
          <Ionicons name={"close-outline"} size={SIZES.xxLarge} style={styles.iconInverted}/> 
        </TouchableOpacity>
      
        <TouchableOpacity onPress={doRefresh} style={[styles.button, {backgroundColor: disableSave ? COLORS({opacity:0.7}).lightGreen : COLORS({opacity:1}).lightGreen}]} disabled={disableSave} >
          <Ionicons name={"checkmark-outline"} size={SIZES.xxLarge} style={styles.iconInverted}/> 
        </TouchableOpacity>
      </View>

      <View style={[styles.row, styles.title]}>
        <TextInput style={{width: "100%", fontSize: SIZES.xLarge, color: COLORS({opacity:0.9}).primary}}
          {...(title ? { defaultValue: title } : { placeholder: "Title" })}
          onChangeText={(newTitle) => (
            setTitle(newTitle),
            newTitle ? setDisableSave(false) : setDisableSave(true)
          )}
        />
      </View>

      <Text style={styles.sortText}>Select ViewType:</Text>

      <TouchableOpacity
        onPress={() => {
          setIsDefaultExpanded(true);
          setIsScheduledExpanded(false);
          setIsChecklistExpanded(false);
          setViewType(df.ViewType.Default);
        }}
        style={styles.titleContainer}
      >
        <View style={[styles.row, {justifyContent: "space-between"}]}>
          <Text style={styles.label}>{df.ViewType.Default}</Text>
          <View>
            {isDefaultExpanded ? (
              <Ionicons name={"checkbox-outline"} size={SIZES.large} style={styles.icon}/> 
            ) : (
              <Ionicons name={"square-outline"} size={SIZES.large} style={styles.icon}/>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <ExpandableView expanded={isDefaultExpanded} view={DefaultTemplate} params={{ "close": close }} vh={300} />

      <TouchableOpacity
        onPress={() => {
          setIsDefaultExpanded(false);
          setIsScheduledExpanded(true);
          setIsChecklistExpanded(false);
          setViewType(df.ViewType.Schedule);
        }}
        style={styles.titleContainer}
      >
        <View style={[styles.row, {justifyContent: "space-between"}]}>
          <Text style={styles.label}>{df.ViewType.Schedule}</Text>
          <View>
            {isScheduledExpanded ? (
              <Ionicons name={"checkbox-outline"} size={SIZES.large} style={styles.icon}/> 
            ) : (
              <Ionicons name={"square-outline"} size={SIZES.large} style={styles.icon}/>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <ExpandableView expanded={isScheduledExpanded} view={ScheduleTemplate} params={{ "close": close }} vh={300} />

      <TouchableOpacity
        onPress={() => {
          // navigation.navigate("ChecklistView", {"isSection": false});
          setIsDefaultExpanded(false);
          setIsScheduledExpanded(false);
          setIsChecklistExpanded(true);
          setViewType(df.ViewType.Checklist);
        }}
        style={styles.titleContainer}
      >
        <View style={[styles.row, {justifyContent: "space-between"}]}>
          <Text style={styles.label}>{df.ViewType.Checklist}</Text>
          <View>
            {isChecklistExpanded ? (
              <Ionicons name={"checkbox-outline"} size={SIZES.large} style={styles.icon}/> 
            ) : (
              <Ionicons name={"square-outline"} size={SIZES.large} style={styles.icon}/>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <ExpandableView expanded={isChecklistExpanded} view={ChecklistTemplate} params={{ "close": close }} vh={300} />

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    flex:1,
    backgroundColor: COLORS({opacity:1}).white,
  },
  titleContainer: {
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
  },
  sectionContainer: {
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
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
    //justifyContent: "flex-start",
    //justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  label:{
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).navy,
    margin: SIZES.xSmall,
  },
  // button: {
  //   height: SIZES.xLarge * 2,
  //   padding: SIZES.xSmall,
  //   marginHorizontal: SIZES.xSmall,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: SIZES.medium
  // },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title:{
      padding: SIZES.medium,
      margin: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS({opacity:0.5}).primary,
      borderRadius: SIZES.medium,
  },
  imageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: SIZES.Small,
  },
  icon: {
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:0.8}).white,
  },
  button: {
    height: SIZES.xxLarge * 2,
    width: SIZES.xxLarge * 2,
    padding: SIZES.xSmall,
    marginHorizontal: SIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.medium
  },
  sortText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: SIZES.medium,
    marginHorizontal: SIZES.medium,
  },
});