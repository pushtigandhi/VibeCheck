import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

export const BASE_URL = 'http://172.27.72.214:3000/api/v0';

const headers = {
    'Content-Type': 'application/json',
  };
  


export async function fetchWithAuth(url, options = {}) {
    // Get JWT from storage
    try {
        const JWT = await AsyncStorage.getItem('JWT');
        // Set JWT in headers
        if (JWT) {
            console.log("got jwt");
            options.headers = {
                ...options.headers,
                "authorization": JWT,
            };
        }
    } catch (err) {
        console.log("JWT err");
        console.log(err);
    }
    
    // Fetch
    let response;
    try {
        response = await fetch(url);

    } catch (error) {
        console.log("fetchwithAuth response error");
        console.log(error);
    }
    
    return response;
}

export async function GETitems() {

    const ITEMS_URL = `${BASE_URL}/items`;
    console.log(ITEMS_URL);
    const response = await fetch(ITEMS_URL, {
        method: 'GET',
    });
    try {
        console.log(response.status);
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            let items = body.items;
            return items.map((item) => {
                return {
                    ...item,
                }
            });
        } else {
            return []
        }
    } catch (err) {
        alert(err.message);
        return []
    }
}

export async function POSTcreateItem(post) {
    const response = await fetchWithAuthJSON(`${BASE_URL}/items`, {
        method: 'POST',
        body: JSON.stringify(post),
    });

    if (response.status === 201) {
        // good
        const body = await response.json();
        return body.item;
    } else {
        return null;
    }
}