import PropTypes from "prop-types";
import React from "react";
import { SolidBars } from "../assets/icons/SolidBars";
import { CalendarWeek } from "../assets/icons/CalendarWeek";
import { ChevronDown } from "../assets/icons/ChevronDown";
import { PlusCircle } from "../assets/icons/PlusCircle";
import { CalendarButtons } from "./CalendarButtons";
import { Search } from "./Search";
import { SidebarToggle } from "./SidebarToggle";
import { Typography } from "./Typography";
import { SolidSearch } from "../assets/icons/SolidSearch";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
//import "./style.css";

export const ToolBar = ({
  property1,
  mobile,
  //className,
  sidebarToggleButtonIcon = <SolidBars color="#333333" />,
  //typographyClassName,
  calendarButtonsIcon = <CalendarWeek color="#0C41FF" />,
  //searchPropertyDefaultClassName,
  searchIconColor = "#6A778B",
  addButtonIcon = <PlusCircle color="#229FD0" />,
  //calendarButtonsClass,
}) => {
  return (
    <View 
        style={[
                styles.toolBar,
                styles.row,
                //mobile ? styles.mobileTrueLeftContent : styles.mobileFalseLeftContent,
                //styles.toolBarInstance,
            ]}
        >

      <View style={[styles.row, styles.leftContent]}>
        <TouchableOpacity>
          <Ionicons name={"reorder-three-outline"} size={30} style={styles.icon} />

          {/* <SidebarToggle active={false} buttonIcon={sidebarToggleButtonIcon} style={styles.instanceNode2} /> */}
        </TouchableOpacity>
        {["day", "month", "week"].includes(property1) && (
          <View style={[styles.row, styles.toolBar.divWrapper]}>
            {/* <View style={styles.toolBar.typography2}> */}
            <Text style={[styles.span, {fontWeight:'500'}]}>
                {!mobile && property1 === 'day' && <>01 January </>}
                {mobile && property1 === 'day' && <>01 Jan </>}
                {!mobile && property1 === 'week' && <>01-07 January </>}
                {property1 === 'week' && mobile && <>01-07 Jan </>}
                {property1 === 'month' && !mobile && <>January </>}
                {property1 === 'month' && mobile && <>Jan </>}
            </Text>
            <Text style={styles.span}>2024</Text>
            {/* </View> */}
          </View>
        )}

        {property1 === "year" && (
          <Typography
            bold={false}
            //className="instance-node-2"
            divClassName={`${!mobile && "class-6"}`}
            text="2022"
            type={mobile ? "h-5" : "h1"}
          />
        )}

        {/* <CalendarButtons
          //className={`${!mobile && "instance-node-2"}`}
          property1={mobile ? "tertiary" : "secondary"}
          hover={false}
          disabled={false}
          text={mobile ? false : true}
          //focused={false}
          icon={true}
          icon1={!mobile ? <ChevronDown style={styles.iconFontAwesome2} /> : undefined}
          override={calendarButtonsIcon}
          typographyText={
            !mobile && property1 === "day"
              ? "Day"
              : !mobile && property1 === "week"
              ? "Week"
              : property1 === "month" && !mobile
              ? "Month"
              : !mobile && property1 === "year"
              ? "Year"
              : undefined
          }
        /> */}

        <Ionicons name={"calendar-outline"} size={20} style={styles.icon} />

      </View>
      <View style={[styles.row, styles.rightContent]}>
        <Search
          //className={searchPropertyDefaultClassName}
          //searchButtonColor={searchIconColor}
          property1="default"
        />
        {/* <CalendarButtons
          //className={calendarButtonsClass}

          disabled={false}
          focused={false}
          hover={false}
          icon={true}
          icon1={
            !mobile ? <PlusCircle style={styles.iconFontAwesome2} color="#aad6e7" /> : undefined
          }
          override={addButtonIcon}
          property1="primary"
          text={mobile ? false : true}
          typographyText={!mobile ? "Add event" : undefined}
        /> */}
        <TouchableOpacity style={styles.addButtonIcon} >
          <Ionicons name={"add-circle"} size={20} style={styles.iconInverted} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

ToolBar.propTypes = {
  property1: PropTypes.oneOf(["month", "year", "day", "week"]),
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
      fontFamily: 'Poppins, Helvetica',
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 'normal',
      marginTop: -1,
      width: 'fit-content',
    },
    span: {
      //fontWeight: '500',
      fontSize: 16,
      color: "#229FD0",
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
  });