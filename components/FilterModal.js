import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { COLORS, FONT, SIZES, SHADOWS, ItemType } from "../constants";
import React, { useEffect, useState } from "react";
import Slider from '@react-native-community/slider';
import SwitchSelector from "react-native-switch-selector";
import SingleSelectDropdown from "./SingleSelectDropdown";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { PropertyCard } from "../screens/cards/PropertyCards";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Spacer } from "../utils";

export default function FilterModal({ filter, setFilter, closeFilter, isScheduler=false }) {
    const sortOptions = [
        {label: "Date (Ascending)", value: "date"},
        {label: "Date (Descending)", value: "-date"},
        {label: "Time (Ascending)", value: "time"},
        {label: "Time (Descending)", value: "-time"}
    ];

    const typeOptions = [
        {label: "Item", value: "Item"},
        {label: "Task", value: "Task"},
        {label: "Event", value: "Event"},
        {label: "Page", value: "Page"},
        {label: "Recipe", value: "Recipe"}
    ];

    const [sortOption, setSortOption] = useState("Start Time (Ascending)");
    const [itemType, setTypeOptions] = useState("All");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [repeat, setRepeat] = useState("x");
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

    const [serving, setServing] = useState(null);
    const [priority, setPriority] = useState("x");

    const [updatedFilter, setUpdatedFilter] = useState({});

    const [hourPickerVisible, setHourPickerVisible] = useState(false);
    const [minutePickerVisible, setMinutePickerVisible] = useState(false);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);

    const toggleHourPicker = () => {
        setHourPickerVisible(!hourPickerVisible);
    };

    const toggleMinutePicker = () => {
        setMinutePickerVisible(!minutePickerVisible);
    };

    // Generate picker items
    const hourItem = [];
    for (let i = 0; i <= 12; i++) {
        hourItem.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />);
    }
    const minuteItem = [];
    for (let i = 0; i <= 55; i += 5) {
        minuteItem.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />);
    }

    useEffect(() => {
        const indexOfOption = Object.values(sortOptions).indexOf("startTime");
        setSortOption(Object.keys(sortOptions)[indexOfOption]);

        const indexOfTypeOption = Object.values(typeOptions).indexOf("itemType");
        setTypeOptions(Object.keys(typeOptions)[indexOfTypeOption]);
    }, []); // run only once

    function changeSortOption(optionValue) {
        //setFilter({... filter, "sortBy": optionValue});
        setSortOption(optionValue);
    }

    function changeTypeOption(optionValue) {
        //setFilter({... filter, "itemType": optionValue});
        setTypeOptions(optionValue);
    }

    function onClose() {
        closeFilter();
    }

    function onSearch() {
        setFilter(updatedFilter);
        closeFilter();
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
        if(params.servings) {
            setUpdatedFilter({... updatedFilter, servings: params.servings});
        }
        if(params.location) {
            setUpdatedFilter({... updatedFilter, location: params.location});
        }
    }

    useEffect(() => {
        if(filter.sortBy) {
            setSortOption(filter.sortBy);
        }
        if(filter.duration) {
            const hours = Math.floor(filter.duration / 60);
            const minutes = filter.duration % 60;
            setHour(hours);
            setMinute(minutes);
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
        if(filter.priority) {
            setPriority(filter.priority);
        }
        if(filter.servings) {
            setServing(filter.servings);
        }
    }, []);

    useEffect(() => {
        setUpdatedFilter({... updatedFilter, "sortBy": sortOption});
        setUpdatedFilter({... updatedFilter, "itemType": itemType});
    }, [itemType, sortOption]);
   
    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.header]}>
                <TouchableOpacity onPress={resetFilter} style={[styles.button, {backgroundColor: COLORS({opacity:1}).tertiary, width: SIZES.xLarge * 4}]} >
                    <Text style={styles.headerText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={[styles.button, {backgroundColor: COLORS({opacity:1}).lightRed, width: SIZES.xLarge * 2}]} > 
                    <Ionicons name={"close-outline"} size={SIZES.xLarge} style={styles.iconInverted}/> 
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Text style={styles.sortText}>Sort by:</Text>
                <SingleSelectDropdown options={sortOptions} placeholder={"Date (Ascending)"} setFn={changeSortOption}
                    icon={<Ionicons name={"swap-vertical-outline"} size={25} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />

                <Text style={styles.sortText}>Item type:</Text>
                <SingleSelectDropdown options={typeOptions} placeholder={"All"} setFn={changeTypeOption}
                    icon={<Ionicons name={"grid-outline"} size={25} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />

                <PropertyCard item={filter} itemType={itemType} setFn={updateFilter} isFilter={true} />
                
                {showStartDate == false && (
                    <TouchableOpacity style={[styles.row, styles.filterDate]} onPress={()=>(setShowStartDate(true), updateFilter({"startDate": startDate}))}>
                    <Text style={{color: COLORS({opacity:0.8}).white, fontSize: SIZES.medium}}>Filter Start Date</Text>
                    </TouchableOpacity>
                )}
                {showStartDate == true && (
                    <View style={[styles.row, styles.property]}>
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
                        {!isScheduler && (
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
                        )}
                    </View>
                )}
                {showEndDate == false && (
                    <TouchableOpacity style={[styles.row, styles.filterDate]} onPress={()=>(setShowEndDate(true), updateFilter({"endDate": endDate}))}>
                    <Text style={{color: COLORS({opacity:0.8}).white, fontSize: SIZES.medium}}>Filter End Date</Text>
                    </TouchableOpacity>
                )}
                {showEndDate == true && (
                    <View style={[styles.row, styles.property]}>
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
                        {!isScheduler && (
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
                        )}
                    </View>
                )}
                <View style={[styles.row, styles.property]}>
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
                        <Text style={{fontSize: SIZES.medium}}>{hour}</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.property}>Hours</Text>
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
                        <Text style={{fontSize: SIZES.medium}}>{minute}</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.property}>Minutes</Text>
                </View>
                <View style={[styles.row, styles.property]}>
                    <Ionicons name={"repeat-outline"} size={25} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
                    <TouchableOpacity style={[styles.row, styles.box, repeat === 'x' ? styles.selectedBox:styles.unselectedBox]}
                        onPress={() => (
                        setRepeat("x"),
                        updateFilter({"repeat": "x"})
                        )}
                    >
                        <Text style={[styles.property, repeat === 'x' ? styles.selectedText:styles.unselectedText]}>x</Text>
                    </TouchableOpacity>
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
                </View>
                <View style={[styles.row, styles.property]}>
                    {(itemType === ItemType.Recipe) ? (
                        <Ionicons name={"star-half-outline"} size={25} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
                    ) : (
                        <Ionicons name={"alert-outline"} size={25} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
                    )}
                    <TouchableOpacity style={[styles.row, styles.box, priority === 'x' ? styles.selectedBox:styles.unselectedBox]}
                        onPress={() => (
                            setPriority("x"),
                        updateFilter({"priority": "x"})
                        )}
                    >
                        <Ionicons name={"close-outline"} size={20} style={[priority === 'x' ? styles.iconInverse:styles.icon]} />
                    </TouchableOpacity>
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
                </View>
                {(itemType === ItemType.Recipe) && (
                    <View style={[styles.row, styles.property]}>
                        <Ionicons name={"restaurant-outline"} size={25} style={[styles.icon]}/>    
                        <TextInput keyboardType="numeric"
                        onChangeText={(serving_) => (
                            setServing(serving_),
                            updateFilter({"serving": Number(serving_)})
                        )}
                        {...(serving ? { defaultValue: serving.toString() } : { placeholder: "0" })}
                        style={[styles.property, styles.box, {backgroundColor: "#FFF"}]}
                        />
                    </View>
                )}
                
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={(onSearch)}
                    //underlayColor='white'
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
        marginTop: SIZES.small,
        paddingTop: SIZES.xxLarge,
        paddingHorizontal: SIZES.xSmall,
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: SIZES.large,
        alignSelf: "center",
        color: COLORS({opacity:1}).white,
    },
    sortText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: SIZES.medium,
        marginHorizontal: SIZES.medium,
    },
    button: {
        height: SIZES.xLarge * 2,
        padding: SIZES.xSmall,
        marginHorizontal: SIZES.xSmall,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.medium
    },
    searchButton: {
        // marginRight: 90,
        // marginLeft: 90,
        marginHorizontal: 50,
        marginTop: SIZES.xSmall,
        marginBottom: 25,
        paddingTop: SIZES.xSmall,
        paddingBottom: SIZES.xSmall,
        backgroundColor: COLORS({opacity: 1}).secondary,
        borderRadius: SIZES.small,
    },
    searchButtonText: {
        fontSize: SIZES.large,
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
        height: "100%",
        width: "100%",
        paddingHorizontal: 20,
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
    label:{
        width: 50,
        color: COLORS({opacity:1}).secondary,
        margin: SIZES.xSmall,
    },
    property:{
        // fontSize: SIZES.medium,
        // fontFamily: FONT.regular,
        color: COLORS({opacity:0.8}).secondary,
        margin: SIZES.xSmall,
    },
    icon: {
        //margin: SIZES.xxSmall,
        color: COLORS({opacity:1}).secondary,
    },
    iconInverse: {
        //margin: SIZES.xxSmall,
        color: COLORS({opacity:1}).lightWhite,
    },
    box: {
        borderWidth: 0.5,
        borderColor: COLORS({opacity:1}).primary,
        borderRadius: SIZES.small,
        padding: SIZES.tiny,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.xxSmall,
    },
    filterDate: {
        marginHorizontal: SIZES.large,
        marginVertical: SIZES.xSmall,
        padding: SIZES.xSmall,
        backgroundColor: COLORS({opacity: 1}).tertiary,
        borderRadius: SIZES.small,
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
        fontSize: SIZES.large,
        fontFamily: FONT.regular,
        color: COLORS({opacity:1}).primary,
    },
    section: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: COLORS({opacity:1}).primary,
    },
    removeButton: {
        backgroundColor: COLORS({opacity:1}).lightRed, 
        padding: SIZES.small, 
        borderRadius: SIZES.xxSmall,
        marginLeft: SIZES.small,
        alignItems: 'center',
    },
    duration: {
        backgroundColor: COLORS({opacity:0.5}).lightGrey,
        padding: SIZES.xSmall,
        borderRadius: SIZES.xSmall,
        marginLeft: SIZES.xSmall,
    },
    picker: {
        width: 100,
        height: 150,
    },
});