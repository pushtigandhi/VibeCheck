import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";
import { GETitems, POSTcreateItem, BASE_URL } from "../API";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import HomeNavigation from "./HomeNavigation";
import { GETdirectoryTEST } from "../API";
import DirectoryCard from "./cards/DirectoryCard"

export default function Directory ({scrollEnabled = true}) {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const data = ["hello","world","i","have","arrived"];

  // function goHome() {
  //   navigation.navigate('Home', { refresh: Math.random() });
  // }

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
          console.log(categories_);
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


  const renderCategory = ({ item }) => (
    <View key={item["_id"] + "root"} >
        <DirectoryCard category={item} key={item["_id"]} sections={item.sections} />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
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
    height: '100%',
    width: '100%',
    backgroundColor: COLORS({opacity:1}).lightWhite,
  },
});