import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, 
    RefreshControl, ScrollView, Image, Modal } from "react-native";
import { COLORS, SIZES, SHADOWS, FONT, ItemType, ViewType } from "../../constants";
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
                    <Text style={{ fontSize: SIZES.xLarge}}>{item.icon}</Text>
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
                        <Ionicons name={"funnel-outline"} size={20} style={styles.iconInverted}/>
                    </View>
                    <View style={[styles.row, styles.addButton]} >
                        <Ionicons name={"add-circle"} size={20} style={styles.iconInverted}/>
                    </View>
                </View>
            </View>
          
          <SingleSelectDropdown options={typeOptions} placeholder={type} setFn={changeTypeOption}
            icon={<Ionicons name={"grid-outline"} size={25} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />
        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
    marginVertical: SIZES.xxLarge,
    marginHorizontal: SIZES.small,
    padding: SIZES.small,
    borderWidth: 1, 
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: SIZES.xxSmall,
  },
  filterButtonIcon: {
    height: SIZES.xxLarge,
    width: SIZES.xxLarge,
    marginRight: SIZES.small,
    borderRadius: SIZES.xxSmall,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    height: SIZES.xxLarge,
    borderRadius: SIZES.xxSmall,
    //marginHorizontal: SIZES.medium,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: COLORS({opacity:0.5}).secondary,
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
    alignItems: "center",
  },
  icon: {
    marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
    margin: SIZES.xxSmall,
  },
  propContainer: {
    paddingHorizontal: SIZES.large,
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderRadius: SIZES.medium,
    backgroundColor: "#FFF"
  },
  imageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: SIZES.Small,
  },
  dayCardContainer: {
    flex: 1,
    padding: SIZES.xxSmall,
    marginLeft: SIZES.xSmall,
  },
  prop: {
    fontWeight: "200",
  },
  time: {
    padding: SIZES.xSmall,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "right",
  },
  timeLabel: {
    fontWeight: "200",
    fontSize: SIZES.medium,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    marginHorizontal: SIZES.medium,
    backgroundColor: COLORS({opacity:1}).lightWhite,// "#FFF",
    borderRadius: SIZES.small,
    ...SHADOWS.xSmall,
    shadowColor: COLORS({opacity:1}).shadow,
  },
});