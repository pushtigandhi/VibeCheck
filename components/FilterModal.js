import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { COLORS, FONT, SIZES, SHADOWS, ItemType } from "../constants";
import React, { useEffect, useState } from "react";
//import SortDropdown from "./SortDropdown";
import Slider from '@react-native-community/slider';
import SwitchSelector from "react-native-switch-selector";
import SingleSelectDropdown from "./SingleSelectDropdown";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { PropertyCard } from "../screens/cards/PropertyCards";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FilterModal({ filter, setFilter, closeFilter }) {
    const sortOptions = [
        {label: "Date (Ascending)", value: "date"},
        {label: "Date (Descending)", value: "-date"},
        {label: "Time (Ascending)", value: "time"},
        {label: "Time (Descending)", value: "-time"}
    ];

    const [sortOption, setSortOption] = useState("Start Time (Ascending)");
   // const [tagsText, setTagsText] = useState("");
    // const [bountyLTText, setBountyLTText] = useState("$");
    // const [bountyGTText, setBountyGTText] = useState("$");

    useEffect(() => {
        const indexOfOption = Object.values(sortOptions).indexOf("startTime");
        setSortOption(Object.keys(sortOptions)[indexOfOption]);

        // if (filter.longitude && filter.latitude) {
        //     setLocation({
        //         coords: [filter.longitude, filter.latitude],
        //     });
        // }
        // setTagsText(filter.tags?.join(" ") || "");
        // setDuration((filter.radius !== undefined ? filter.radius / 1000 : 25 )); // convert to km, default in m
    }, []); // run only once

    // function onChangeTags(text) {
    //     let tags = text.split(/\s+|,/)
    //         .map((tag) => tag.trim())
    //         .filter((tag) => tag !== "");
        
    //     setFilter({
    //         ...filter,
    //         tags: tags
    //     })
    //     setTagsText(text);
    // }

    function changeSortOption(optionValue) {
        setFilter({... filter, "sortBy": optionValue});
        setSortOption(optionValue);
    }

    function onClose() {
        closeFilter();
    }

    function resetFilter() {
        
    }

    function updateFilter(params) {
        if(params.category) {
            setFilter({... filter, category: params.category});
        }
        if(params.section) {
            setFilter({... filter, section: params.section});
        }
        if(params.duration) {
            setFilter({... filter, duration: params.duration});
        }
        if(params.startDate) {
            setFilter({... filter, startDate: params.startDate});
        }
        if(params.priority) {
            setFilter({... filter, priority: params.priority});
        }
        if(params.repeat) {
            setFilter({... filter, repeat: params.repeat});
        }
        // if(params.ingredients) {
        //     setFilter({... filter, ingredients: params.ingredients});
        // }
        if(params.servings) {
            setFilter({... filter, servings: params.servings});
        }
        if(params.location) {
            setFilter({... filter, location: params.location});
        }
    }

    // search?: string;
    // tags?: [string];
    // category?: string;
    // section?: string;
    // startgt: Date;
    // startlt: Date;
    // endgt: Date;
    // endlt: Date;
    // priority?: string;
    // durationlt: number;
    // durationgt: number;
    // author?: string;
    // sortBy?: string;

   
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.header}>
                <Text style={styles.headerText}></Text>
                <Ionicons name="close-sharp" size={40} color="black" onPress={onClose} style={styles.closeIcon} />
            </View>
            <TouchableOpacity style={styles.header}>
                <Text style={styles.headerText}>Reset</Text>
            </TouchableOpacity>
            <Text style={styles.sortText}>Sort by:</Text>
            <SingleSelectDropdown options={sortOptions} placeholder={"Start Time (Ascending)"} setFn={changeSortOption}
                icon={<Ionicons name={"swap-vertical-outline"} size={25} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />
            {/* <SortDropdown onChangeSortOption={changeSortOption} options={sortOptions} value={sortOption} style={styles.sortDropdown} /> */}

            <PropertyCard item={filter} itemType={ItemType.Scheduled} setFn={updateFilter} isFilter={true} />
            
            
            <ScrollView style={styles.innerRoot}>
                <View style={styles.innnerInnerRoot}>
                

                {/* <View style={styles.sortOptions}>
                    <Text style={styles.sortText}>Tags:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={onChangeTags}
                        value={tagsText}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View> */}

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={(closeFilter)}
                    //underlayColor='white'
                    >
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    searchButton: {
        // marginRight: 90,
        // marginLeft: 90,
        marginTop: SIZES.xSmall,
        paddingTop: SIZES.xSmall,
        paddingBottom: SIZES.xSmall,
        backgroundColor: COLORS({opacity: 1}).secondary,
        borderRadius: SIZES.small,
        borderWidth: 1,
        borderColor: COLORS({opacity: 1}).primary, 
    },
    searchButtonText: {
        fontSize: SIZES.large,
        alignSelf: "center",
        color: COLORS({opacity:1}).lightWhite,
    },
    headerText: {
        fontSize: SIZES.large,
        fontWeight: "bold",
        alignSelf: "center"
    },
    filterOptions: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 20,
    },
    filterOption: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-between",
        marginVertical: SIZES.xSmall,
        minHeight: "5%",
        maxHeight: "60%",
    },
    filterOptionLabel: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: SIZES.xSmall,
        flex: 1,
    },
    locationSelector: {
        height: 80,
        overflow: "hidden",
    },
    sortText: {
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: SIZES.small,
    },
    toSign: {
        fontSize: 20,
        fontWeight: "bold",
        textAlignVertical: "center",
        alignSelf: "center",
        marginHorizontal: SIZES.xSmall,
    },
    sortOptions: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: SIZES.xSmall,
        width: "100%",
        justifyContent: "flex-start",
    },
    sortDropdown: {
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 5,
        width: 100,
        height: 50,
        overflow: "hidden",
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
        height: "100%",
        width: "100%",
        paddingHorizontal: 20,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20,
        paddingHorizontal: SIZES.xSmall,
    },
    closeIcon: {
        alignSelf: "center",
    },
    textInput: {
        borderColor: COLORS({opacity:1}).primary,
        backgroundColor: "white",
        borderRadius: SIZES.xSmall,
        borderWidth: 2,
        padding: 15,
        borderRadius: SIZES.xSmall,
        width: 260
    },
    rangeInput: {
        borderColor: COLORS({opacity:1}).primary,
        backgroundColor: "white",
        borderRadius: SIZES.xSmall,
        borderWidth: 2,
        margin: SIZES.xSmall,
        padding: 15,
        borderRadius: SIZES.xSmall,
        width: 100
    },
    bountyInputs: {
        display: "flex",
        flexDirection: "row",
    },
    bountyInputsRoot: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflow: "hidden",
    },
    bountyInput: {
        width: "40%",
    },
    radiusInput: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    radiusInner: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    innnerInnerRoot: {
        paddingVertical: 20,
    },
    sortByRoot: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }
});