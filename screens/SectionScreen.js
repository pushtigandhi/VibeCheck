import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import HomeNavigation from "./HomeNavigation";
import { GETitems, GETitemsTEST } from "../API";
import { ItemType } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { ExpandableView } from "../utils";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const defaultImage = require("../assets/icon.png");

const filter = ({navigation}) => {
    return (
      <ScrollView style={styles.expandedContainer}>
        <TouchableOpacity style={styles.sectionContainer} 
    //   key={section + "_root"}
        onPress={() => {
            navigation.navigate("Item", {item});
        }}
        >
        <Text style={styles.section} numberOfLines={1}>item</Text>
        </TouchableOpacity>
      </ScrollView>
    )
};

const ListView = ({items, navigation}) => (
    <ScrollView>
    {items.length > 0 && items.map(item => (
        <View key={item["_id"] + "root"} style={styles.cardContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Item", {item});
                }}
                style={styles.titleContainer}
            >
                <View style={styles.row}>
                <Text style={{ fontSize: SIZES.regular}}>{item.icon}</Text>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    ))}  
    </ScrollView> 
);

const GalleryView = ({items, navigation}) => (
    <ScrollView>
    {items.length > 0 && items.map(item => (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Item", {item});
                }}
                style={styles.titleContainer}
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
        </View>
    ))}
    </ScrollView>
);


export default function SectionScreen ({navigation, route, scrollEnabled = true}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState([]);

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

  async function getItemsFromAPI() {
    try {
      let items_ = await GETitemsTEST(ItemType.Item, { category: route.params?.category.title, section: route.params?.section });
      return items_;
    } catch (error) {
      console.log("error fetching items");
      console.log(error);
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

  const renderIcon = ({ route, focused, color }) => {
    let iconName;
  
    if (route.key === 'list') {
      iconName = focused ? 'list-circle' : 'list-circle-outline';
    } else if (route.key === 'gallery') {
      iconName = focused ? 'image' : 'image-outline';
    }
  
    // Return the icon component
    return <Ionicons name={iconName} size={30} color={COLORS({opacity:1}).darkBlue} />;
  };

  return (
    <SafeAreaView style={styles.screen}>
        <View style={styles.propContainer}>
            <Text style={styles.title} numberOfLines={1}>{route.params?.category.title}</Text>
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setIsExpanded(!isExpanded);
                    }}
                    style={styles.titleContainer}
                >
                    <View style={styles.row}>
                        <Ionicons name={"options-outline"} size={30} style={styles.icon}/>
                        <Text style={styles.title} numberOfLines={1}>Filter</Text>
                    </View>
                </TouchableOpacity>
                <ExpandableView expanded={isExpanded} view={filter} params={{navigation}} vh={150} />
            </View>
            <Text style={styles.header}>{route.params?.section}</Text>
        </View>
        {/* <FlatList
            scrollEnabled={scrollEnabled}
            data={items}
            renderItem={renderItem}
        /> */}
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
                // Add any other props you want to customize TabBar
                />
            )}
        />
        {/* <GalleryView items={items} /> */}
        <HomeNavigation size={30} iconColor={COLORS({opacity:1}).primary}/>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    backgroundColor: "#FFF",
  },
  header:{
    fontSize: SIZES.medium,
    //fontFamily: FONT.regular,
    color: COLORS({opacity:0.9}).darkBlue,
    padding: SIZES.small,
    margin: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    borderRadius: SIZES.medium,
  },
  cardContainer: {
    width: '95%',
    margin: SIZES.xSmall,
    backgroundColor: "#FFF",
    borderRadius: SIZES.xLarge,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
  },
  titleContainer: {
    width: '100%',
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderBottomWidth: 1,
    borderBottomLeftRadius: SIZES.xLarge,
    borderBottomRightRadius: SIZES.xLarge,
  },
  sectionContainer: {
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).darkBlue,
  },
  propContainer: {
    width: '100%',
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
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