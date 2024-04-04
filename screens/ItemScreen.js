import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import HomeNavigation from "./HomeNavigation";
import { GETitems, GETitemsTEST } from "../API";
import { ItemType } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { ExpandableView } from "../utils";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FilterModal from "../components/FilterModal";
import MiniTools from "../components/MiniTools";


const defaultImage = require("../assets/icon.png");

const ListView = ({items, navigation}) => (
  <FlatList
    scrollEnabled={true}
    data={items}
    renderItem={({item}) => (
      <TouchableOpacity style={styles.cardContainer} key={item["_id"] + "_root"}
        onPress={() => {
            navigation.navigate("Item", {item});
        }}
      >
        <View style={styles.row}>
          <Text style={{ fontSize: SIZES.regular}}>{item.icon}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )}
  /> 
);

const GalleryView = ({items, navigation}) => (
  <FlatList
    scrollEnabled={true}
    data={items}
    renderItem={({item}) => (
      <TouchableOpacity style={styles.cardContainer} key={item["_id"] + "_root"}
        onPress={() => {
            navigation.navigate("Item", {item});
        }}
      >
        <View style={styles.imageBox}>
          <Image
              source={item.favicon ? { uri: item.favicon.uri } : defaultImage}
              style={[styles.border, { width: 140, height: 140}]}
          />
        </View>
        <View style={styles.row}>
          <Text style={{fontSize: SIZES.xLarge}}>{item.icon}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
);

export default function ItemScreen ({navigation, route, scrollEnabled = true}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState([]);
  
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [expandSearchBar, setSearchBar] = useState(false);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'list' },
    { key: 'gallery' },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'list':
        return <ListView items={items} navigation={navigation} />;
      case 'gallery':
        return <GalleryView items={items} navigation={navigation} />;
      default:
        return null;
    }
  };
  const renderIcon = ({ route, focused, color }) => {
    let iconName;
  
    if (route.key === 'list') {
      iconName = focused ? 'list-circle' : 'list-circle-outline';
    } else if (route.key === 'gallery') {
      iconName = focused ? 'image' : 'image-outline';
    }
  
    // Return the icon component
    return <Ionicons name={iconName} size={30} color={COLORS({opacity:1}).primary} />;
  };

  function closeFilter() {
    //doRefresh(filter);
    setRefreshing(!refreshing);
    setFilterVisible(false);
  }

  function doSearch({search}) {
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

  async function getItemsByTypeFromAPI({itemType}) {
    try {
      let items_ = await GETitemsTEST(itemType, filter);
      return items_;
    } catch (error) {
      console.log("error fetching items");
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    if (route.params?.isSection) {
      setFilter({... filter, category: route.params?.category.title, section: route.params?.section})
    }
  }, []) // only run once on load

  useEffect(() => {
    if (route.params?.isSection) {
      setTitle(route.params?.section);
      getSectionItemsFromAPI().then((items_) => {
        setItems(items_);
      }).catch((err) => {
        alert(err.message)
      })
    }
    else {
      setTitle(route.params?.item.itemType);
      getItemsByTypeFromAPI(route.params?.item.itemType).then((items_) => {
        setItems(items_);
      }).catch((err) => {
        alert(err.message)
      })
    }
  }, [refreshing]) // only run once on load

  return (
    <SafeAreaView style={styles.screen}>
        <View style={[styles.row, styles.propContainer, {justifyContent: "space-between"}]}>
          <Text style={styles.title}>{title}</Text>
          <MiniTools navigation={navigation} setFilterVisible={setFilterVisible} doSearch={doSearch} 
            route={
              route.params?.isSection ? 
                [ItemType.Item, {item: {"category": route.params?.category.title, "section": route.params?.section, "icon": '\u{1F4E6}', "itemType" : ItemType.Item}}]
                : 
                [ItemType.Item, {item: route.params?.item}]
            }
          />
          {/* <View style={styles.row}>
            <TouchableOpacity
              style={[styles.row, styles.searchInput]}
              onPress={() => {
                setSearchBar(!expandSearchBar);
              }}
            >
              <Ionicons name={"search-outline"} size={20} style={styles.iconInverted} />
              {expandSearchBar && (
                <TextInput style={{width: SIZES.xxLarge*4, fontSize: SIZES.medium, color: COLORS({opacity:1}).primary}} 
                  placeholder="search"
                  onSubmitEditing={(newSearch) => (doSearch(newSearch))}
                  returnKeyType='search'
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
                route.params?.isSection ? 
                  navigation.navigate("Item", {item: {"category": route.params?.category.title, "section": route.params?.section, "icon": '\u{1F4E6}', "itemType" : ItemType.Item}})
                  : 
                  navigation.navigate("Item", {item: route.params?.item})
              }}
              style={[styles.row, styles.addButton]}
            >
              <Ionicons name={"add-circle"} size={20} style={styles.iconInverted}/>
            </TouchableOpacity>
          </View> */}
        </View>
        
        
        <Modal visible={filterVisible} animationType="slide" onRequestClose={closeFilter}>
          <FilterModal closeFilter={closeFilter} filter={filter} setFilter={setFilter} />
        </Modal>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: 20 }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              renderIcon={renderIcon} // Pass the renderIcon function to render icons
              style={{ backgroundColor: 'white' }}
            />
          )}
        />
        <HomeNavigation size={30} iconColor={COLORS({opacity:1}).primary}/>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  cardContainer: {
    //width: '95%',
    margin: SIZES.xSmall,
    marginBottom: SIZES.tiny,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderRadius: SIZES.small,
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
  sectionContainer: {
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
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
  expandedContainer: {
    paddingBottom: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    flex: 1,
    overflow: 'scroll',
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
  imageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: SIZES.Small,
  },
});