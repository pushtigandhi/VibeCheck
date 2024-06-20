import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal, TouchableNativeFeedback } from "react-native";
import { COLORS, FONT, textSIZES, SHADOWS, ItemType, viewSIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../components/FilterModal";
import { GETitemsTEST } from "../API";
import { Scheduler } from "../components/Scheduler";
import * as df  from "../constants/default";
import CreateNewItem from "./CreateNewItem";
import FilteredResultsModal from "../components/FilteredResultsModal";
import NewItem from "./NewItem";

const test1 = {
    "startDate": new Date(),
}

export default function ScheduleScreen ({navigation, onClose}) {
    const [scheduleItem, setSceduleItem] = useState({});
    const [item, setItem] = useState({});

    const [showFilteredResults, setShowFilteredResults] = useState(false);
    const [showSelectType, setShowSelectType] = useState(false);
    const [showCreateNew, setShowCreateNew] = useState(false);

    const [filter, setFilter] = useState({});

    function onSelectExistingItem() {
       // console.log("select existing");
        setShowFilteredResults(false);
        setFilterVisible(true);
    }
    function onItemSelected(item_) {
        setItem(item_);
        setShowCreateNew(true);
    }

    const doSearch = React.useCallback(() => {
        //console.log(filter);
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

    function closeSelectType() {
        setShowSelectType(false);
    }

    function goHome() {
        onClose(false);
    }

    return(
        <SafeAreaView style={styles.screen}>
            <TouchableOpacity onPress={() => (goHome())} style={[styles.homeButton]} >
                <Ionicons name={"arrow-back-outline"} size={textSIZES.large} style={styles.icon}/>
            </TouchableOpacity>
            <View styles={styles.infoContainer}>
                <View style={{ height: viewSIZES.xSmall,}}>
                    <TouchableOpacity onPress={() => {onSelectExistingItem()}} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lavendar}]}>
                        <Text style={styles.buttonText}>Select An Existing Item</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: viewSIZES.xSmall,}}>
                    <TouchableOpacity onPress={() => setShowSelectType(true)} style={[styles.button, {backgroundColor: COLORS({opacity:1}).yellow}]}>
                        <Text style={styles.buttonText}>Create New</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={filterVisible} animationType="slide" onRequestClose={closeFilter}>
                <FilterModal closeFilter={closeFilter} filter={filter} setFilter={setFilter} doSearch={doSearch} isScheduler={true} />
            </Modal>

            <Modal visible={showFilteredResults} animationType="slide" onRequestClose={closeFilteredResults}>
                <FilteredResultsModal filter={filter} onUpdate={onSelectExistingItem} onClose={closeFilteredResults} onItemSelected={onItemSelected} setFn={setShowFilteredResults} />
            </Modal>

            <Modal visible={showSelectType} animationType="slide" onRequestClose={closeSelectType}>
                <NewItem navigation={navigation} isScheduler={true} onBack={closeSelectType} />
            </Modal>

            <Modal visible={showCreateNew} animationType="slide" onRequestClose={closeCreateNew}>
                <CreateNewItem item={item} onClose={closeCreateNew} isScheduler={true} />
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
      margin: textSIZES.small,
      marginVertical: textSIZES.xxLarge*2,
      borderRadius: textSIZES.small/2,
        ...SHADOWS.medium,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    divider: {
      paddingBottom: textSIZES.xSmall,
      borderBottomWidth: 0.5,
      borderColor: COLORS({opacity:1}).tertiary,
    },
    label:{
      fontSize: textSIZES.large,
      fontWeight: '300',
      color: COLORS({opacity:1}).secondary,
      margin: textSIZES.xSmall,
    },
    property:{
      color: COLORS({opacity:0.8}).secondary,
      margin: textSIZES.xSmall,
    },
    icon: {
      color: COLORS({opacity:1}).secondary,
    },
    iconInverse: {
      color: COLORS({opacity:1}).lightWhite,
    },
    title: {
      fontSize: textSIZES.large,
      fontFamily: FONT.regular,
      fontWeight: "200",
      color: COLORS({opacity:1}).primary,
    },
    button: {
        flex: 1,
        padding: textSIZES.xSmall,
        margin: textSIZES.xSmall,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: textSIZES.small
    },
    buttonText: {
        color: COLORS({opacity: 1}).white,
    },
    cardsContainer: {
        marginBottom: textSIZES.small,
        marginHorizontal: textSIZES.small,
        backgroundColor: COLORS({opacity:1}).lightGrey,// "#FFF",
        borderRadius: textSIZES.xSmall,
        ...SHADOWS.xSmall,
        shadowColor: COLORS({opacity:1}).shadow,
        padding: textSIZES.xxSmall,
    },
    header: {
        display: "flex",
        marginTop: textSIZES.xSmall,
        paddingHorizontal: textSIZES.xSmall,
        justifyContent: "space-between",
    },
    searchButton: {
        // marginRight: 90,
        // marginLeft: 90,
        marginBottom: 25,
        padding: textSIZES.xSmall,
        backgroundColor: COLORS({opacity: 1}).secondary,
        borderRadius: textSIZES.xSmall,
    },
    searchButtonText: {
        fontSize: textSIZES.large,
        alignSelf: "center",
        color: COLORS({opacity:1}).lightWhite,
    },
    titleContainer: {
        padding: textSIZES.small,
        borderColor: COLORS({opacity:0.5}).primary,
        borderBottomWidth: 1,
     },
    homeButton: {
        height: viewSIZES.xxSmall,
        width: viewSIZES.xxSmall,
        padding: textSIZES.xSmall,
        marginHorizontal: textSIZES.xSmall,
        alignContent: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: textSIZES.small,
        borderColor: COLORS({opacity:1}).primary,
      },
  });