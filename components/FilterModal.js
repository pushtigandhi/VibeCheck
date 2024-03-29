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
    const [duration, setDuration] = useState(15); // in km

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
        setSortOption(optionValue);
        let sortBy = sortOptions[optionValue];
        if (optionValue === "Start Time (Ascending)") {
            const newFilter = filter
            delete newFilter.sortBy;
            setFilter(newFilter);
        } else {
            setFilter({
                ...filter,
                sortBy: sortBy,
            });
        }
    }

    function onClose() {
        closeFilter();
    }

    function filterType(filterType) {
        setFilter({
            ...filter,
            type: filterType
        })
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
        <View style={styles.root}>
            <View style={styles.header}>
                <Text style={styles.headerText}></Text>
                <Ionicons name="close-sharp" size={40} color="black" onPress={onClose} style={styles.closeIcon} />
            </View>
            <Text style={styles.sortText}>Sort by:</Text>
            <SingleSelectDropdown options={sortOptions} placeholder={"Start Time (Ascending)"} setFn={changeSortOption}
                icon={<Ionicons name={"swap-vertical-outline"} size={25} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />
            {/* <SortDropdown onChangeSortOption={changeSortOption} options={sortOptions} value={sortOption} style={styles.sortDropdown} /> */}

            <PropertyCard itemType={ItemType.Scheduled} setFn={updateFilter} isFilter={true} />
            
            
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
                    underlayColor='black'>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    searchButton: {
        marginRight: 90,
        marginLeft: 90,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#adeae9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#adeae9'
    },
    searchButtonText: {
        fontSize: 20,
        alignSelf: "center"
    },
    headerText: {
        fontSize: 20,
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
        marginVertical: 10,
        minHeight: "5%",
        maxHeight: "60%",
    },
    filterOptionLabel: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        flex: 1,
    },
    filterOptionItem: {
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
        marginHorizontal: 10,
    },
    sortOptions: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 10,
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
        height: "100%",
        width: "100%",
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
        paddingHorizontal: 10,
    },
    closeIcon: {
        alignSelf: "center",
    },
    textInput: {
        borderColor: COLORS({opacity:1}).primary,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        width: 260
    },
    rangeInput: {
        borderColor: COLORS({opacity:1}).primary,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 2,
        margin: 10,
        padding: 15,
        borderRadius: 10,
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