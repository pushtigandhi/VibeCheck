import { FlatList, Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { textSIZES, COLORS, viewSIZES, SHADOWS, FONT } from "../../constants";

const defaultImage = require("../../assets/icon.png");

export const ListView = ({items, navigation, doRefresh}) => (
    <FlatList
    scrollEnabled={true}
    data={items}
    renderItem={({item}) => (
      <TouchableOpacity
        onPress={() => {
            navigation.navigate("Item", {item, doRefresh});
        }}
        key={item["_id"] + "root"} 
        style={styles.cardsContainer}
      >
        <View style={{flexDirection: "row"}}>
          <View style={{ justifyContent: "center"}}>
            <Text style={{ fontSize: textSIZES.medium}}>{item.icon}</Text>
          </View>
          <View style={styles.dayCardContainer}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            {!!item.location && (
              <Text style={styles.prop}>Location: {item.location}</Text>
            )}
            {!!item.subtasks && item.subtasks.length > 0 && (
              <Text style={styles.prop}>Subtasks: {item.subtasks.length}</Text>
            )}
            {!!item.priority && (
              <Text style={styles.prop}>Priority: {item.priority}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    )}
  />
  );

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "#FFF",
    },
    filterButtonIcon: {
      height: textSIZES.xxLarge,
      width: textSIZES.xxLarge,
      marginRight: textSIZES.xSmall,
      borderRadius: textSIZES.xxSmall,
      backgroundColor: COLORS({opacity:0.7}).primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButton: {
      height: textSIZES.xxLarge,
      borderRadius: textSIZES.xxSmall,
      //marginHorizontal: textSIZES.small,
      backgroundColor: COLORS({opacity:0.7}).primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchInput: {
      marginRight: textSIZES.xSmall,
      borderRadius: textSIZES.xSmall,
      backgroundColor: COLORS({opacity:0.5}).secondary,
    },
    title: {
      fontSize: textSIZES.medium,
      fontFamily: FONT.regular,
      color: COLORS({opacity:1}).primary,
      
    },
    section: {
      fontSize: textSIZES.small,
      fontFamily: FONT.regular,
      color: COLORS({opacity:1}).white,
    },
    icon: {
      marginRight: textSIZES.xxSmall,
      color: COLORS({opacity:0.8}).primary,
    },
    iconInverted: {
      color: COLORS({opacity:1}).white,
      margin: textSIZES.xxSmall,
    },
    propContainer: {
      paddingHorizontal: textSIZES.large,
      paddingBottom: textSIZES.small,
      borderColor: COLORS({opacity:0.5}).primary,
      borderBottomWidth: 1,
      borderRadius: textSIZES.small,
      backgroundColor: "#FFF"
    },
    container: {
      flex: 1,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor:  COLORS({opacity:1}).lightWhite,
      paddingVertical: textSIZES.xxSmall,
    },
    tab: {
      paddingVertical: textSIZES.xxSmall,
      paddingHorizontal: textSIZES.large,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: COLORS({opacity:0.8}).primary,
    },
    contentContainer: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    cardsContainer: {
      marginTop: textSIZES.small,
      marginHorizontal: textSIZES.small,
      padding: textSIZES.small,
      borderColor: COLORS({opacity:1}).lightGrey,
      backgroundColor: COLORS({opacity:0.1}).white,
      borderRadius: textSIZES.xSmall,
      ...SHADOWS.small,
      shadowColor: COLORS({opacity:1}).shadow,
      borderWidth:0.50,
      alignContent: "center"
    },
    imageBox: {
      margin: textSIZES.Small,
    },
    itemTitle: {
      fontSize: textSIZES.small,
      fontFamily: FONT.regular,
    },
    prop: {
      fontWeight: "200",
    },
    dayCardContainer: {
      flex: 1,
      marginLeft: textSIZES.xSmall,
    },
  });