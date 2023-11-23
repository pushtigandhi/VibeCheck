import { View, FlatList, StyleSheet, ScrollView} from "react-native";
import DirectoryCard from "./cards/DirectoryCard";
import { COLORS, FONT, SIZES } from "../constants";
import { GETitems, POSTcreateItem, BASE_URL } from "../API";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";


export default function Directory ({scrollEnabled = true}) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");


  function goHome() {
    navigation.navigate('Home', { refresh: Math.random() });
  }

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


  return (
  <View>

  <ScrollView
        style={styles.container}
        scrollEnabled={scrollEnabled}
    >
    {items.map((item) => (
        <View style={styles.cardsContainer} key={item._id + "root"} >
            <DirectoryCard item={item} key={item._id} />
        </View>
    ))}
    <View style={{ height: 20 }} /> 
    {/* for bottom padding */}
  </ScrollView>
  </View>

  //    <View style={styles.container}>

  // <View style={styles.cardsContainer}>
  // <FlatList 
  //       data={[1,2,3,4,5, 6, 7, 8]}
  //       renderItem={() => (
  //         <DirectoryCard />
  //         )
  //       }
  //       keyExtractor={() => {}}
  //       contentContainerStyle={{ columnGap: SIZES.medium }}
        
  //     />
  // </View>
  // </View> 
  );
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
      },
    cardsContainer: {
        marginTop: SIZES.medium,
      },
});