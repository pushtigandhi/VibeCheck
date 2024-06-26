import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Image, Text } from 'react-native';
import { COLORS, textSIZES, viewSIZES } from "../constants";

const defaultImage = require("../assets/icon.png");

const testProfile = {
    displayName: 'Test Profile',
    emailInfo: {
        isVerified: true, 
        email: 'testuser@mail.com'
    },
    hanlde: 'test_profile'
}

export default function ProfileScreen () {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={testProfile.avatar ? { uri: testProfile.avatar.uri } : defaultImage}
                style={styles.image}
            />
            <Text style={styles.fullName}>{testProfile.displayName}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
})