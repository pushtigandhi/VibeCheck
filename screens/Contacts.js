import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import ContactCard from "./cards/ContactCard";
import { COLORS, FONT, SIZES } from "../constants";
import HomeNavigation from "./HomeNavigation";
import { GETcontacts } from "../API";

export default function Contacts ({scrollEnabled = true}) {
  const [contacts, setContacts] = useState([]);

  async function getContactsFromAPI() {
    try {
        let contacts_ = await GETcontacts();
        return contacts_;
    } catch (error) {
      console.log("error fetching items");
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    getContactsFromAPI().then((contacts_) => {
      setContacts(contacts_);
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
        data={contacts}
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
  container: {
    width: "100%",
    justifyContent: 'center',
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});