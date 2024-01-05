import React from "react";
import { View, ImageBackground, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';

export const SpiralCalendar = ({ className }) => {
  return (
    <View>
    <ImageBackground
        style={styles.spiralCalendar}
        source={{ uri: 'https://c.animaapp.com/tYPXz0Sm/img/spiral-calendar-3@2x.png' }}
    ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    spiralCalendar: {
      height: 16,
      width: 16,
    },
  });