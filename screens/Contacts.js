import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, Text, TouchableOpacity, TextInput, Image, ScrollView, Modal } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, FONT, textSIZES, viewSIZES, SHADOWS } from "../constants";
import HomeNavigation from "./HomeNavigation";
import { GETcontactsTEST } from "../API";
import { Ionicons } from "@expo/vector-icons";
import ContactCard from "./cards/ContactCard";

const defaultImage = require("../assets/icon.png");


export default function Contacts ({scrollEnabled = true}) {
  const [contacts, setContacts] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
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
        renderItem={({item}) => (
          <View key={item._id + "root"} >
            <View style={styles.cardContainer}>
              <TouchableOpacity
                onPress={() => {
                    setSelectedContact(item);
                    setIsExpanded(!isExpanded);
                  }}
                style={styles.titleContainer}
              >
                <View style={styles.cardContent}> 
                  <Image 
                    source={defaultImage}
                    resizeMode='contain'
                    style={styles.contactImage}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>{item.name || "Name"}</Text>
                    {item.handle && (
                      <Text style={styles.handle} numberOfLines={1}>@{item.handle}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contactsGrid}
      />
      <HomeNavigation size={30} iconColor={COLORS({opacity:1}).primary}/>
        <ContactCard 
          contact={selectedContact} 
          visible={isExpanded} 
          onClose={() => setIsExpanded(false)} 
        />
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
  // ContactCard styles
  cardContainer: {
    flex: 1,
    margin: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:1}).white,
    borderRadius: textSIZES.small,
    borderWidth: 1,
    borderColor: COLORS({opacity:0.3}).primary,
    shadowColor: COLORS({opacity:1}).black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  titleContainer: {
    flex: 1,
    padding: textSIZES.small,
  },
  cardContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    marginTop: textSIZES.xSmall,
  },
  title: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
    textAlign: "center",
    fontWeight: "500",
  },
  handle: {
    fontSize: textSIZES.xSmall,
    color: COLORS({opacity:0.7}).primary,
    textAlign: "center",
    marginTop: textSIZES.tiny,
  },
  expandedContainer: {
    margin: textSIZES.xSmall,
    paddingBottom: textSIZES.small,
    padding: textSIZES.xxSmall,
    flex: 1,
    height: viewSIZES.small,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderBottomLeftRadius: textSIZES.small,
    borderBottomRightRadius: textSIZES.small,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contactImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS({opacity:0.3}).primary,
    backgroundColor: COLORS({opacity:0.1}).primary,
  },
  property:{
    fontSize: textSIZES.xSmall,
    color: COLORS({opacity:0.8}).primary,
    margin: textSIZES.xxSmall,
    padding: textSIZES.xxSmall,
    backgroundColor: COLORS({opacity:0.2}).tertiary,
    borderRadius: textSIZES.xSmall,
  },
  label:{
    fontSize: textSIZES.xSmall,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).secondary,
    padding: textSIZES.xxSmall,
    marginBottom: 2,
  },
  value: {
    fontSize: textSIZES.xSmall,
    fontFamily: FONT.regular,
    padding: textSIZES.xxSmall,
  },
  contactsGrid: {
    padding: textSIZES.xSmall,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: textSIZES.xSmall,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS({opacity:1}).white,
    borderRadius: textSIZES.small,
    padding: textSIZES.small,
    margin: textSIZES.xSmall,
    width: '90%',
    maxHeight: '80%',
    shadowColor: COLORS({opacity:1}).black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: textSIZES.small,
  },
  modalAvatarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS({opacity:0.3}).primary,
    backgroundColor: COLORS({opacity:0.1}).primary,
    marginBottom: textSIZES.xSmall,
  },
  modalName: {
    fontSize: textSIZES.large,
    fontFamily: FONT.medium,
    color: COLORS({opacity:1}).primary,
    textAlign: 'center',
    marginBottom: textSIZES.tiny,
  },
  modalHandle: {
    fontSize: textSIZES.small,
    color: COLORS({opacity:0.7}).primary,
    textAlign: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS({opacity:0.1}).primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    color: COLORS({opacity:1}).primary,
  },
  modalScrollView: {
    maxHeight: 400,
  },
});