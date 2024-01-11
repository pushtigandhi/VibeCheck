import PropTypes from "prop-types";
import React from "react";
//import "./style.css";
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';


export const Typography = ({ type, bold, divClassName, text = "Typography" }) => {
    console.log(divClassName);
  return (
    <View style={styles.typography}>
      <View 
      style={[
            styles.div,
            styles[`type${type}`],
            bold ? styles.boldTrue : styles.boldFalse,
            styles[divClassName],
        ]}
      >
        <Text>{text}</Text>
      </View>
    </View>
  );
};

Typography.propTypes = {
  type: PropTypes.oneOf(["h-5", "caption", "body", "button", "h1", "h-4", "small", "h3", "h2"]),
  bold: PropTypes.bool,
  text: PropTypes.string,
};

const styles = StyleSheet.create({
    typography: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      position: 'relative',
    },
    div: {
      color: 'var(--text)',
      //fontFamily: 'Poppins, Helvetica',
      letterSpacing: 0,
      lineHeight: 'normal',
      marginTop: -1,
      position: 'relative',
      width: 'fit-content',
    },
    typeH5: {
      fontSize: 16,
    },
    typeH4: {
      fontSize: 18,
    },
    boldTrue: {
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
    boldFalse: {
      fontWeight: '500',
    },
    typeButton: {
      fontSize: 12,
    },
  });