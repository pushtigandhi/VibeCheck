import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { COLORS, SHADOWS, FONT, textSIZES, viewSIZES } from "../../constants";
import { ExpandableView, Spacer } from '../../utils'
import { Ionicons } from "@expo/vector-icons";

const expandedItemList = ({itemList, setFn, isEditable}) => {
  const [items, setItems] = useState(itemList);

  return (
    <View style={styles.expandedContainer}>
      {isEditable==true && (
        <TouchableOpacity style={styles.addButtonIcon} >
          <Ionicons name={"add-circle"} size={textSIZES.large} style={styles.iconInverted} />
        </TouchableOpacity>
      )}
        {items.length > 0 ? (items.map(item => (
        <View style={styles.row} key={item["_id"] + "_root"}>
          <TouchableOpacity style={styles.itemContainer} key={item["_id"]} 
            onPress={() => {}}
          >
          <Text style={styles.item} numberOfLines={1}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      ))) : (
        <View>
          <Text style={[styles.item, {marginRight: textSIZES.xSmall}]} numberOfLines={1}>None</Text>
        </View>
      )}

    </View>
  )
};

const ListView = ({item, setFn, isEditable=true}) => {
  const [isItemsExpanded, setIsItemsExpanded] = useState(true);

  return (
    <View style={styles.infoContainer}>
      <View style={styles.propContainer} >
        <TouchableOpacity
          onPress={() => {
            setIsItemsExpanded(!isItemsExpanded);
          }}
          style={[styles.row, {justifyContent: "space-between"}]}
        >
          <View style={styles.row}>
            {item.type === 'Item' && (
              <Ionicons name="list-outline" size={textSIZES.medium} style={[styles.icon, {marginRight: textSIZES.xxSmall}]}/>
            )}
            {item.type === 'Contact' && (
              <Ionicons name="people-outline" size={textSIZES.medium} style={[styles.icon, {marginRight: textSIZES.xxSmall}]}/>
            )}
            <Text style={styles.label} numberOfLines={1}>{item.name}</Text>
          </View>
          {isItemsExpanded ? (
              <Ionicons name="chevron-up-outline" size={textSIZES.xLarge} style={styles.icon}/>
          ) : (
              <Ionicons name="chevron-down-outline" size={textSIZES.xLarge} style={styles.icon}/>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      <ExpandableView expanded={isItemsExpanded} view={expandedItemList} params={{"itemList": item.ids, "setFn": setFn, "isEditable": isEditable}} vh={300} />
    </View>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    borderRadius: textSIZES.small/2,
  },
  label: {
    fontSize: textSIZES.small,
    //fontFamily: FONT.regular,
    marginLeft: textSIZES.xxSmall,
    color: COLORS({opacity:1}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
  },
  icon: {
    //marginRight: textSIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  expandedContainer: {
    backgroundColor: COLORS.lightWhite,
    flex: 1,
    marginHorizontal: textSIZES.medium,
  },
  addButtonIcon: {
    height: textSIZES.xxLarge,
    margin: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    //fontSize: textSIZES.small,
    //fontFamily: FONT.regular,
    //color: COLORS({opacity:1}).primary,
  },
  propContainer: {
    flex: 1,
    paddingVertical: textSIZES.xSmall,
    marginHorizontal: textSIZES.xLarge,
  },
  itemContainer: {
    margin: textSIZES.xxSmall,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).white,
    borderRadius: textSIZES.xSmall,
    borderColor: COLORS({opacity:0.5}).lightGrey,
    borderWidth: 1,
    flex: 1,
  },
  divider: {
    paddingHorizontal: textSIZES.small,
    borderBottomWidth: 1,
    borderColor: COLORS({opacity:0.7}).primary,
    marginBottom: textSIZES.xSmall,
    marginHorizontal: textSIZES.xLarge,
},
});

export default ListView