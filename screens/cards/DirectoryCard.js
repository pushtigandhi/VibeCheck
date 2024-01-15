import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity,
        StyleSheet, Animated, FlatList, ScrollView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../utils";
import { ExpandableView } from "../../utils";

const expandFolder = ({data}) => {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: 200,
      duration: 250,
      useNativeDriver: false
    }).start();
  }, [height]);

  return (
    <Animated.View
    style={{ height }}
  >
   <ScrollView style={styles.expandedContainer}>
      {data.map(item => (
        <TouchableOpacity style={styles.sectionContainer} key={item._id + "root"}>
            <Text style={styles.section} numberOfLines={1}>{item}</Text>
          </TouchableOpacity>
      ))}
    </ScrollView>
    </Animated.View>
  );
};

const DirectoryCard = ({item, data}) => {
    const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
            setIsExpanded(!isExpanded);
          }}
          style={styles.titleContainer}
      >
        <View style={styles.row}> 
          <Ionicons name={"list-circle"} size={30} style={styles.icon}/>
          <Text style={styles.title} numberOfLines={1}>{item}</Text>
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <ExpandableView expanded={true} view={expandFolder} params={{ data: data }} />
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
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
    color: COLORS({opacity:1}).darkBlue,
  },
  expandedContainer: {
    paddingBottom: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    flex: 1,
    overflow: 'scroll',
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

export default DirectoryCard