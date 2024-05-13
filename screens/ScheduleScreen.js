import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal, TouchableNativeFeedback } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS, ItemType } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import FilterModal from "../components/FilterModal";

const test1 = {
    "startDate": new Date(),
}

export default function ScheduleScreen ({navigation}) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes() + 15));
    const [repeat, setRepeat] = useState('ONCE');

    const [showRepeat, setShowRepeat] = useState(false);
    const size = 25;

    const [filter, setFilter] = useState({});
    function updateNewItem(params) { 
        if (params.startDate) {
            setFilter({...filter, startDate: params.startDate})
            console.log("item updated: " + params.startDate);
        }
        if (params.endDate) {
            setFilter({...filter, startDate: params.startDate})
            console.log("item updated: " + params.endDate);
        }
        if(params.repeat) {
            if(params.repeat == 'x')
            {
              const updated = filter;
              delete updated.repeat;
              setFilter(updated);
              
            }
            else {
                setFilter({... filter, repeat: params.repeat});
            }
            console.log("item updated: " + params.repeat);
        }
    };
    function onSelectExistingItem() {
        console.log(filter);
        setFilterVisible(true);
    }

    const [filterVisible, setFilterVisible] = useState(false);
    function closeFilter() {
        setFilterVisible(false);
    }

    useEffect(() => {
        setFilter({ "startDate": startDate, "endDate": endDate });
    }, [])

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
            </View>
            {showRepeat == false && (
                <TouchableOpacity style={[styles.row, styles.property, styles.divider]} onPress={()=>(setShowRepeat(true))}>
                <Ionicons name={"alarm-outline"} size={size} style={styles.icon}/>
                <Text style={[styles.property, {fontSize: SIZES.medium}]}>Add Repeat</Text>
                </TouchableOpacity>
            )}
            {showRepeat == true && (
                <View style={[styles.row, styles.property, styles.divider]}>
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
                <TouchableOpacity style={[styles.row, styles.removeButton]}
                    onPress={() => (
                        setRepeat(null),
                        updateNewItem({"repeat": "x"}), 
                        setShowRepeat(false)
                    )}
                >
                    <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
                </TouchableOpacity>
                </View>
            )}
            <View styles={styles.infoContainer}>
            <View style={{ height: SIZES.xxLarge * 2,}}>
                <TouchableOpacity onPress={() => {onSelectExistingItem()}} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lavendar}]}>
                    <Text style={styles.buttonText}>Select An Existing Item</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={filterVisible} animationType="slide" onRequestClose={closeFilter}>
                <FilterModal closeFilter={closeFilter} filter={filter} setFilter={setFilter} isScheduler={true} />
            </Modal>

            <View style={{ height: SIZES.xxLarge * 2,}}>
                <TouchableOpacity style={[styles.button, {backgroundColor: COLORS({opacity:1}).yellow}]}>
                    <Text style={styles.buttonText}>Create New</Text>
                </TouchableOpacity>
            </View>
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
      margin: SIZES.medium,
      marginVertical: SIZES.xxLarge*2,
      borderRadius: SIZES.medium/2,
        ...SHADOWS.medium,
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
        height: 50,
        width: 50,
        padding: SIZES.xSmall,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.medium,
        backgroundColor: COLORS({opacity:1}).lightRed,
    },
    button: {
        flex: 1,
        padding: SIZES.xSmall,
        margin: SIZES.xSmall,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.medium
    },
    buttonText: {
        color: COLORS({opacity: 1}).white,
    }, 
  });