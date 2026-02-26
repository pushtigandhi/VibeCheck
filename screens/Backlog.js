import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, StyleSheet, TextInput, Text, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS, FONT, textSIZES, viewSIZES, SHADOWS } from "../constants";
import HomeNavigation from "./HomeNavigation";
import { GETitems } from "../API";
import { ItemType } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const BacklogCard = ({navigation, item}) => {
  //console.log(item);
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
            navigation.navigate("Item", {item});
          }}
          style={styles.titleContainer}
      >
        <View style={styles.row}>
          <Text style={{ fontSize: textSIZES.regular, marginRight: textSIZES.xxSmall}}>{item.icon}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

export default function Backlog ({navigation, scrollEnabled = true}) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  function doSearch() {
    getItemsFromAPI().then((items_) => {
      setItems(items_);
    }).catch((err) => {
      alert(err.message)
    })
  }

  async function getItemsFromAPI() {
    let filter = { category: "Backlog" };
    
    try {
      let items_ = await GETitems(ItemType.Item, filter);
      return items_;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  useFocusEffect(
    useCallback(() => {
      getItemsFromAPI().then((items_) => {
        setItems(items_);
      }).catch((err) => {
        alert(err.message)
      });
    }, [])
  );

  const renderItem = ({ item }) => (
    <View key={item["_id"] + "root"}>
      <BacklogCard navigation={navigation} item={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.row, styles.header]}>
        <Ionicons name={"search-outline"} size={20} style={styles.iconInverted} />
        <TextInput style={{flex: 1, fontSize: textSIZES.large, color: COLORS({opacity:1}).primary}} 
          {
            ...(search ? { defaultValue: search } : { placeholder: "Backlog" })}
            onChangeText={(newSearch) => (setSearch(newSearch))}
            returnKeyType='search'
            onSubmitEditing={() => (doSearch())
          }
        /> 
      </View>
    
      {/* <Text style={styles.header}>Backlog</Text> */}
      <FlatList
        scrollEnabled={scrollEnabled}
        data={items}
        renderItem={renderItem}
      />
      <HomeNavigation size={30} iconColor={COLORS({opacity:1}).primary}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS({opacity:1}).white,
  },
  header:{
    backgroundColor: COLORS({opacity:1}).lightWhite,
    fontSize: textSIZES.small,
    color: COLORS({opacity:0.9}).primary,
    padding: textSIZES.xSmall,
    margin: textSIZES.xSmall,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xSmall,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  // BacklogCard styles
  cardContainer: {
    marginTop: textSIZES.xSmall,
    marginHorizontal: textSIZES.small,
    backgroundColor: COLORS({opacity:1}).white,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.small,
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
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
  },
  icon: {
    marginRight: textSIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
});