import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput, SafeAreaView} from "react-native";
import { COLORS, FONT, textSIZES, viewSIZES, SHADOWS, ItemType } from "../constants";
import React, { useEffect, useState } from "react";
import SingleSelectDropdown from "./SingleSelectDropdown";
import { PropertyCard } from "../screens/cards/PropertyCards";
import { Scheduler } from "../components/Scheduler";


export default function FilterModal({ filter, setFilter, closeFilter, doSearch, isSection=false }) {
    const sortOptions = [
        {label: "Time (Ascending)", value: "time"},
        {label: "Time (Descending)", value: "-time"},
        {label: "Date (Ascending)", value: "date"},
        {label: "Date (Descending)", value: "-date"},
    ];

    const typeOptions = [
        {label: "Item", value: "Item"},
        {label: "Task", value: "Task"},
        {label: "Event", value: "Event"},
        {label: "Page", value: "Page"},
        {label: "Recipe", value: "Recipe"}
    ];

    const [sortOption, setSortOption] = useState("time");
    const [itemType, setTypeOption] = useState("Item");
    const [showScheduler, setShowScheduler] = useState(false);
    const [showSort, setShowSort] = useState(false);

    const [updatedFilter, setUpdatedFilter] = useState({});

    function changeSortOption(optionValue) {
        setUpdatedFilter({... updatedFilter, "sortBy": optionValue});
        setSortOption(optionValue);
    }

    function changeTypeOption(optionValue) {
        setUpdatedFilter({... updatedFilter, "itemType": optionValue});
        setTypeOption(optionValue);
    }
    

    function onClose() {
        closeFilter(false);
    }

    function onSearch() {
        setFilter(updatedFilter);
        doSearch(updatedFilter);
    }

    function resetFilter() {
        setFilter({});
        setUpdatedFilter({});
        setSortOption("time");
        setTypeOption("Item");
    }

    function updateFilter(params) {
        if(params.category) {
          setUpdatedFilter({... updatedFilter, category: params.category});
        }
        if(params.section) {
            setUpdatedFilter({... updatedFilter, section: params.section});
        }
        if(params.duration) {
          if(params.duration == 'x')

          {
            setUpdatedFilter(({ duration, ...rest }) => rest);
          }
          else {
            setUpdatedFilter({... updatedFilter, duration: params.duration});
          }
        }
        if(params.priority) {
          if(params.priority == 'x')
          {
            setUpdatedFilter(({ priority, ...rest }) => rest);
          }
          else {
            setUpdatedFilter({... updatedFilter, priority: params.priority});
          }
        }
        if(params.subtasks) {
          setUpdatedFilter({... updatedFilter, subtasks: params.subtasks});
        }
        if(params.ingredients) {
          setUpdatedFilter({... updatedFilter, ingredients: params.ingredients});
        }
        if(params.instructions) {
          setUpdatedFilter({... updatedFilter, instructions: params.instructions});
        }
        if(params.servings) {
          if(params.servings == 'x')
          {
            setUpdatedFilter(({ servings, ...rest }) => rest);
          }
          else {
            setUpdatedFilter({... updatedFilter, servings: params.servings});
          }
        }
        if (params.addSchedule) {
            setUpdatedFilter({... updatedFilter, startDate: params.startDate, endDate: params.endDate, repeat: params.repeat});
        }
        if(params.cancelSchedule) {
            setUpdatedFilter(({ startDate, endDate, repeat, ...rest }) => rest);
            setShowScheduler(false);
        }
        if(params.originalSchedule) {
            // This would need to reference the original item's schedule
            // For now, we'll keep the current schedule values
            console.log("Original schedule requested");
        }
    }

    useEffect(() => {
        // Initialize updatedFilter with current filter values
        const initialFilter = { ...filter };
        setUpdatedFilter(initialFilter);
        
        if(filter.itemType) {
            setTypeOption(filter.itemType);
        }
        if(filter.sortBy) {
            setSortOption(filter.sortBy);
        }
        // Note: startDate, endDate, and repeat are handled by the Scheduler component
        // and are not directly managed in this component's state
    }, [filter]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.row, styles.header]}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={textSIZES.large} style={styles.closeIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={resetFilter} style={[styles.button, {backgroundColor: COLORS({opacity:1}).tertiary, width: textSIZES.xLarge * 4}]} >
                    <Text style={styles.headerText}>Reset</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                
                
                <Text style={styles.sortText}>Item type:</Text>
                <SingleSelectDropdown options={typeOptions} placeholder={"All"} setFn={changeTypeOption}
                    icon={<Ionicons name={"grid-outline"} size={textSIZES.small} style={[styles.icon, {margin: textSIZES.tiny}]} />} />

                <PropertyCard item={updatedFilter} itemType={itemType} setFn={updateFilter} isSection={isSection} />
               
                {/* <Scheduler item={filter} setFn={updateFilter} /> */}

                {showSort && (
                    <>
                        <Text style={styles.sortText}>Sort by:</Text>
                        <SingleSelectDropdown options={sortOptions} placeholder={"Time (Ascending)"} setFn={changeSortOption}
                            icon={<Ionicons name={"swap-vertical-outline"} size={textSIZES.small} style={[styles.icon, {margin: textSIZES.tiny}]} />} />
                    </>
                )}
                
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={(onSearch)}
                >
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS({opacity:1}).white,
        flex:1,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "space-between",
    },
    header: {
        display: "flex",
        paddingHorizontal: textSIZES.xSmall,
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: textSIZES.small,
        alignSelf: "center",
        color: COLORS({opacity:1}).white,
    },
    sortText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: textSIZES.small,
        marginHorizontal: textSIZES.small,
    },
    button: {
        padding: textSIZES.xSmall,
        marginHorizontal: textSIZES.xSmall,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: textSIZES.xSmall
    },
    searchButton: {
        // marginRight: 90,
        // marginLeft: 90,
        marginHorizontal: 50,
        marginTop: textSIZES.xSmall,
        marginBottom: 25,
        paddingTop: textSIZES.xSmall,
        paddingBottom: textSIZES.xSmall,
        backgroundColor: COLORS({opacity: 1}).secondary,
        borderRadius: textSIZES.xSmall,
    },
    searchButtonText: {
        fontSize: textSIZES.large,
        alignSelf: "center",
        color: COLORS({opacity:1}).lightWhite,
    },
    root: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: COLORS({opacity:1}).white,
    },
    innerRoot: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingHorizontal: 20,
    },
    closeIcon: {
        alignSelf: "center",
    },
    textInput: {
        borderColor: COLORS({opacity:1}).primary,
        backgroundColor: "white",
        borderRadius: textSIZES.xSmall,
        borderWidth: 2,
        padding: 15,
        borderRadius: textSIZES.xSmall,
        width: 260
    },
    label:{
        width: 50,
        color: COLORS({opacity:1}).secondary,
        margin: textSIZES.xSmall,
    },
    property:{
        // fontSize: textSIZES.small,
        // fontFamily: FONT.regular,
        color: COLORS({opacity:0.8}).secondary,
        //margin: textSIZES.xSmall,
    },
    icon: {
        //margin: textSIZES.xxSmall,
        color: COLORS({opacity:1}).secondary,
    },
    iconInverse: {
        //margin: textSIZES.xxSmall,
        color: COLORS({opacity:1}).lightWhite,
    },
    box: {
        borderWidth: 0.5,
        borderColor: COLORS({opacity:1}).primary,
        borderRadius: textSIZES.xxSmall,
        padding: textSIZES.xSmall, 
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: textSIZES.xxSmall,
    },
    filterDate: {
        marginHorizontal: textSIZES.large,
        marginVertical: textSIZES.xSmall,
        padding: textSIZES.xSmall,
        backgroundColor: COLORS({opacity: 1}).tertiary,
        borderRadius: textSIZES.xSmall,
    }, 
    selectedBox: {
        backgroundColor: COLORS({opacity:1}).secondary,
    },
    unselectedBox: {
      backgroundColor: COLORS({opacity:1}).lightWhite,
    },
    selectedText: {
     color: COLORS({opacity:1}).lightWhite,
    },
    unselectedText: {
     color: COLORS({opacity:1}).secondary,
    },
    title: {
        fontSize: textSIZES.large,
        fontFamily: FONT.regular,
        color: COLORS({opacity:1}).primary,
    },
    section: {
        fontSize: textSIZES.small,
        fontFamily: FONT.regular,
        color: COLORS({opacity:1}).primary,
    },
    removeButton: {
        backgroundColor: COLORS({opacity:1}).lightRed, 
        padding: textSIZES.xSmall, 
        borderRadius: textSIZES.xxSmall,
        marginLeft: textSIZES.xxSmall,
        alignItems: 'center',
    },
    duration: {
        backgroundColor: COLORS({opacity:0.5}).lightGrey,
        padding: textSIZES.xSmall,
        borderRadius: textSIZES.xSmall,
        marginLeft: textSIZES.xSmall,
    },
    picker: {
        width: 100,
        height: 150,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        color: COLORS({opacity:1}).primary,
        backgroundColor: COLORS({opacity:0.1}).white,
        borderWidth: 1,
        borderColor: COLORS({opacity:1}).primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});