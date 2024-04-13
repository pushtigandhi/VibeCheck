import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Modal, TouchableOpacity,
        StyleSheet } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES, ItemType } from  "../constants";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

export const Scheduler = ({ item = null, setFn}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes() + 15));
  const [repeat, setRepeat] = useState('ONCE');

  const [showRepeat, setShowRepeat] = useState(false);
  const [showDate, setShowDate] = useState(false);
 
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
      {showDate == false && (
        <TouchableOpacity style={[styles.row, styles.property]} onPress={()=>(setShowDate(true), updateNewItem({"repeat": repeat, "startDate": startDate, "endDate": endDate}))}>
          <Text style={{color: COLORS({opacity:0.8}).secondary, fontSize: SIZES.medium}}>Add Date</Text>
        </TouchableOpacity>
      )}
      {showDate == true && (
        <>
          <View style={[styles.row, styles.property, {justifyContent: "space-between"}, styles.divider]}>
            <Text style={styles.label}>From: </Text>
            <DateTimePicker
              value={startDate}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || startDate;
                setStartDate(currentDate);
                if(currentDate>endDate) {
                  setEndDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes() + 15));
                }
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
                if(currentDate>=endDate) {
                  setEndDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes() + 15));
                }
                updateNewItem({"startDate": currentDate});
              }}
            />
          </View>
          <View style={[styles.row, styles.property, {justifyContent: "space-between"}, styles.divider]}>
            <Text style={styles.label}>To: </Text>
              <DateTimePicker
                value={endDate}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || endDate;
                    if(currentDate>startDate) {
                      setEndDate(currentDate);
                      updateNewItem({"endDate": currentDate});
                    }
                    else {
                      alert("End datetime has to be after start datetime.");
                    }
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
                  if(currentDate>startDate) {
                    setEndDate(currentDate);
                    updateNewItem({"endDate": currentDate});
                  }
                  else {
                    alert("End datetime has to be after start datetime.");
                  }
                }}
              />
          </View>
          <View style={[styles.row, styles.property]}>
            <Ionicons name={"repeat-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
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
          <TouchableOpacity style={[styles.row, styles.removeButton]}
            onPress={() => (
              setRepeat(null),
              setStartDate(new Date()),
              setEndDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes() + 15)),
              updateNewItem({"repeat": "x", "startDate": "x", "endDate": "x"}), 
              setShowDate(false)
            )}
          >
            <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
            <Text style={{color: COLORS({opacity:1}).white}}>Remove</Text>
          </TouchableOpacity>
        </>
      )}

      {/* {showRepeat == false && (
        <TouchableOpacity style={[styles.row, styles.property]} onPress={()=>(setShowRepeat(true))}>
          <Ionicons name={"alarm-outline"} size={size} style={styles.icon}/>
          <Text style={[styles.property, {fontSize: SIZES.medium}]}>Add Repeat</Text>
        </TouchableOpacity>
      )}
      {showRepeat == true && (
        
      )} */}
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
    width: 50,
    color: COLORS({opacity:1}).secondary,
    margin: SIZES.xSmall,
  },
  property:{
    // fontSize: SIZES.medium,
    // fontFamily: FONT.regular,
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
  removeButton: {
    backgroundColor: COLORS({opacity:1}).lightRed, 
    paddingHorizontal: SIZES.small, 
    paddingTop: SIZES.xSmall,
    borderBottomLeftRadius: SIZES.xxSmall,
    borderBottomRightRadius: SIZES.xxSmall
  }
});