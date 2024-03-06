import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../../constants";
import { ExpandableView, Spacer } from '../../../utils';
import { taskProperties } from "../PropertyCards";
import Layout from "../../../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "../PropertyCards";
import TaskCard from "./TaskCard";

const expandedContactList = ({contactList, setFn}) => {
  const [contacts, setContacts] = useState(contactList);

  return (
    <View style={styles.expandedContainer}>
      <TouchableOpacity style={styles.addButtonIcon} >
        <Ionicons name={"add-circle"} size={SIZES.large} style={styles.iconInverted} />
      </TouchableOpacity>
      {contacts.length > 0 ? (contacts.map(item => (
        <View style={styles.row} key={item["_id"] + "_root"}>
          <TouchableOpacity style={styles.contactContainer} key={item["_id"]} 
            onPress={() => {}}
          >
          <Text style={styles.item} numberOfLines={1}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      ))) : (
        <View>
          <Text style={[styles.item, {marginRight: SIZES.small}]} numberOfLines={1}>None</Text>
        </View>
      )}

    </View>
  )
};

const EventCard = ({item, setFn, expanded=false}) => {
  const [location, setLocation] = useState('Location');

  const [isContactsExpanded, setIsContactsExpanded] = useState(true);
  const [isPressable, setIsPressable] = useState(true);

  return (
    <View style={styles.infoContainer}>
      <TextInput style={styles.location} 
        {...(item.location ? { defaultValue: item.location } : { placeholder: location })} 
        onChangeText={(newLocation) => (
          setLocation({"location": newLocation})
        )}
      />
      <TouchableOpacity
        onPress={() => {
          setIsContactsExpanded(!isContactsExpanded);
        }}
        style={styles.propContainer}
        disabled={!isPressable}
      >
        <View style={[styles.row, {justifyContent: "space-between"}]}>
          <View style={styles.row}>
            <Text style={styles.label} numberOfLines={1}>Contacts</Text>
          </View>
          <View>
            {isContactsExpanded ? (
                <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
            ) : (
                <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <ExpandableView expanded={isContactsExpanded} view={expandedContactList} params={{"contactList": item.contacts, "setFn": setFn}} vh={300} />
    </View>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium/2,
  },
  label: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
  },
  icon: {
    //marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).darkBlue,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  expandedContainer: {
    width: '90%',
    margin: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium/2,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    padding: SIZES.medium,
    flex: 1,
  },
  addButtonIcon: {
    height: SIZES.xxLarge,
    margin: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    fontSize: SIZES.mlarge,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  propContainer: {
    width: '90%',
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderBottomWidth: 1,
    borderRadius: SIZES.medium,
    marginHorizontal: SIZES.medium,
  },
  contactContainer: {
    margin: SIZES.xxSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).lightWhite,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
  },
  location:{
    fontSize: SIZES.medium,
    //fontFamily: FONT.regular,
    color: COLORS({opacity:0.9}).darkBlue,
    padding: SIZES.medium,
    marginHorizontal: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.medium,
  },
});

export default EventCard