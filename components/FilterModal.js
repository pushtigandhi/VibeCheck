import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { COLORS, FONT, textSIZES, viewSIZES, SHADOWS, ItemType } from "../constants";
import React, { useEffect, useState } from "react";
import Slider from '@react-native-community/slider';
import SwitchSelector from "react-native-switch-selector";
import SingleSelectDropdown from "./SingleSelectDropdown";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { PropertyCard } from "../screens/cards/PropertyCards";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Spacer } from "../utils";

export default function FilterModal({ filter, setFilter, closeFilter, doSearch, isScheduler=false, isSection=false }) {
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

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [repeat, setRepeat] = useState("x");
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

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
        doSearch();
    }

    function resetFilter() {
        setFilter({});
        setUpdatedFilter({});
    }

    function updateFilter(params) {
        if(params.category) {
            setUpdatedFilter({... updatedFilter, category: params.category});
        }
        if(params.section) {
            setUpdatedFilter({... updatedFilter, section: params.section});
        }
        if(params.duration) {
            setUpdatedFilter({... updatedFilter, duration: params.duration});
        }
        if(params.startDate) {
            if(params.startDate == 'x')
            {
              const updated = updatedFilter;
              delete updated.startDate;
              setUpdatedFilter(updated);
              
            }
            else {
                setUpdatedFilter({... updatedFilter, startDate: params.startDate});
            }
        }
        if(params.endDate) {
            if(params.endDate == 'x')
            {
                const updated = updatedFilter;
                delete updated.endDate;
                setUpdatedFilter(updated);
                
            }
            else {
                setUpdatedFilter({... updatedFilter, endDate: params.endDate});
            }
        }
        if(params.repeat) {
            if(params.repeat == 'x')
            {
              const updated = updatedFilter;
              delete updated.repeat;
              setUpdatedFilter(updated);
              
            }
            else {
                setUpdatedFilter({... updatedFilter, repeat: params.repeat});
            }
        }
        if(params.priority) {
            if(params.priority == 'x')
            {
              const updated = updatedFilter;
              delete updated.priority;
              setUpdatedFilter(updated);
              
            }
            else {
                setUpdatedFilter({... updatedFilter, priority: params.priority});
            }
        }
        if(params.servings) {
            setUpdatedFilter({... updatedFilter, servings: params.servings});
        }
        if(params.location) {
            setUpdatedFilter({... updatedFilter, location: params.location});
        }
    }

    useEffect(() => {
        // console.log(filter);
        if(filter.itemType) {
            setTypeOption(filter.itemType);
        }
        if(filter.sortBy) {
            setSortOption(filter.sortBy);
        }
        if(filter.startDate) {
            setStartDate(filter.startDate);
            setShowStartDate(true);
        }
        if(filter.endDate) {
            setEndDate(filter.endDate);
            setShowEndDate(true);
        }
        if(filter.repeat) {
            setRepeat(filter.repeat);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.header]}>
                {isScheduler == false && (
                    <TouchableOpacity onPress={resetFilter} style={[styles.button, {backgroundColor: COLORS({opacity:1}).tertiary, width: textSIZES.xLarge * 4}]} >
                        <Text style={styles.headerText}>Reset</Text>
                    </TouchableOpacity>
                )}
                
                <TouchableOpacity onPress={onClose} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightRed, width: viewSIZES.xxSmall}]} > 
                    <Ionicons name={"close-outline"} size={textSIZES.xLarge} style={styles.iconInverse}/> 
                </TouchableOpacity>
            </View>
            <ScrollView>
                
                
                <Text style={styles.sortText}>Item type:</Text>
                <SingleSelectDropdown options={typeOptions} placeholder={"All"} setFn={changeTypeOption}
                    icon={<Ionicons name={"grid-outline"} size={25} style={[styles.icon, {margin: textSIZES.xxSmall}]} />} />

                <PropertyCard item={filter} itemType={itemType} setFn={updateFilter} isSection={isSection} />

                {isScheduler==false && (
                    <>
                        {showStartDate == false && (
                            <TouchableOpacity style={[styles.row, styles.filterDate]} onPress={()=>(setShowStartDate(true), updateFilter({"startDate": startDate}))}>
                            <Text style={{color: COLORS({opacity:0.8}).white, fontSize: textSIZES.small}}>Filter Start Date</Text>
                            </TouchableOpacity>
                        )}
                        {showStartDate == true && (
                            <View style={[styles.row, { margin: textSIZES.xSmall }]}>
                                <Ionicons name={"calendar-outline"} size={25} style={styles.icon} />

                                <DateTimePicker
                                    value={startDate}
                                    mode={"date"}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || startDate;
                                        setStartDate(currentDate);
                                        updateFilter({"startDate": currentDate});
                                    }}
                                />
                                
                                <TouchableOpacity style={[styles.row, styles.removeButton]}
                                    onPress={() => (
                                    setStartDate(new Date()),
                                    updateFilter({"startDate": "x"}), 
                                    setShowStartDate(false)
                                    )}
                                >
                                    <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
                                    <Text style={{color: COLORS({opacity:1}).white}}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {showEndDate == false && (
                            <TouchableOpacity style={[styles.row, styles.filterDate]} onPress={()=>(setShowEndDate(true), updateFilter({"endDate": endDate}))}>
                            <Text style={{color: COLORS({opacity:0.8}).white, fontSize: textSIZES.small}}>Filter End Date</Text>
                            </TouchableOpacity>
                        )}
                        {showEndDate == true && (
                            <View style={[styles.row, { margin: textSIZES.xSmall }]}>
                                <Ionicons name={"calendar-outline"} size={25} style={styles.icon} />
                                
                                <DateTimePicker
                                    value={endDate}
                                    mode={"date"}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || endDate;
                                        setEndDate(currentDate);
                                        updateFilter({"endDate": currentDate});
                                    }}
                                />
                                <TouchableOpacity style={[styles.row, styles.removeButton]}
                                    onPress={() => (
                                    setEndDate(new Date()),
                                    updateFilter({"endDate": "x"}), 
                                    setShowEndDate(false)
                                    )}
                                >
                                    <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
                                    <Text style={{color: COLORS({opacity:1}).white}}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        )} 
                    </>
                )}
                {/* {isScheduler==false && (
                    <View style={[styles.row, { margin: textSIZES.xSmall }]}>
                        <Ionicons name={"timer-outline"} size={25} style={[styles.icon]}/>    
                        {hourPickerVisible ? (
                            <>
                            <Picker
                                selectedValue={hour}
                                onValueChange={(newHour) => (
                                setHour(newHour),
                                toggleHourPicker(),
                                //setDuration(newHour*60 + minute),
                                updateFilter({"duration": Number(newHour * 60) + Number(minute)})
                                )}
                                style={styles.picker}>
                                {hourItem}
                            </Picker>
                            <Spacer size={30} />
                            </>
                        ) : (
                            <TouchableOpacity onPress={toggleHourPicker} style={styles.duration}>
                            <Text style={{fontSize: textSIZES.small}}>{hour}</Text>
                            </TouchableOpacity>
                        )}
                        <Text style={[styles.property, { margin: textSIZES.xSmall }]}>Hours</Text>
                        {minutePickerVisible ? (
                            <View>
                            <Picker
                                selectedValue={minute}
                                onValueChange={(newMinute) => (
                                setMinute(newMinute),
                                toggleMinutePicker(),
                                //setDuration(hour*60 + newMinute),
                                updateFilter({"duration": Number(hour * 60) + Number(newMinute)})
                                )}
                                style={styles.picker}>
                                {minuteItem}
                            </Picker>
                            <Spacer size={30} />
                            </View>
                        ) : (
                            <TouchableOpacity onPress={toggleMinutePicker} style={styles.duration}>
                            <Text style={{fontSize: textSIZES.small}}>{minute}</Text>
                            </TouchableOpacity>
                        )}
                        <Text style={[styles.property, { margin: textSIZES.xSmall }]}>Minutes</Text>
                    </View>
                )} */}
                

                {isScheduler==false && (showStartDate == true || showEndDate == true) && (
                    <View style={[styles.row, { margin: textSIZES.xSmall }]}>
                        <Ionicons name={"repeat-outline"} size={25} style={[styles.icon, {margin: textSIZES.xxSmall}]}/>
                        <TouchableOpacity style={[styles.row, styles.box, repeat === 'ONCE' ? styles.selectedBox:styles.unselectedBox]}
                            onPress={() => (
                            setRepeat("ONCE"),
                            updateFilter({"repeat": "ONCE"})
                            )}
                        >
                        <Text style={[styles.property, repeat === 'ONCE' ? styles.selectedText:styles.unselectedText]}>Once</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.row, styles.box, repeat === 'DAILY' ? styles.selectedBox:styles.unselectedBox]}
                            onPress={() => (
                            setRepeat("DAILY"),
                            updateFilter({"repeat": "DAILY"})
                            )}
                        >
                        <Text style={[styles.property, repeat === 'DAILY' ? styles.selectedText:styles.unselectedText]}>Daily</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.row, styles.box, repeat === 'WEEKLY' ? styles.selectedBox:styles.unselectedBox]}
                            onPress={() => (
                            setRepeat("WEEKLY"),
                            updateFilter({"repeat": "WEEKLY"})
                            )}
                        >
                            <Text style={[styles.property, repeat === 'WEEKLY' ? styles.selectedText:styles.unselectedText]}>Weekly</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.row, styles.box, repeat === 'MONTHLY' ? styles.selectedBox:styles.unselectedBox]}
                            onPress={() => (
                            setRepeat("MONTHLY"),
                            updateFilter({"repeat": "MONTHLY"})
                            )}
                        >
                            <Text style={[styles.property, repeat === 'MONTHLY' ? styles.selectedText:styles.unselectedText]}>Monthly</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.row, styles.removeButton]}
                            onPress={() => (
                                setRepeat("x"),
                                updateFilter({"repeat": "x"})
                            )}
                        >
                            <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
                        </TouchableOpacity>
                    </View>
                )}

                {isScheduler==false && (showStartDate == true || showEndDate == true) && (
                    <>
                        <Text style={styles.sortText}>Sort by:</Text>
                        <SingleSelectDropdown options={sortOptions} placeholder={"Time (Ascending)"} setFn={changeSortOption}
                            icon={<Ionicons name={"swap-vertical-outline"} size={25} style={[styles.icon, {margin: textSIZES.xxSmall}]} />} />
                    </>
                )}
                
                {/* <View style={[styles.row, { margin: textSIZES.xSmall }]}>
                    {(itemType === ItemType.Recipe) ? (
                        <Ionicons name={"star-half-outline"} size={25} style={[styles.icon, {margin: textSIZES.xxSmall}]}/>
                    ) : (
                        <Ionicons name={"alert-outline"} size={25} style={[styles.icon, {margin: textSIZES.xxSmall}]}/>
                    )}
                    <TouchableOpacity style={[styles.row, styles.box, priority === 'LOW' ? styles.selectedBox:styles.unselectedBox]}
                        onPress={() => (
                        setPriority("LOW"),
                        updateFilter({"priority": "LOW"})
                        )}
                    >
                        <Ionicons name={"star-outline"} size={20} style={[priority === 'LOW' ? styles.iconInverse:styles.icon]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, styles.box, priority === 'MED' ? styles.selectedBox:styles.unselectedBox]}
                        onPress={() => (
                        setPriority("MED"),
                        updateFilter({"priority": "MED"})
                        )}
                    >
                        <Ionicons name={"star-outline"} size={20} style={[priority === 'MED' ? styles.iconInverse:styles.icon]} />
                        <Ionicons name={"star-outline"} size={20} style={[priority === 'MED' ? styles.iconInverse:styles.icon]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, styles.box, priority === 'HIGH' ? styles.selectedBox:styles.unselectedBox]}
                        onPress={() => (
                        setPriority("HIGH"),
                        updateFilter({"priority": "HIGH"})
                        )}
                    >
                        <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
                        <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
                        <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, styles.removeButton]}
                        onPress={() => (
                            setPriority("x"),
                            updateFilter({"priority": "x"})
                        )}
                    >
                        <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
                    </TouchableOpacity>
                </View>
                {(itemType === ItemType.Recipe) && (
                    <View style={[styles.row, { margin: textSIZES.xSmall }]}>
                        <Ionicons name={"restaurant-outline"} size={25} style={[styles.icon, {margin: textSIZES.xxSmall}]}/>
                        <TextInput keyboardType="numeric"
                        onChangeText={(serving_) => (
                            setServing(serving_),
                            updateFilter({"serving": Number(serving_)})
                        )}
                        {...(serving ? { defaultValue: serving.toString() } : { placeholder: "0" })}
                        style={[styles.property, styles.box, {backgroundColor: "#FFF"}]}
                        />
                    </View>
                )} */}
                
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={(onSearch)}
                >
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
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
        marginTop: textSIZES.xSmall,
        paddingTop: textSIZES.xxLarge,
        paddingHorizontal: textSIZES.xSmall,
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: textSIZES.large,
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
        height: viewSIZES.xxSmall,
        padding: textSIZES.xSmall,
        marginHorizontal: textSIZES.xSmall,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: textSIZES.small
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
});