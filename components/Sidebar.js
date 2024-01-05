import React from "react";
//import { EventTypes } from 
import { SmallCalendar } from "./SmallCalendar";
//import { SpiralCalendar } from 
import { Typography } from "./Typography";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';


export const Sidebar = () => {
    return (
        <View>
            <View>
                <Typography 
                    bold={false}
                    divClassName="design-component-instance-node-2"
                    text="January"
                    type="h-4"
                />
            </View>
            <SmallCalendar />
        </View>
    );
}