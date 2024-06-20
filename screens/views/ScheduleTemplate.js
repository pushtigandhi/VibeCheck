import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, 
    RefreshControl, ScrollView, Image, Modal } from "react-native";
import { COLORS, textSIZES, SHADOWS, FONT, ItemType, ViewType, viewSIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

import SingleSelectDropdown from "../../components/SingleSelectDropdown";

const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];

const ListView = ({items, navigation}) => (
  <FlatList
    scrollEnabled={true}
    data={items}
    renderItem={({item}) => (
        <View key={item["_id"] + "root"} style={styles.cardsContainer} >
            <View style={{flexDirection: "row"}}>
                <View style={styles.time}>
                    <Text style={styles.timeLabel}>{String(new Date(item.endDate).getDate())}</Text>
                    <Text style={styles.timeLabel}>{daysOfWeek[new Date(item.startDate).getDay()]}</Text>
                </View>
                <View style={{ justifyContent: "center"}}>
                    <Text style={{ fontSize: textSIZES.xLarge}}>{item.icon}</Text>
                </View>
                <View style={styles.dayCardContainer}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <View style={styles.row}>
                        <Text style={styles.timeLabel}>{String(new Date(item.startDate).getHours())}:{new Date(item.startDate).getMinutes() < 10 ? String("0"+ new Date(item.startDate).getMinutes()) : String(new Date(item.startDate).getMinutes())} - {String(new Date(item.endDate).getHours())}:{new Date(item.endDate).getMinutes() < 10 ? String("0"+ new Date(item.endDate).getMinutes()) : String(new Date(item.endDate).getMinutes())}</Text>
                    </View>
                </View>
            </View>
        </View>
    )}
  /> 
);

export default function ScheduleTemplate ({navigation, route, scrollEnabled = true}) {
  const [title, setTitle] = useState("Title");
  
  const [items, setItems] = useState([]);
  const [type, setTypeOptions] = useState("All");

  const typeOptions = [
    {label: "All", value: "All"},
    {label: "Day", value: "Day"},
    {label: "Week", value: "Week"},
    {label: "Month", value: "Month"}
  ];

    function changeTypeOption(optionValue) {
        setTypeOptions(optionValue);
    }

    useEffect(() => {
        const indexOfTypeOption = Object.values(typeOptions).indexOf("type");
        setTypeOptions(Object.keys(typeOptions)[indexOfTypeOption]);
    }, [type]); // run only once

  return (
    <SafeAreaView style={styles.screen}>
        <View style={[styles.propContainer]}>
            <View style={[styles.row, {justifyContent: "space-between"}]}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.row}>
                    <View style={[styles.row, styles.searchInput]} >
                        <Ionicons name={"search-outline"} size={20} style={styles.iconInverted} />
                    </View>
                    <View style={styles.filterButtonIcon} >
                        <Ionicons name={"options-outline"} size={20} style={styles.iconInverted}/>
                    </View>
                    <View style={[styles.row, styles.addButton]} >
                        <Ionicons name={"add-circle"} size={20} style={styles.iconInverted}/>
                    </View>
                </View>
            </View>
          
          <SingleSelectDropdown options={typeOptions} placeholder={type} setFn={changeTypeOption}
            icon={<Ionicons name={"grid-outline"} size={25} style={[styles.icon, {margin: textSIZES.xxSmall}]} />} />
        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
    marginVertical: textSIZES.xxLarge,
    marginHorizontal: textSIZES.xSmall,
    padding: textSIZES.xSmall,
    borderWidth: 1, 
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xxSmall,
  },
  filterButtonIcon: {
    height: textSIZES.xxLarge,
    width: textSIZES.xxLarge,
    marginRight: textSIZES.xSmall,
    borderRadius: textSIZES.xxSmall,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    height: textSIZES.xxLarge,
    borderRadius: textSIZES.xxSmall,
    //marginHorizontal: textSIZES.small,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    marginRight: textSIZES.xSmall,
    borderRadius: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).secondary,
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
    alignItems: "center",
  },
  icon: {
    marginRight: textSIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
    margin: textSIZES.xxSmall,
  },
  propContainer: {
    paddingHorizontal: textSIZES.large,
    padding: textSIZES.small,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderRadius: textSIZES.small,
    backgroundColor: "#FFF"
  },
  imageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: textSIZES.Small,
  },
  dayCardContainer: {
    flex: 1,
    padding: textSIZES.xxSmall,
    marginLeft: textSIZES.xSmall,
  },
  prop: {
    fontWeight: "200",
  },
  time: {
    padding: textSIZES.xSmall,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "right",
  },
  timeLabel: {
    fontWeight: "200",
    fontSize: textSIZES.small,
  },
  cardsContainer: {
    marginTop: textSIZES.small,
    marginHorizontal: textSIZES.small,
    backgroundColor: COLORS({opacity:1}).lightWhite,// "#FFF",
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.xSmall,
    shadowColor: COLORS({opacity:1}).shadow,
  },
});