import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Search } from "./Search";
import { Typography } from "./Typography";
import { View, TouchableOpacity, StyleSheet, Text, TextInput, RefreshControl } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, SHADOWS } from "../constants";
import DateTimePicker from '@react-native-community/datetimepicker';

import {Calendar, LocaleConfig} from 'react-native-calendars';

export const ToolBar = ({
  state,
  mobile,
  onRefresh,
  showSidebar = false,
  date,
}) => {

  const [selected, setSelected] = useState('');
  const [currentDate, setCurrentDate] = useState(date);
  const [formattedDate, setFormattedDate] = useState(null);
  const [showDatePicker, toggleShowDatePicker] = useState(false);

  useEffect(() => {
    toggleShowDatePicker(false);
    doRefresh(currentDate);
  }, [state])

  function doRefresh(formatDate) {
    if (mobile && state === 'day') {
      const options = { month: 'short', day: '2-digit', timeZone: 'UTC' };
      setFormattedDate(formatDate.toLocaleDateString('en-US', options));
    }
    if (mobile && state === 'week') {
      const dayOfWeek = formatDate.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
      const startOfWeek = new Date(formatDate); // Clone the date
      startOfWeek.setDate(formatDate.getDate() - dayOfWeek); // Find Monday
      //startOfWeek.setDate(formatDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Find Monday
      const endOfWeek = new Date(startOfWeek); // Clone the startOfWeek
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to find Sunday

      const options = { day: '2-digit', timeZone: 'UTC' };
      const formattedStart = startOfWeek.toLocaleDateString('en-US', options); // Format start of the week
      const formattedEnd = endOfWeek.toLocaleDateString('en-US', options); // Format end of the week

      setFormattedDate(`${formattedStart}-${formattedEnd} ${startOfWeek.toLocaleDateString('en-US', { month: 'short' })}`);
    }
    if (mobile && state === 'month') {
      setFormattedDate(formatDate.toLocaleDateString('en-US', { month: 'long' }));
    }
  };

  const toggleDatePicker = React.useCallback(() => {
    if (!showDatePicker) { 
      toggleShowDatePicker(true);
    }
    else { 
      toggleShowDatePicker(false);
    }
  });

  return (
    <>
    <View 
        style={[
                styles.toolBar,
                styles.row,
            ]}
        >

      <View style={[styles.row, styles.leftContent]}>
        <TouchableOpacity 
          onPress={() => {
            onRefresh();
          }}
        >
          {showSidebar ? 
            <Ionicons name={"close-circle-sharp"} size={30} style={styles.icon} />
            :
            <Ionicons name={"reorder-three-outline"} size={30} style={styles.icon} /> 
          }
        </TouchableOpacity>
        {["day", "month", "week"].includes(state) && (
          <View style={[styles.row, styles.toolBar.divWrapper]}>
            {/* <View style={styles.toolBar.typography2}> */}
            <Text style={[styles.span, {fontWeight:'500'}]}>
                {String(formattedDate)}
            </Text>
            <Text style={styles.span}> {String(date.getFullYear())}</Text>
           {/* </View> */}
          </View>
        )}
        <TouchableOpacity onPress={toggleDatePicker}>
          <Ionicons name={"calendar-outline"} size={20} style={styles.icon} />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.row, styles.rightContent]}>
        <TouchableOpacity>
          <Search
            //className={searchPropertyDefaultClassName}
            //searchButtonColor={searchIconColor}
            property1="default"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButtonIcon} >
          <Ionicons name={"add-circle"} size={20} style={styles.iconInverted} />
        </TouchableOpacity>
      </View>
    </View>{/* <DateTimePicker
          value={currentDate}
          mode={"date"} // or "date" or "time"
          display="spinner"
          onChange={(event, selectedDate) => {
            const curr = selectedDate || currentDate;
            setCurrentDate(curr);
            doRefresh(curr);
          }}
        /> */}
    {showDatePicker && (
      <Calendar
        onDayPress={day => {
            setSelected(day.dateString);
            setCurrentDate(new Date(day.dateString));
            doRefresh(new Date(day.dateString));
        }}
        markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
        firstDay={1}
        theme={styles.calendar}
      />
      )}
    </>
  );
};

ToolBar.propTypes = {
  state: PropTypes.oneOf(["month", "year", "day", "week"]),
  mobile: PropTypes.bool,
  searchIconColor: PropTypes.string,
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        //alignItems: "baseline",
    },
    toolBar: {
      //alignItems: 'space-between',
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: "#aad6e7",
      display: 'flex',
      flex: 'row',
      justifyContent: 'space-between',
      //position: 'relative',
      width:"100%",
      height: 60,
    },
    toolBarInstance: {
        borderColor: '#aad6e7',
        width: 100,
    },
    leftContent: {
      alignItems: 'center',
      display: 'flex',
      flex: 0,
      width: 100,
    },
    instanceNode2: {
      flex: 0,
    },
    divWrapper: {
      alignItems: 'flex-start',
      display: 'flex',
      flex: 0,
      gap: 10,
    },
    typography2: {
      color: '#333333',
      //fontFamily: 'Poppins, Helvetica',
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 'normal',
      marginTop: -1,
      width: 'fit-content',
    },
    span: {
      //fontWeight: '500',
      fontSize: 16,
      color: COLORS({opacity:1}).primary,
    },
    textWrapper2: {
      //fontFamily: 'Inter, Helvetica',
    },
    class6: {
      color: '#333333',
      //fontFamily: 'Inter, Helvetica',
      fontWeight: '400',
      whiteSpace: 'nowrap',
    },
    iconFontAwesome2: {
      height: 16,
      width: 16,
    },
    rightContent: {
      alignItems: 'center',
      display: 'flex',
      flex: 0,
      gap: 16,
    },
    mobileFalse: {
      padding: 16,
    },
    mobileTrue: {
      padding: 8,
    },
    mobileFalseLeftContent: {
      gap: 16,
    },
    mobileTrueLeftContent: {
      gap: 8,
    },
    mobileFalseTypography2: {
      fontSize: 30,
    },
    mobileTrueTypography2: {
      fontSize: 16,
    },
    addButtonIcon: {
      height: 30,
      width: 30,
      borderRadius: '5%',
      backgroundColor: COLORS({opacity:1}).primary,
      margin: 5,
      alignContent: 'center',
      justifyContent: 'center',
      left:-10,
    },
    icon: {
      color: COLORS({opacity:1}).primary,
      margin: 5,
    },
    iconInverted: {
      color: COLORS({opacity:1}).white,
      margin: 5,
    },
    calendar: {
      textDayFontSize: SIZES.medium,
      dayTextColor: COLORS({opacity:1}).secondary,
      selectedDayTextColor: COLORS({opacity:1}).lightWhite,
      selectedDotColor: COLORS({opacity:1}).primary,
      todayTextColor: COLORS({opacity:1}).lightWhite,
      todayBackgroundColor: COLORS({opacity:0.8}).darkBlue,
      arrowColor: COLORS({opacity:1}).primary,
      monthTextColor: COLORS({opacity:1}).primary,
      //textMonthFontWeight: '500',
      textSectionTitleColor: COLORS({opacity:0.8}).darkBlue,
  },
  });