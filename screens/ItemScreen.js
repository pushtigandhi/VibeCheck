import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal,Dimensions } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import HomeNavigation from "./HomeNavigation";
import { GETitems, GETitemsTEST } from "../API";
import { ItemType, ViewType } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../components/FilterModal";
import DefaultView from "./views/DefaultView";

export default function ItemScreen ({navigation, route, scrollEnabled = true}) {
  const [title, setTitle] = useState([]);
  
  const [items, setItems] = useState(route.params?.item);
  const [filter, setFilter] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [expandSearchBar, setSearchBar] = useState(false);

  function closeFilter() {
    setRefreshing(!refreshing);
    setFilterVisible(false);
  }

  function doSearch() {
    console.log(search);
    setSearchBar(false);
  }

  async function getSectionItemsFromAPI() {
    try {
      let items_ = await GETitemsTEST(ItemType.Item, filter);
      return items_;
    } catch (error) {
      console.log("error fetching items");
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    setTitle(route.params?.section);
    setFilter({... filter, category: route.params?.category, section: route.params?.section})
  }, []) // only run once on load

  // useEffect(() => {
  //   getSectionItemsFromAPI().then((items_) => {
  //     setItems(items_);
  //   }).catch((err) => {
  //     alert(err.message)
  //   })
  // }, [refreshing])

  return (
    <SafeAreaView style={styles.screen}>
         <View style={[styles.row, styles.propContainer, {justifyContent: "space-between"}]}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.row, styles.searchInput]}
              onPress={() => {
                setSearchBar(!expandSearchBar);
              }}
            >
              <Ionicons name={"search-outline"} size={20} style={styles.iconInverted} />
              {expandSearchBar && (
                <TextInput style={{width: SIZES.xxLarge*4, fontSize: SIZES.medium, color: COLORS({opacity:1}).primary}} 
                  {...(search ? { defaultValue: search } : { placeholder: "search" })}
                  onChangeText={(newSearch) => (setSearch(newSearch))}
                  returnKeyType='search'
                  onSubmitEditing={() => (doSearch())}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilterVisible(true);
              }}
              style={styles.filterButtonIcon}
            >
              <Ionicons name={"funnel-outline"} size={20} style={styles.iconInverted}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // route.params?.isSection ? 
                //   navigation.navigate("EditItem", {item: {"category": route.params?.category.title, "section": route.params?.section, "icon": '\u{1F4E6}', "itemType" : ItemType.Item}})
                //   : 
                //   navigation.navigate("EditItem", {item: route.params?.item})
              }}
              style={[styles.row, styles.addButton]}
            >
              <Ionicons name={"add-circle"} size={20} style={styles.iconInverted}/>
            </TouchableOpacity>
          </View>
        </View>
        
        <Modal visible={filterVisible} animationType="slide" onRequestClose={closeFilter}>
          <FilterModal closeFilter={closeFilter} filter={filter} setFilter={setFilter} />
        </Modal>

        <DefaultView items={items} navigation={navigation} />
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  filterButtonIcon: {
    height: SIZES.xxLarge,
    width: SIZES.xxLarge,
    marginRight: SIZES.small,
    borderRadius: SIZES.xxSmall,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    height: SIZES.xxLarge,
    borderRadius: SIZES.xxSmall,
    //marginHorizontal: SIZES.medium,
    backgroundColor: COLORS({opacity:0.7}).primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: COLORS({opacity:0.5}).secondary,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
  },
  row: {
    flexDirection: "row",
    //justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
    margin: SIZES.xxSmall,
  },
  propContainer: {
    paddingHorizontal: SIZES.large,
    paddingBottom: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderRadius: SIZES.medium,
    backgroundColor: "#FFF"
  },
});