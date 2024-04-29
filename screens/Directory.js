import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import { GETitems, POSTcreateItem, BASE_URL } from "../API";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import HomeNavigation from "./HomeNavigation";
import { GETdirectoryTEST } from "../API";
import DirectoryCard from "./cards/DirectoryCard"
import SelectView from "./SelectView";

export default function Directory ({navigation, scrollEnabled = true}) {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [isDefaultExpanded, setIsDefaultExpanded] = useState(false);

  function createCategory() {
    const category = {
      title: title,
    };

    (async () => {
      POSTaddCategory({
        ...category,
        _id: null
      }).then((newCategory) => {
        if (!!newCategory) {
          alert("Success!");
        } else {
          alert("Failed.");
        }
      });
    })()
  }

  async function getDirectoryFromAPI() {
    try {
      let categories_ = await GETdirectoryTEST();
      return categories_;
    } catch (error) {
      console.log("error fetching directory");
      console.log(error);
      return [];
    }
  }



  useEffect(() => {
    getDirectoryFromAPI().then((categories_) => {
      setCategories(categories_);
    }).catch((err) => {
        alert(err.message)
    })
    
  }, []) // only run once on load

  function onClose() {
    setIsDefaultExpanded(false);
  } 


  const renderCategory = ({ item }) => (
    <View key={item["_id"] + "root"} style={styles.cardContainer}>
        <DirectoryCard navigation={navigation} category={item} key={item["_id"]} sections={item.sections} />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
    <View style={styles.header}>
      <Text>Directory</Text>
      <TouchableOpacity
        onPress={() => (setIsDefaultExpanded(true))}
        style={[styles.row, styles.addButton]}
      >
        <Ionicons name={"add-circle"} size={20} style={styles.iconInverted}/>
      </TouchableOpacity>
    </View>

    <Modal visible={isDefaultExpanded} animationType="slide" onRequestClose={onClose}>
      <SelectView onClose={onClose} />
    </Modal>
      
      <FlatList
        scrollEnabled={scrollEnabled}
        data={categories}
        renderItem={renderCategory}
      />
      <HomeNavigation size={30} iconColor={COLORS({opacity:1}).primary}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS({opacity:1}).white,
  },
  header:{
    fontSize: SIZES.medium,
    //fontFamily: FONT.regular,
    color: COLORS({opacity:0.9}).darkBlue,
    padding: SIZES.small,
    margin: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    borderRadius: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardContainer: {
    //width: '100%',
    margin: SIZES.xSmall,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
});