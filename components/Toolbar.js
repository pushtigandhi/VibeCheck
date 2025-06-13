import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, TextInput, RefreshControl } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { COLORS, textSIZES, viewSIZES, SHADOWS } from "../constants";
import DateTimePicker from '@react-native-community/datetimepicker';

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
  isHome = false, 
  navigation
}) => {

  const [selected, setSelected] = useState('');
  const [formattedDate, setFormattedDate] = useState(null);
  const [showDatePicker, toggleShowDatePicker] = useState(false);
  const [expandSearchBar, setSearchBar] = useState(false);

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

  const isCurrentPeriod = () => {
    const today = new Date();
    const selected = new Date(date);
    
    if (state === 'day') {
      return selected.getDate() === today.getDate() && 
             selected.getMonth() === today.getMonth() && 
             selected.getFullYear() === today.getFullYear();
    }
    if (state === 'week') {
      const selectedDayOfWeek = selected.getDay();
      const selectedStartOfWeek = new Date(selected);
      selectedStartOfWeek.setDate(selected.getDate() - selectedDayOfWeek);
      
      const todayDayOfWeek = today.getDay();
      const todayStartOfWeek = new Date(today);
      todayStartOfWeek.setDate(today.getDate() - todayDayOfWeek);
      
      return selectedStartOfWeek.getTime() === todayStartOfWeek.getTime();
    }
    if (state === 'month') {
      return selected.getMonth() === today.getMonth() && 
             selected.getFullYear() === today.getFullYear();
    }
    return false;
  };

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
          <View style={[styles.row, {
            borderWidth: 1,
            borderColor: COLORS({opacity:1}).primary,
            borderRadius: textSIZES.xxSmall,
          }]}>
            <Text style={[styles.span, {
              fontWeight:'500', 
              color: isCurrentPeriod() ? COLORS({opacity:1}).white : COLORS({opacity:1}).primary,
              backgroundColor: isCurrentPeriod() ? COLORS({opacity:1}).primary : 'transparent',
              borderRadius: textSIZES.xxSmall, padding: textSIZES.tiny
            }]}>
                {String(formattedDate)}
            </Text>
            <Text style={[styles.span, {
              color: isCurrentPeriod() ? COLORS({opacity:1}).white : COLORS({opacity:1}).primary,
              backgroundColor: isCurrentPeriod() ? COLORS({opacity:1}).primary : 'transparent',
              borderRadius: textSIZES.xxSmall, padding: textSIZES.tiny
            }]}> {String(date.getFullYear())}</Text>
          </View>
        )}
        <TouchableOpacity onPress={toggleDatePicker}>
          <Ionicons name={"calendar-outline"} size={20} style={styles.icon} />
        </TouchableOpacity>
      </View>
      
      {isHome && (
        <View style={[styles.row, styles.rightContent]}>
          <TouchableOpacity
              style={[styles.row, styles.searchButtonIcon]}
              onPress={() => {
              setSearchBar(!expandSearchBar);
              }}
          >
              <Ionicons name={"search-outline"} size={20} style={styles.iconInverted} />
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => {
              setFilterVisible(true);
              }}
              style={styles.filterButtonIcon}
          >
              <Ionicons name={"options-outline"} size={20} style={styles.iconInverted}/>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => {setScheduleVisible(true);}}
              style={[styles.row, styles.addButtonIcon]}
          >
              <Ionicons name={"add-circle"} size={20} style={styles.iconInverted}/>
          </TouchableOpacity>
        </View>
      )}
      
    </View>
    {expandSearchBar && (
      <TextInput style={styles.searchInput} 
          placeholder="search"
          onSubmitEditing={(newSearch) => (setSearchBar(false), doSearch(newSearch))}
          returnKeyType='search'
      /> 
    )} 

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
  span: {
    //fontWeight: '500',
    fontSize: 16,
    color: COLORS({opacity:1}).primary,
  },
  rightContent: {
    alignItems: 'center',
    display: 'flex',
    flex: 0,
    gap: 16,
  },
  addButtonIcon: {
    height: textSIZES.xxLarge,
    width: textSIZES.xxLarge,
    borderRadius: textSIZES.xxSmall,
    backgroundColor: COLORS({opacity:1}).primary,
    marginRight: textSIZES.xxSmall,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonIcon: {
    height: textSIZES.xxLarge,
    width: textSIZES.xxLarge,
    borderRadius: textSIZES.xxSmall,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonIcon: {
    height: textSIZES.xxLarge,
    width: textSIZES.xxLarge,
    borderRadius: textSIZES.xxSmall,
    backgroundColor: COLORS({opacity:0.5}).secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: textSIZES.small, 
    color: COLORS({opacity:1}).primary,
    borderWidth: 1, 
    borderRadius: textSIZES.xxSmall,
    padding: textSIZES.xxSmall,
    marginTop: textSIZES.xxSmall,
    borderColor: COLORS({opacity:0.5}).primary,
  },
  icon: {
    color: COLORS({opacity:1}).primary,
    margin: textSIZES.xxSmall,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
    margin: textSIZES.xxSmall,
  },
  calendar: {
    textDayFontSize: textSIZES.small,
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