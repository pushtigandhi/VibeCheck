import React, { useState } from "react";
import { EventType } from "expo-linking";
import { SpiralCalendar } from "./SpiralCalendar";
import { Typography } from "./Typography";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { COLORS, SIZES } from "../constants";
import { Spacer } from "../utils";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';


export const Sidebar = () => {
  const [selected, setSelected] = useState('');

    return (
        <View style={styles.sidebar}>
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                }}
                firstDay={1}
                theme={styles.calendar}
            />
            <Spacer size={20} />
            <View style={styles.frame5}>
                {/* <View style={styles.frame6}>
                  <SpiralCalendar className="spiral-calendar-instance" />
                  <Typography
                    bold={false}
                    className="design-component-instance-node-2"
                    divClassName="design-component-instance-node-3"
                    text="Today"
                    type="h-5"
                  />
                </View> */}
                    {/* <EventTypes
                    className="event-types-instance"
                    colour="green"
                    description={false}
                    orientation="horizontal"
                    pastel
                    size="small"
                    typeButtonBoldWrapperDivClassName="frame-7"
                    typeButtonBoldWrapperText="Daily Standup"
                    typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node-2"
                    /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebar: {
        // alignItems: 'flex-start',
        backgroundColor: COLORS({opacity:1}).lightWhite,
        // borderColor: 'var(--stroke)',
        // borderRightWidth: 1,
        // borderRightStyle: 'solid',
        // display: 'flex',
        // flexDirection: 'column',
        // height: 1024,
        // position: 'relative',
        width: '70%',
        height: '100%'
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
    frame6: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        position: 'relative',
    },
    spiralCalendarInstance: {
        backgroundImage: 'url(https://c.animaapp.com/tYPXz0Sm/img/spiral-calendar-4@2x.png)',
        height: 18,
        position: 'relative',
        width: 18,
    },
    eventTypesInstance: {
        alignSelf: 'stretch',
        borderRadius: 6,
        height: 19,
        width: '100%',
    },
    frame7: {
        color: '#229fd0',
        fontSize: 10,
    },
    frame8: {
        backgroundColor: '#f5f5f5',
        height: 8,
        position: 'relative',
        width: 63,
    },
    airplane: {
        height: 18,
        position: 'relative',
        width: 18,
    },
    img: {
        height: 18,
        left: 174,
        position: 'absolute',
        top: -397,
        width: 18,
    },
});