import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import DirectoryCard from "./cards/DirectoryCard";
import { COLORS, FONT, SIZES } from "../constants";
import { GETitems, POSTcreateItem, BASE_URL } from "../API";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import HomeNavigation from "./HomeNavigation";


export default function Directory ({scrollEnabled = true}) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const data = ["hello","world","i","have","arrived"];

  // function goHome() {
  //   navigation.navigate('Home', { refresh: Math.random() });
  // }

  function createPost() {
    const item = {
      title: title,
    };

    (async () => {
      POSTcreateItem({
        ...item,
        _id: null
      }).then((newItem) => {
        if (!!newItem) {
          alert("Success!");
          goHome();
        } else {
          alert("Failed.");
        }
      });
    })()
  }

  async function getItemsFromAPI() {
      try {
          let items_ = await GETitems();
          return items_;
      } catch (error) {
        console.log("error fetching items");
          return [];
      }
  }

  useEffect(() => {
    getItemsFromAPI().then((items_) => {
      setItems(items_);
    }).catch((err) => {
        alert(err.message)
    })
    
  }, []) // only run once on load


  const renderItem = ({ item }) => (
    <View key={item._id + "root"} >
        <DirectoryCard item={item} key={item._id} data={data} />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        scrollEnabled={scrollEnabled}
        data={items}
        renderItem={renderItem}
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
  container: {
    width: "100%",
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});