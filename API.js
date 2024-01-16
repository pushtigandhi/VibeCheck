import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

export const BASE_URL = 'http://172.27.192.128:3000/api/v0';

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

    const ITEMS_URL = `${BASE_URL}/items/?itemType=item`;
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

// export async function DELETEcreateItem(post) {
//     const response = await fetchWithAuthJSON(`${BASE_URL}/items`, {
//         method: 'DELETE',
//         body: JSON.stringify(post),
//     });

//     if (response.status === 201) {
//         // good
//         const body = await response.json();
//         return body.item;
//     } else {
//         return null;
//     }
// }

export async function GETcontacts() {

    const CONTACTS_URL = `${BASE_URL}/contacts/`;

    // const response = await fetch(CONTACTS_URL, {
    //     method: 'GET',
    // });
    // try {
    //     console.log(response.status);
    //     if (response.status == 201) {
    //         // good, return 
    //         const body = await response.json();
            const body = {
                "contacts": [
                    {
                        "_id": "65a5ed99580cf7b9d816a691",
                        "name": "test 1",
                        "createdAt": "2024-01-16T02:44:41.662Z",
                        "updatedAt": "2024-01-16T02:44:41.662Z",
                        "__v": 0
                    },
                    {
                        "_id": "65a5edd3580cf7b9d816a693",
                        "name": "test 2",
                        "createdAt": "2024-01-16T02:45:39.773Z",
                        "updatedAt": "2024-01-16T02:45:39.773Z",
                        "__v": 0
                    },
                    {
                        "_id": "65a5fa6a2e7f19ab15d12f8a",
                        "name": "test 3",
                        "company": "friend",
                        "createdAt": "2024-01-16T03:39:22.437Z",
                        "updatedAt": "2024-01-16T03:39:22.437Z",
                        "__v": 0
                    },
                    {
                        "_id": "65a5fa8e2e7f19ab15d12f8c",
                        "name": "test 4",
                        "company": "family",
                        "phoneNumber": 6575554444,
                        "createdAt": "2024-01-16T03:39:58.960Z",
                        "updatedAt": "2024-01-16T03:39:58.960Z",
                        "__v": 0
                    },
                    {
                        "_id": "65a5faac2e7f19ab15d12f8e",
                        "name": "test 5",
                        "company": "work",
                        "phoneNumber": 6575554444,
                        "notes": "final test",
                        "createdAt": "2024-01-16T03:40:28.585Z",
                        "updatedAt": "2024-01-16T03:40:28.585Z",
                        "__v": 0
                    }
                ]
            }
            let contacts = body.contacts;
            return contacts.map((contact) => {
                return {
                    ...contact,
                }
            });
    //     } else {
    //         return []
    //     }
    // } catch (err) {
    //     alert(err.message);
    //     return []
    // }
}