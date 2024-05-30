import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal,
        StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../constants";
import Layout from "../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "./cards/PropertyCards";
import HomeNavigation from "./HomeNavigation";
import ItemCard from "./ItemCard";
import * as df  from "../constants/default";
import CreateNewItem from "./CreateNewItem";

export default function NewItem({navigation}) {

  const [item, setItem] = useState({});
  const [showCreateNew, setShowCreateNew] = useState(false);

  function closeCreateNew() {
    setShowCreateNew(false);
  }

  function goHome() {
    navigation.navigate('Home', { refresh: Math.random() });
  }

  return (
    <SafeAreaView style={styles.infoContainer}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => (goHome())} style={[styles.button]} > 
          <Ionicons name={"arrow-back-outline"} size={SIZES.large} style={styles.icon}/> 
        </TouchableOpacity>
        <Text style={[styles.label]}>Select Item Type</Text>
      </View>
      
      <TouchableOpacity
        onPress={() => {
            setItem(df.defaultItem);
            setShowCreateNew(true);
        }}
        style={styles.titleContainer}
      >
      <View style={styles.row}>
          <Text style={styles.label}>{df.ItemType.Item}</Text>
          <Text style={{fontSize: SIZES.xLarge}}>{df.defaultItem.icon}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
            setItem(df.defaultTask);
            setShowCreateNew(true);
        }}
        style={styles.titleContainer}
      >
      <View style={styles.row}>
          <Text style={styles.label}>{df.ItemType.Task}</Text>
          <Text style={{fontSize: SIZES.xLarge}}>{df.defaultTask.icon}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
            setItem(df.defaultEvent);
            setShowCreateNew(true);
        }}
        style={styles.titleContainer}
      >
      <View style={styles.row}>
          <Text style={styles.label}>{df.ItemType.Event}</Text>
          <Text style={{fontSize: SIZES.xLarge}}>{df.defaultEvent.icon}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
            setItem(df.defaultPage);
            setShowCreateNew(true);
        }}
        style={styles.titleContainer}
      >
          <View style={styles.row}>
          <Text style={styles.label}>{df.ItemType.Page}</Text>
          <Text style={{fontSize: SIZES.xLarge}}>{df.defaultPage.icon}</Text>
          </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
            setItem(df.defaultRecipe);
            setShowCreateNew(true);
        }}
        style={styles.titleContainer}
      >
          <View style={styles.row}>
          <Text style={styles.label}>{df.ItemType.Recipe}</Text>
          <Text style={{fontSize: SIZES.xLarge}}>{df.defaultRecipe.icon}</Text>
          </View>
      </TouchableOpacity>

      <Modal visible={showCreateNew} animationType="slide" onRequestClose={closeCreateNew}>
        <CreateNewItem item={item} onClose={closeCreateNew} />
      </Modal>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    flex:1,
    backgroundColor: COLORS({opacity:1}).white,
  },
  titleContainer: {
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
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
    //justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    color: COLORS({opacity:0.8}).primary,
  },
  label:{
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
    margin: SIZES.xSmall,
  },
  button: {
    height: SIZES.xLarge * 2,
    width: SIZES.xLarge * 2,
    padding: SIZES.xSmall,
    marginHorizontal: SIZES.xSmall,
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: SIZES.medium,
    borderColor: COLORS({opacity:1}).primary,
  },
});