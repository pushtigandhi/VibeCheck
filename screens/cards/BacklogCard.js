import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity,
        StyleSheet, Animated, FlatList, ScrollView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../constants";

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
          <Text style={{ fontSize: SIZES.regular}}>{item.icon}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '95%',
    margin: SIZES.xSmall,
    backgroundColor: "#FFF",
    borderRadius: SIZES.xLarge,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
  },
  titleContainer: {
    width: '100%',
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderBottomWidth: 1,
    borderBottomLeftRadius: SIZES.xLarge,
    borderBottomRightRadius: SIZES.xLarge,
  },
  sectionContainer: {
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  section: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).darkBlue,
  },
});

export default BacklogCard