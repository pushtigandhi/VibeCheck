import PropTypes from "prop-types";
import React from "react";
//import { CalendarDaySmall } from "./CalendarDaySmall";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';

export const SmallCalendar = ({
  className,
  frameClassName,
  calendarDaySmallTypeButtonBoldWrapperDivClassName,
  calendarDaySmallDateTrueDayFalseClassName,
  calendarDaySmallTypeButtonBoldWrapperDivClassNameOverride,
  calendarDaySmallDateTrueDayFalseClassNameOverride,
  calendarDaySmallTypeButtonBoldWrapperDivClassName1,
  calendarDaySmallDateFalseDayTrueClassName,
  calendarDaySmallTypeButtonBoldWrapperDivClassName2,
  calendarDaySmallDateFalseDayTrueClassNameOverride,
  calendarDaySmallTypeButtonBoldWrapperDivClassName3,
  calendarDaySmallFrameWrapperClassName,
  calendarDaySmallTypeButtonBoldWrapperDivClassName4,
  calendarDaySmallFrameWrapperClassNameOverride,
  calendarDaySmallTypeButtonBoldWrapperDivClassName5,
  calendarDaySmallTypeButtonBoldWrapperDivClassName6,
  calendarDaySmallFrameClassName,
  calendarDaySmallSelected = false,
  calendarDaySmallTypeButtonBoldWrapperDivClassName7,
  calendarDaySmallTypeButtonBoldWrapperTypeButtonBoldClassName,
  calendarDaySmallTypeButtonBoldWrapperDivClassName8,
  calendarDaySmallTypeButtonBoldWrapperDivClassName9,
  calendarDaySmallTypeButtonBoldWrapperDivClassName10,
  calendarDaySmallTypeButtonBoldWrapperDivClassName11,
  calendarDaySmallTypeButtonBoldWrapperDivClassName12,
  calendarDaySmallTypeButtonBoldWrapperDivClassName13,
  calendarDaySmallTypeButtonBoldWrapperDivClassName14,
  calendarDaySmallTypeButtonBoldWrapperDivClassName15,
  calendarDaySmallTypeButtonBoldWrapperDivClassName16,
  calendarDaySmallTypeButtonBoldWrapperDivClassName17,
  calendarDaySmallTypeButtonBoldWrapperDivClassName18,
  calendarDaySmallTypeButtonBoldWrapperDivClassName19,
  calendarDaySmallTypeButtonBoldWrapperDivClassName20,
  calendarDaySmallTypeButtonBoldWrapperDivClassName21,
  calendarDaySmallTypeButtonBoldWrapperDivClassName22,
  calendarDaySmallTypeButtonBoldWrapperDivClassName23,
  calendarDaySmallTypeButtonBoldWrapperDivClassName24,
  calendarDaySmallTypeButtonBoldWrapperDivClassName25,
  calendarDaySmallTypeButtonBoldWrapperDivClassName26,
  calendarDaySmallTypeButtonBoldWrapperDivClassName27,
  calendarDaySmallTypeButtonBoldWrapperDivClassName28,
  calendarDaySmallTypeButtonBoldWrapperDivClassName29,
  calendarDaySmallTypeButtonBoldWrapperDivClassName30,
  calendarDaySmallTypeButtonBoldWrapperDivClassName31,
  calendarDaySmallTypeButtonBoldWrapperDivClassName32,
  calendarDaySmallTypeButtonBoldWrapperDivClassName33,
  calendarDaySmallTypeButtonBoldWrapperDivClassName34,
  calendarDaySmallTypeButtonBoldWrapperDivClassName35,
  calendarDaySmallTypeButtonBoldWrapperDivClassName36,
  calendarDaySmallTypeButtonBoldWrapperDivClassName37,
  calendarDaySmallTypeButtonBoldWrapperDivClassName38,
  calendarDaySmallTypeButtonBoldWrapperDivClassName39,
  calendarDaySmallTypeButtonBoldWrapperDivClassName40,
}) => {
  return (
    <View
        style={[
            styles.smallCalendar,
            //styles.className
        ]} 
        //className={`small-calendar ${className}`}
    >
      <View style={styles.frame2}>
        <View 
            style={[
                styles.frame3,
                styles.row
                //styles.frameClassName
            ]}
        >
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date={false}
            day
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName}
            typeButtonBoldWrapperText="m"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            className={calendarDaySmallDateTrueDayFalseClassName}
            date={false}
            day
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassNameOverride}
            typeButtonBoldWrapperText="t"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            className={calendarDaySmallDateTrueDayFalseClassNameOverride}
            date={false}
            day
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName1}
            typeButtonBoldWrapperText="w"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            className={calendarDaySmallDateFalseDayTrueClassName}
            date={false}
            day
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName2}
            typeButtonBoldWrapperText="t"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            className={calendarDaySmallDateFalseDayTrueClassNameOverride}
            date={false}
            day
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName3}
            typeButtonBoldWrapperText="f"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            className={calendarDaySmallFrameWrapperClassName}
            date={false}
            day
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName4}
            typeButtonBoldWrapperText="s"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            className={calendarDaySmallFrameWrapperClassNameOverride}
            date={false}
            day
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName5}
            typeButtonBoldWrapperText="s"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
        </View>
        <View className="frame-4">
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName6}
            typeButtonBoldWrapperText="01"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            frameClassName={calendarDaySmallFrameClassName}
            hover={false}
            selected={calendarDaySmallSelected}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName7}
            typeButtonBoldWrapperText="02"
            //typeButtonBoldWrapperTypeButtonBoldClassName={calendarDaySmallTypeButtonBoldWrapperTypeButtonBoldClassName}
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName8}
            typeButtonBoldWrapperText="03"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName9}
            typeButtonBoldWrapperText="04"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName10}
            typeButtonBoldWrapperText="05"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName11}
            typeButtonBoldWrapperText="06"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName12}
            typeButtonBoldWrapperText="07"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
        </View>
        <View className="frame-4">
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName13}
            typeButtonBoldWrapperText="08"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName14}
            typeButtonBoldWrapperText="09"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName15}
            typeButtonBoldWrapperText="10"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName16}
            typeButtonBoldWrapperText="11"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName17}
            typeButtonBoldWrapperText="12"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName18}
            typeButtonBoldWrapperText="13"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName19}
            typeButtonBoldWrapperText="14"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
        </View>
        <View className="frame-4">
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName20}
            typeButtonBoldWrapperText="15"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName21}
            typeButtonBoldWrapperText="16"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName22}
            typeButtonBoldWrapperText="17"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName23}
            typeButtonBoldWrapperText="18"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName24}
            typeButtonBoldWrapperText="19"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName25}
            typeButtonBoldWrapperText="20"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName26}
            typeButtonBoldWrapperText="21"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
        </View>
        <View className="frame-4">
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName27}
            typeButtonBoldWrapperText="22"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName28}
            typeButtonBoldWrapperText="23"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName29}
            typeButtonBoldWrapperText="24"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName30}
            typeButtonBoldWrapperText="25"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName31}
            typeButtonBoldWrapperText="26"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName32}
            typeButtonBoldWrapperText="27"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName33}
            typeButtonBoldWrapperText="28"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
        </View>
        <View className="frame-4">
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName34}
            typeButtonBoldWrapperText="29"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName35}
            typeButtonBoldWrapperText="30"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            style={styles.calendarDaySmallInstance}
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName36}
            typeButtonBoldWrapperText="31"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            className="calendar-day-small-2"
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName37}
            typeButtonBoldWrapperText="01"
            //typeButtonBoldWrapperTypeButtonBoldClassName="calendar-day-small-instance"
          />
          <CalendarDaySmall
            className="calendar-day-small-2"
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName38}
            typeButtonBoldWrapperText="02"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            className="calendar-day-small-2"
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName39}
            typeButtonBoldWrapperText="03"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
          <CalendarDaySmall
            className="calendar-day-small-2"
            date
            day={false}
            hover={false}
            selected={false}
            //typeButtonBoldWrapperDivClassName={calendarDaySmallTypeButtonBoldWrapperDivClassName40}
            typeButtonBoldWrapperText="04"
            //typeButtonBoldWrapperTypeButtonBoldClassName="design-component-instance-node"
          />
        </View>
      </View>
    </View>
  );
};

SmallCalendar.propTypes = {
  calendarDaySmallSelected: PropTypes.bool,
};

const styles = StyleSheet.create({
    smallCalendar: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 10,
      position: 'relative',
      width: 258,
    },
    frame2: {
      alignItems: 'flex-start',
      alignSelf: 'stretch',
      display: 'flex',
      flex: 0,
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
    },
    frame3: {
      alignItems: 'flex-start',
      alignSelf: 'stretch',
      display: 'flex',
      flex: 0,
      justifyContent: 'space-between',
      opacity: 0.7,
      position: 'relative',
      width: '100%',
    },
    calendarDaySmallInstance: {
      flex: 0,
    },
    frame4: {
      alignItems: 'flex-start',
      alignSelf: 'stretch',
      display: 'flex',
      flex: 0,
      justifyContent: 'space-between',
      position: 'relative',
      width: '100%',
    },
    designComponentInstanceNode: {
      flex: 0,
      marginRight: -1,
    },
    calendarDaySmall2: {
      flex: 0,
      opacity: 0.3,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        //alignItems: "baseline",
    },
  });