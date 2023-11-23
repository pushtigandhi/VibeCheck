import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const ExpandableView = ({ item, expanded = false }) => {
  console.log(item);
  // const {title} = item;
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: expanded ? 200 : 0,
      duration: 250,
      useNativeDriver: false
    }).start();
  }, [expanded, height]);

  return (
    <Animated.View
      style={{ height }}
    >
    <View style={styles.infoContainer}>
    <Text>{"NA"}</Text>
      {/* <FlatList 
        data={[1,2,3,4,5]}
        renderItem={({item}) => (
        <Text>{item}</Text>
        )}
        keyExtractor={() => {}}
        contentContainerStyle={{ columnGap: SIZES.medium }}
      /> */}
      </View>
    </Animated.View>
  );

};
const DirectoryCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TouchableOpacity
       onPress={() => {
          setIsExpanded(!isExpanded);
        }}
    >
    <View style={styles.container}>
    <View style={styles.column}>
      <TouchableOpacity style={styles.photoContainer}>
      <Ionicons name={"list-circle"} size={40} color={"#80adad"} style={styles.group}/>
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
         <Text style={styles.title} numberOfLines={1}> Name </Text>
      </View>
      </View>
    <ExpandableView expanded={isExpanded} />

    </View>
        
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        //alignItems: "center",
        padding: SIZES.medium,
        borderRadius: SIZES.xLarge,
        backgroundColor: "#FFF",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
        marginBottom: SIZES.xSmall,
      },
    photoContainer: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color:COLORS.primary,
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    padding: SIZES.large,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
    justifyContent: "center",
  },
  column: {
    flexDirection: "row",
    justifyContent: "space-between",
    //alignItems: "baseline",
  },
});

export default DirectoryCard