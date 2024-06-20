import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, ScrollView } from 'react-native';
import { COLORS, SHADOWS, FONT, textSIZES, viewSIZES } from "../../constants";
import { ExpandableView } from "../../utils";
import { Ionicons } from "@expo/vector-icons";

const defaultImage = require("../../assets/icon.png");

const expandedCard = ({contact}) => {
  return (
    <ScrollView style={styles.expandedContainer}>
      {contact.company && (
        <View style={styles.property}>
          <Text style={styles.label}>Company</Text>
          <Text style={styles.value}>{contact.company}</Text>
        </View>
      )}
      {contact.phoneNumber && (
        <View style={styles.property}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{contact.phoneNumber}</Text>
        </View>
      )}
      {contact.birthday && (
        <View style={styles.property}>
          <Text style={styles.label}>Birthday</Text>
          <Text style={styles.value}>{contact.birthday}</Text>
        </View>
      )}
      {contact.address && (
        <View style={styles.property}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{contact.address}</Text>
        </View>
      )}
      {contact.notes && (
        <View style={styles.property}>
          <Text style={styles.label}>Latest Update</Text>
          <Text style={styles.value}>{contact.notes}</Text>
        </View>
      )}
    </ScrollView>
  )
};

const ContactCard = ({contact}) => {

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
        <Image 
            source={defaultImage}
            resizeMode='contain'
            style={styles.contactImage}
          />
          <View>
            <Text style={styles.title} numberOfLines={1}>{contact.name}</Text>
            {contact.handle && (
              <Text style={styles.company} numberOfLines={1}>@{contact.handle}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <ExpandableView expanded={isExpanded} view={expandedCard} params={{contact}} vh={300} />
    </View>
  )
};


const styles = StyleSheet.create({
  cardContainer: {
    flex:1,
    margin: textSIZES.xSmall,
    backgroundColor: "#FFF",
    borderRadius: textSIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  titleContainer: {
    width: '100%',
    padding: textSIZES.small,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderBottomLeftRadius: textSIZES.small,
    borderBottomRightRadius: textSIZES.small,
  },
  title: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).navy,
  },
  handle: {
    fontSize: textSIZES.xSmall,
    //fontFamily: "DMRegular",
    color: COLORS({opacity:1}).primary,
    textTransform: "capitalize",
  },
  expandedContainer: {
    margin: textSIZES.xSmall,
    paddingBottom: textSIZES.small,
    paddingHorizontal: textSIZES.xxSmall,
    flex: 1,
    height: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: textSIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  contactImage: {
    width: textSIZES.xxLarge+5,
    height: textSIZES.xxLarge+5,
    borderWidth: 1,
    borderRadius: textSIZES.xxSmall,
    borderColor: COLORS({opacity:1}).navy,
    marginRight: textSIZES.xxSmall,
  },
  property:{
    fontSize: textSIZES.xSmall,
    //fontFamily: FONT.regular,
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
});

export default ContactCard