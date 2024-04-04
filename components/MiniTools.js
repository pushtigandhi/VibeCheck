import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import { ItemType } from "../constants";
import { Ionicons } from "@expo/vector-icons";

export default function MiniTools ({navigation, route, setFilterVisible, doSearch}) {

  const [expandSearchBar, setSearchBar] = useState(false);

  useEffect(() => {
  }, []) // only run once on load

  return (
    <View style={styles.row}>
        <TouchableOpacity
            style={[styles.row, styles.searchInput]}
            onPress={() => {
            setSearchBar(!expandSearchBar);
            }}
        >
            <Ionicons name={"search-outline"} size={20} style={styles.iconInverted} />
            {expandSearchBar && (
            <TextInput style={{width: SIZES.xxLarge*3, fontSize: SIZES.medium, color: COLORS({opacity:1}).primary}} 
                placeholder="search"
                onSubmitEditing={(newSearch) => (setSearchBar(false), doSearch(newSearch))}
                returnKeyType='search'
            /> 
            )}
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
            setFilterVisible(true);
            }}
            style={styles.filterButtonIcon}
        >
            <Ionicons name={"funnel-outline"} size={20} style={styles.iconInverted}/>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {navigation.navigate(route[0], route[1])}}
            style={[styles.row, styles.addButtonIcon]}
        >
            <Ionicons name={"add-circle"} size={20} style={styles.iconInverted}/>
        </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
  filterButtonIcon: {
    height: SIZES.xxLarge,
    width: SIZES.xxLarge,
    marginRight: SIZES.small,
    borderRadius: SIZES.xxSmall,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonIcon: {
    height: SIZES.xxLarge,
    width: SIZES.xxLarge,
    borderRadius: SIZES.xxSmall,
    backgroundColor: COLORS({opacity:1}).primary,
    marginRight: SIZES.xxSmall,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: COLORS({opacity:0.5}).secondary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
    margin: SIZES.xxSmall,
  },
});