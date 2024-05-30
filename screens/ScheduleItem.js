import { useState } from "react";
import { View, Text, TouchableOpacity,
        StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import * as df  from "../constants/default";
import { Ionicons } from "@expo/vector-icons";

export default function ScheduleItem({navigation, close}) {

  const [isExpanded, setIsExpanded] = useState(true);

  function onClose() {
    close();
  }
  
  return (
    <SafeAreaView style={styles.infoContainer}>
        <View style={[styles.row, styles.header]}>
            <TouchableOpacity onPress={onClose} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightRed}]} > 
                <Ionicons name={"close-outline"} size={SIZES.xLarge} style={styles.iconInverted}/> 
            </TouchableOpacity>
        </View>
        <TouchableOpacity
            onPress={() => {
            navigation.navigate("New", {navigation})
            }}
            style={styles.titleContainer}
        >
            <Text style={styles.label}>New</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => {
            navigation.navigate("EditItem", {item: df.defaultItem})
            }}
            style={styles.titleContainer}
        >
            <View style={styles.row}>
                <Text style={styles.label}>{df.ItemType.Item}</Text>
                <Text style={{fontSize: SIZES.xLarge}}>{df.defaultItem.icon}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => {
            navigation.navigate("EditItem", {item: df.defaultTask});
            }}
            style={styles.titleContainer}
        >
            <View style={styles.row}>
                <Text style={styles.label}>{df.ItemType.Task}</Text>
                <Text style={{fontSize: SIZES.xLarge}}>{df.defaultTask.icon}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => {
            navigation.navigate("EditItem", {item: df.defaultEvent});
            }}
            style={styles.titleContainer}
        >
            <View style={styles.row}>
                <Text style={styles.label}>{df.ItemType.Event}</Text>
                <Text style={{fontSize: SIZES.xLarge}}>{df.defaultEvent.icon}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => {
            navigation.navigate("EditItem", {item: df.defaultPage});
            }}
            style={styles.titleContainer}
        >
            <View style={styles.row}>
                <Text style={styles.label}>{df.ItemType.Page}</Text>
                <Text style={{fontSize: SIZES.xLarge}}>{df.defaultPage.icon}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => {
            navigation.navigate("EditItem", {item: df.defaultRecipe});
            }}
            style={styles.titleContainer}
        >
            <View style={styles.row}>
                <Text style={styles.label}>{df.ItemType.Recipe}</Text>
                <Text style={{fontSize: SIZES.xLarge}}>{df.defaultRecipe.icon}</Text>
            </View>
        </TouchableOpacity>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  button: {
    height: SIZES.xxLarge * 2,
    width: SIZES.xxLarge * 2,
    padding: SIZES.xSmall,
    marginHorizontal: SIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.medium
  },
  sortText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: SIZES.medium,
    marginHorizontal: SIZES.medium,
    },
  titleContainer: {
    width: '100%',
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderBottomLeftRadius: SIZES.xLarge,
    borderBottomRightRadius: SIZES.xLarge,
  },
  sectionContainer: {
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
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
    color: COLORS({opacity:0.8}).primary,
  },
  label:{
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).navy,
    margin: SIZES.xSmall,
  },
});