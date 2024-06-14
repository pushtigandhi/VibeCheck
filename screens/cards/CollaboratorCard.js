import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { COLORS, SHADOWS, FONT, SIZES } from "../../constants";
import { ExpandableView, Spacer } from '../../utils'
import { Ionicons } from "@expo/vector-icons";

const expandedContactList = ({contactList, setFn, isEditable}) => {
  const [contacts, setContacts] = useState(contactList);

  return (
    <View style={styles.expandedContainer}>
      {isEditable==true && (
        <TouchableOpacity style={styles.addButtonIcon} >
          <Ionicons name={"add-circle"} size={SIZES.large} style={styles.iconInverted} />
        </TouchableOpacity>
      )}
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

const CollaboratorCard = ({item, setFn, isEditable=true}) => {
  const [isContactsExpanded, setIsContactsExpanded] = useState(true);

  return (
    <View style={styles.infoContainer}>
      <View style={styles.propContainer} >
        <View style={[styles.row, {justifyContent: "space-between"}]}>
          <View style={styles.row}>
            <Ionicons name={"people-outline"} size={SIZES.xLarge} style={styles.icon} />
            <Text style={styles.label} numberOfLines={1}>Collaborators</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsContactsExpanded(!isContactsExpanded);
            }}
          >
            {isContactsExpanded ? (
                <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
            ) : (
                <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <ExpandableView expanded={isContactsExpanded} view={expandedContactList} params={{"contactList": item.contacts, "setFn": setFn, "isEditable": isEditable}} vh={300} />
    </View>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium/2,
  },
  label: {
    fontSize: SIZES.medium,
    //fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
  },
  icon: {
    //marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
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
    // ...SHADOWS.medium,
    // shadowColor: COLORS({opacity:1}).shadow,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    padding: SIZES.medium,
    flex: 1,
  },
  addButtonIcon: {
    height: SIZES.xxLarge,
    margin: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    //color: COLORS({opacity:1}).primary,
  },
  propContainer: {
    flex: 1,
    paddingVertical: SIZES.xxSmall,
    marginHorizontal: SIZES.xLarge,
  },
  contactContainer: {
    margin: SIZES.xxSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).white,
    borderRadius: SIZES.small,
    borderColor: COLORS({opacity:0.5}).lightGrey,
    borderWidth: 1,
  },
});

export default CollaboratorCard