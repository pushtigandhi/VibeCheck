import { useState } from "react";
import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import TaskCard from "./cards/items/TaskCard";
import { ExpandableView } from "../utils";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../_layout";

const TitleView = ({  onPress, isExpanded }) => {
    <TouchableOpacity onPress={onPress}>
      
      <View style={styles.column}>
        <TouchableOpacity style={styles.photoContainer}>
            <Image 
                source={{ uri: 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'}}
                resizeMode='contain'
                style={styles.contactImage}
            />
        </TouchableOpacity>
                            
        <View style={styles.textContainer}>
            <Text style={styles.contactName} numberOfLines={1}> Title </Text>
            <Text style={styles.jobType}> Progress: </Text>
        </View>
        </View>
        {isExpanded && (
            <ExpandableView expanded={isExpanded} view={TaskCard} vh={600}/>
        )}
  </TouchableOpacity>
};
const generateData = (length) => {
    return Array.from({ length }, (_, index) => ({
      id: `${index + 1}`,
      text: `Item ${index + 1}`,
      isExpanded: false,
    }));
  };

const NewItem = () => {
    //const [data, setData] = useState(generateData(1)); // Adjust the parameter as needed
    const [isExpanded, setIsExpanded] = useState(false);
    //console.log(data);

    const handlePress = (itemId) => {
        console.log("handle press " + itemId);
        console.log("item.id" + item.id);
        setData((prevData) =>
        prevData.map((item) =>
            item.id === itemId ? { ...item, isExpanded: !item.isExpanded } : item
        ),
        console.log(data),
        );
    };

    return (
        <View style={styles.container}>
               <TaskCard />
        </View>
    );
};

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

export default NewItem