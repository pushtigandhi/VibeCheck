import { FlatList, Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { textSIZES, COLORS, viewSIZES, SHADOWS, FONT } from "../../constants";

const defaultImage = require("../../assets/icon.png");

export const GalleryView = ({items, navigation, doRefresh}) => (
    <FlatList
      scrollEnabled={true}
      data={items}
      numColumns={3} 
      renderItem={({item}) => (
        <TouchableOpacity style={styles.cardsContainer} key={item["_id"] + "_root"}
          onPress={() => {
              navigation.navigate("Item", {item, doRefresh});
          }}
        >
          <View style={styles.imageBox}>
            <Image
                source={item.favicon ? { uri: item.favicon.uri } : defaultImage}
                style={[styles.border, { width: '100%', height: 130}]}
                //style={[styles.border, { width: 130, height: 130}]}
            />
          </View>
          <View style={[styles.row, {overflow: 'hidden'}]}>
            <Text style={{fontSize: textSIZES.medium}}>{item.icon}</Text>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );

  const styles = StyleSheet.create({
    title: {
    },
    section: {
    },
    icon: {
      marginRight: textSIZES.xxSmall,
      color: COLORS({opacity:0.8}).primary,
    },
    iconInverted: {
      color: COLORS({opacity:1}).white,
      margin: textSIZES.xxSmall,
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    cardsContainer: {
      //margin: textSIZES.xSmall,
      //marginBottom: textSIZES.tiny,
      //paddingHorizontal: textSIZES.xSmall,
      //paddingVertical: textSIZES.xSmall,
      backgroundColor: COLORS({opacity:1}).lightWhite,
      //...SHADOWS.small,
      //shadowColor: COLORS({opacity:1}).shadow,
      //borderRadius: textSIZES.xSmall,
      borderWidth: 1, 
      borderColor: COLORS({opacity:1}).lightWhite,
      alignContent: "center",
      width: '33.3%',
    },
    imageBox: {
      margin: textSIZES.Small,
      width: '100%',
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