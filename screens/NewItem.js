import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal,
        StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';
import { COLORS, SHADOWS, FONT, textSIZES, viewSIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import * as df  from "../constants/default";
import CreateNewItem from "./CreateNewItem";

export default function NewItem({navigation, onBack=null, isScheduler=false}) {

  const [item, setItem] = useState({});
  const [showCreateNew, setShowCreateNew] = useState(false);

  function closeCreateNew() {
    setShowCreateNew(false);
  }

  function goHome() {
    if(onBack)
      onBack();
    else
      navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.infoContainer}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => (goHome())} style={[styles.button]} > 
          <Ionicons name={"arrow-back-outline"} size={textSIZES.large} style={styles.icon}/> 
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
          <Text style={{fontSize: textSIZES.xLarge}}>{df.defaultItem.icon}</Text>
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
          <Text style={{fontSize: textSIZES.xLarge}}>{df.defaultTask.icon}</Text>
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
          <Text style={{fontSize: textSIZES.xLarge}}>{df.defaultEvent.icon}</Text>
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
          <Text style={{fontSize: textSIZES.xLarge}}>{df.defaultPage.icon}</Text>
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
          <Text style={{fontSize: textSIZES.xLarge}}>{df.defaultRecipe.icon}</Text>
          </View>
      </TouchableOpacity>

      <Modal visible={showCreateNew} animationType="slide" onRequestClose={closeCreateNew}>
        <CreateNewItem item={item} onClose={closeCreateNew} isScheduler={isScheduler} />
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
    padding: textSIZES.small,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
  },
  sectionContainer: {
    margin: textSIZES.xSmall,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  title: {
    fontSize: textSIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
  },
  expandedContainer: {
    paddingBottom: textSIZES.small,
    paddingHorizontal: textSIZES.small,
    flex: 1,
    overflow: 'scroll',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: COLORS({opacity:0.8}).primary,
  },
  label:{
    fontSize: textSIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
    margin: textSIZES.xSmall,
  },
  button: {
    height: viewSIZES.xxSmall,
    width: viewSIZES.xxSmall,
    padding: textSIZES.xSmall,
    marginHorizontal: textSIZES.xSmall,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: textSIZES.small,
    borderColor: COLORS({opacity:1}).primary,
  },
});