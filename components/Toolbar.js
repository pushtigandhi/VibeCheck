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
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
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
  override = <PlusCircle color="white" />,
  //calendarButtonsClass,
}) => {
  return (
    <View 
        style={[
                styles.toolBar,
                mobile ? styles.mobileTrueLeftContent : styles.mobileFalseLeftContent,
                styles.toolBarInstance,
            ]}
        >
      <View style={styles.toolBar.leftContent}>
        <SidebarToggle active={false} buttonIcon={sidebarToggleButtonIcon} style={styles.instanceNode2} />
        {["day", "month", "week"].includes(property1) && (
          <View style={styles.toolBar.divWrapper}>
            <View style={styles.toolBar.typography2}>
            <Text style={styles.span}>
                {!mobile && property1 === 'day' && <>01 January </>}
                {mobile && property1 === 'day' && <>01 Jan </>}
                {!mobile && property1 === 'week' && <>01-07 January </>}
                {property1 === 'week' && mobile && <>01-07 Jan </>}
                {property1 === 'month' && !mobile && <>January </>}
                {property1 === 'month' && mobile && <>Jan </>}
            </Text>
            <Text style={styles.textWrapper2}>2022</Text>
            </View>
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

        <CalendarButtons
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
        />
      </View>
      <View style={styles.rightContent}>
        <Search
          //className={searchPropertyDefaultClassName}
          searchButtonColor={searchIconColor}
          property1="default"
        />
        <CalendarButtons
          //className={calendarButtonsClass}
          disabled={false}
          focused={false}
          hover={false}
          icon={true}
          icon1={
            !mobile ? <PlusCircle style={styles.iconFontAwesome2} color="white" /> : undefined
          }
          override={override}
          property1="primary"
          text={mobile ? false : true}
          typographyText={!mobile ? "Add event" : undefined}
        />
      </View>
    </View>
  );
};

ToolBar.propTypes = {
  property1: PropTypes.oneOf(["month", "year", "day", "week"]),
  mobile: PropTypes.bool,
  searchIconFontAwesomeFreeSolidSSearch4Color: PropTypes.string,
};

const styles = StyleSheet.create({
    toolBar: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: 'var(--stroke)',
      display: 'flex',
      flex: 'row',
      justifyContent: 'space-between',
      position: 'relative',
      
    },
    toolBarInstance: {
        borderColor: '#aad6e7',
        width: 300,
    },
    leftContent: {
      //alignItems: 'center',
      //display: 'flex',
      //flex: 0,
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
      fontWeight: '500',
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
      //gap: 8,
    },
    mobileFalseTypography2: {
      fontSize: 30,
    },
    mobileTrueTypography2: {
      fontSize: 16,
    },
  });