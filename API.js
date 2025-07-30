import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { ItemType } from './constants'
import { defaultDirectory } from './constants/default';
import { useState } from 'react';

export let PROFILE_ID;

export const BASE_URL = 'http://localhost:3000/api/v0';

const USERS_BASE_URL = `${BASE_URL}/users`;
const PROFILE_BASE_URL = `${BASE_URL}/profile`;
const AUTH_BASE_URL = `${BASE_URL}/auth`;
const CONTACTS_BASE_URL = `${BASE_URL}/contacts`;
const DIRECTORY_BASE_URL = `${BASE_URL}/directory`;
const TAGS_BASE_URL = `${BASE_URL}/tags`;
const ITEMS_BASE_URL = `${BASE_URL}/items`;
const ITEMS_EXT = `?itemType=item`;
const TASKS_EXT = `?itemType=task`;
const EVENTS_EXT = `$?itemType=event`;
const PAGES_EXT = `?itemType=page`;
const RECIPE_EXT = `?itemType=recipe`;


//#region AUTHORIZATION & AUTHENTICATION
const headers = {
    'Content-Type': 'application/json',
};

export async function fetchWithAuth(url, options = {}) {
    // Get JWT from storage
    try {
        const JWT = await AsyncStorage.getItem('JWT');
        // Set JWT in headers
        if (JWT) {
            options.headers = {
                ...options.headers,
                "authorization": JWT,
            };
        }
    } catch (err) {
        console.log(err);
    }

    // Fetch
    let response;
    try {
        response = await fetch(url, options);

    } catch (error) {
        console.log(error);
    }
    
    return response;
}

export async function fetchWithAuthJSON(url, options = {}) {
    // Set content type to JSON
    options.headers = {
        ...options.headers,
        "content-type": "application/json",
    };

    // Fetch
    const response = await fetchWithAuth(url, options);

    return response;
}

export async function saveAuth(response) {
    // get JWT from response
    const JWT = response.headers.get('authorization');

    // save JWT to storage
    await AsyncStorage.setItem('JWT', JWT);
}

export async function removeAuth() {
    // remove JWT from storage
    await AsyncStorage.removeItem('JWT');
}

export async function doLogout() {
    await removeAuth();
}

