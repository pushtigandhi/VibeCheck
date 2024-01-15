import { useState } from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity, Image, Text, TextInput, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

import { PropertyCard } from "./PropertyCards";

export const EmptyItemCard = () => {
    return (
        <SafeAreaView style={styles.container}>
        <TextInput style={styles.title}
            placeholder="Title">
        </TextInput>
        <TextInput style={styles.description}
            placeholder="Enter a description of this item...">
        </TextInput>

        <PropertyCard />

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: SIZES.medium,
        backgroundColor: "#FFF",
        height: "100%",
    },
    row: {
        flexDirection: "row",
        //justifyContent: "space-between",
        alignItems: "center",
    },
    title:{
        fontSize: SIZES.xLarge,
        //fontFamily: FONT.regular,
        color: COLORS({opacity:0.9}).darkBlue,
        padding: SIZES.medium,
        margin: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS({opacity:1}).navy,
        borderRadius: SIZES.medium,
    },
    description:{
        fontSize: SIZES.medium,
        //fontFamily: FONT.regular,
        color: COLORS({opacity:0.9}).darkBlue,
        padding: SIZES.medium,
        marginHorizontal: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS({opacity:1}).navy,
        borderRadius: SIZES.medium,
    },
});