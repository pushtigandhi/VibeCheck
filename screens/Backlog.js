import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";
import HomeNavigation from "./HomeNavigation";
import { GETitems, GETitemsTEST } from "../API";
import ContactCard from "./cards/ContactCard";

export default function Backlog ({scrollEnabled = true}) {
  const [items, setItems] = useState([]);

  async function getItemsFromAPI() {
    try {
      let items_ = await GETitemsTEST({ category: "Backlog"});
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
    <View key={item._id + "root"} >
        <ContactCard key={item._id} contact={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
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
});