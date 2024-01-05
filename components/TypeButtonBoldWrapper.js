import PropTypes from "prop-types";
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';

export const TypeButtonBoldWrapper = ({ type, bold, className, divClassName, text = "Typography" }) => {
  return (
    <View
      style={[
        styles.typeButtonBoldWrapper
      ]} 
        //className={`type-button-bold-wrapper ${className}`}
    >
      <View 
        style={[
            styles.div,
            bold ? styles.bold0True : styles.bold0True,
            styles.typeH4
        ]}
      //className={`div type-${type} bold-0-${bold} ${divClassName}`}
      >
      <Text>{text}</Text>
      </View>
    </View>
  );
};

TypeButtonBoldWrapper.propTypes = {
  type: PropTypes.oneOf(["h-5", "caption", "body", "button", "h1", "h-4", "small", "h3", "h2"]),
  bold: PropTypes.bool,
  text: PropTypes.string,
};

const styles = StyleSheet.create({
    typeButtonBoldWrapper: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      position: 'relative',
    },
    div: {
      color: '#333333',
      //fontFamily: 'Poppins, Helvetica',
      letterSpacing: 0,
      lineHeight: 'normal',
      marginTop: -1,
      position: 'relative',
      width: 'auto',
    },
    typeH5: {
      fontSize: 16,
    },
    typeH4: {
      fontSize: 18,
    },
    bold0True: {
      fontWeight: '600',
    },
    typeSmall: {
      fontSize: 10,
    },
    typeCaption: {
      fontSize: 12,
    },
    typeH3: {
      fontSize: 20,
    },
    typeH1: {
      fontSize: 30,
    },
    typeH2: {
      fontSize: 25,
    },
    typeBody: {
      fontSize: 14,
    },
    bold0False: {
      fontWeight: '500',
    },
    typeButton: {
      fontSize: 12,
    },
  });