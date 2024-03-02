import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";
import HomeNavigation from "./HomeNavigation";
import { GETitems, GETitemsTEST, ItemType } from "../API";
import ContactCard from "./cards/ContactCard";
import BacklogCard from "./cards/BacklogCard";

export default function Backlog ({navigation, scrollEnabled = true}) {
  const [items, setItems] = useState([]);

  async function getItemsFromAPI() {
    try {
      let items_ = await GETitemsTEST(ItemType.Item, { category: "Backlog"});
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
      <Text style={styles.header}>Backlog</Text>
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
    backgroundColor: COLORS({opacity:1}).lightWhite,
  },
  header:{
    fontSize: SIZES.medium,
    //fontFamily: FONT.regular,
    color: COLORS({opacity:0.9}).darkBlue,
    padding: SIZES.small,
    margin: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    borderRadius: SIZES.medium,
  },
});