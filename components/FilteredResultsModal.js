import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList} from "react-native";
import { COLORS, FONT, SIZES, SHADOWS, ItemType } from "../constants";
import React, { useEffect, useState } from "react";
import { GETitemsTEST } from "../API";

export default function FilteredResultsModal({filter, onUpdate, onClose}) {
    const [items, setItems] = useState([]);
    
    async function getItemsFromAPI(filter={}) {
        let itemType;
        let copyFilter = filter;
        if(copyFilter.itemType) {
            itemType = copyFilter.itemType;

            delete copyFilter.itemType;
        }
        else {
            itemType = ItemType.Item;
        }
        console.log("getting items");
        console.log(copyFilter);
        try {
          let items_ = await GETitemsTEST(itemType, copyFilter);
          return items_;
        } catch (error) {
          console.log("error fetching items");
          console.log(error);
          return [];
        }
    }

    useEffect (() => {
        getItemsFromAPI(filter).then((items_) => {
            setItems(items_);
        }).catch((err) => {
            alert(err.message)
        })
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
          onPress={() => {
            onRefresh();
            setShowFilteredResults(false);
          }}
          key={item["_id"] + "root"} 
          style={styles.cardsContainer}
        >
          <View style={[{flexDirection: "row", justifyContent: "center"}]}>
              <Text style={{ fontSize: SIZES.xLarge}}>{item.icon}</Text>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView>
            <View style={[styles.row, styles.header]}>
                <TouchableOpacity onPress={() => {onUpdate()}} style={styles.searchButton} >
                    <Text style={styles.searchButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {onClose()}} style={[styles.searchButton, { backgroundColor: COLORS({opacity:1}).lightRed }]}  > 
                    <Ionicons name={"close-outline"} size={SIZES.xLarge} style={styles.iconInverse}/> 
                </TouchableOpacity>
            </View>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item["_id"]} 
                style={styles.calendarView}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    header: {
        display: "flex",
        marginTop: SIZES.xSmall,
        paddingHorizontal: SIZES.xSmall,
        justifyContent: "space-between",
    },
    searchButton: {
        // marginRight: 90,
        // marginLeft: 90,
        marginBottom: 25,
        padding: SIZES.xSmall,
        backgroundColor: COLORS({opacity: 1}).secondary,
        borderRadius: SIZES.small,
    },
    searchButtonText: {
        fontSize: SIZES.large,
        alignSelf: "center",
        color: COLORS({opacity:1}).lightWhite,
    },
    cardsContainer: {
        marginBottom: SIZES.medium,
        marginHorizontal: SIZES.medium,
        backgroundColor: COLORS({opacity:1}).lightGrey,// "#FFF",
        borderRadius: SIZES.small,
        ...SHADOWS.xSmall,
        shadowColor: COLORS({opacity:1}).shadow,
        padding: SIZES.xxSmall,
    },
    icon: {
        //margin: SIZES.xxSmall,
        color: COLORS({opacity:1}).secondary,
    },
    iconInverse: {
        //margin: SIZES.xxSmall,
        color: COLORS({opacity:1}).lightWhite,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONT.regular,
        fontWeight: "200",
        color: COLORS({opacity:1}).primary,
    },
});