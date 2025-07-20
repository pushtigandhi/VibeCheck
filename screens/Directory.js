import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput, Modal, Keyboard, TouchableWithoutFeedback } from "react-native";
import { COLORS, FONT, textSIZES, SHADOWS, viewSIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import HomeNavigation from "./HomeNavigation";
import { GETdirectory, POSTcategory, DELETEcategory, PATCHcategory } from "../API";
import DirectoryCard from "./cards/DirectoryCard"
import { Alert } from "react-native";
export default function Directory ({navigation, scrollEnabled = true}) {
  const [categories, setCategories] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  async function addNewCategory(newTitle) {
    if (newTitle) {
      const category = {
        title: newTitle,
      };

      try{
        (async () => {
          await POSTcategory(category).then((directory) => {
            if (directory) {
              setCategories(directory);
            } else {
              alert("Failed.");
            }
          });
        })()
      } catch (err) {
        alert(err.message)
      }
    }
  }

  async function deleteCategory(categoryID) { 
    try {
      await DELETEcategory(categoryID).then((directory) => {
        if (directory.length > 0) {
          setCategories(directory);
        } else {
          alert("Failed.");
        }
      });
    } catch (err) {
      alert(err.message);
    }
  }

  async function editCategory(categoryID, newTitle) {
    const category = {
      id: categoryID,
      title: newTitle,
    };
    try {
      await PATCHcategory(category).then((directory) => {
        if (directory) {
          setCategories(directory);
        }
      }); 
    } catch (err) {
      alert(err.message);
    }
  }

  async function getDirectoryFromAPI() {
    try { 
      await GETdirectory().then((directory) => {
        if (directory) {
          setCategories(directory);
          return directory;
        } else {
          alert("Failed.");
        }
      });
    } catch (error) {
      console.log("error fetching directory");
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    getDirectoryFromAPI().catch((err) => {
        alert(err.message)
    })
  }, []) // only run once on load

  function doSearch() {
    // Optionally implement search logic for categories here
    // For now, just filter locally
    if (!search.trim()) return categories;
    return categories.filter(cat => cat.title.toLowerCase().includes(search.trim().toLowerCase()));
  }

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setSearchFocused(false); }}>
      <SafeAreaView style={styles.screen}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: textSIZES.xSmall, marginTop: textSIZES.xSmall}}>
          <View style={[styles.row, styles.header, {flex: 1, marginRight: textSIZES.small}]}> 
            <Ionicons name={"search-outline"} size={textSIZES.large} style={styles.iconInverse} />
            <TextInput
              style={{flex: 1, fontSize: textSIZES.large, color: COLORS({opacity:1}).primary}}
              {...(search ? { defaultValue: search } : { placeholder: "Directory" })}
              onChangeText={setSearch}
              returnKeyType='search'
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              showSoftInputOnFocus={true}
              caretHidden={!searchFocused}
            />
          </View>
          <TouchableOpacity
            onPress={() => (() => {
              Alert.prompt(
                "Enter New Name",
                "Enter name:",
                [
                  {text: "Cancel", style: "cancel"},
                  {text: "Create", style: "default", onPress: (newTitle) => {
                    if (newTitle && newTitle.trim() !== "") {
                      addNewCategory(newTitle);
                    }
                  }}
                ],
                "plain-text",
              );
            })()}
            style={[styles.button]}
          >
            <Ionicons name={"add-circle"} size={textSIZES.xxLarge} style={styles.icon}/>
          </TouchableOpacity>
        </View>

        <FlatList
          scrollEnabled={scrollEnabled}
          data={doSearch()}
          renderItem={({item}) => (
            <View key={item["_id"] + "root"} style={styles.cardContainer}>
              <DirectoryCard navigation={navigation} category={item} key={item["_id"]} handleRename={(newTitle) => editCategory(item["_id"], newTitle)} handleDelete={() => deleteCategory(item["_id"])} />
            </View>
          )}
        />
        <HomeNavigation size={30} iconColor={COLORS({opacity:1}).primary}/>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    alignItems: "center",
  },
  headerText: {
    fontSize: textSIZES.medium,
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
    padding: textSIZES.xxSmall,
    backgroundColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xxSmall,
    alignItems: 'center',
  },
  icon: {
    color: COLORS({opacity:1}).lightWhite,
  },
  iconInverse: {
      //margin: textSIZES.xxSmall,
      color: COLORS({opacity:1}).primary,
  },
  newCategory: {
    margin: textSIZES.xSmall
  },
});