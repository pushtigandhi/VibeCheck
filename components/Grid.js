import PropTypes from "prop-types";
import React from "react";
import { Column } from "../Column";
import { LabelLeftGroup } from "../LabelLeftGroup";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';

export const Grid = ({
  fit,
  type,
  mobile,
  className,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName,
  labelLeftGroupLabelTypeSideTrueTopFalseClassNameOverride,
  labelLeftGroupLabelTypeTypographyDivClassName,
  labelLeftGroupLabelTypeSideTrueTopTrueClassName,
  labelLeftGroupLabelTypeSideTrueTopTrueClassNameOverride,
  labelLeftGroupLabelTypeTypographyDivClassNameOverride,
  labelLeftGroupLabelTypeTypographyDivClassName1,
  labelLeftGroupLabelTypeTypographyDivClassName2,
  labelLeftGroupLabelTypeTypographyDivClassName3,
  labelLeftGroupLabelTypeSideFalseTopTrueClassName,
  labelLeftGroupLabelTypeTypographyDivClassName4,
  labelLeftGroupLabelTypeTypographyDivClassName5,
  labelLeftGroupLabelTypeSideFalseTopTrueClassNameOverride,
  labelLeftGroupLabelTypeTypographyWrapperClassName,
  labelLeftGroupLabelTypeTypographyDivClassName6,
  labelLeftGroupLabelTypeTypographyWrapperClassNameOverride,
  labelLeftGroupLabelTypeTypographyDivClassName7,
  labelLeftGroupLabelTypeTypographyDivClassName8,
  labelLeftGroupLabelTypeDivClassName,
  labelLeftGroupLabelTypeDivClassNameOverride,
  labelLeftGroupLabelTypeTypographyDivClassName9,
  labelLeftGroupLabelTypeTypographyDivClassName10,
  labelLeftGroupPropertyDefaultClassName,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName1,
  labelLeftGroupLabelTypeTypographyDivClassName11,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName2,
  labelLeftGroupLabelTypeTypographyDivClassName12,
  labelLeftGroupLabelTypeTypographyDivClassName13,
  labelLeftGroupLabelTypeTypographyDivClassName14,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName3,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName4,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName5,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName6,
  labelLeftGroupLabelTypeTypographyDivClassName15,
  labelLeftGroupLabelTypeTypographyDivClassName16,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName7,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName8,
  labelLeftGroupLabelTypeTypographyDivClassName17,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName9,
  labelLeftGroupLabelTypeTypographyDivClassName18,
  labelLeftGroupLabelTypeTypographyDivClassName19,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName10,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName11,
  labelLeftGroupLabelTypeTypographyDivClassName20,
  labelLeftGroupLabelTypeTypographyDivClassName21,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName12,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName13,
  labelLeftGroupLabelTypeSideTrueTopFalseClassName14,
  labelLeftGroupLabelTypeTypographyDivClassName22,
  columnSlotTypeFullWeekendClassName,
  columnSlotTypeFullWeekendClassNameOverride,
  columnSlotTypeTopFullClassName,
  columnSlotTypeTopFullClassNameOverride,
  columnSlotTypeBottomFullClassName,
  columnSlotTypeBottomFullClassNameOverride,
  columnSlotTypeMiddleWeekendClassName,
  columnSlotTypeMiddleWeekendClassNameOverride,
  columnSlotTypeBottomPartialClassName,
  columnSlotTypeBottomPartialClassNameOverride,
  columnSlotTypeTopPartialClassName,
  columnSlotTypeTopPartialClassNameOverride,
  columnSlotTypeBlankWeekendClassName,
  columnSlotTypeBlankWeekendClassNameOverride,
  columnSlotTypeYearWeekendClassName,
  columnSlotTypeYearWeekendClassNameOverride,
  columnSlotEventWrapperClassName,
  columnSlotEventWrapperClassNameOverride,
  columnSlotEventContainerWrapperClassName,
  columnSlotEventContainerWrapperClassNameOverride,
  columnSlotCalendarDaySmallWrapperClassName,
  columnSlotCalendarDaySmallWrapperClassNameOverride,
  columnSlotDivClassName,
  columnSlotDivClassNameOverride,
}) => {
  return (
    <View
        style={[
            styles.grid,
            styles.type,
            styles.fit,
            mobile ? mobileTrueWeek: mobileFalseWeek,
        ]} 
    >

      {type === "month" && (
        <>
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotCalendarDaySmallWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotDivClassName={`${fit === "strech" && "column-4"}`}
            slotDivClassNameOverride={`${fit === "strech" && "class-4"}`}
            slotEventContainerWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventContainerWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotMonthView
            slotMonthView1
            slotMonthView10={fit === "strech" ? true : undefined}
            slotMonthView11={fit === "strech" ? true : undefined}
            slotMonthView12={fit === "strech" ? true : undefined}
            slotMonthView13={fit === "strech" ? true : undefined}
            slotMonthView14={fit === "strech" ? true : undefined}
            slotMonthView15={fit === "strech" ? true : undefined}
            slotMonthView16={fit === "strech" ? true : undefined}
            slotMonthView17={fit === "strech" ? true : undefined}
            slotMonthView18={fit === "strech" ? true : undefined}
            slotMonthView19={fit === "strech" ? true : undefined}
            slotMonthView2
            slotMonthView20={fit === "strech" ? true : undefined}
            slotMonthView21={fit === "strech" ? true : undefined}
            slotMonthView22={fit === "strech" ? true : undefined}
            slotMonthView23={fit === "strech" ? true : undefined}
            slotMonthView3
            slotMonthView4
            slotMonthView5={fit === "strech" ? true : undefined}
            slotMonthView6={fit === "strech" ? true : undefined}
            slotMonthView7={fit === "strech" ? true : undefined}
            slotMonthView8={fit === "strech" ? true : undefined}
            slotMonthView9={fit === "strech" ? true : undefined}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5={fit === "strech" ? "blank" : undefined}
            slotTypeBlankWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBlankWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomFullClassName={`${fit === "strech" ? "column-4" : "class-4"}`}
            slotTypeBottomFullClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeFullWeekendClassName="column-6"
            slotTypeFullWeekendClassNameOverride="column-4"
            slotTypeMiddleWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeMiddleWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeTopFullClassName="column-4"
            slotTypeTopFullClassNameOverride="column-4"
            slotTypeTopPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeTopPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotWeekend={fit === "strech" ? false : undefined}
            slotWeekend1={fit === "strech" ? false : undefined}
            slotWeekend2={fit === "strech" ? false : undefined}
            slotWeekend3={fit === "strech" ? false : undefined}
            slotWeekend4={fit === "strech" ? false : undefined}
            today="default"
            type="generic"
            visible10={fit === "cropped" ? false : undefined}
            visible11={fit === "cropped" ? false : undefined}
            visible12={fit === "cropped" ? false : undefined}
            visible13={fit === "cropped" ? false : undefined}
            visible14={fit === "cropped" ? false : undefined}
            visible15={fit === "cropped" ? false : undefined}
            visible16={fit === "cropped" ? false : undefined}
            visible17={fit === "cropped" ? false : undefined}
            visible18={fit === "cropped" ? false : undefined}
            visible19={fit === "cropped" ? false : undefined}
            visible2={fit === "cropped" ? false : undefined}
            visible20={fit === "cropped" ? false : undefined}
            visible3={fit === "cropped" ? false : undefined}
            visible4={fit === "cropped" ? false : undefined}
            visible5={fit === "cropped" ? false : undefined}
            visible6={fit === "cropped" ? false : undefined}
            visible7={fit === "cropped" ? false : undefined}
            visible8={fit === "cropped" ? false : undefined}
            visible9={fit === "cropped" ? false : undefined}
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotCalendarDaySmallWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotDivClassName={`${fit === "strech" && "column-4"}`}
            slotDivClassNameOverride={`${fit === "strech" && "class-4"}`}
            slotEventContainerWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventContainerWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotMonthView
            slotMonthView1
            slotMonthView10={fit === "strech" ? true : undefined}
            slotMonthView11={fit === "strech" ? true : undefined}
            slotMonthView12={fit === "strech" ? true : undefined}
            slotMonthView13={fit === "strech" ? true : undefined}
            slotMonthView14={fit === "strech" ? true : undefined}
            slotMonthView15={fit === "strech" ? true : undefined}
            slotMonthView16={fit === "strech" ? true : undefined}
            slotMonthView17={fit === "strech" ? true : undefined}
            slotMonthView18={fit === "strech" ? true : undefined}
            slotMonthView19={fit === "strech" ? true : undefined}
            slotMonthView2
            slotMonthView20={fit === "strech" ? true : undefined}
            slotMonthView21={fit === "strech" ? true : undefined}
            slotMonthView22={fit === "strech" ? true : undefined}
            slotMonthView23={fit === "strech" ? true : undefined}
            slotMonthView3
            slotMonthView4
            slotMonthView5={fit === "strech" ? true : undefined}
            slotMonthView6={fit === "strech" ? true : undefined}
            slotMonthView7={fit === "strech" ? true : undefined}
            slotMonthView8={fit === "strech" ? true : undefined}
            slotMonthView9={fit === "strech" ? true : undefined}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5={fit === "strech" ? "blank" : undefined}
            slotTypeBlankWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBlankWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomFullClassName={`${fit === "strech" ? "column-4" : "class-4"}`}
            slotTypeBottomFullClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeFullWeekendClassName="column-6"
            slotTypeFullWeekendClassNameOverride="column-4"
            slotTypeMiddleWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeMiddleWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeTopFullClassName="column-4"
            slotTypeTopFullClassNameOverride="column-4"
            slotTypeTopPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeTopPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotWeekend={fit === "strech" ? false : undefined}
            slotWeekend1={fit === "strech" ? false : undefined}
            slotWeekend2={fit === "strech" ? false : undefined}
            slotWeekend3={fit === "strech" ? false : undefined}
            slotWeekend4={fit === "strech" ? false : undefined}
            today="default"
            type="generic"
            visible10={fit === "cropped" ? false : undefined}
            visible11={fit === "cropped" ? false : undefined}
            visible12={fit === "cropped" ? false : undefined}
            visible13={fit === "cropped" ? false : undefined}
            visible14={fit === "cropped" ? false : undefined}
            visible15={fit === "cropped" ? false : undefined}
            visible16={fit === "cropped" ? false : undefined}
            visible17={fit === "cropped" ? false : undefined}
            visible18={fit === "cropped" ? false : undefined}
            visible19={fit === "cropped" ? false : undefined}
            visible2={fit === "cropped" ? false : undefined}
            visible20={fit === "cropped" ? false : undefined}
            visible3={fit === "cropped" ? false : undefined}
            visible4={fit === "cropped" ? false : undefined}
            visible5={fit === "cropped" ? false : undefined}
            visible6={fit === "cropped" ? false : undefined}
            visible7={fit === "cropped" ? false : undefined}
            visible8={fit === "cropped" ? false : undefined}
            visible9={fit === "cropped" ? false : undefined}
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotCalendarDaySmallWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotDivClassName={`${fit === "strech" && "column-4"}`}
            slotDivClassNameOverride={`${fit === "strech" && "class-4"}`}
            slotEventContainerWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventContainerWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotMonthView
            slotMonthView1
            slotMonthView10={fit === "strech" ? true : undefined}
            slotMonthView11={fit === "strech" ? true : undefined}
            slotMonthView12={fit === "strech" ? true : undefined}
            slotMonthView13={fit === "strech" ? true : undefined}
            slotMonthView14={fit === "strech" ? true : undefined}
            slotMonthView15={fit === "strech" ? true : undefined}
            slotMonthView16={fit === "strech" ? true : undefined}
            slotMonthView17={fit === "strech" ? true : undefined}
            slotMonthView18={fit === "strech" ? true : undefined}
            slotMonthView19={fit === "strech" ? true : undefined}
            slotMonthView2
            slotMonthView20={fit === "strech" ? true : undefined}
            slotMonthView21={fit === "strech" ? true : undefined}
            slotMonthView22={fit === "strech" ? true : undefined}
            slotMonthView23={fit === "strech" ? true : undefined}
            slotMonthView3
            slotMonthView4
            slotMonthView5={fit === "strech" ? true : undefined}
            slotMonthView6={fit === "strech" ? true : undefined}
            slotMonthView7={fit === "strech" ? true : undefined}
            slotMonthView8={fit === "strech" ? true : undefined}
            slotMonthView9={fit === "strech" ? true : undefined}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5={fit === "strech" ? "blank" : undefined}
            slotTypeBlankWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBlankWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomFullClassName={`${fit === "strech" ? "column-4" : "class-4"}`}
            slotTypeBottomFullClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeFullWeekendClassName="column-6"
            slotTypeFullWeekendClassNameOverride="column-4"
            slotTypeMiddleWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeMiddleWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeTopFullClassName="column-4"
            slotTypeTopFullClassNameOverride="column-4"
            slotTypeTopPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeTopPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotWeekend={fit === "strech" ? false : undefined}
            slotWeekend1={fit === "strech" ? false : undefined}
            slotWeekend2={fit === "strech" ? false : undefined}
            slotWeekend3={fit === "strech" ? false : undefined}
            slotWeekend4={fit === "strech" ? false : undefined}
            today="default"
            type="generic"
            visible10={fit === "cropped" ? false : undefined}
            visible11={fit === "cropped" ? false : undefined}
            visible12={fit === "cropped" ? false : undefined}
            visible13={fit === "cropped" ? false : undefined}
            visible14={fit === "cropped" ? false : undefined}
            visible15={fit === "cropped" ? false : undefined}
            visible16={fit === "cropped" ? false : undefined}
            visible17={fit === "cropped" ? false : undefined}
            visible18={fit === "cropped" ? false : undefined}
            visible19={fit === "cropped" ? false : undefined}
            visible2={fit === "cropped" ? false : undefined}
            visible20={fit === "cropped" ? false : undefined}
            visible3={fit === "cropped" ? false : undefined}
            visible4={fit === "cropped" ? false : undefined}
            visible5={fit === "cropped" ? false : undefined}
            visible6={fit === "cropped" ? false : undefined}
            visible7={fit === "cropped" ? false : undefined}
            visible8={fit === "cropped" ? false : undefined}
            visible9={fit === "cropped" ? false : undefined}
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotCalendarDaySmallWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotDivClassName={`${fit === "strech" && "column-4"}`}
            slotDivClassNameOverride={`${fit === "strech" && "class-4"}`}
            slotEventContainerWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventContainerWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotMonthView
            slotMonthView1
            slotMonthView10={fit === "strech" ? true : undefined}
            slotMonthView11={fit === "strech" ? true : undefined}
            slotMonthView12={fit === "strech" ? true : undefined}
            slotMonthView13={fit === "strech" ? true : undefined}
            slotMonthView14={fit === "strech" ? true : undefined}
            slotMonthView15={fit === "strech" ? true : undefined}
            slotMonthView16={fit === "strech" ? true : undefined}
            slotMonthView17={fit === "strech" ? true : undefined}
            slotMonthView18={fit === "strech" ? true : undefined}
            slotMonthView19={fit === "strech" ? true : undefined}
            slotMonthView2
            slotMonthView20={fit === "strech" ? true : undefined}
            slotMonthView21={fit === "strech" ? true : undefined}
            slotMonthView22={fit === "strech" ? true : undefined}
            slotMonthView23={fit === "strech" ? true : undefined}
            slotMonthView3
            slotMonthView4
            slotMonthView5={fit === "strech" ? true : undefined}
            slotMonthView6={fit === "strech" ? true : undefined}
            slotMonthView7={fit === "strech" ? true : undefined}
            slotMonthView8={fit === "strech" ? true : undefined}
            slotMonthView9={fit === "strech" ? true : undefined}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5={fit === "strech" ? "blank" : undefined}
            slotTypeBlankWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBlankWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomFullClassName={`${fit === "strech" ? "column-4" : "class-4"}`}
            slotTypeBottomFullClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeFullWeekendClassName="column-6"
            slotTypeFullWeekendClassNameOverride="column-4"
            slotTypeMiddleWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeMiddleWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeTopFullClassName="column-4"
            slotTypeTopFullClassNameOverride="column-4"
            slotTypeTopPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeTopPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotWeekend={fit === "strech" ? false : undefined}
            slotWeekend1={fit === "strech" ? false : undefined}
            slotWeekend2={fit === "strech" ? false : undefined}
            slotWeekend3={fit === "strech" ? false : undefined}
            slotWeekend4={fit === "strech" ? false : undefined}
            today="default"
            type="generic"
            visible10={fit === "cropped" ? false : undefined}
            visible11={fit === "cropped" ? false : undefined}
            visible12={fit === "cropped" ? false : undefined}
            visible13={fit === "cropped" ? false : undefined}
            visible14={fit === "cropped" ? false : undefined}
            visible15={fit === "cropped" ? false : undefined}
            visible16={fit === "cropped" ? false : undefined}
            visible17={fit === "cropped" ? false : undefined}
            visible18={fit === "cropped" ? false : undefined}
            visible19={fit === "cropped" ? false : undefined}
            visible2={fit === "cropped" ? false : undefined}
            visible20={fit === "cropped" ? false : undefined}
            visible3={fit === "cropped" ? false : undefined}
            visible4={fit === "cropped" ? false : undefined}
            visible5={fit === "cropped" ? false : undefined}
            visible6={fit === "cropped" ? false : undefined}
            visible7={fit === "cropped" ? false : undefined}
            visible8={fit === "cropped" ? false : undefined}
            visible9={fit === "cropped" ? false : undefined}
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotCalendarDaySmallWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotDivClassName={`${fit === "strech" && "column-4"}`}
            slotDivClassNameOverride={`${fit === "strech" && "class-4"}`}
            slotEventContainerWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventContainerWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotMonthView
            slotMonthView1
            slotMonthView10={fit === "strech" ? true : undefined}
            slotMonthView11={fit === "strech" ? true : undefined}
            slotMonthView12={fit === "strech" ? true : undefined}
            slotMonthView13={fit === "strech" ? true : undefined}
            slotMonthView14={fit === "strech" ? true : undefined}
            slotMonthView15={fit === "strech" ? true : undefined}
            slotMonthView16={fit === "strech" ? true : undefined}
            slotMonthView17={fit === "strech" ? true : undefined}
            slotMonthView18={fit === "strech" ? true : undefined}
            slotMonthView19={fit === "strech" ? true : undefined}
            slotMonthView2
            slotMonthView20={fit === "strech" ? true : undefined}
            slotMonthView21={fit === "strech" ? true : undefined}
            slotMonthView22={fit === "strech" ? true : undefined}
            slotMonthView23={fit === "strech" ? true : undefined}
            slotMonthView3
            slotMonthView4
            slotMonthView5={fit === "strech" ? true : undefined}
            slotMonthView6={fit === "strech" ? true : undefined}
            slotMonthView7={fit === "strech" ? true : undefined}
            slotMonthView8={fit === "strech" ? true : undefined}
            slotMonthView9={fit === "strech" ? true : undefined}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5={fit === "strech" ? "blank" : undefined}
            slotTypeBlankWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBlankWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomFullClassName={`${fit === "strech" ? "column-4" : "class-4"}`}
            slotTypeBottomFullClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeFullWeekendClassName="column-6"
            slotTypeFullWeekendClassNameOverride="column-4"
            slotTypeMiddleWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeMiddleWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeTopFullClassName="column-4"
            slotTypeTopFullClassNameOverride="column-4"
            slotTypeTopPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeTopPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotWeekend={fit === "strech" ? false : undefined}
            slotWeekend1={fit === "strech" ? false : undefined}
            slotWeekend2={fit === "strech" ? false : undefined}
            slotWeekend3={fit === "strech" ? false : undefined}
            slotWeekend4={fit === "strech" ? false : undefined}
            today="default"
            type="generic"
            visible10={fit === "cropped" ? false : undefined}
            visible11={fit === "cropped" ? false : undefined}
            visible12={fit === "cropped" ? false : undefined}
            visible13={fit === "cropped" ? false : undefined}
            visible14={fit === "cropped" ? false : undefined}
            visible15={fit === "cropped" ? false : undefined}
            visible16={fit === "cropped" ? false : undefined}
            visible17={fit === "cropped" ? false : undefined}
            visible18={fit === "cropped" ? false : undefined}
            visible19={fit === "cropped" ? false : undefined}
            visible2={fit === "cropped" ? false : undefined}
            visible20={fit === "cropped" ? false : undefined}
            visible3={fit === "cropped" ? false : undefined}
            visible4={fit === "cropped" ? false : undefined}
            visible5={fit === "cropped" ? false : undefined}
            visible6={fit === "cropped" ? false : undefined}
            visible7={fit === "cropped" ? false : undefined}
            visible8={fit === "cropped" ? false : undefined}
            visible9={fit === "cropped" ? false : undefined}
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotCalendarDaySmallWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotDivClassName={`${fit === "strech" && "column-4"}`}
            slotDivClassNameOverride={`${fit === "strech" && "class-4"}`}
            slotEventContainerWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventContainerWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotMonthView
            slotMonthView1
            slotMonthView10={fit === "strech" ? true : undefined}
            slotMonthView11={fit === "strech" ? true : undefined}
            slotMonthView12={fit === "strech" ? true : undefined}
            slotMonthView13={fit === "strech" ? true : undefined}
            slotMonthView14={fit === "strech" ? true : undefined}
            slotMonthView15={fit === "strech" ? true : undefined}
            slotMonthView16={fit === "strech" ? true : undefined}
            slotMonthView17={fit === "strech" ? true : undefined}
            slotMonthView18={fit === "strech" ? true : undefined}
            slotMonthView19={fit === "strech" ? true : undefined}
            slotMonthView2
            slotMonthView20={fit === "strech" ? true : undefined}
            slotMonthView21={fit === "strech" ? true : undefined}
            slotMonthView22={fit === "strech" ? true : undefined}
            slotMonthView23={fit === "strech" ? true : undefined}
            slotMonthView3
            slotMonthView4
            slotMonthView5={fit === "strech" ? true : undefined}
            slotMonthView6={fit === "strech" ? true : undefined}
            slotMonthView7={fit === "strech" ? true : undefined}
            slotMonthView8={fit === "strech" ? true : undefined}
            slotMonthView9={fit === "strech" ? true : undefined}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5={fit === "strech" ? "blank" : undefined}
            slotTypeBlankWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBlankWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomFullClassName={`${fit === "strech" ? "column-4" : "class-4"}`}
            slotTypeBottomFullClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeFullWeekendClassName="column-6"
            slotTypeFullWeekendClassNameOverride="column-4"
            slotTypeMiddleWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeMiddleWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeTopFullClassName="column-4"
            slotTypeTopFullClassNameOverride="column-4"
            slotTypeTopPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeTopPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotWeekend={fit === "strech" ? true : undefined}
            slotWeekend1={fit === "strech" ? true : undefined}
            slotWeekend2={fit === "strech" ? true : undefined}
            slotWeekend3={fit === "strech" ? true : undefined}
            slotWeekend4={fit === "strech" ? true : undefined}
            today="default"
            type="generic"
            visible10={fit === "cropped" ? false : undefined}
            visible11={fit === "cropped" ? false : undefined}
            visible12={fit === "cropped" ? false : undefined}
            visible13={fit === "cropped" ? false : undefined}
            visible14={fit === "cropped" ? false : undefined}
            visible15={fit === "cropped" ? false : undefined}
            visible16={fit === "cropped" ? false : undefined}
            visible17={fit === "cropped" ? false : undefined}
            visible18={fit === "cropped" ? false : undefined}
            visible19={fit === "cropped" ? false : undefined}
            visible2={fit === "cropped" ? false : undefined}
            visible20={fit === "cropped" ? false : undefined}
            visible3={fit === "cropped" ? false : undefined}
            visible4={fit === "cropped" ? false : undefined}
            visible5={fit === "cropped" ? false : undefined}
            visible6={fit === "cropped" ? false : undefined}
            visible7={fit === "cropped" ? false : undefined}
            visible8={fit === "cropped" ? false : undefined}
            visible9={fit === "cropped" ? false : undefined}
            weekend
          />
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotCalendarDaySmallWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotDivClassName={`${fit === "strech" && "column-4"}`}
            slotDivClassNameOverride={`${fit === "strech" && "class-4"}`}
            slotEventContainerWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventContainerWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassName={`${fit === "strech" && "column-4"}`}
            slotEventWrapperClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotMonthView
            slotMonthView1
            slotMonthView10={fit === "strech" ? true : undefined}
            slotMonthView11={fit === "strech" ? true : undefined}
            slotMonthView12={fit === "strech" ? true : undefined}
            slotMonthView13={fit === "strech" ? true : undefined}
            slotMonthView14={fit === "strech" ? true : undefined}
            slotMonthView15={fit === "strech" ? true : undefined}
            slotMonthView16={fit === "strech" ? true : undefined}
            slotMonthView17={fit === "strech" ? true : undefined}
            slotMonthView18={fit === "strech" ? true : undefined}
            slotMonthView19={fit === "strech" ? true : undefined}
            slotMonthView2
            slotMonthView20={fit === "strech" ? true : undefined}
            slotMonthView21={fit === "strech" ? true : undefined}
            slotMonthView22={fit === "strech" ? true : undefined}
            slotMonthView23={fit === "strech" ? true : undefined}
            slotMonthView3
            slotMonthView4
            slotMonthView5={fit === "strech" ? true : undefined}
            slotMonthView6={fit === "strech" ? true : undefined}
            slotMonthView7={fit === "strech" ? true : undefined}
            slotMonthView8={fit === "strech" ? true : undefined}
            slotMonthView9={fit === "strech" ? true : undefined}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5={fit === "strech" ? "blank" : undefined}
            slotTypeBlankWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBlankWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomFullClassName={`${fit === "strech" ? "column-4" : "class-4"}`}
            slotTypeBottomFullClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeBottomPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeFullWeekendClassName="column-6"
            slotTypeFullWeekendClassNameOverride="column-4"
            slotTypeMiddleWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeMiddleWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeTopFullClassName="column-4"
            slotTypeTopFullClassNameOverride="column-4"
            slotTypeTopPartialClassName={`${fit === "strech" && "column-4"}`}
            slotTypeTopPartialClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassName={`${fit === "strech" && "column-4"}`}
            slotTypeYearWeekendClassNameOverride={`${fit === "strech" && "column-4"}`}
            slotWeekend={fit === "strech" ? true : undefined}
            slotWeekend1={fit === "strech" ? true : undefined}
            slotWeekend2={fit === "strech" ? true : undefined}
            slotWeekend3={fit === "strech" ? true : undefined}
            slotWeekend4={fit === "strech" ? true : undefined}
            today="default"
            type="generic"
            visible10={fit === "cropped" ? false : undefined}
            visible11={fit === "cropped" ? false : undefined}
            visible12={fit === "cropped" ? false : undefined}
            visible13={fit === "cropped" ? false : undefined}
            visible14={fit === "cropped" ? false : undefined}
            visible15={fit === "cropped" ? false : undefined}
            visible16={fit === "cropped" ? false : undefined}
            visible17={fit === "cropped" ? false : undefined}
            visible18={fit === "cropped" ? false : undefined}
            visible19={fit === "cropped" ? false : undefined}
            visible2={fit === "cropped" ? false : undefined}
            visible20={fit === "cropped" ? false : undefined}
            visible3={fit === "cropped" ? false : undefined}
            visible4={fit === "cropped" ? false : undefined}
            visible5={fit === "cropped" ? false : undefined}
            visible6={fit === "cropped" ? false : undefined}
            visible7={fit === "cropped" ? false : undefined}
            visible8={fit === "cropped" ? false : undefined}
            visible9={fit === "cropped" ? false : undefined}
            weekend
          />
        </>
      )}

      {(type === "day" || (!mobile && type === "week")) && (
        <>
          <LabelLeftGroup
            className={
              type === "day"
                ? labelLeftGroupPropertyDefaultClassName
                : {
                    alignSelf: "stretch",
                    flex: "0 0 auto",
                    height: "unset",
                  }
            }
            labelTypeDivClassName={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName11
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeDivClassNameOverride={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName14
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideFalseTopTrueClassName={
              type === "day"
                ? labelLeftGroupLabelTypeDivClassName
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideFalseTopTrueClassNameOverride={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName8
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopTrueClassName
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName1={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassNameOverride
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName10={
              type === "day"
                ? labelLeftGroupLabelTypeSideFalseTopTrueClassNameOverride
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName11={
              type === "day"
                ? labelLeftGroupLabelTypeDivClassNameOverride
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName12={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName4
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName13={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName12
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName14={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName6
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName2={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyWrapperClassNameOverride
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName3={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName9
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName4={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName7
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName5={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName1
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName6={
              type === "day"
                ? labelLeftGroupLabelTypeSideFalseTopTrueClassName
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName7={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName2
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName8={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName5
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassName9={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyWrapperClassName
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopFalseClassNameOverride={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopTrueClassName={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopTrueClassNameOverride
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeSideTrueTopTrueClassNameOverride={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName3
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeTypographyDivClassName={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName14
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName1={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName2
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName10={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName15
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName11={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName22
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName12={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName5
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName13={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName3
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName14={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName6
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName15={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName1
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName16={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName4
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName17={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName9
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName18={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName17
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName19={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName12
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName2={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName18
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName20={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName11
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName21={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName20
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName22={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName19
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName3={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName16
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName4={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName10
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName5={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassNameOverride
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName6={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName7
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName7={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName13
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName8={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName8
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassName9={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyDivClassNameOverride={
              type === "day"
                ? labelLeftGroupLabelTypeTypographyDivClassName21
                : {
                    lineHeight: "5px",
                    whiteSpace: "nowrap",
                  }
            }
            labelTypeTypographyText={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText1={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText10={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText11={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText12={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText13={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText14={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText15={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText16={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText17={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText18={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText19={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText2={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText20={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText21={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText22={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText23={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText3={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText4={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText5={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText6={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText7={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText8={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyText9={type === "day" || (fit === "strech" && type === "week") ? "00:00" : undefined}
            labelTypeTypographyTypeBodyBoldFalseClassName={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeBodyBoldFalseClassNameOverride={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeBodyBoldTrueClassName={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeBodyBoldTrueClassNameOverride={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeBoldFalseClassName={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeBoldFalseClassNameOverride={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeBoldTrueClassName={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeBoldTrueClassNameOverride={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeButtonBoldClassName={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeButtonBoldClassName1={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeButtonBoldClassName2={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeButtonBoldClassName3={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeButtonBoldClassName4={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeButtonBoldClassNameOverride={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeCaptionBoldClassName={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeCaptionBoldClassNameOverride={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeHBoldFalseClassName={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeHBoldFalseClassNameOverride={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeHBoldTrueClassName={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeHBoldTrueClassNameOverride={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeSmallBoldClassName={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeSmallBoldClassNameOverride={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeSmallBoldTrueClassName={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyTypeSmallBoldTrueClassNameOverride={`${
              (type === "day" || (fit === "strech" && type === "week")) && "class-5"
            }`}
            labelTypeTypographyWrapperClassName={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName10
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            labelTypeTypographyWrapperClassNameOverride={
              type === "day"
                ? labelLeftGroupLabelTypeSideTrueTopFalseClassName13
                : {
                    flex: "1",
                    flexGrow: "1",
                    height: "unset",
                  }
            }
            property1="default"
          />
          <Column
            className={`${mobile ? "class-6" : "column-5"}`}
            slotCalendarDaySmallWrapperClassName={`${
              type === "week" ? "column-7" : columnSlotEventContainerWrapperClassName
            }`}
            slotCalendarDaySmallWrapperClassNameOverride={`${
              type === "week" ? "column-7" : columnSlotTypeFullWeekendClassNameOverride
            }`}
            slotDivClassName={`${type === "week" ? "column-7" : columnSlotTypeTopPartialClassName}`}
            slotDivClassNameOverride={`${type === "week" ? "column-8" : columnSlotTypeTopPartialClassNameOverride}`}
            slotEventContainerWrapperClassName={`${
              type === "week" ? "column-7" : columnSlotTypeBlankWeekendClassNameOverride
            }`}
            slotEventContainerWrapperClassNameOverride={`${
              type === "week" ? "column-7" : columnSlotTypeTopFullClassName
            }`}
            slotEventWrapperClassName={`${type === "week" ? "column-7" : columnSlotTypeBottomFullClassNameOverride}`}
            slotEventWrapperClassNameOverride={`${
              type === "week" ? "column-7" : columnSlotTypeYearWeekendClassNameOverride
            }`}
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView10={false}
            slotMonthView11={false}
            slotMonthView12={false}
            slotMonthView13={false}
            slotMonthView14={false}
            slotMonthView15={false}
            slotMonthView16={false}
            slotMonthView17={false}
            slotMonthView18={false}
            slotMonthView19={false}
            slotMonthView2={false}
            slotMonthView20={false}
            slotMonthView21={false}
            slotMonthView22={false}
            slotMonthView23={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotMonthView7={false}
            slotMonthView8={false}
            slotMonthView9={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBlankWeekendClassName={`${type === "week" ? "column-7" : columnSlotTypeTopFullClassNameOverride}`}
            slotTypeBlankWeekendClassNameOverride={`${
              type === "week" ? "column-7" : columnSlotEventContainerWrapperClassNameOverride
            }`}
            slotTypeBottomFullClassName={`${
              type === "week" ? "column-7" : columnSlotTypeMiddleWeekendClassNameOverride
            }`}
            slotTypeBottomFullClassNameOverride={`${
              type === "week" ? "column-7" : columnSlotCalendarDaySmallWrapperClassNameOverride
            }`}
            slotTypeBottomPartialClassName={`${type === "week" ? "column-7" : columnSlotTypeFullWeekendClassName}`}
            slotTypeBottomPartialClassNameOverride={`${type === "week" ? "column-7" : columnSlotEventWrapperClassName}`}
            slotTypeFullWeekendClassName={`${type === "week" ? "column-9" : columnSlotDivClassNameOverride}`}
            slotTypeFullWeekendClassNameOverride={`${
              type === "week" ? "column-7" : columnSlotCalendarDaySmallWrapperClassName
            }`}
            slotTypeMiddleWeekendClassName={`${type === "week" ? "column-7" : columnSlotTypeBottomPartialClassName}`}
            slotTypeMiddleWeekendClassNameOverride={`${
              type === "week" ? "column-7" : columnSlotEventWrapperClassNameOverride
            }`}
            slotTypeTopFullClassName={`${type === "week" ? "column-7" : columnSlotTypeBlankWeekendClassName}`}
            slotTypeTopFullClassNameOverride={`${type === "week" ? "column-7" : columnSlotTypeYearWeekendClassName}`}
            slotTypeTopPartialClassName={`${type === "week" ? "column-7" : columnSlotTypeMiddleWeekendClassName}`}
            slotTypeTopPartialClassNameOverride={`${type === "week" ? "column-7" : columnSlotTypeBottomFullClassName}`}
            slotTypeYearWeekendClassName={`${type === "week" ? "column-7" : columnSlotDivClassName}`}
            slotTypeYearWeekendClassNameOverride={`${
              type === "week" ? "column-7" : columnSlotTypeBottomPartialClassNameOverride
            }`}
            slotWeekend={false}
            slotWeekend1={false}
            slotWeekend2={false}
            slotWeekend3={false}
            slotWeekend4={false}
            today="default"
            type="generic"
            weekend={false}
          />
        </>
      )}

      {type === "week" && !mobile && (
        <>
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName="column-7"
            slotCalendarDaySmallWrapperClassNameOverride="column-7"
            slotDivClassName="column-7"
            slotDivClassNameOverride="column-8"
            slotEventContainerWrapperClassName="column-7"
            slotEventContainerWrapperClassNameOverride="column-7"
            slotEventWrapperClassName="column-7"
            slotEventWrapperClassNameOverride="column-7"
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView10={false}
            slotMonthView11={false}
            slotMonthView12={false}
            slotMonthView13={false}
            slotMonthView14={false}
            slotMonthView15={false}
            slotMonthView16={false}
            slotMonthView17={false}
            slotMonthView18={false}
            slotMonthView19={false}
            slotMonthView2={false}
            slotMonthView20={false}
            slotMonthView21={false}
            slotMonthView22={false}
            slotMonthView23={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotMonthView7={false}
            slotMonthView8={false}
            slotMonthView9={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBlankWeekendClassName="column-7"
            slotTypeBlankWeekendClassNameOverride="column-7"
            slotTypeBottomFullClassName="column-7"
            slotTypeBottomFullClassNameOverride="column-7"
            slotTypeBottomPartialClassName="column-7"
            slotTypeBottomPartialClassNameOverride="column-7"
            slotTypeFullWeekendClassName="column-9"
            slotTypeFullWeekendClassNameOverride="column-7"
            slotTypeMiddleWeekendClassName="column-7"
            slotTypeMiddleWeekendClassNameOverride="column-7"
            slotTypeTopFullClassName="column-7"
            slotTypeTopFullClassNameOverride="column-7"
            slotTypeTopPartialClassName="column-7"
            slotTypeTopPartialClassNameOverride="column-7"
            slotTypeYearWeekendClassName="column-7"
            slotTypeYearWeekendClassNameOverride="column-7"
            slotWeekend={false}
            slotWeekend1={false}
            slotWeekend2={false}
            slotWeekend3={false}
            slotWeekend4={false}
            today="default"
            type="generic"
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName="column-7"
            slotCalendarDaySmallWrapperClassNameOverride="column-7"
            slotDivClassName="column-7"
            slotDivClassNameOverride="column-8"
            slotEventContainerWrapperClassName="column-7"
            slotEventContainerWrapperClassNameOverride="column-7"
            slotEventWrapperClassName="column-7"
            slotEventWrapperClassNameOverride="column-7"
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView10={false}
            slotMonthView11={false}
            slotMonthView12={false}
            slotMonthView13={false}
            slotMonthView14={false}
            slotMonthView15={false}
            slotMonthView16={false}
            slotMonthView17={false}
            slotMonthView18={false}
            slotMonthView19={false}
            slotMonthView2={false}
            slotMonthView20={false}
            slotMonthView21={false}
            slotMonthView22={false}
            slotMonthView23={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotMonthView7={false}
            slotMonthView8={false}
            slotMonthView9={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBlankWeekendClassName="column-7"
            slotTypeBlankWeekendClassNameOverride="column-7"
            slotTypeBottomFullClassName="column-7"
            slotTypeBottomFullClassNameOverride="column-7"
            slotTypeBottomPartialClassName="column-7"
            slotTypeBottomPartialClassNameOverride="column-7"
            slotTypeFullWeekendClassName="column-9"
            slotTypeFullWeekendClassNameOverride="column-7"
            slotTypeMiddleWeekendClassName="column-7"
            slotTypeMiddleWeekendClassNameOverride="column-7"
            slotTypeTopFullClassName="column-7"
            slotTypeTopFullClassNameOverride="column-7"
            slotTypeTopPartialClassName="column-7"
            slotTypeTopPartialClassNameOverride="column-7"
            slotTypeYearWeekendClassName="column-7"
            slotTypeYearWeekendClassNameOverride="column-7"
            slotWeekend={false}
            slotWeekend1={false}
            slotWeekend2={false}
            slotWeekend3={false}
            slotWeekend4={false}
            today="default"
            type="generic"
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName="column-7"
            slotCalendarDaySmallWrapperClassNameOverride="column-7"
            slotDivClassName="column-7"
            slotDivClassNameOverride="column-8"
            slotEventContainerWrapperClassName="column-7"
            slotEventContainerWrapperClassNameOverride="column-7"
            slotEventWrapperClassName="column-7"
            slotEventWrapperClassNameOverride="column-7"
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView10={false}
            slotMonthView11={false}
            slotMonthView12={false}
            slotMonthView13={false}
            slotMonthView14={false}
            slotMonthView15={false}
            slotMonthView16={false}
            slotMonthView17={false}
            slotMonthView18={false}
            slotMonthView19={false}
            slotMonthView2={false}
            slotMonthView20={false}
            slotMonthView21={false}
            slotMonthView22={false}
            slotMonthView23={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotMonthView7={false}
            slotMonthView8={false}
            slotMonthView9={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBlankWeekendClassName="column-7"
            slotTypeBlankWeekendClassNameOverride="column-7"
            slotTypeBottomFullClassName="column-7"
            slotTypeBottomFullClassNameOverride="column-7"
            slotTypeBottomPartialClassName="column-7"
            slotTypeBottomPartialClassNameOverride="column-7"
            slotTypeFullWeekendClassName="column-9"
            slotTypeFullWeekendClassNameOverride="column-7"
            slotTypeMiddleWeekendClassName="column-7"
            slotTypeMiddleWeekendClassNameOverride="column-7"
            slotTypeTopFullClassName="column-7"
            slotTypeTopFullClassNameOverride="column-7"
            slotTypeTopPartialClassName="column-7"
            slotTypeTopPartialClassNameOverride="column-7"
            slotTypeYearWeekendClassName="column-7"
            slotTypeYearWeekendClassNameOverride="column-7"
            slotWeekend={false}
            slotWeekend1={false}
            slotWeekend2={false}
            slotWeekend3={false}
            slotWeekend4={false}
            today="default"
            type="generic"
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName="column-7"
            slotCalendarDaySmallWrapperClassNameOverride="column-7"
            slotDivClassName="column-7"
            slotDivClassNameOverride="column-8"
            slotEventContainerWrapperClassName="column-7"
            slotEventContainerWrapperClassNameOverride="column-7"
            slotEventWrapperClassName="column-7"
            slotEventWrapperClassNameOverride="column-7"
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView10={false}
            slotMonthView11={false}
            slotMonthView12={false}
            slotMonthView13={false}
            slotMonthView14={false}
            slotMonthView15={false}
            slotMonthView16={false}
            slotMonthView17={false}
            slotMonthView18={false}
            slotMonthView19={false}
            slotMonthView2={false}
            slotMonthView20={false}
            slotMonthView21={false}
            slotMonthView22={false}
            slotMonthView23={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotMonthView7={false}
            slotMonthView8={false}
            slotMonthView9={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBlankWeekendClassName="column-7"
            slotTypeBlankWeekendClassNameOverride="column-7"
            slotTypeBottomFullClassName="column-7"
            slotTypeBottomFullClassNameOverride="column-7"
            slotTypeBottomPartialClassName="column-7"
            slotTypeBottomPartialClassNameOverride="column-7"
            slotTypeFullWeekendClassName="column-9"
            slotTypeFullWeekendClassNameOverride="column-7"
            slotTypeMiddleWeekendClassName="column-7"
            slotTypeMiddleWeekendClassNameOverride="column-7"
            slotTypeTopFullClassName="column-7"
            slotTypeTopFullClassNameOverride="column-7"
            slotTypeTopPartialClassName="column-7"
            slotTypeTopPartialClassNameOverride="column-7"
            slotTypeYearWeekendClassName="column-7"
            slotTypeYearWeekendClassNameOverride="column-7"
            slotWeekend={false}
            slotWeekend1={false}
            slotWeekend2={false}
            slotWeekend3={false}
            slotWeekend4={false}
            today="default"
            type="generic"
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName="column-7"
            slotCalendarDaySmallWrapperClassNameOverride="column-7"
            slotDivClassName="column-7"
            slotDivClassNameOverride="column-8"
            slotEventContainerWrapperClassName="column-7"
            slotEventContainerWrapperClassNameOverride="column-7"
            slotEventWrapperClassName="column-7"
            slotEventWrapperClassNameOverride="column-7"
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView10={false}
            slotMonthView11={false}
            slotMonthView12={false}
            slotMonthView13={false}
            slotMonthView14={false}
            slotMonthView15={false}
            slotMonthView16={false}
            slotMonthView17={false}
            slotMonthView18={false}
            slotMonthView19={false}
            slotMonthView2={false}
            slotMonthView20={false}
            slotMonthView21={false}
            slotMonthView22={false}
            slotMonthView23={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotMonthView7={false}
            slotMonthView8={false}
            slotMonthView9={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBlankWeekendClassName="column-7"
            slotTypeBlankWeekendClassNameOverride="column-7"
            slotTypeBottomFullClassName="column-7"
            slotTypeBottomFullClassNameOverride="column-7"
            slotTypeBottomPartialClassName="column-7"
            slotTypeBottomPartialClassNameOverride="column-7"
            slotTypeFullWeekendClassName="column-9"
            slotTypeFullWeekendClassNameOverride="column-7"
            slotTypeMiddleWeekendClassName="column-7"
            slotTypeMiddleWeekendClassNameOverride="column-7"
            slotTypeTopFullClassName="column-7"
            slotTypeTopFullClassNameOverride="column-7"
            slotTypeTopPartialClassName="column-7"
            slotTypeTopPartialClassNameOverride="column-7"
            slotTypeYearWeekendClassName="column-7"
            slotTypeYearWeekendClassNameOverride="column-7"
            slotWeekend
            slotWeekend1
            slotWeekend2
            slotWeekend3
            slotWeekend4
            today="default"
            type="generic"
            weekend
          />
          <Column
            style={styles.column2}
            slotCalendarDaySmallWrapperClassName="column-7"
            slotCalendarDaySmallWrapperClassNameOverride="column-7"
            slotDivClassName="column-7"
            slotDivClassNameOverride="column-8"
            slotEventContainerWrapperClassName="column-7"
            slotEventContainerWrapperClassNameOverride="column-7"
            slotEventWrapperClassName="column-7"
            slotEventWrapperClassNameOverride="column-7"
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView10={false}
            slotMonthView11={false}
            slotMonthView12={false}
            slotMonthView13={false}
            slotMonthView14={false}
            slotMonthView15={false}
            slotMonthView16={false}
            slotMonthView17={false}
            slotMonthView18={false}
            slotMonthView19={false}
            slotMonthView2={false}
            slotMonthView20={false}
            slotMonthView21={false}
            slotMonthView22={false}
            slotMonthView23={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotMonthView7={false}
            slotMonthView8={false}
            slotMonthView9={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBlankWeekendClassName="column-7"
            slotTypeBlankWeekendClassNameOverride="column-7"
            slotTypeBottomFullClassName="column-7"
            slotTypeBottomFullClassNameOverride="column-7"
            slotTypeBottomPartialClassName="column-7"
            slotTypeBottomPartialClassNameOverride="column-7"
            slotTypeFullWeekendClassName="column-9"
            slotTypeFullWeekendClassNameOverride="column-7"
            slotTypeMiddleWeekendClassName="column-7"
            slotTypeMiddleWeekendClassNameOverride="column-7"
            slotTypeTopFullClassName="column-7"
            slotTypeTopFullClassNameOverride="column-7"
            slotTypeTopPartialClassName="column-7"
            slotTypeTopPartialClassNameOverride="column-7"
            slotTypeYearWeekendClassName="column-7"
            slotTypeYearWeekendClassNameOverride="column-7"
            slotWeekend
            slotWeekend1
            slotWeekend2
            slotWeekend3
            slotWeekend4
            today="default"
            type="generic"
            weekend
          />
        </>
      )}

      {type === "week" && mobile && (
        <>
          <LabelLeftGroup
            className="label-left-group-7"
            labelTypeSideFalseTopTrueClassName="label-left-group-9"
            labelTypeSideFalseTopTrueClassNameOverride="label-left-group-9"
            labelTypeSideTrueTopFalseClassName="label-left-group-9"
            labelTypeSideTrueTopFalseClassNameOverride="label-left-group-9"
            labelTypeSideTrueTopTrueClassName="label-left-group-9"
            labelTypeSideTrueTopTrueClassNameOverride="label-left-group-9"
            labelTypeTypographyDivClassName="label-left-group-8"
            labelTypeTypographyDivClassName1="label-left-group-8"
            labelTypeTypographyDivClassName2="label-left-group-8"
            labelTypeTypographyDivClassName3="label-left-group-8"
            labelTypeTypographyDivClassName4="label-left-group-8"
            labelTypeTypographyDivClassName5="label-left-group-8"
            labelTypeTypographyDivClassNameOverride="label-left-group-8"
            labelTypeTypographyText="Mon"
            labelTypeTypographyText1="Tue"
            labelTypeTypographyText2="Wed"
            labelTypeTypographyText3="Thur"
            labelTypeTypographyText4="Fri"
            labelTypeTypographyText5="Sat"
            labelTypeTypographyText6="Sun"
            labelTypeTypographyTypeButtonBoldClassName="label-left-group-instance"
            labelTypeTypographyTypeButtonBoldClassNameOverride="label-left-group-2"
            labelTypeTypographyTypeCaptionBoldClassName="label-left-group-3"
            labelTypeTypographyTypeCaptionBoldClassNameOverride="label-left-group-instance"
            labelTypeTypographyTypeSmallBoldClassName="label-left-group-4"
            labelTypeTypographyTypeSmallBoldClassNameOverride="label-left-group-5"
            labelTypeTypographyTypeSmallBoldTrueClassName="label-left-group-6"
            labelTypeTypographyWrapperClassName="label-left-group-9"
            property1="default"
            visible={false}
            visible1={false}
            visible10={false}
            visible11={false}
            visible12={false}
            visible13={false}
            visible14={false}
            visible15={false}
            visible16={false}
            visible2={false}
            visible3={false}
            visible4={false}
            visible5={false}
            visible6={false}
            visible7={false}
            visible8={false}
            visible9={false}
          />
          <Column
            style={styles.column2}
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView2={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBottomFullClassName="column-7"
            slotTypeBottomFullClassNameOverride="column-7"
            slotTypeFullWeekendClassName="column-9"
            slotTypeFullWeekendClassNameOverride="column-7"
            slotTypeMiddleWeekendClassName="column-8"
            slotTypeTopFullClassName="column-7"
            slotTypeTopFullClassNameOverride="column-7"
            slotWeekend={false}
            slotWeekend1={false}
            slotWeekend2={false}
            slotWeekend3={false}
            slotWeekend4={false}
            today="default"
            type="generic"
            visible10={false}
            visible11={false}
            visible12={false}
            visible13={false}
            visible14={false}
            visible15={false}
            visible16={false}
            visible17={false}
            visible18={false}
            visible19={false}
            visible20={false}
            visible4={false}
            visible5={false}
            visible6={false}
            visible7={false}
            visible8={false}
            visible9={false}
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView2={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBottomFullClassName="column-7"
            slotTypeBottomFullClassNameOverride="column-7"
            slotTypeFullWeekendClassName="column-9"
            slotTypeFullWeekendClassNameOverride="column-7"
            slotTypeMiddleWeekendClassName="column-8"
            slotTypeTopFullClassName="column-7"
            slotTypeTopFullClassNameOverride="column-7"
            slotWeekend={false}
            slotWeekend1={false}
            slotWeekend2={false}
            slotWeekend3={false}
            slotWeekend4={false}
            today="default"
            type="generic"
            visible10={false}
            visible11={false}
            visible12={false}
            visible13={false}
            visible14={false}
            visible15={false}
            visible16={false}
            visible17={false}
            visible18={false}
            visible19={false}
            visible20={false}
            visible4={false}
            visible5={false}
            visible6={false}
            visible7={false}
            visible8={false}
            visible9={false}
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView2={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBottomFullClassName="column-7"
            slotTypeBottomFullClassNameOverride="column-7"
            slotTypeFullWeekendClassName="column-9"
            slotTypeFullWeekendClassNameOverride="column-7"
            slotTypeMiddleWeekendClassName="column-8"
            slotTypeTopFullClassName="column-7"
            slotTypeTopFullClassNameOverride="column-7"
            slotWeekend={false}
            slotWeekend1={false}
            slotWeekend2={false}
            slotWeekend3={false}
            slotWeekend4={false}
            today="default"
            type="generic"
            visible10={false}
            visible11={false}
            visible12={false}
            visible13={false}
            visible14={false}
            visible15={false}
            visible16={false}
            visible17={false}
            visible18={false}
            visible19={false}
            visible20={false}
            visible4={false}
            visible5={false}
            visible6={false}
            visible7={false}
            visible8={false}
            visible9={false}
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView2={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBottomFullClassName="column-7"
            slotTypeBottomFullClassNameOverride="column-7"
            slotTypeFullWeekendClassName="column-9"
            slotTypeFullWeekendClassNameOverride="column-7"
            slotTypeMiddleWeekendClassName="column-8"
            slotTypeTopFullClassName="column-7"
            slotTypeTopFullClassNameOverride="column-7"
            slotWeekend={false}
            slotWeekend1={false}
            slotWeekend2={false}
            slotWeekend3={false}
            slotWeekend4={false}
            today="default"
            type="generic"
            visible10={false}
            visible11={false}
            visible12={false}
            visible13={false}
            visible14={false}
            visible15={false}
            visible16={false}
            visible17={false}
            visible18={false}
            visible19={false}
            visible20={false}
            visible4={false}
            visible5={false}
            visible6={false}
            visible7={false}
            visible8={false}
            visible9={false}
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView2={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBottomFullClassName="column-7"
            slotTypeBottomFullClassNameOverride="column-7"
            slotTypeFullWeekendClassName="column-9"
            slotTypeFullWeekendClassNameOverride="column-7"
            slotTypeMiddleWeekendClassName="column-8"
            slotTypeTopFullClassName="column-7"
            slotTypeTopFullClassNameOverride="column-7"
            slotWeekend={false}
            slotWeekend1={false}
            slotWeekend2={false}
            slotWeekend3={false}
            slotWeekend4={false}
            today="default"
            type="generic"
            visible10={false}
            visible11={false}
            visible12={false}
            visible13={false}
            visible14={false}
            visible15={false}
            visible16={false}
            visible17={false}
            visible18={false}
            visible19={false}
            visible20={false}
            visible4={false}
            visible5={false}
            visible6={false}
            visible7={false}
            visible8={false}
            visible9={false}
            weekend={false}
          />
          <Column
            style={styles.column2}
            slotMonthView={false}
            slotMonthView1={false}
            slotMonthView2={false}
            slotMonthView3={false}
            slotMonthView4={false}
            slotMonthView5={false}
            slotMonthView6={false}
            slotType="blank"
            slotType1="blank"
            slotType2="blank"
            slotType3="blank"
            slotType4="blank"
            slotType5="blank"
            slotTypeBottomFullClassName="column-11"
            slotTypeBottomFullClassNameOverride="column-11"
            slotTypeFullWeekendClassName="column-10"
            slotTypeFullWeekendClassNameOverride="column-11"
            slotTypeMiddleWeekendClassName="column-12"
            slotTypeTopFullClassName="column-11"
            slotTypeTopFullClassNameOverride="column-11"
            slotWeekend
            slotWeekend1
            slotWeekend2
            slotWeekend3
            slotWeekend4
            today="default"
            type="generic"
            visible10={false}
            visible11={false}
            visible12={false}
            visible13={false}
            visible14={false}
            visible15={false}
            visible16={false}
            visible17={false}
            visible18={false}
            visible19={false}
            visible20={false}
            visible4={false}
            visible5={false}
            visible6={false}
            visible7={false}
            visible8={false}
            visible9={false}
            weekend
          />
        </>
      )}
    </View>
  );
};

Grid.propTypes = {
  fit: PropTypes.oneOf(["cropped", "strech"]),
  type: PropTypes.oneOf(["month", "day", "year-2-column", "week", "year-4-column", "year-3-column"]),
  mobile: PropTypes.bool,
};

const styles = StyleSheet.create({
    grid: {
      alignItems: 'flex-start',
      display: 'flex',
      position: 'relative',
    },
    columnInstance: {
      marginLeft: -1.88,
    },
    column2: {
      alignSelf: 'stretch',
      flex: 1,
      flexGrow: 1,
      gap: 24,
      height: 'unset',
      width: 'unset',
    },
    // ... continue defining other styles
    strechDay: {
      height: 938,
    },
    mobileTrueWeek: {
      width: 375,
    },
    mobileFalseYear2Column: {
      gap: 24,
      height: 1942,
      padding: 24,
    },
    monthCropped: {
      height: 670,
      width: 1196,
    },
    mobileFalseWeek: {
      width: 1195,
    },
    strechYear2ColumnMobileTrue: {
      height: 938,
    },
  });