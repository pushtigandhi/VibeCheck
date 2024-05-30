import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, TextInput, RefreshControl } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, SHADOWS } from "../constants";
import DateTimePicker from '@react-native-community/datetimepicker';
import MiniTools from "./MiniTools";

import {Calendar, LocaleConfig} from 'react-native-calendars';

export const ToolBar = ({
  state,
  mobile,
  onRefresh,
  showSidebar = false,
  date,
  toggleSidebar,
  setFilterVisible,
  setScheduleVisible,
  doSearch,
  isHome = false
}) => {

  const [selected, setSelected] = useState('');
  const [formattedDate, setFormattedDate] = useState(null);
  const [showDatePicker, toggleShowDatePicker] = useState(false);

  useEffect(() => {
    toggleShowDatePicker(false);
    doRefresh(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  }, [state, date])

  function doRefresh(formatDate) {
    if (mobile && state === 'day') {
      const options = { month: 'short', day: '2-digit', timeZone: 'UTC' };
      setFormattedDate(formatDate.toLocaleDateString('en-US', options));
    }
    if (mobile && state === 'week') {
      const dayOfWeek = formatDate.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
      const startOfWeek = new Date(formatDate); // Clone the date
      startOfWeek.setDate(formatDate.getDate() - dayOfWeek);
      const endOfWeek = new Date(startOfWeek); // Clone the startOfWeek
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to find Sunday

      const options = { day: '2-digit', timeZone: 'UTC' };
      const formattedStart = startOfWeek.toLocaleDateString('en-US', options); // Format start of the week
      const formattedEnd = endOfWeek.toLocaleDateString('en-US', options); // Format end of the week

      setFormattedDate(`${formattedStart}-${formattedEnd} ${endOfWeek.toLocaleDateString('en-US', { month: 'short' })}`);
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
    <View style={[styles.toolBar, styles.row]}>
      <View style={[styles.row, styles.leftContent]}>
        {isHome && (
          <TouchableOpacity 
            onPress={() => {
              toggleSidebar();
            }}
          >
            {showSidebar ? 
              <Ionicons name={"close-circle-sharp"} size={30} style={styles.icon} />
              :
              <Ionicons name={"reorder-three-outline"} size={30} style={styles.icon} /> 
            }
          </TouchableOpacity>
        )}
        
        {["day", "month", "week"].includes(state) && (
          <View style={[styles.row]}>
            <Text style={[styles.span, {fontWeight:'500'}]}>
                {String(formattedDate)}
            </Text>
            <Text style={styles.span}> {String(date.getFullYear())}</Text>
          </View>
        )}
        <TouchableOpacity onPress={toggleDatePicker}>
          <Ionicons name={"calendar-outline"} size={20} style={styles.icon} />
        </TouchableOpacity>
      </View>
      
      {isHome && (
        <View style={[styles.row, styles.rightContent]}>
          <MiniTools setFilterVisible={setFilterVisible} doSearch={doSearch} route={setScheduleVisible} />
        </View>
      )}
      
    </View>
    {showDatePicker && (
      <Calendar
        onDayPress={day => {
            setSelected(day.dateString);
            onRefresh(new Date(day.year, day.month-1, day.day), state);
        }}
        markedDates={{
            [selected]: {selected: true, disableTouchEvent: true}
        }}
        firstDay={0}
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
      borderBottomColor: COLORS({opacity:1}).primary,
      display: 'flex',
      flex: 'row',
      justifyContent: 'space-between',
      //position: 'relative',
      height: 50,
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
      height: SIZES.xxLarge,
      width: SIZES.xxLarge,
      borderRadius: SIZES.xxSmall,
      backgroundColor: COLORS({opacity:1}).primary,
      marginRight: SIZES.xxSmall,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filterButtonIcon: {
      height: SIZES.xxLarge,
      width: SIZES.xxLarge,
      borderRadius: SIZES.xxSmall,
      backgroundColor: COLORS({opacity:0.7}).primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      color: COLORS({opacity:1}).primary,
      margin: SIZES.xxSmall,
    },
    iconInverted: {
      color: COLORS({opacity:1}).white,
      margin: SIZES.xxSmall,
    },
    calendar: {
      textDayFontSize: SIZES.medium,
      dayTextColor: COLORS({opacity:1}).secondary,
      selectedDayTextColor: COLORS({opacity:1}).lightWhite,
      selectedDotColor: COLORS({opacity:1}).primary,
      todayTextColor: COLORS({opacity:1}).lightWhite,
      todayBackgroundColor: COLORS({opacity:0.8}).primary,
      arrowColor: COLORS({opacity:1}).primary,
      monthTextColor: COLORS({opacity:1}).primary,
      textSectionTitleColor: COLORS({opacity:0.8}).primary,
  },
  });