import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, TextInput } from "react-native";
import { COLORS, FONT, textSIZES, viewSIZES } from "../constants";
import HomeNavigation from "./HomeNavigation";
import { GETitems, GETitemsTEST } from "../API";
import ContactCard from "./cards/ContactCard";
import BacklogCard from "./cards/BacklogCard";
import { ItemType } from "../constants";
import { Ionicons } from "@expo/vector-icons";

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
    let filter;
    if (search == '') {
      filter = { category: "Backlog"};
    }
    else {
      filter = { category: "Backlog", search: search.trim() };
    }
    try {
      let items_ = await GETitemsTEST(ItemType.Item, filter);
      return items_;
    } catch (error) {
      console.log("error fetching items");
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    getItemsFromAPI().then((items_) => {
      setItems(items_);
    }).catch((err) => {
      alert(err.message)
    })
  }, []) // only run once on load

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer} key={item["_id"] + "root"}>
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
});