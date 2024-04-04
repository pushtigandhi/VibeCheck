import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, ScrollView } from 'react-native';
import { COLORS, SHADOWS, FONT, SIZES } from "../../constants";
import { ExpandableView } from "../../utils";
import { Ionicons } from "@expo/vector-icons";

const expandedCard = ({contact}) => {
  return (
    <ScrollView style={styles.expandedContainer}>
      <View style={styles.property}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{contact.phoneNumber}</Text>
      </View>
      <View style={styles.property}>
        <Text style={styles.label}>Birthday</Text>
        <Text style={styles.value}>{contact.birthday}</Text>
      </View>
      <View style={styles.property}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{contact.address}</Text>
      </View>
      <View style={styles.property}>
        <Text style={styles.label}>Latest Update</Text>
        <Text style={styles.value}>{contact.notes}</Text>
      </View>
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
            source={{ uri: 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'}}
            resizeMode='contain'
            style={styles.contactImage}
          />
          <View>
            <Text style={styles.title} numberOfLines={1}>{contact.name}</Text>
            {contact.company && (
              <Text style={styles.company} numberOfLines={1}>{contact.company}</Text>
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
    width: '95%',
    margin: SIZES.xSmall,
    backgroundColor: "#FFF",
    borderRadius: SIZES.xLarge,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  titleContainer: {
    width: '100%',
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderBottomWidth: 1,
    borderBottomLeftRadius: SIZES.xLarge,
    borderBottomRightRadius: SIZES.xLarge,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).navy,
  },
  company: {
    fontSize: SIZES.small,
    //fontFamily: "DMRegular",
    color: COLORS({opacity:1}).darkBlue,
    textTransform: "capitalize",
  },
  expandedContainer: {
    margin: SIZES.xSmall,
    paddingBottom: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    flex: 1,
    height: 200,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).darkBlue,
  },
  contactImage: {
    width: SIZES.xxLarge+5,
    height: SIZES.xxLarge+5,
    borderWidth: 1,
    borderRadius: SIZES.xxSmall,
    borderColor: COLORS({opacity:1}).navy,
    marginRight: SIZES.xxSmall,
  },
  property:{
    fontSize: SIZES.smedium,
    //fontFamily: FONT.regular,
    color: COLORS({opacity:0.8}).darkBlue,
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    marginRight: SIZES.xxSmall,
    backgroundColor: COLORS({opacity:0.2}).tertiary,
    borderRadius: SIZES.small,
  },
  label:{
    fontSize: SIZES.smedium,
    //fontFamily: FONT.regular,
    color: COLORS({opacity:1}).navy,
    padding: SIZES.xxSmall,
    marginBottom: 2,
  },
  value: {
    fontSize: SIZES.smedium,
    //fontFamily: FONT.regular,
    padding: SIZES.xxSmall,
    color: COLORS({opacity:1}).darkBlue,
  },
});

export default ContactCard