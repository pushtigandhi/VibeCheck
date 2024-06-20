import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal,
        StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';

import { COLORS, SHADOWS, FONT, textSIZES, viewSIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import * as df  from "../constants/default";
import DefaultView from "./views/DefaultView";
import DefaultTemplate from "./views/DefaultTemplate";
import ScheduleTemplate from "./views/ScheduleTemplate";
import ChecklistTemplate from "./views/ChecklistTemplate";
import { ExpandableView } from "../utils";

export default function SelectView({onClose}) {

  const [isDefaultExpanded, setIsDefaultExpanded] = useState(true);
  const [isScheduledExpanded, setIsScheduledExpanded] = useState(false);
  const [isChecklistExpanded, setIsChecklistExpanded] = useState(false);
  const [title, setTitle] = useState('New');
  const [viewType, setViewType] = useState(null);

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

    //console.log(item);
    
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
          <Ionicons name={"close-outline"} size={textSIZES.xxLarge} style={styles.iconInverted}/> 
        </TouchableOpacity>
      
        <TouchableOpacity onPress={doRefresh} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightGreen}]} >
          <Ionicons name={"checkmark-outline"} size={textSIZES.xxLarge} style={styles.iconInverted}/> 
        </TouchableOpacity>
      </View>

      <View style={[styles.row, styles.title]}>
        <TextInput style={{width: "100%", fontSize: textSIZES.xLarge, color: COLORS({opacity:0.9}).primary}}
          defaultValue={ title }
          onChangeText={ setTitle }
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
              <Ionicons name={"checkbox-outline"} size={textSIZES.large} style={styles.icon}/> 
            ) : (
              <Ionicons name={"square-outline"} size={textSIZES.large} style={styles.icon}/>
            )}
          </View>
        </View>
      </TouchableOpacity>
      
      <ExpandableView expanded={isDefaultExpanded} view={DefaultTemplate} vh={300} />

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
              <Ionicons name={"checkbox-outline"} size={textSIZES.large} style={styles.icon}/> 
            ) : (
              <Ionicons name={"square-outline"} size={textSIZES.large} style={styles.icon}/>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {/* <ExpandableView expanded={isScheduledExpanded} view={ScheduleTemplate} params={{ "close": close }} vh={300} /> */}

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
              <Ionicons name={"checkbox-outline"} size={textSIZES.large} style={styles.icon}/> 
            ) : (
              <Ionicons name={"square-outline"} size={textSIZES.large} style={styles.icon}/>
            )}
          </View>
        </View>
      </TouchableOpacity>
      {/* <ExpandableView expanded={isChecklistExpanded} view={ChecklistTemplate} params={{ "close": close }} vh={300} /> */}

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    flex:1,
    backgroundColor: COLORS({opacity:1}).white,
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
    //justifyContent: "flex-start",
    //justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: textSIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  label:{
    fontSize: textSIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).navy,
    margin: textSIZES.xSmall,
  },
  // button: {
  //   height: viewSIZES.xxSmall,
  //   padding: textSIZES.xSmall,
  //   marginHorizontal: textSIZES.xSmall,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: textSIZES.small
  // },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title:{
      padding: textSIZES.small,
      margin: textSIZES.small,
      borderWidth: 1,
      borderColor: COLORS({opacity:0.5}).primary,
      borderRadius: textSIZES.small,
  },
  imageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: textSIZES.Small,
  },
  icon: {
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:0.8}).white,
  },
  button: {
    height: viewSIZES.xSmall,
    width: viewSIZES.xSmall,
    padding: textSIZES.xSmall,
    marginHorizontal: textSIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: textSIZES.small
  },
  sortText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: textSIZES.small,
    marginHorizontal: textSIZES.small,
  },
});