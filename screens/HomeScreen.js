import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Keyboard, Modal,
    FlatList, RefreshControl, SafeAreaView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { COLORS, FONT, textSIZES, SHADOWS, viewSIZES } from "../constants";
import HomeNavigation from "./HomeNavigation";

import { Ionicons } from "@expo/vector-icons";

import { directoryList, doOnStart, getDirectoryFromStorage } from "../API";

//import { directoryList } from "../API";
import FilterModal from "../components/FilterModal";
import { refresh } from "@react-native-community/netinfo";
import NewItem from "./NewItem";
import { CalendarView } from "./partialViews/CalendarView";

export default function HomeScreen ({ navigation, route }) {
    const [filter, setFilter] = useState({});
    const [state, setState] = useState("day");
    const [refreshing, setRefreshing] = useState(false);
    const [intention, setIntention] = useState('Set an intention here.');

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    useEffect(() => { 
        
    }, []);
    
    return (
        <SafeAreaView style={styles.screen}>
            <View style={[styles.row, {flex: 0, height: viewSIZES.xSmall}]}>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name={"person"} size={textSIZES.xxLarge} style={{color: COLORS({opacity:1}).primary}}/>
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <TextInput style={styles.intention}
                        value={intention}
                        onChangeText={setIntention}
                        returnKeyType='default'
                    /> 
                </TouchableWithoutFeedback>
            </View>
            <CalendarView navigation={navigation} filter={filter} setFilter={setFilter} isHome={true} refresh={refreshing} />
            
            <HomeNavigation style={{flex: 0}} size={textSIZES.xxLarge} iconColor={COLORS({opacity:1}).primary}/> 
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        backgroundColor: "#FFF",
    },
    calendarContainer: {
        top:0,
        paddingHorizontal: textSIZES.xSmall,
        marginTop: textSIZES.xxSmall,
    },
    profileButton: {
      borderColor: COLORS({opacity:1}).primary,
      borderRadius: 100,
      marginHorizontal: textSIZES.small,
      height: viewSIZES.xSmall,
      width: viewSIZES.xSmall,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS({opacity:1}).lightWhite,
    },
    intention: {
        borderWidth: 1,
        borderColor: COLORS({opacity:1}).primary,
        borderRadius: textSIZES.xxSmall,
        height: viewSIZES.xSmall,
        marginRight: textSIZES.small,
        padding: textSIZES.xxSmall,
        flex: 1,
        fontSize: textSIZES.small,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    column: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    iconRoot: {
        //flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        //height: textSIZES.xSmall,
    },
    icon: {
        color: COLORS({opacity:1}).primary,
        margin: 5,
    },
    tabActive: {
        padding: textSIZES.xxSmall,
        backgroundColor: COLORS({opacity:1}).primary,
        margin: 10,
        color: COLORS({opacity: 1}).white,
        fontWeight: "bold",
    },
    tabInactive: {
        padding: textSIZES.xxSmall,
        backgroundColor: COLORS({opacity:0.5}).primary,
        margin: 10,
        color: COLORS({opacity: 1}).white,
        fontWeight: "normal",
    },
});