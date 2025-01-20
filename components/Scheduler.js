import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal, TouchableNativeFeedback } from "react-native";
import { COLORS, FONT, textSIZES, viewSIZES, SHADOWS, ItemType } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

const test1 = {
    "startDate": new Date(),
}

export const Scheduler = ({ item = null, setFn }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes() + 15));
    const [repeat, setRepeat] = useState('ONCE');
    
    const [diffInDays, setDiffInDays] = useState(null);
    const [diffInHours, setDiffInHours] = useState(null);
    const [diffInMinutes, setDiffInMinutes] = useState(null);

    function updateDuration() {
      const differenceInMs = endDate - startDate;

      // Convert milliseconds to days, hours, and minutes
      setDiffInDays(Math.floor(differenceInMs / (1000 * 60 * 60 * 24)));
      setDiffInHours(Math.floor((differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setDiffInMinutes(Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60)));
    }

    useEffect(() => {
      if (item.startDate) {
        setStartDate(new Date(item.startDate));
        setEndDate(new Date(item.endDate));
        setRepeat(item.repeat);

        const differenceInMs = new Date(item.endDate) - new Date(item.startDate);

        setDiffInDays(Math.floor(differenceInMs / (1000 * 60 * 60 * 24)));
        setDiffInHours(Math.floor((differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setDiffInMinutes(Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60)));
      }
      else {
        setFn({"startDate": startDate, "endDate": endDate, "repeat": repeat});
      }
    }, [item]); 

    return(
      <SafeAreaView style={styles.screen}>
        <View styles={styles.infoContainer}>
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
                updateDuration();
                setFn({"startDate": currentDate});
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
                updateDuration();
                setFn({"startDate": currentDate});
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
                    updateDuration();
                    setFn({"endDate": currentDate});
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
                updateDuration();
                setFn({"endDate": currentDate});
              }
              else {
                alert("End datetime has to be after start datetime.");
              }
              }}
            />
          </View>
        </View>
        <View style={[styles.row, styles.property, styles.divider]}>
          <Ionicons name={"repeat-outline"} size={textSIZES.large} style={[styles.icon, {margin: textSIZES.xxSmall}]}/>
          <TouchableOpacity style={[styles.row, styles.box, repeat === 'ONCE' ? styles.selectedBox:styles.unselectedBox]}
              onPress={() => (
              setRepeat("ONCE"),
              setFn({"repeat": "ONCE"})
              )}
          >
          <Text style={[styles.property, repeat === 'ONCE' ? styles.selectedText:styles.unselectedText]}>Once</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.row, styles.box, repeat === 'DAILY' ? styles.selectedBox:styles.unselectedBox]}
              onPress={() => (
              setRepeat("DAILY"),
              setFn({"repeat": "DAILY"})
              )}
          >
          <Text style={[styles.property, repeat === 'DAILY' ? styles.selectedText:styles.unselectedText]}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.row, styles.box, repeat === 'WEEKLY' ? styles.selectedBox:styles.unselectedBox]}
            onPress={() => (
              setRepeat("WEEKLY"),
              setFn({"repeat": "WEEKLY"})
            )}
          >
              <Text style={[styles.property, repeat === 'WEEKLY' ? styles.selectedText:styles.unselectedText]}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.row, styles.box, repeat === 'MONTHLY' ? styles.selectedBox:styles.unselectedBox]}
            onPress={() => (
              setRepeat("MONTHLY"),
              setFn({"repeat": "MONTHLY"})
            )}
          >
            <Text style={[styles.property, repeat === 'MONTHLY' ? styles.selectedText:styles.unselectedText]}>Monthly</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.row, styles.property]}>
          <Ionicons name={"timer-outline"} size={textSIZES.large} style={[styles.icon]}/>
          <View style={[styles.box, styles.unselectedBox, { marginHorizontal: textSIZES.xxSmall }]}>
            <Text style={[styles.property, styles.unselectedText]}>{diffInDays}</Text>
          </View>
          <Text style={[styles.property, styles.unselectedText, { marginLeft: 0 }]}>Days</Text>
          <View style={[styles.box, styles.unselectedBox, { marginHorizontal: textSIZES.xxSmall }]}>
            <Text style={[styles.property, styles.unselectedText]}>{diffInHours}</Text>
          </View>
          <Text style={[styles.property, styles.unselectedText, { marginLeft: 0 }]}>Hours</Text>
          <View style={[styles.box, styles.unselectedBox, { marginHorizontal: textSIZES.xxSmall }]}>
            <Text style={[styles.property, styles.unselectedText]}>{diffInMinutes}</Text>
          </View>
          <Text style={[styles.property, styles.unselectedText,{ marginLeft: 0 }]}>Minutes</Text>
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS({opacity:1}).lightWhite,
  },
  infoContainer: {
    backgroundColor: COLORS({opacity:1}).white,
    margin: textSIZES.small,
    marginVertical: textSIZES.xxLarge*2,
      ...SHADOWS.medium,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    paddingBottom: textSIZES.xSmall,
    borderBottomWidth: 0.5,
    borderColor: COLORS({opacity:1}).tertiary,
  },
  label:{
    width: 50,
    color: COLORS({opacity:1}).secondary,
    margin: textSIZES.xSmall,
  },
  property:{
    // fontSize: textSIZES.small,
    // fontFamily: FONT.regular,
    color: COLORS({opacity:0.8}).secondary,
    margin: textSIZES.xSmall,
  },
  icon: {
    //margin: textSIZES.xxSmall,
    color: COLORS({opacity:1}).secondary,
  },
  iconInverse: {
    //margin: textSIZES.xxSmall,
    color: COLORS({opacity:1}).lightWhite,
  },
  box: {
    borderWidth: 0.5,
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xSmall,
    padding: textSIZES.tiny,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: textSIZES.xxSmall,
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
    fontSize: textSIZES.large,
    fontFamily: FONT.regular,
    fontWeight: "200",
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  removeButton: {
    height: 50,
    width: 50,
    padding: textSIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: textSIZES.small,
    backgroundColor: COLORS({opacity:1}).lightRed,
  },
  button: {
    flex: 1,
    padding: textSIZES.xSmall,
    margin: textSIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: textSIZES.small
  },
  buttonText: {
    color: COLORS({opacity: 1}).white,
  },
  cardsContainer: {
      marginBottom: textSIZES.small,
    marginHorizontal: textSIZES.small,
    backgroundColor: COLORS({opacity:1}).lightGrey,// "#FFF",
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.xSmall,
    shadowColor: COLORS({opacity:1}).shadow,
    padding: textSIZES.xxSmall,
  },
});