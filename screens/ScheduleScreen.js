import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal, TouchableNativeFeedback } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS, ItemType } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../components/FilterModal";
import { GETitemsTEST } from "../API";
import { Scheduler } from "../components/Scheduler";
import * as df  from "../constants/default";
import CreateNewItem from "./CreateNewItem";
import FilteredResultsModal from "../components/FilteredResultsModal";

const test1 = {
    "startDate": new Date(),
}

export default function ScheduleScreen ({onClose}) {
    const [scheduleItem, setSceduleItem] = useState({});

    const [showFilteredResults, setShowFilteredResults] = useState(false);
    const [showSelectType, setShowSelectType] = useState(false);
    const [showCreateNew, setShowCreateNew] = useState(false);

    const [items, setItems] = useState([]);

    const [filter, setFilter] = useState({});
   
    function onSelectExistingItem() {
        console.log("select existing");
        setShowFilteredResults(false);
        setFilterVisible(true);
    }

    const doSearch = React.useCallback(() => {
        console.log("doing searching");
        console.log(filter);
        setFilterVisible(false);
        setShowFilteredResults(true);
    }, []);

    const [filterVisible, setFilterVisible] = useState(false);
    function closeFilter() {
        setFilterVisible(false);
    }

    function closeFilteredResults() {
        setShowFilteredResults(false);
    }

    function closeCreateNew() {
        setShowCreateNew(false);
    }

    function goHome() {
        onClose(false);
    }

    return(
        <SafeAreaView style={styles.screen}>
            <TouchableOpacity onPress={() => (goHome())} style={[styles.homeButton]} > 
                <Ionicons name={"arrow-back-outline"} size={SIZES.large} style={styles.icon}/> 
            </TouchableOpacity>

            <Scheduler />

            {showSelectType === false && (
                <View styles={styles.infoContainer}>
                    <View style={{ height: SIZES.xxLarge * 2,}}>
                        <TouchableOpacity onPress={() => {onSelectExistingItem()}} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lavendar}]}>
                            <Text style={styles.buttonText}>Select An Existing Item</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: SIZES.xxLarge * 2,}}>
                        <TouchableOpacity onPress={() => {setShowSelectType(true)}} style={[styles.button, {backgroundColor: COLORS({opacity:1}).yellow}]}>
                            <Text style={styles.buttonText}>Create New</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <Modal visible={filterVisible} animationType="slide" onRequestClose={closeFilter}>
                <FilterModal closeFilter={closeFilter} filter={filter} setFilter={setFilter} doSearch={doSearch} isScheduler={true} />
            </Modal>

            <Modal visible={showFilteredResults} animationType="slide" onRequestClose={closeFilteredResults}>
                <FilteredResultsModal filter={filter} onUpdate={onSelectExistingItem} onClose={closeFilteredResults} />
            </Modal>

            {showSelectType === true && (
                <View styles={styles.infoContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setSceduleItem(df.defaultItem);
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
                            setSceduleItem(df.defaultTask);
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
                            setSceduleItem(df.defaultEvent);
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
                            setSceduleItem(df.defaultPage);
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
                            setSceduleItem(df.defaultRecipe);
                            setShowCreateNew(true);
                        }}
                        style={styles.titleContainer}
                    >
                        <View style={styles.row}>
                        <Text style={styles.label}>{df.ItemType.Recipe}</Text>
                        <Text style={{fontSize: SIZES.xLarge}}>{df.defaultRecipe.icon}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            <Modal visible={showCreateNew} animationType="slide" onRequestClose={closeCreateNew}>
                <CreateNewItem item={scheduleItem} onClose={closeCreateNew} />
            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: COLORS({opacity:1}).lightWhite,
    },
    infoContainer: {
      backgroundColor: COLORS({opacity:1}).white,
      margin: SIZES.medium,
      marginVertical: SIZES.xxLarge*2,
      borderRadius: SIZES.medium/2,
        ...SHADOWS.medium,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    divider: {
      paddingBottom: SIZES.xSmall,
      borderBottomWidth: 0.5,
      borderColor: COLORS({opacity:1}).tertiary,
    },
    label:{
      fontSize: SIZES.large,
      fontWeight: '300',
      color: COLORS({opacity:1}).secondary,
      margin: SIZES.xSmall,
    },
    property:{
      color: COLORS({opacity:0.8}).secondary,
      margin: SIZES.xSmall,
    },
    icon: {
      color: COLORS({opacity:1}).secondary,
    },
    iconInverse: {
      color: COLORS({opacity:1}).lightWhite,
    },
    title: {
      fontSize: SIZES.large,
      fontFamily: FONT.regular,
      fontWeight: "200",
      color: COLORS({opacity:1}).primary,
    },
    button: {
        flex: 1,
        padding: SIZES.xSmall,
        margin: SIZES.xSmall,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.medium
    },
    buttonText: {
        color: COLORS({opacity: 1}).white,
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
    titleContainer: {
        padding: SIZES.medium,
        borderColor: COLORS({opacity:0.5}).primary,
        borderBottomWidth: 1,
     },
    homeButton: {
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