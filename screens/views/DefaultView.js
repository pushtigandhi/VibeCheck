import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";

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

const DefaultView = ({items, navigation}) => {
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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

export default DefaultView;
