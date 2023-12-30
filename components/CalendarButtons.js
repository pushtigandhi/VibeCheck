/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { SolidPaperPlane1 } from "../assets/icons/SolidPaperPlane1";
//import { IconFontAwesomeFreeSolidPPaperPlane31 } from "../../icons/IconFontAwesomeFreeSolidPPaperPlane31";
import { Typography } from "./Typography";
//import "./style.css";
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';


export const CalendarButtons = ({
  property1,
  icon,
  hover,
  disabled,
  //focused,
  text,
  override = <SolidPaperPlane1 color="#0C41FF" />,
  //className,
  typographyText = "button",
  icon1 = <SolidPaperPlane1 color="#0C41FF" />,
}) => {
  return (
    <View
        style={[
            styles.calendarButtons,
            styles[`text0${text ? 'True' : 'False'}`],
            styles[`property10${property1 === 'secondary' ? 'Secondary' : 'Primary'}`],
            styles[`disabled0${disabled ? 'True' : 'False'}`],
            styles[`icon0${icon ? 'True' : 'False'}`],
            styles[`hover1${hover ? 'True' : 'False'}`],
        ]}
    >
      {(!icon || !text) && <>{override}</>}

      {text && icon && (
        <>
          <Typography
            bold={false}
            //className="typography-instance"
            divClassName={`${
              property1 === "primary"
                ? "class3"
                : hover && ["secondary", "tertiary"].includes(property1)
                ? "class4"
                : "class5"
            }`}
            text={typographyText}
            type="button"
          />
          {icon1}
        </>
      )}
    </View>
  );
};

CalendarButtons.propTypes = {
  property1: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  icon: PropTypes.bool,
  hover: PropTypes.bool,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  text: PropTypes.bool,
  typographyText: PropTypes.string,
};

const styles = StyleSheet.create({
    calendarButtons: {
      alignItems: 'center',
      borderRadius: 3,
      height: 35,
      justifyContent: 'center',
      padding: 8,
      position: 'relative',
    },
    class3: {
      color: 'white',
    },
    class4: {
      color: '#2a45a5',
    },
    class5: {
      color: '#0b41ff',
    },
    typographyInstance: {
      flex: 0,
      flexGrow: 0,
      flexShrink: 0,
    },
    iconInstanceNode: {
      height: 16,
      position: 'relative',
      width: 16,
    },
    text0False: {
      display: 'flex',
      width: 35,
    },
    property10Secondary: {
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
    },
    text0True: {
      display: 'inline-flex',
    },
    disabled0True: {
      opacity: 0.4,
    },
    icon0True: {
      gap: 4,
    },
    icon0False: {
      flexDirection: 'column',
      gap: 10,
    },
    property10SecondaryHover1False: {
      borderColor: '#0b41ff',
    },
    hover1TrueProperty10Secondary: {
      borderColor: '#2a45a5',
    },
    icon0FalseProperty10PrimaryHover1False: {
      backgroundColor: '#0b41ff',
    },
    hover1TrueProperty10PrimaryText0False: {
      backgroundColor: '#2a45a5',
    },
    disabled0TrueProperty10PrimaryText0True: {
      backgroundColor: '#0b41ff',
    },
    property10PrimaryText0FalseHover1False: {
      backgroundColor: '#0b41ff',
    },
    hover1TrueProperty10PrimaryDisabled0False: {
      backgroundColor: '#2a45a5',
    },
    hover1FalseProperty10PrimaryDisabled0True: {
      backgroundColor: '#0b41ff',
    },
    hover1FalseProperty10PrimaryIcon0TrueDisabled0FalseText0True: {
      backgroundColor: '#3b5998', // Placeholder color, replace with your desired color or variable
    },
});