export async function doLogin(email, password) {
    /**
     * Make request to login endpoint, save JWT if successful
     * return boolean indicating success
     */
    // POST to login endpoint
    try{
        const response = await fetch(`${AUTH_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (response.status === 200) {
            // success - save JWT
            await saveAuth(response);
            PROFILE_ID = await GETme().then((profile) => {
                return profile["_id"];
            });
            return { status: response.status, message: "Login successful" };
        }
        
        const body = await response.json();
        return { status: response.status, message: body.message };
    }
    catch(error){
        console.log(error);
        return false;
    }

}

export async function doSignup(email, password, handle, firstName, lastName) {
    /**
     * Make request to signup endpoint
     * return boolean indicating success
     */
    // POST to signup endpoint
    const response = await fetch(AUTH_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password: password,
            handle: handle,
            firstName: firstName,
            lastName: lastName
        }),
    });

    //get profile in response and save id to storage
    PROFILE_ID = await response.json().then((profile) => {
        return profile["_id"];
    });

    if (response.status === 201) {
        // success - signed up
        return response.status;
    } else {
        return response.status;
    }
}

//#endregion

//#region USERS

// export async function GETusers() {
//     const response = await fetchWithAuth(USERS_BASE_URL, {
//         method: 'GET',
//     });

//     if (response.status == 201) {
//         const body = await response.json();
//         let users = body.users;
//         return users.map((user) => {
//             return {
//                 ...user,
//             }
//         });
//     } else {
//         return []
//     }
// }

// export async function GETme() {
//     const response = await fetchWithAuth(USERS_BASE_URL, {
//         method: 'GET',
//     });

//     if (response.status === 200) {
//         const body = await response.json();
//         return body.user;
//     } else {
//        return null;
//     }
// }

export async function GETuserByHandle() {
    const response = await fetchWithAuth(`${USERS_BASE_URL}/handle`, {
        method: 'GET',
    });

    if (response.status === 200) {
        const body = await response.json();
        return body.user;
    } else {
       return null;
    }
}

//#endregion

//#region PROFILE

export async function GETme() {
    const response = await fetchWithAuth(`${PROFILE_BASE_URL}/`, {
        method: 'GET',
    });

    try {
        if (response.status == 200) {
            // good, return 
            const body = await response.json();
            console.log(body);
            return body.profile;
        } else {
            return null;
        }
    } catch (err) {
        alert(err.message);
        return null;
    }
}

export async function GETprofileDetails(profileID) {
    const response = await fetchWithAuth(`${PROFILE_BASE_URL}/${profileID}`, {
        method: 'GET',
    });

    if (response.status === 200) {
        const body = await response.json();
        return body.profile;
    } else {
       return null;
    }
}

export async function PATCHupdateProfile(data) {
    const response = await fetchWithAuthJSON(PROFILE_BASE_URL, {
        method: "PATCH",
        body: JSON.stringify(data),
    });

    if (response.status === 200) {
        const body = await response.json();
        return body.profile;
    } else {
        throw new Error("Error updating profile");
    }
}

//#endregion

//#region CONTACTS
export async function GETcontacts() {

    const response = await fetchWithAuth(CONTACTS_BASE_URL, {
        method: 'GET',
    });
    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            let contacts = body.contacts;
            return contacts.map((contact) => {
                return {
                    ...contact,
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

export async function GETcontactBy(contactID) {
    const response = await fetchWithAuth(`${CONTACTS_BASE_URL}/${contactID}`, {
        method: 'GET',
    });

    if (response.status === 200) {
        const body = await response.json();
        return body.contact;
    } else {
       return null;
    }
}

export async function POSTaddContact(contact) {
    const response = await fetchWithAuthJSON(CONTACTS_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(contact),
    });

    if (response.status === 201) {
        // good
        const body = await response.json();
        return body.contact;
    } else {
        return null;
    }
}

export async function PATCHcontact(newContact, contactID) {
    delete newContact._id;
    delete newContact.id;

    const response = await fetchWithAuthJSON(`${CONTACTS_BASE_URL}/${contactID}`, {
        method: "PATCH",
        body: JSON.stringify(newItem),
    });

    if (response.status === 200) {
        const editResponse = await response.json();
        return editResponse.contact;
    } else {
        throw new Error("Error updating post");
    }
}

export async function DELETEcontact(contactID) {
    const response = await fetchWithAuth(`${CONTACTS_BASE_URL}/${contactID}`, {
        method: "DELETE",
    });

    if (response.status === 200) {
        return true;
    } else {
        throw new Error("Error deleting contact");
    }
}
//#endregion

//#region DIRECTORY

export async function saveDirectoryToStorage(directory, userID) {
    try {
        await AsyncStorage.setItem(`directory_${userID}`, JSON.stringify(directory));
    } catch (error) {
        console.log('Error saving directory to storage:', error);
    }
}

export async function getDirectoryFromStorage(userID) {
    try {
        const directory = await AsyncStorage.getItem(`directory_${userID}`);
        directoryList = JSON.parse(directory);
        return JSON.parse(directory);
    } catch (error) {
        console.log('Error retrieving directory from async storage:', error);
        return [];
    }
}

export async function GETdirectory() {
    const response = await fetchWithAuth(`${DIRECTORY_BASE_URL}/${PROFILE_ID}`, {
        method: 'GET',
    });
    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            return body;
        } else {
            return []
        }
    } catch (err) {
        alert(err.message);
        return []
    }
}

export async function POSTcategory(category) {
    const response = await fetchWithAuthJSON(`${DIRECTORY_BASE_URL}/${PROFILE_ID}`, {
        method: 'POST',
        body: JSON.stringify(category),
    });

    try {
        if (response.status == 201) {
            // good, return 
            return await response.json();
        } else {
            return []
        }
    } catch (err) {
        alert(err.message);
        return []
    }
}

export async function PATCHcategory(category) {
    const response = await fetchWithAuthJSON(`${DIRECTORY_BASE_URL}/${PROFILE_ID}`, {
        method: "PATCH",
        body: JSON.stringify(category),
    });

    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            return body.directory;
        } else {
            return []
        }
    } catch (err) {
        alert(err.message);
        return []
    }
}

export async function DELETEcategory(categoryID) {
    console.log(PROFILE_ID);
    console.log(categoryID);
    const response = await fetchWithAuthJSON(`${DIRECTORY_BASE_URL}/${PROFILE_ID}`, {
        method: "DELETE",
        body: JSON.stringify({ deletedId: categoryID }),
    });

    try {
        console.log(response.status);
        if (response.status == 201) {
            // good, return 
            return await response.json();
        } else {
            return []
        }
    } catch (err) {
        alert(err.message);
        return []
    }
}
//#endregion

//#region TAGS
export async function GETtags() {
    const response = await fetchWithAuth(TAGS_BASE_URL, {
        method: 'GET',
    });
    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            let tags = body.tags;
            return tags.map((tag) => {
                return {
                    ...tag,
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

export async function POSTaddTag(tag) {
    const response = await fetchWithAuthJSON(TAGS_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(tag),
    });

    if (response.status === 201) {
        // good
        const body = await response.json();
        return body.tag;
    } else {
        return null;
    }
}

export async function PATCHtag(newTag, tagID) {
    delete newTag._id;
    delete newTag.id;

    const response = await fetchWithAuthJSON(`${TAGS_BASE_URL}/${tagID}`, {
        method: "PATCH",
        body: JSON.stringify(newTag),
    });

    if (response.status === 201) {
        // good
        const body = await response.json();
        return body.tag;
    } else {
        return null;
    }
}

export async function DELETEtag(tagID) {
    const response = await fetchWithAuth(`${TAGS_BASE_URL}/${tagID}`, {
        method: "DELETE",
    });

    if (response.status === 201) {
        // good
        const body = await response.json();
        return body.tag;
    } else {
        return null;
    }
}
//#endregion

//#region ITEMS
const getURL= (itemType) => {
    let ext;
    //console.log("getURL: " + itemType);
    //console.log("getURL: " + itemType);
    switch(itemType) {
        case ItemType.Task:
            ext = TASKS_EXT;
            break;
        case ItemType.Event:
            ext = EVENTS_EXT;
            break;
        case ItemType.Page:
            ext = PAGES_EXT;
            break;
        case ItemType.Recipe:
            ext = RECIPE_EXT;
            break;
        case ItemType.Item:
            ext = ITEMS_EXT;
            break;
    }
    return ext;
} 

export async function GETitems(itemType, filter={}) {
    const ext = getURL(itemType);

    //console.log(filter);

    const response = await fetchWithAuth(`${ITEMS_BASE_URL}/${ext}` + (!!Object.keys(filter).length ? "&" : "") +  new URLSearchParams(filter), {
        method: 'GET',
    });
    try {
        //console.log(response.status);
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

export async function GETitemsByID(itemType, itemID) {
    const ext = getURL(itemType);

    const response = await fetchWithAuth(`${ITEMS_BASE_URL}/${itemID}${ext}`, {
        method: 'GET',
    });

    try {
        if (response.status == 200) {
            // good, return 
            const body = await response.json();
            return body.item;
        } else {
            return null;
        }
    } catch (err) {
        alert(err.message);
        return null;
    }
}

export async function GETitemsByIDs(itemType, itemIDs) {
    const ext = getURL(itemType);
    const idsQuery = itemIDs.join(',');

    const response = await fetchWithAuth(`${ITEMS_BASE_URL}/batch/?ids=${idsQuery}`, {
        method: 'GET',
    });

    try {
        if (response.status == 200) {
            // good, return 
            const body = await response.json();
            return body.items;
        } else {
            return [];
        }
    } catch (err) {
        alert(err.message);
        return [];
    }
}



export async function POSTitem(itemType, item) {
    const ext = getURL(itemType);

    const response = await fetchWithAuthJSON(`${ITEMS_BASE_URL}/${ext}`, {
        method: 'POST',
        body: JSON.stringify(item),
    });

    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
        return body.item;
        } else {
            return []
        }
    } catch (err) {
        alert(err.message);
        return []
    }
}

export async function PATCHitem(itemType, newItem, itemID) {
    const ext = getURL(itemType);

    delete newItem._id; // remove _id from newPost
    delete newItem.id;
   // console.log(newItem);

    const response = await fetchWithAuthJSON(`${ITEMS_BASE_URL}/${itemID}${ext}`, {
        method: "PATCH",
        body: JSON.stringify(newItem),
    });

    try {
        //console.log(response.status);
        if (response.status == 200) {
            // good, return 
            const editResponse = await response.json();
            return editResponse.item;
        } else {
            throw new Error("Error updating item");
        }
    } catch (err) {
        alert(err.message);
        return []
    }
}

export async function DELETEitem(itemType, itemID) {
    const ext = getURL(itemType);
    
    const response = await fetchWithAuth(`${ITEMS_BASE_URL}/${itemID}${ext}`, {
        method: "DELETE",
    });

    if (response.status === 200) {
        return true;
    } else {
        throw new Error("Error deleting item");
    }
}

//#endregion

//#region  TODELETE - TESTS



//#endregion

//#region USERS

export async function GETuserByHandleTEST() {
    const response = await fetchWithAuth(`${USERS_BASE_URL}/handle`, {
        method: 'GET',
    });

    // console.log(response);
    // console.log(response);

    const body = {};
    return body.user;
}

//#endregion

//#region CALENDAR

export async function GETtoday(filter={}) {
    const ext = getURL(!!filter.itemType ? filter.itemType : ItemType.Item);
    if (filter.hasOwnProperty('endlt')) {
        delete filter.endlt;
    }
    const response = await fetchWithAuth(`${ITEMS_BASE_URL}/${ext}` + (!!Object.keys(filter).length ? "&" : "") +  new URLSearchParams(filter), {
        method: 'GET',
    });

    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            let items = body.items? body.items : [];
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

export async function GETweek(filter={}) {
    const ext = getURL(!!filter.itemType ? filter.itemType : ItemType.Item);

    if (filter.hasOwnProperty('endlt')) {
        delete filter.endlt;
    }
    const response = await fetchWithAuth(`${ITEMS_BASE_URL}/${ext}` + (!!Object.keys(filter).length ? "&" : "") +  new URLSearchParams(filter), {
        method: 'GET',
    });

    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            let items = body.items? body.items : [];
            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const itemsWithWeekDays = items.reduce((acc, item) => {
                const startDate = new Date(item.startDate);
                const dayOfWeek = weekDays[startDate.getDay()];
                if (!acc[dayOfWeek]) {
                    acc[dayOfWeek] = [];
                }
                acc[dayOfWeek].push({
                    ...item,
                    dayOfWeek: dayOfWeek
                });
                return acc;
            }, {});
            return itemsWithWeekDays;
        } else {
            return []
        }
    } catch (err) {
        alert(err.message);
        return []
    }
}

export async function GETmonth(filter={}) {
    const ext = getURL(!!filter.itemType ? filter.itemType : ItemType.Item);


    const response = await fetchWithAuth(`${ITEMS_BASE_URL}/${ext}` + (!!Object.keys(filter).length ? "&" : "") +  new URLSearchParams(filter), {
        method: 'GET',
    });


    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            let items = body.items? body.items : [];
            const itemsWithMonthDays = items.reduce((acc, item) => {
                const startDate = new Date(item.startDate);
                const dayinmonth = startDate.getDate();
                if (!acc[dayinmonth]) {
                    acc[dayinmonth] = [];
                }
                acc[dayinmonth].push({
                    ...item
                });
                return acc;
            }, {});
            //console.log(itemsWithMonthDays);
            return itemsWithMonthDays;
        } else {
            return []
        }
    } catch (err) {
        alert(err.message);
        return []
    }
}


//#endregion
