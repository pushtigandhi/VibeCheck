import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, 
    RefreshControl, ScrollView, Image, Modal } from "react-native";

import HomeNavigation from "../HomeNavigation";
import { GETitems, GETitemsTEST } from "../../API";
import { COLORS, SIZES, SHADOWS, FONT, ItemType, ViewType } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { TabView, TabBar, ToolBar, SceneMap } from 'react-native-tab-view';
import FilterModal from "../../components/FilterModal";

import { CalendarView } from "../partialViews/CalendarView";

import SingleSelectDropdown from "../../components/SingleSelectDropdown";


const defaultImage = require("../../assets/icon.png");

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
                    <Text style={styles.timeLabel}>{String(new Date(item.endDate).getDate())}</Text>
                    <Text style={styles.timeLabel}>{daysOfWeek[new Date(item.startDate).getDay()]}</Text>
                </View>
                <View style={{ justifyContent: "center"}}>
                    <Text style={{ fontSize: SIZES.xLarge}}>{item.icon}</Text>
                </View>
                <View style={styles.dayCardContainer}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [section, setSection] = useState(null);

  const [state, setState] = useState("day");
  
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [refreshCalendar, setRefreshCalendar] = useState(false);

  const [search, setSearch] = useState('');
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
        return <CalendarView navigation={navigation} filter={filter} setFilter={setFilter}/>;
      default:
        return null;
    }
  };
  const renderIcon = ({ route, focused, color }) => {
    let iconName;
  
    if (route.key === 'list') {
      iconName = focused ? 'list-circle' : 'list-circle-outline';
    } else if (route.key === 'gallery') {
      iconName = focused ? 'calendar' : 'calendar-outline';
    }
  
    // Return the icon component
    return <Ionicons name={iconName} size={30} color={COLORS({opacity:1}).primary} />;
  };

  function closeFilter() {
    //doRefresh(filter);
    setRefreshing(!refreshing);
    setFilterVisible(false);
  }

  function doSearch() {
    console.log(search);
    setSearchBar(false);
  }

  async function getSectionItemsFromAPI() {
    try {
      let items_ = await GETitemsTEST(ItemType.Scheduled, filter);
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

  const onRefresh = React.useCallback((updatedDate, state) => {
    setSelectedDate(updatedDate);
    setState(state);
  });

  const [type, setTypeOptions] = useState("All");

  const typeOptions = [
    {label: "All", value: "All"},
    {label: "Day", value: "Day"},
    {label: "Week", value: "Week"},
    {label: "Month", value: "Month"}
  ];

    function changeTypeOption(optionValue) {
        setTypeOptions(optionValue);
    }

    useEffect(() => {
        const indexOfTypeOption = Object.values(typeOptions).indexOf("type");
        setTypeOptions(Object.keys(typeOptions)[indexOfTypeOption]);

        let state = 
        setFilter({... filter, category: route.params?.category.title, section: route.params?.section.title});

        if (route.params?.isSection) {
            setTitle(route.params?.section.title);
            getSectionItemsFromAPI().then((items_) => {
              setItems(items_);
            }).catch((err) => {
              alert(err.message)
            })
        }

    }, [type, refreshing]); // run only once

  useEffect(() => {
    if (route.params?.isSection) {
      setFilter({... filter, category: route.params?.category.title, section: route.params?.section.title});
    }
  }, []) // only run once on load

//   useEffect(() => {
//     if (route.params?.isSection) {
//       setTitle(route.params?.section.title);
//       getSectionItemsFromAPI().then((items_) => {
//         setItems(items_);
//       }).catch((err) => {
//         alert(err.message)
//       })
//     }
//     else {
//       setTitle(route.params?.item.itemType);
//       getItemsByTypeFromAPI(route.params?.item.itemType).then((items_) => {
//         setItems(items_);
//       }).catch((err) => {
//         alert(err.message)
//       })
//     }
//   }, [refreshing]) // only run once on load

  return (
    <SafeAreaView style={styles.screen}>
        <View style={[styles.propContainer]}>
            <View style={[styles.row, {justifyContent: "space-between"}]}>
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
                        route.params?.isSection ? 
                        navigation.navigate("Item", {item: {"category": route.params?.category.title, "section": route.params?.section, "icon": '\u{1F4E6}', "itemType" : ItemType.Item}})
                        : 
                        navigation.navigate("EditItem", {item: route.params?.item})
                    }}
                    style={[styles.row, styles.addButton]}
                    >
                    <Ionicons name={"add-circle"} size={20} style={styles.iconInverted}/>
                    </TouchableOpacity>
                </View>
            </View>
          
          <SingleSelectDropdown options={typeOptions} placeholder={type} setFn={changeTypeOption}
          icon={<Ionicons name={"grid-outline"} size={25} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />
        </View>
        
        
        <Modal visible={filterVisible} animationType="slide" onRequestClose={closeFilter}>
          <FilterModal closeFilter={closeFilter} filter={filter} setFilter={setFilter} />
        </Modal>
        {/* <TabView
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
        /> */}
        <HomeNavigation size={30} iconColor={COLORS({opacity:1}).primary}/>
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
  dayCardContainer: {
    flex: 1,
    padding: SIZES.xxSmall,
    marginLeft: SIZES.xSmall,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "200",
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
  cardsContainer: {
    marginTop: SIZES.medium,
    marginHorizontal: SIZES.medium,
    backgroundColor: COLORS({opacity:1}).lightWhite,// "#FFF",
    borderRadius: SIZES.small,
    ...SHADOWS.xSmall,
    shadowColor: COLORS({opacity:1}).shadow,
  },
});