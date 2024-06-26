import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { COLORS, FONT, textSIZES, SHADOWS, viewSIZES } from "../constants";
import { GETitems, POSTcreateItem, POSTaddCategory, BASE_URL, GETmeTEST, POSTaddCategoryTEST } from "../API";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import HomeNavigation from "./HomeNavigation";
import { GETdirectoryTEST } from "../API";
import DirectoryCard from "./cards/DirectoryCard"
import SelectView from "./SelectView";

export default function Directory ({navigation, scrollEnabled = true}) {
  const [categories, setCategories] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState('New');
  
  async function getProfileID() {
    try {
      GETmeTEST().then((profile) => {
        if (!!profile) {
          //console.log(profile["_id"]);
          return profile["_id"].toString();
        } else {
          alert("Failed.");
        }
      });
    } catch (err) {
      console.log("get me failed. "+err);
    }
  }

  async function addNewCategory() {
    const category = {
      title: newCategory,
      sections: [{"title": "All", "view": "Default"}]
    };

    getProfileID().then((profileID) => {
      //console.log(profileID)
      (async () => {
        POSTaddCategoryTEST(profileID, {
          ...category,
          _id: null
        }).then((newCat) => {
          if (!!newCat) {
            alert("Success!");
          } else {
            alert("Failed.");
          }
        });
      })()
    }).catch((err) => {
      alert(err.message)
    })
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
        <Text style={styles.headerText}>Directory</Text>
        <TouchableOpacity
          onPress={() => (setShowInput(true))}
          style={[styles.row, styles.addButton]}
        >
          <Ionicons name={"add-circle"} size={textSIZES.xLarge} style={styles.icon}/>
        </TouchableOpacity>
      </View>

      {showInput==true && (
        <View style={styles.newCategory}>
          <TextInput style={styles.inputBox}
            value={newCategory}
            onChangeText={setNewCategory}
            returnKeyType='default'
          /> 
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightRed}]} onPress={() => setShowInput(false)}>
              <Ionicons name={"close-outline"} size={textSIZES.small} style={styles.iconInverse}/> 
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightGreen}]} onPress={addNewCategory}>
              <Ionicons name={"checkmark-outline"} size={textSIZES.small} style={styles.iconInverse}/> 
            </TouchableOpacity>
          </View>
          
        </View>
      )}
      
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
    padding: textSIZES.xSmall,
    marginHorizontal: textSIZES.xSmall,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xSmall,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: textSIZES.large,
    color: COLORS({opacity:1}).primary,
  },
  cardContainer: {
    margin: textSIZES.xxSmall,
    backgroundColor: "#FFF",
    borderRadius: textSIZES.xSmall,
  },
  inputBox: {
    margin: textSIZES.xSmall,
    padding: textSIZES.xSmall,
    borderWidth: 0.5,
    borderRadius: textSIZES.xSmall,
    borderColor: COLORS({opacity:1}).primary,
    fontSize: textSIZES.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: textSIZES.xSmall,
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  icon: {
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverse: {
      //margin: textSIZES.xxSmall,
      color: COLORS({opacity:1}).lightWhite,
  },
  newCategory: {
    margin: textSIZES.xSmall
  },
});