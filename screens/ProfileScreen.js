import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, textSIZES, viewSIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const defaultImage = require("../assets/icon.png");



const testProfile = {
    displayName: 'Test Profile',
    emailInfo: {
        isVerified: true, 
        email: 'email@mail.com'
    },
    handle: '@handle',
    password: '*************'
}

export default function ProfileScreen ({ navigation }) {
    const [theme, setTheme] = useState('device');
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await GETuserByHandle(testProfile.handle);
            setProfile(profile);
        }
        fetchProfile();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name={"chevron-back-outline"} size={textSIZES.large} style={{color: COLORS({opacity:1}).primary}}/>
                </TouchableOpacity>
            </View>
            <Image
                source={testProfile.avatar ? { uri: testProfile.avatar.uri } : defaultImage}
                style={styles.image}
            />
            <Text style={styles.fullName}>{testProfile.displayName}</Text>
            <View style={styles.profileDetailsContainer}>
                <View style={styles.leftColumn}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.label}>Handle:</Text>
                    <Text style={styles.label}>Password:</Text>
                    <Text style={styles.label}>Theme:</Text>
                    <View style={styles.themeRow}>
                        <TouchableOpacity
                            style={[styles.themeButton, theme === 'day' && styles.themeButtonSelected]}
                            onPress={() => setTheme('day')}
                        >
                            <MaterialCommunityIcons name="weather-sunny" size={20} color="#FFA500" style={{marginRight: 4}} />
                            <Text style={styles.themeText}>Light</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.themeButton, theme === 'device' && styles.themeButtonSelected]}
                            onPress={() => setTheme('device')}
                        >
                            <MaterialCommunityIcons name="alpha-d-circle" size={20} color="#C2185B" style={{marginRight: 4}} />
                            <Text style={styles.themeText}>Device</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.themeButton, theme === 'night' && styles.themeButtonSelected]}
                            onPress={() => setTheme('night')}
                        >
                            <MaterialCommunityIcons name="weather-night" size={20} color="#888" style={{marginRight: 4}} />
                            <Text style={styles.themeText}>Night</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.value}>{testProfile.emailInfo.email}</Text>
                    <Text style={styles.value}>{testProfile.handle}</Text>
                    <Text style={styles.value}>{testProfile.password}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: textSIZES.small,
        paddingTop: textSIZES.small,
    },
    backButton: {
        height: viewSIZES.xSmall,
        width: viewSIZES.xSmall,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    fullName: {
        fontSize: textSIZES.large,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    profileDetailsContainer: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 8,
        marginBottom: 16,
        backgroundColor: '#F7F7F7',

    },
    leftColumn: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    rightColumn: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    label: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontWeight: 'bold',
        fontSize: textSIZES.small,
        marginBottom: 2,
    },
    value: {
        paddingVertical: 8,
        fontSize: textSIZES.medium,
        marginBottom: 2,
    },
    themeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    themeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: '#FFF',
    },
    themeButtonSelected: {
        borderColor: COLORS({opacity:1}).primary,
        backgroundColor: '#F5F5F5',
    },
    themeText: {
        fontSize: textSIZES.small,
        color: '#333',
    },
})