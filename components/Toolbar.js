import PropTypes from "prop-types";
import React from "react";
import { Search } from "./Search";
import { Typography } from "./Typography";
import { View, TouchableOpacity, StyleSheet, Text, TextInput, RefreshControl } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
//import "./style.css";

export const ToolBar = ({
  property1,
  mobile,
  onRefresh,
  showSidebar = false,
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

        <Ionicons name={"calendar-outline"} size={20} style={styles.icon} />

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