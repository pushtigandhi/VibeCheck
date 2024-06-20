import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity,
        StyleSheet, Animated, FlatList, ScrollView } from 'react-native';

import { COLORS, SHADOWS, FONT, textSIZES, viewSIZES } from "../../constants";

const BacklogCard = ({navigation, item}) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
            navigation.navigate("Item", {item});
          }}
          style={styles.titleContainer}
      >
        <View style={styles.row}>
          <Text style={{ fontSize: textSIZES.regular}}>{item.icon}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:1}).white,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  titleContainer: {
    flex:1,
    padding: textSIZES.small,
    borderBottomLeftRadius: textSIZES.xLarge,
    borderBottomRightRadius: textSIZES.xLarge,
  },
  sectionContainer: {
    margin: textSIZES.xSmall,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  title: {
    fontSize: textSIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: textSIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
});

export default BacklogCard