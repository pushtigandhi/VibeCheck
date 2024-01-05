import React, { useState } from "react";
import { EventTypes } from "../../components/EventType";
//import { SmallCalendar } from "./SmallCalendar";
import { SpiralCalendar } from "../../components/SpiralCalendar";
import { Typography } from "../../components/Typography";
import {Calendar, LocaleConfig} from 'react-native-calendars';
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
            />
            <View style={styles.frame5}>
                <View style={styles.frame6}>
                <SpiralCalendar className="spiral-calendar-instance" />
                <Typography
            bold={false}
            className="design-component-instance-node-2"
            divClassName="design-component-instance-node-3"
            text="Today"
            type="h-5"
          />
                </View>
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
      // backgroundColor: '#ffffff',
      // borderColor: 'var(--stroke)',
      // borderRightWidth: 1,
      // borderRightStyle: 'solid',
      // display: 'flex',
      // flexDirection: 'column',
      // height: 1024,
      // position: 'relative',
      // width: 250,
    },
    frame5: {
      // alignItems: 'flex-start',
      // alignSelf: 'stretch',
      // display: 'flex',
      // flex: 0,
      // flexDirection: 'column',
      // gap: 10,
      // padding: '10px 16px',
      // position: 'relative',
      // width: '100%',
    },
    designComponentInstanceNode2: {
      flex: 0,
    },
    designComponentInstanceNode3: {
      color: '#229fd0',
    },
    smallCalendarInstance: {
      alignSelf: 'stretch',
      flex: 0,
      width: '100%',
    },
    smallCalendar2: {
      borderBottomWidth: 0.25,
      borderBottomStyle: 'solid',
      borderColor: '#66bbdc',
    },
    smallCalendar3: {
      flex: 0,
      marginLeft: -1.33,
    },
    smallCalendar4: {
      backgroundColor: '#66bbdc',
    },
    smallCalendar5: {
      color: '#ffffff',
    },
    smallCalendar6: {
      flex: 0,
      marginLeft: -0.5,
      marginRight: -0.5,
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