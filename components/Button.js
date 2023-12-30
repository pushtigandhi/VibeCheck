import PropTypes from "prop-types";
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { SolidPaperPlane1 } from '../assets/icons/SolidPaperPlane1';
//import {styles} from "./style.js";

export const Button = ({
  property1,
  icon = true,
  hover,
  disabled,
  //focused,
  text,
  className,
  override = <SolidPaperPlane1 color="#0C41FF" />,
}) => {
  return (
    <View>
        <TouchableOpacity
            style={[
                styles.button,
                styles[`${text}Text`],
                styles[property1],
                styles[`${disabled}Disabled`],
                styles[`${icon}Icon`],
                styles[`${hover}Hover`],
                styles[className],
            ]}
    >
      {text && (
        <View style={styles.typographyWrapper}>
          <Text style={styles.textWrapper}>button</Text>
        </View>
      )}

      {text && icon && ( 
         <SolidPaperPlane1
          style={styles.iconFontAwesome}
          color={
            property1 === 'primary'
              ? 'white'
              : hover && ['secondary', 'tertiary'].includes(property1)
              ? '#2A45A6'
              : '#0C41FF'
          }
        />
      )}

      {!text && <>{override}</>} 
    </TouchableOpacity>
    </View>
    
  )
}

Button.propTypes = {
  property1: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  icon: PropTypes.bool,
  hover: PropTypes.bool,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  text: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 3,
    boxSizing: 'border-box',
    height: 35,
    justifyContent: 'center',
    padding: 8,
    position: 'relative',
  },
  typographyWrapper: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    position: 'relative',
  },
  textWrapper: {
    //fontFamily: 'Poppins, Helvetica',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 'normal',
    marginTop: -1,
    position: 'relative',
    width: 'auto',
  },
  iconFontAwesome: {
    height: 16,
    width: 16,
  },
  falseText: {
    display: 'flex',
    width: 35,
  },
  secondary: {
    borderColor: '#0b41ff',
    borderWidth: 1,
  },
  trueText: {
    display: 'flex',
  },
  trueDisabled: {
    opacity: 0.4,
  },
  trueIcon: {
    gap: 4,
  },
  falseIcon: {
    flexDirection: 'column',
    gap: 10,
  },
  primary: {
    backgroundColor: '#0b41ff',
  },
  hoverTruePrimary: {
    backgroundColor: '#2a45a5',
  },
  secondaryHoverFalse: {
    borderColor: '#0b41ff',
  },
  secondaryHoverTrue: {
    borderColor: '#2a45a5',
  },
  primaryTextWrapper: {
    color: '#ffffff',
  },
  tertiaryHoverFalseTextWrapper: {
    color: '#0b41ff',
  },
  tertiaryHoverTrueTextWrapper: {
    color: '#2a45a5',
  },
  secondaryHoverFalseTextWrapper: {
    color: '#0b41ff',
  },
  secondaryHoverTrueTextWrapper: {
    color: '#2a45a5',
  },
});