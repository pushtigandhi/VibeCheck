import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal,Dimensions } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS, ItemType, ViewType } from "../../constants";
import { GETitems, GETitemsTEST } from "../../API";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../../components/FilterModal";

const ListView = ({items, navigation}) => (
  <FlatList
    scrollEnabled={true}
    data={items}
    renderItem={({item}) => (
      <TouchableOpacity
        onPress={() => {
            navigation.navigate("Item", {item});
        }}
        key={item["_id"] + "root"} 
        style={styles.cardsContainer}
      >
        <View style={{flexDirection: "row"}}>
          <View style={{ justifyContent: "center"}}>
            <Text style={{ fontSize: SIZES.xLarge}}>{item.icon}</Text>
          </View>
          <View style={styles.dayCardContainer}>
            <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
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

const GalleryView = ({items, navigation}) => (
  <FlatList
    scrollEnabled={true}
    data={items}
    numColumns={2} 
    renderItem={({item}) => (
      <TouchableOpacity style={styles.cardsContainer} key={item["_id"] + "_root"}
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
        <View style={[styles.row]}>
          <Text style={{fontSize: SIZES.xLarge}}>{item.icon}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
);

const defaultImage = require("../../assets/icon.png");

export default function DefaultView ({navigation, route, scrollEnabled = true}) {
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

  const [selectedTab, setSelectedTab] = useState('List');
  const renderTab = () => {
    switch (selectedTab) {
      case 'List':
        return <ListView items={items} navigation={navigation} />;
      case 'Gallery':
        return <GalleryView items={items} navigation={navigation} />;
      default:
        return <ListView items={items} navigation={navigation} />;
    }
  };

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

      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'List' && styles.activeTab]}
            onPress={() => setSelectedTab('List')}
          >
            {selectedTab === 'List' ? 
              (
                <Ionicons name={"list-circle"} size={SIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
              ) 
            : (
                <Ionicons name={"list-circle-outline"} size={SIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
              )
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Gallery' && styles.activeTab]}
            onPress={() => setSelectedTab('Gallery')}
          >
            {selectedTab === 'Gallery' ? 
              (
                <Ionicons name={"image"} size={SIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
              ) 
            : (
                <Ionicons name={"image-outline"} size={SIZES.xxLarge} color={COLORS({opacity:0.8}).primary} />
              )
            }
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          {renderTab()}
        </View>
      </View>
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
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor:  COLORS({opacity:1}).lightWhite,
    paddingVertical: SIZES.xxSmall,
  },
  tab: {
    paddingVertical: SIZES.xxSmall,
    paddingHorizontal: SIZES.large,
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
    margin: SIZES.xSmall,
    marginBottom: SIZES.tiny,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.xSmall,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    ...SHADOWS.small,
    shadowColor: COLORS({opacity:1}).shadow,
    borderRadius: SIZES.small,
    alignContent: "center"
  },
  imageBox: {
    margin: SIZES.Small,
  },
  itemTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
  },
  prop: {
    fontWeight: "200",
  },
  dayCardContainer: {
    flex: 1,
    marginLeft: SIZES.xSmall,
  },
});