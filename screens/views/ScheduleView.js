import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal,Dimensions } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";
import { GETitems, GETitemsTEST } from "../../API";
import { ItemType } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../../components/FilterModal";
import SingleSelectDropdown from "../../components/SingleSelectDropdown";
import { CalendarView } from "../partialViews/CalendarView";

const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];
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
            <View style={styles.time}>
                <Text style={{ fontSize: SIZES.medium}}>{String(new Date(item.endDate).getDate())}</Text>
                <Text style={{ fontSize: SIZES.medium}}>{daysOfWeek[new Date(item.startDate).getDay()]}</Text>
            </View>
            <View style={{ justifyContent: "center"}}>
                <Text style={{ fontSize: SIZES.xLarge}}>{item.icon}</Text>
            </View>
            <View style={styles.dayCardContainer}>
              <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
              <View style={styles.row}>
                  <Text style={styles.timeLabel}>{String(new Date(item.startDate).getHours())}:{new Date(item.startDate).getMinutes() < 10 ? String("0"+ new Date(item.startDate).getMinutes()) : String(new Date(item.startDate).getMinutes())} - {String(new Date(item.endDate).getHours())}:{new Date(item.endDate).getMinutes() < 10 ? String("0"+ new Date(item.endDate).getMinutes()) : String(new Date(item.endDate).getMinutes())}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
    )}
  /> 
);

export default function ScheduleView ({navigation, route, scrollEnabled = true}) {
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
      case 'Calendar':
        return <CalendarView navigation={navigation} filter={filter} setFilter={setFilter} isHome={false} />;
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
          <TouchableOpacity style={[styles.row, styles.addButton]}>
            <Ionicons name={"add-circle"} size={20} style={styles.iconInverted}/>
          </TouchableOpacity>
        </View>
      </View>
      
      <Modal visible={filterVisible} animationType="slide" onRequestClose={closeFilter}>
        <FilterModal closeFilter={closeFilter} filter={filter} setFilter={setFilter} />
      </Modal>

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
          style={[styles.tab, selectedTab === 'Calendar' && styles.activeTab]}
          onPress={() => setSelectedTab('Calendar')}
        >
          {selectedTab === 'Calendar' ? 
            (
              <Ionicons name={"calendar"} size={SIZES.xLarge} color={COLORS({opacity:0.8}).primary} />
            ) 
          : (
              <Ionicons name={"calendar-outline"} size={SIZES.xLarge} color={COLORS({opacity:0.8}).primary} />
            )
          }
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {renderTab()}
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
  cardsContainer: {
    marginTop: SIZES.medium,
    marginHorizontal: SIZES.small,
    borderColor: COLORS({opacity:1}).lightGrey,// "#FFF",
    backgroundColor: COLORS({opacity:0.1}).lightGrey,
    borderRadius: SIZES.small,
    borderWidth:0.51,
    alignContent: "center"
  },
  itemTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
  },
  prop: {
    fontWeight: "200",
  },
  time: {
    padding: SIZES.xSmall,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "right",
  },
  timeLabel: {
    fontWeight: "200",
    fontSize: SIZES.medium,
  },
  dayCardContainer: {
    flex: 1,
    padding: SIZES.xxSmall,
    marginLeft: SIZES.xSmall,
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
});