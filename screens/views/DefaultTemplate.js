import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS, ItemType } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { ExpandableView } from "../../utils";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


const defaultImage = require("../../assets/icon.png");

const ListView = ({items}) => (
  <FlatList
    scrollEnabled={true}
    data={items}
    renderItem={({item}) => (
      <View style={styles.cardContainer} key={item["_id"] + "_root"} >
        <View style={styles.row}>
          <Text style={{ fontSize: SIZES.regular}}>{item.icon}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </View>
      </View>
    )}
  /> 
);

const GalleryView = ({items}) => (
  <FlatList
    scrollEnabled={true}
    data={items}
    numColumns={2} 
    renderItem={({item}) => (
      <View style={styles.cardContainer} key={item["_id"] + "_root"} >
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
      </View>
    )}
  />
);

export default function DefaultTemplate ({close}) {
  const [title, setTitle] = useState("Title");
  
  const [items, setItems] = useState([]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'list' },
    { key: 'gallery' },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'list':
        return <ListView items={items} />;
      case 'gallery':
        return <GalleryView items={items} />;
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

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.row, styles.propContainer, {justifyContent: "space-between"}]}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <View style={[styles.row, styles.searchInput]}>
            <Ionicons name={"search-outline"} size={20} style={styles.iconInverted} />
          </View>
          <View style={styles.filterButtonIcon}>
            <Ionicons name={"funnel-outline"} size={20} style={styles.iconInverted}/>
          </View>
          <View style={[styles.row, styles.addButton]}>
            <Ionicons name={"add-circle"} size={20} style={styles.iconInverted}/>
          </View>
        </View>
      </View>
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
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
    marginVertical: SIZES.xxLarge,
    marginHorizontal: SIZES.small,
    padding: SIZES.small,
    borderWidth: 1, 
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: SIZES.xxSmall,
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
    height: SIZES.xxLarge,
    width: SIZES.xxLarge,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: COLORS({opacity:0.5}).secondary,
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: SIZES.medium,
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