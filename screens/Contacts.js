import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import ContactCard from "./cards/ContactCard";
import { COLORS, FONT, textSIZES, viewSIZES } from "../constants";
import HomeNavigation from "./HomeNavigation";
import { GETcontactsTEST } from "../API";
import { Ionicons } from "@expo/vector-icons";

export default function Contacts ({scrollEnabled = true}) {
  const [contacts, setContacts] = useState([]);

  async function getContactsFromAPI() {
    try {
        let contacts_ = await GETcontactsTEST();
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

  const renderContact = ({ item }) => (
    <View key={item._id + "root"} >
        <ContactCard key={item._id} contact={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contacts</Text>
        <TouchableOpacity
          //onPress={() => (setShowInput(true))}
          style={[styles.row, styles.addButton]}
        >
          <Ionicons name={"add-circle"} size={textSIZES.xLarge} style={styles.icon}/>
        </TouchableOpacity>
      </View>
      <FlatList
        scrollEnabled={scrollEnabled}
        data={contacts}
        renderItem={renderContact}
      />
      <HomeNavigation size={30} iconColor={COLORS({opacity:1}).primary}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex:1,
    backgroundColor: COLORS({opacity:1}).white,
  },
  header:{
    padding: textSIZES.xSmall,
    marginHorizontal: textSIZES.xSmall,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xSmall,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: textSIZES.large,
    color: COLORS({opacity:1}).primary,
  },
  icon: {
    color: COLORS({opacity:0.8}).primary,
  },
});