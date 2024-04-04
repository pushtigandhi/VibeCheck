import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Modal, TouchableOpacity,
        StyleSheet } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES, ItemType } from  "../constants";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

export const Scheduler = ({ item = null, setFn}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes() + 15));
  const [repeat, setRepeat] = useState(null);
 
  function updateNewItem(params) { 
    setFn(params);
  };

  const size = 25;

  useEffect(() => {
    if (item) {
      if(!!item.startDate){
        const parsedDate = new Date(item.startDate);
        setStartDate(parsedDate);
      }
      if(!!item.endDate){
        const parsedDate = new Date(item.endDate);
        setEndDate(parsedDate);
      }
      if(!!item.repeat){
        setRepeat(item.repeat);
      }
    }
  }, [item]); // Update category and section when item changes

  return (
    <SafeAreaView style={styles.infoContainer}>
        <View style={[styles.row, styles.property, {justifyContent: "space-between"}, styles.divider]}>
            <DateTimePicker
            value={startDate}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
                const currentDate = selectedDate || startDate;
                setStartDate(currentDate);
                updateNewItem({"startDate": currentDate});
            }}
            />
            <DateTimePicker
                value={startDate}
                mode={"time"}
                is24Hour={true}
                display="default"
                minuteInterval={15}
                onChange={(event, selectedDate) => {
                const currentDate = selectedDate || startDate;
                setStartDate(currentDate);
                updateNewItem({"startDate": currentDate});
                }}
            />
        </View>
        <View style={[styles.row, styles.property, {justifyContent: "space-between"}, styles.divider]}>
            <DateTimePicker
                value={endDate}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || endDate;
                    setEndDate(currentDate);
                    updateNewItem({"endDate": currentDate});
                }}
            />
            <DateTimePicker
                value={endDate}
                mode={"time"}
                is24Hour={true}
                display="default"
                minuteInterval={15}
                onChange={(event, selectedDate) => {
                const currentDate = selectedDate || endDate;
                setEndDate(currentDate);
                updateNewItem({"endDate": currentDate});
                }}
            />
        </View>
        <View style={styles.row}>
            <Ionicons name={"repeat-outline"} size={size} style={[styles.icon, {marginLeft: SIZES.xSmall, marginRight: SIZES.xxSmall}]} /> 
            <Text style={styles.property}>Repeat</Text>
        </View>
        <View style={[styles.row, styles.property]}>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'NEVER' ? styles.selectedBox:styles.unselectedBox]}
            onPress={() => setRepeat("NEVER")}
        >
            <Ionicons name={"close-outline"} size={20} style={[repeat === 'NEVER' ? styles.iconInverse:styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'ONCE' ? styles.selectedBox:styles.unselectedBox]}
            onPress={() => (
            setRepeat("ONCE"),
            updateNewItem({"repeat": "ONCE"})
            )}
        >
            <Text style={[styles.property, repeat === 'ONCE' ? styles.selectedText:styles.unselectedText]}>Once</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'DAILY' ? styles.selectedBox:styles.unselectedBox]}
            onPress={() => (
            setRepeat("DAILY"),
            updateNewItem({"repeat": "DAILY"})
            )}
        >
            <Text style={[styles.property, repeat === 'DAILY' ? styles.selectedText:styles.unselectedText]}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'WEEKLY' ? styles.selectedBox:styles.unselectedBox]}
            onPress={() => (
            setRepeat("WEEKLY"),
            updateNewItem({"repeat": "WEEKLY"})
            )}
        >
            <Text style={[styles.property, repeat === 'WEEKLY' ? styles.selectedText:styles.unselectedText]}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'MONTHLY' ? styles.selectedBox:styles.unselectedBox]}
            onPress={() => (
            setRepeat("MONTHLY"),
            updateNewItem({"repeat": "MONTHLY"})
            )}
        >
            <Text style={[styles.property, repeat === 'MONTHLY' ? styles.selectedText:styles.unselectedText]}>Monthly</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    margin: SIZES.medium,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: SIZES.medium/2,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    paddingBottom: SIZES.xSmall,
    borderBottomWidth: 0.5,
    borderColor: COLORS({opacity:1}).tertiary,
  },
  label:{
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).secondary,
    margin: SIZES.xSmall,
  },
  property:{
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:0.8}).secondary,
    margin: SIZES.xSmall,
  },
  icon: {
    //margin: SIZES.xxSmall,
    color: COLORS({opacity:1}).secondary,
  },
  iconInverse: {
    //margin: SIZES.xxSmall,
    color: COLORS({opacity:1}).lightWhite,
  },
  box: {
    borderWidth: 0.5,
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: SIZES.small,
    padding: SIZES.tiny,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.xxSmall,
  },
  selectedBox: {
    backgroundColor: COLORS({opacity:1}).secondary,
  },
  unselectedBox: {
    backgroundColor: COLORS({opacity:1}).lightWhite,
  },
  selectedText: {
    color: COLORS({opacity:1}).lightWhite,
  },
  unselectedText: {
    color: COLORS({opacity:1}).secondary,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
});