import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { ItemType } from './constants'
import { useState } from 'react';

export let directoryList = [];
export const BASE_URL = 'http://172.27.72.214:3000/api/v0';

const USERS_BASE_URL = `${BASE_URL}/users`;
const PROFILE_BASE_URL = `${PROFILE_BASE_URL}`;
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
        console.log("JWT err");
        console.log(err);
    }
    
    // Fetch
    let response;
    try {
        response = await fetch(url, options);

    } catch (error) {
        console.log("fetchwithAuth response error");
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
    const response = await fetchWithAuth(PROFILE_BASE_URL, {
        method: 'GET',
    });

    if (response.status === 200) {
        const body = await response.json();
        return body.profile;
    } else {
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
        console.log(response.status);
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
export async function GETdirectory(profileID) {
    const response = await fetchWithAuth(`${DIRECTORY_BASE_URL}/${profileID}`, {
        method: 'GET',
    });
    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            let directory = body.directory;
            return directory.map((category) => {
                return {
                    ...category,
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

export async function POSTaddCategory(profileID, category) {
    const response = await fetchWithAuthJSON(`${DIRECTORY_BASE_URL}/${profileID}`, {
        method: 'POST',
        body: JSON.stringify(category),
    });

    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            let directory = body.directory;
            return directory.map((category) => {
                return {
                    ...category,
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

export async function PATCHcategory(newCategory, categoryID) {
    delete newCategory._id;
    delete newCategory.id;

    const response = await fetchWithAuthJSON(`${DIRECTORY_BASE_URL}/${categoryID}`, {
        method: "PATCH",
        body: JSON.stringify(newCategory),
    });

    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            let directory = body.directory;
            return directory.map((category) => {
                return {
                    ...category,
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

export async function DELETEcategory(categoryID) {
    const response = await fetchWithAuth(`${DIRECTORY_BASE_URL}/${categoryID}`, {
        method: "DELETE",
    });

    try {
        if (response.status == 201) {
            // good, return 
            const body = await response.json();
            let directory = body.directory;
            return directory.map((category) => {
                return {
                    ...category,
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
    console.log("getURL: " + itemType);
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

    const response = await fetchWithAuth(`${ITEMS_BASE_URL}/${ext}` + (!!Object.keys(filter).length ? "?" : "") +  new URLSearchParams(filter), {
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

export async function POSTcreateItem(itemType, item) {
    const ext = getURL(itemType);

    const response = await fetchWithAuthJSON(`${ITEMS_BASE_URL}/${itemID}${ext}`, {
        method: 'POST',
        body: JSON.stringify(item),
    });

    if (response.status === 201) {
        // good
        const body = await response.json();
        return body.item;
    } else {
        return null;
    }
}

export async function PATCHitem(itemType, newItem, itemID) {
    const ext = getURL(itemType);

    delete newItem._id; // remove _id from newPost
    delete newItem.id;

    const response = await fetchWithAuthJSON(`${ITEMS_BASE_URL}/${itemID}${ext}`, {
        method: "PATCH",
        body: JSON.stringify(newItem),
    });

    if (response.status === 200) {
        const editResponse = await response.json();
        return editResponse.item;
    } else {
        throw new Error("Error updating item");
    }
}

export async function DELETEitem(itemID) {
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

//#region AUTHORIZATION & AUTHENTICATION

export async function fetchWithAuthTEST(url, options = {}) {
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
        console.log("JWT err");
        console.log(err);
    }
    
    response = await fetch(url, options);
    return response;
}

export async function doLoginTEST(email, password) {
    
    const response = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        })
    }

    console.log(`${AUTH_BASE_URL}/login` + " " + response.body);

    //await saveAuth(response);
    return { status: 200, message: "Login successful" };

}

export async function doSignupTEST(email, password, handle, firstName, lastName) {
    /**
     * Make request to signup endpoint
     * return boolean indicating success
     */
    // POST to signup endpoint
    const response = {
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
    };

    console.log(AUTH_BASE_URL + " " + response);

    return 201;
}

//#endregion

//#region ONSTART
export async function doOnStart() {
    directoryList = GETdirectoryTEST();
}
//#endregion

//#region USERS

export async function GETuserByHandleTEST() {
    const response = await fetchWithAuth(`${USERS_BASE_URL}/handle`, {
        method: 'GET',
    });

    console.log(response);

    const body = {};
    return body.user;
}

//#endregion

//#region PROFILE
export async function GETprofileImageTEST() {
    const profile = {
        "profile": {
            "emailInfo": {
                "isVerified": true,
                "email": "pushti@example.com"
            },
            "_id": "65dffad64102392ebb57839b",
            "user": "65dffad64102392ebb578397",
            "items": [
                "65dffbe64102392ebb5783b0",
                "65dffccb4102392ebb5783b9",
                "65e134a91635ad960dabdc1b"
            ],
            "contactCard": "65dffad64102392ebb578399",
            "contacts": [],
            "directory": [
                {
                    "color": "rgba(193, 192, 200, 1)",
                    "_id": "65dffad64102392ebb57839c",
                    "title": "Backlog",
                    "sections": [
                        "All"
                    ]
                },
                {
                    "color": "rgba(193, 192, 200, 1)",
                    "title": "Cooking",
                    "sections": [
                        "All",
                        "Recipes",
                        "Tips"
                    ],
                    "_id": "65e172b61635ad960dabdc32"
                }
            ],
            "createdAt": "2024-02-29T03:32:38.682Z",
            "updatedAt": "2024-03-01T06:16:22.508Z",
            "__v": 1
        }
    };
    if(!!profile.avatar) {
        return profile.avatar;
    }
    return profile.profile;
}

export async function GETmeTEST() {
    // const response = await fetchWithAuthTEST(PROFILE_BASE_URL, {
    //     method: 'GET',
    // });

    // console.log(response);

    const profile = {
        "profile": {
            "emailInfo": {
                "isVerified": true,
                "email": "pushti@example.com"
            },
            "_id": "65dffad64102392ebb57839b",
            "user": "65dffad64102392ebb578397",
            "items": [
                "65dffbe64102392ebb5783b0",
                "65dffccb4102392ebb5783b9",
                "65e134a91635ad960dabdc1b"
            ],
            "contactCard": "65dffad64102392ebb578399",
            "contacts": [],
            "directory": [
                {
                    "color": "rgba(193, 192, 200, 1)",
                    "_id": "65dffad64102392ebb57839c",
                    "title": "Backlog",
                    "sections": [
                        "All"
                    ]
                },
                {
                    "color": "rgba(193, 192, 200, 1)",
                    "title": "Cooking",
                    "sections": [
                        "All",
                        "Recipes",
                        "Tips"
                    ],
                    "_id": "65e172b61635ad960dabdc32"
                }
            ],
            "createdAt": "2024-02-29T03:32:38.682Z",
            "updatedAt": "2024-03-01T06:16:22.508Z",
            "__v": 1
        }
    };
    return profile.profile;
}

export async function GETprofileDetailsTEST(profileID) {
    const response = await fetchWithAuth(`${PROFILE_BASE_URL}/${profileID}`, {
        method: 'GET',
    });

    console.log(response);

    const profile = {"profile": {}};
    return profile.profile;
}

export async function PATCHupdateProfileTEST(data) {
    const response = await fetchWithAuthJSON(PROFILE_BASE_URL, {
        method: "PATCH",
        body: JSON.stringify(data),
    });

    console.log(response);

    const profile = {"profile": {}};
    return profile.profile;
}

//#endregion

//#region CONTACTS
export async function GETcontactsTEST() {

    const response = await fetchWithAuth(CONTACTS_BASE_URL, {
        method: 'GET',
    });

    console.log(response);

    const body = {"contacts": []};
    let contacts = body.contacts;
    return contacts.map((contact) => {
        return {
            ...contact,
        }
    });
}

export async function GETcontactByTEST(contactID) {
    const response = await fetchWithAuth(`${CONTACTS_BASE_URL}/${contactID}`, {
        method: 'GET',
    });

    console.log(response);

    const body = {"contacts": {}};
    return body.contacts;
}

export async function POSTaddContactTEST(contact) {
    const response = await fetchWithAuthJSON(CONTACTS_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(contact),
    });

    console.log(response);

    const body = {"contacts": {}};
    return body.contacts;
}

export async function PATCHcontactTEST(newContact, contactID) {
    delete newContact._id;
    delete newContact.id;

    const response = await fetchWithAuthJSON(`${CONTACTS_BASE_URL}/${contactID}`, {
        method: "PATCH",
        body: JSON.stringify(newItem),
    });

    console.log(response);

    const editResponse = {"contacts": {}};
    return editResponse.contacts;
}

export async function DELETEcontactTEST(contactID) {
    const response = await fetchWithAuth(`${CONTACTS_BASE_URL}/${contactID}`, {
        method: "DELETE",
    });

    console.log(response);
}
//#endregion

//#region DIRECTORY
export async function GETdirectoryTEST() {
    // const response = await fetchWithAuthTEST(`${DIRECTORY_BASE_URL}/${profileID}`, {
    //     method: 'GET',
    // });

    // console.log(response);

    const body = {"directory": [
        {
            "_id": "65dffad64102392ebb57839c",
            "title": "Backlog",
            "sections": [
                {"title": "All", "view": "Default"}
            ]
        },
        {
            "title": "Cooking",
            "sections": [
                {"title": "All", "view": "Default", "_id": "235235"},
                {"title": "Recipes", "view": "Default", "_id": "74576"},
                {"title": "Tips", "view": "Checklist", "_id": "4674764674"},
                {"title": "Meal Plan", "view": "Schedule", "_id": "3578365"}
            ],
            "_id": "65e172b61635ad960dabdc32"
        }
    ]};
    let directory = body.directory;
    return directory.map((category) => {
        return {
            ...category,
        }
    });
}

export async function POSTaddCategoryTEST(profileID, category) {
    const response = `${DIRECTORY_BASE_URL}/${profileID}...body:` + JSON.stringify(category);

    console.log(response);

    const body = {"directory": []};
    let directory = body.directory;
    return directory.map((category) => {
        return {
            ...category,
        }
    });
}

export async function PATCHcategoryTEST(newCategory, categoryID) {
    delete newCategory._id;
    delete newCategory.id;

    const response = await fetchWithAuthJSON(`${DIRECTORY_BASE_URL}/${categoryID}`, {
        method: "PATCH",
        body: JSON.stringify(newCategory),
    });

    console.log(response);

    const body = {"directory": []};
    let directory = body.directory;
    return directory.map((category) => {
        return {
            ...category,
        }
    });
}

export async function DELETEcategoryTEST(categoryID) {
    const response = await fetchWithAuth(`${DIRECTORY_BASE_URL}/${categoryID}`, {
        method: "DELETE",
    });

    console.log(response);

    const body = {"directory": []};
    let directory = body.directory;
    return directory.map((category) => {
        return {
            ...category,
        }
    });
}
//#endregion

//#region TAGS
export async function GETtagsTEST() {
    const response = await fetchWithAuth(TAGS_BASE_URL, {
        method: 'GET',
    });

    console.log(response);

    const body = {"tags": []};
    let tags = body.tags;
    return tags.map((tag) => {
        return {
            ...tag,
        }
    });
}

export async function POSTaddTagTEST(tag) {
    const response = await fetchWithAuthJSON(TAGS_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(tag),
    });

    console.log(response);

    const body = {"tag": {}};
    return body.tag;
}

export async function PATCHtagTEST(newTag, tagID) {
    delete newTag._id;
    delete newTag.id;

    const response = await fetchWithAuthJSON(`${TAGS_BASE_URL}/${tagID}`, {
        method: "PATCH",
        body: JSON.stringify(newTag),
    });

    iconsole.log(response);

    const body = {"tag": {}};
    return body.tag;
}

export async function DELETEtagTEST(tagID) {
    const response = await fetchWithAuth(`${TAGS_BASE_URL}/${tagID}`, {
        method: "DELETE",
    });

    console.log(response);

    const body = {"tag": {}};
    return body.tag;
}
//#endregion

//#region CALENDAR
export async function GETscheduledTEST(date, state, filter={}) {
    //console.log("scheduled: " + date + " " + state);

    if (state == "day") {
        return GETtodayTEST(date, filter);
    }
    else if (state == "week") {
        return GETweekTEST(date, filter);
    }
    else {
        return GETmonthTEST(date, filter);
    }
}

export async function GETtodayTEST(selectedDate, filter={}) {
    const date = new Date(selectedDate);

    filter.startgt = date; 
    filter.startlt = date;

    const response = `${ITEMS_BASE_URL}/` + new URLSearchParams(filter);

    //console.log("today: " + response);

    const body = {
        "items": [
            {
                "_id": "65dffbe64102392ebb5783b0",
                "category": "Backlog", 
                "description": "Description of what the item is. ", 
                "favicon": {"assetId": "A763AC6D-6F2C-46F2-93A6-5B8E616CC06C/L0/001", "base64": null, "duration": null, "exif": null, "fileName": "IMG_0707.jpg", "fileSize": 1536094, "height": 2002, "mimeType": "image/jpeg", "type": "image", "uri": "file:///var/mobile/Containers/Data/Application/2B539751-A0AE-44FE-B0A5-919A07440921/Library/Caches/ExponentExperienceData/@anonymous/VibeCheck-c25b1d4f-7003-4b9f-8017-6562b5a94a07/ImagePicker/4E780BC8-D48C-4176-9570-17ACAECCBADF.jpg", "width": 2002}, 
                "icon": "📦", 
                "notes": "Remember important info about the item. ", 
                "section": "All", 
                "title": "Item",
                "owner": "65dffad64102392ebb57839b",
                "duration": "30",
                "startDate": "2024-03-29T10:00:00.000Z",
                "endDate": "2024-03-29T13:08:05.326Z",
                "repeat": "DAILY",
                "createdAt": "2024-02-29T03:37:10.111Z",
                "updatedAt": "2024-02-29T03:37:10.111Z",
                "__v": 0
            },
            {
                "category": "Backlog", 
                "description": "Description of the task. ", 
                "icon": "📋", 
                "notes": "Important details about the task.", 
                "priority": "HIGH", 
                "section": "All", 
                "title": "Task",
                "_id": "65dffbe64102392ebb5783b01235436457",
                "itemType": "Task",
                "subtasks": [{"isChecked": false, "task": "first subtask", "_id": "65e134a91635ad960dab35ytsdc1c"},
                {"isChecked": false, "task": "2 subtask", "_id": "65e134a91635ad960dabsrhjdc1c"}],
                "contacts": [{"isChecked": false, "task": "4 subtask", "_id": "65e134a91635ad96tdku0dabdc1c"},
                {"isChecked": false, "task": "5 subtask", "_id": "65e134a91635ad96nhdtt0dabdc1c"}],
                "owner": "65dffad64102392ebb57839b",
                "duration": "150",
                "startDate": "2024-03-29T14:30:00.000Z",
                "endDate": "2024-03-13T17:00:05.326Z",
                "createdAt": "2024-02-29T03:37:10.111Z",
                "updatedAt": "2024-02-29T03:37:10.111Z",
                "__v": 0
            },{
                "category": "Backlog", 
                "description": "Description of the event. ", 
                "favicon": {"assetId": "89BA16EB-A861-4651-848B-33B0D9E412E5/L0/001", "base64": null, "duration": null, "exif": null, "fileName": "IMG_1345.jpg", "fileSize": 3784860, "height": 4032, "mimeType": "image/jpeg", "type": "image", "uri": "file:///var/mobile/Containers/Data/Application/2B539751-A0AE-44FE-B0A5-919A07440921/Library/Caches/ExponentExperienceData/@anonymous/VibeCheck-c25b1d4f-7003-4b9f-8017-6562b5a94a07/ImagePicker/F223FEC7-EEF1-40AE-AAA2-F16ED2247BEB.jpg", "width": 3024}, 
                "icon": "📍", 
                "section": "All", 
                "title": "Event",
                "_id": "65dffbe64102392ebb5783b056478",
                "contacts": [],
                "subtasks": [],
                "owner": "65dffad64102392ebb57839b",
                "duration": "60",
                "itemType": "Event",
                "startDate": "2024-03-29T18:15:00.000Z",
                "endDate": "2024-03-29T19:15:05.326Z",
                "createdAt": "2024-02-29T03:37:10.111Z",
                "updatedAt": "2024-02-29T03:37:10.111Z",
                "__v": 0
            },{
                "_id": "65dffbe64102392ebb5783b0xtu",
                "icon": '\u{1F4C4}',
                "title": "Daily Reflection",
                "category": "Backlog",
                "section": "All",
                "itemType": "Page",
                "repeat": "DAILY",
                "notes": "Journal prompt here.",
                "owner": "65dffad64102392ebb57839b",
                "startDate": "2024-03-29T20:00:00.000Z",
                "endDate": "2024-03-13T20:30:00.326Z",
                "createdAt": "2024-02-29T03:37:10.111Z",
                "updatedAt": "2024-02-29T03:37:10.111Z",
                "__v": 0
            },{
                "_id": "65dffbe64102392ebb5b0xtu",
                "title": "Dinner - Recipe",
                "category": "Cooking",
                "section": "Recipes",
                "favicon": {"assetId": "53493CEF-3F13-4D9C-8E4B-0C84C7E47D7C/L0/001", "base64": null, "duration": null, "exif": null, "fileName": "IMG_1124.jpg", "fileSize": 6554812, "height": 4032, "mimeType": "image/jpeg", "type": "image", "uri": "file:///var/mobile/Containers/Data/Application/2B539751-A0AE-44FE-B0A5-919A07440921/Library/Caches/ExponentExperienceData/@anonymous/VibeCheck-c25b1d4f-7003-4b9f-8017-6562b5a94a07/ImagePicker/7D7072D5-940D-4730-B4ED-47727C1578B3.jpg", "width": 3024},
                "itemType": "Recipe",
                "icon": '\u{1F37D}',
                "servings": 3,
                "repeat": "WEEKLY",
                "priority": "HIGH",
                "ingredients" : [{"isChecked": false, "task": "2 cups all puprose flour", "_id": "65e134a91635ad960dab35ytsdc1c"},
                    {"isChecked": false, "task": "1 cup water", "_id": "65e134a91635ad960dabsrhjdc1c"},
                    {"isChecked": false, "task": "1tbsp yeast", "_id": "65e134a91635ad960dabsrhjwew1c"},
                ],
                "instructions": [{"isChecked": false, "task": "Mix ingredients and knead dough", "_id": "65e134a91635ad960dab35ytsdc1c"},
                {"isChecked": false, "task": "Rest for 30 mins", "_id": "65e134a91635ad960dabsrhjdc1c"},
                {"isChecked": false, "task": "Separate dough into 4", "_id": "65e134a91635ad960dabsrhjwew1c"},
                {"isChecked": false, "task": "Preheat oven to 350F", "_id": "65e134a91635ad960dab35ytsdc1c"}],
                "owner": "65dffad64102392ebb57839b",
                "startDate": "2024-03-29T22:00:00.000Z",
                "endDate": "2024-03-13T23:30:00.326Z",
                "createdAt": "2024-02-29T03:37:10.111Z",
                "updatedAt": "2024-02-29T03:37:10.111Z",
                "__v": 0
            },
        ]
    };
    let items = body.items;
    return items.map((item) => {
        return {
            ...item,
        }
    });
}

export async function GETweekTEST(selectedDate, filter={}) {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
    const startOfWeek = new Date(date); // Clone the date
    startOfWeek.setDate(date.getDate() - dayOfWeek);
    const endOfWeek = new Date(startOfWeek); // Clone the startOfWeek
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to find Sunday

    filter.startgt = startOfWeek; 
    filter.startlt = endOfWeek;

    const response = `${ITEMS_BASE_URL}/` + new URLSearchParams(filter);

    console.log("week: " + response);

    const body = {
        "week": {
        "MON" : 
        [
                {
                    "_id": "one",
                    "title": "WEEK item 0",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b4567",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
                },{
                    "_id": "two",
                    "title": "WEEK item 0",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
                },{
                    "_id": "three",
                    "title": "today item 1",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
                },{
                    "_id": "four",
                    "title": "today item 2",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
            }],
        "TUES" : [
                {
                    "_id": "five",
                    "title": "today item 3",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
                },{
                    "_id": "six",
                    "title": "test item 4",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
                },{
                    "_id": "seven",
                    "title": "test item 5",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
            }],
        "WED" : [
                {
                    "_id": "eight",
                    "title": "test item 6",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
            }],
        "THURS": [{
                    "_id": "nine",
                    "title": "test item 7",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
            }],
        "FRI": [{
                    "_id": "ten",
                    "title": "test task 8",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "itemType": "Task",
                    "location": "23 locatiton",
                    "subtasks": [],
                    "duration": "20",
                    "startDate": "2024-03-29T08:30:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:40:59.685Z",
                    "updatedAt": "2024-02-29T03:40:59.685Z",
                    "__v": 0
            }],
        "SAT": [
                {
                    "_id": "eleven",
                    "title": "task with subtask",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new",
                        "first"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "itemType": "Task",
                    "subtasks": [
                        {
                            "isChecked": false,
                            "task": "first subtask",
                            "_id": "65e134a91635ad960dabdc1c"
                        }
                    ],
                    "duration": "10",
                    "startDate": "2024-03-29T12:45:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-03-01T01:51:37.332Z",
                    "updatedAt": "2024-03-01T01:53:24.873Z",
                    "__v": 0
                }
            ],
        "SUN": [
            {
                "_id": "twelve",
                "title": "test item 7",
                "category": "Backlog",
                "section": "All",
                "icon": "📍",
                "tags": [
                    "new"
                ],
                "notes": [],
                "owner": "65dffad64102392ebb57839b",
                "duration": "30",
                "startDate": "2024-03-29T05:15:00.000Z",
                "endDate": "2024-03-13T07:08:05.326Z",
                "createdAt": "2024-02-29T03:37:10.111Z",
                "updatedAt": "2024-02-29T03:37:10.111Z",
                "__v": 0
            }
        ]
        }
    };
    let week = body.week;
    return week;
}

export async function GETmonthTEST(selectedDate, filter={}) {
    const date = new Date(selectedDate);
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);

    filter.startgt = startOfMonth;
    filter.startlt =  endOfMonth;

    const response = `${ITEMS_BASE_URL}/` + new URLSearchParams(filter);

    console.log("month: " + response);

    const body = {
        "month": {
        "1" : 
            [
                {
                    "_id": "65dffbe64102392ebb5783b142356eruy",
                    "title": "MONTH",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
                },{
                    "_id": "65dffbe64102392ebb5783b043q54wtrytd",
                    "title": "today item 1",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
                },{
                    "_id": "65dffbe64102392ebb5783b214q3retsgfxcv",
                    "title": "today item 2",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
            }],
        "2" : [
                {
                    "_id": "65dffbe64102392ebb5783b45etrufyjh",
                    "title": "today item 3",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
                },{
                    "_id": "65dffbe64102392ebb5783b0w46zrydt",
                    "title": "test item 4",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
                },{
                    "_id": "65dffbe64102392ebb5783b02435e6zytdgjcvhm",
                    "title": "test item 5",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
            }],
        "10" : [
                {
                    "_id": "65dffbe64102392ebb5783b0124hvjbn",
                    "title": "test item 6",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
            }],
        "15": [{
                    "_id": "65dffbe64102392ebb5783b03534wtrydhgc4",
                    "title": "test item 7",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
            }],
        "18": [{
                    "_id": "65dffccb4102392ebb5783b94254wrydhgc",
                    "title": "test task 8",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "itemType": "Task",
                    "location": "23 locatiton",
                    "subtasks": [],
                    "duration": "20",
                    "startDate": "2024-03-29T08:30:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:40:59.685Z",
                    "updatedAt": "2024-02-29T03:40:59.685Z",
                    "__v": 0
            }],
        "22": [
                {
                    "_id": "65e134a91635ad960dabdc1b35635hvbnsdfdghv",
                    "title": "task with subtask",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new",
                        "first"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "itemType": "Task",
                    "subtasks": [
                        {
                            "isChecked": false,
                            "task": "first subtask",
                            "_id": "65e134a91635ad960dabdc1c"
                        }
                    ],
                    "duration": "10",
                    "startDate": "2024-03-29T12:45:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-03-01T01:51:37.332Z",
                    "updatedAt": "2024-03-01T01:53:24.873Z",
                    "__v": 0
                }
            ],
        "28": [{
                "_id": "65dffbe64102392ebb5783b0srfdhgcjhvbj356",
                "title": "test item 7",
                "category": "Backlog",
                "section": "All",
                "icon": "📍",
                "tags": [
                    "new"
                ],
                "notes": [],
                "owner": "65dffad64102392ebb57839b",
                "duration": "30",
                "startDate": "2024-03-29T05:15:00.000Z",
                "endDate": "2024-03-13T07:08:05.326Z",
                "createdAt": "2024-02-29T03:37:10.111Z",
                "updatedAt": "2024-02-29T03:37:10.111Z",
                "__v": 0
            }]
        }
    };
    let month = body.month;
    return month;
}

//#endregion

//#region ITEMS

export async function GETsectionTEST(itemType, filter={}) {
    const ext = getURL(itemType);

    const response = `${ITEMS_BASE_URL}/${ext}` + new URLSearchParams(filter);

    let body;
    console.log("items: " + response);

    body = {
        "items": [
            {
                "_id": "65dffbe641023aojfdi92ebb5783b0",
                "title": "Tips",
                "category": "Cooking",
                "section": "Tips",
                "icon": "📍",
                "subtasks": [{task: "first", isChecked: false}, {task: "sec", isChecked: false}],
                "tags": [
                    "new"
                ],
                "notes": "",
                "owner": "65dffad64102392ebb57839b",
                "createdAt": "2024-02-29T03:37:10.111Z",
                "updatedAt": "2024-02-29T03:37:10.111Z",
                "__v": 0
            },
            
        ]
    };

    let items = body.items;
    return items.map((item) => {
        return {
            ...item,
        }
    });
}

export async function GETitemsTEST(itemType, filter={}) {
    const ext = getURL(itemType);

    const response = `${ITEMS_BASE_URL}/${ext}` + new URLSearchParams(filter);

    console.log(response);
    let body;
    console.log("items: " + response);

    if(!!filter.search) {
        body = {
            "items": [
                {
                    "_id": "65dffbe64102392ebb5783b0",
                    "title": "test item 0",
                    "category": "Backlog",
                    "section": "All",
                    "icon": "📍",
                    "tags": [
                        "new"
                    ],
                    "notes": [],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "30",
                    "startDate": "2024-03-29T05:15:00.000Z",
                    "endDate": "2024-03-13T07:08:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
                },
                
            ]
        };
    }

    else {
        body = {
            "items": [
                // {
                //     "_id": "65dffbe64102392ebb5783b0",
                //     "category": "Backlog", 
                //     "description": "Description of what the item is. ", 
                //     "favicon": {"assetId": "A763AC6D-6F2C-46F2-93A6-5B8E616CC06C/L0/001", "base64": null, "duration": null, "exif": null, "fileName": "IMG_0707.jpg", "fileSize": 1536094, "height": 2002, "mimeType": "image/jpeg", "type": "image", "uri": "file:///var/mobile/Containers/Data/Application/2B539751-A0AE-44FE-B0A5-919A07440921/Library/Caches/ExponentExperienceData/@anonymous/VibeCheck-c25b1d4f-7003-4b9f-8017-6562b5a94a07/ImagePicker/4E780BC8-D48C-4176-9570-17ACAECCBADF.jpg", "width": 2002}, 
                //     "icon": "📦", 
                //     "notes": "Remember important info about the item. ", 
                //     "section": "All", 
                //     "title": "Item",
                //     "owner": "65dffad64102392ebb57839b",
                //     "duration": "30",
                //     "startDate": "2024-03-29T10:00:00.000Z",
                //     "endDate": "2024-03-29T13:08:05.326Z",
                //     "repeat": "DAILY",
                //     "createdAt": "2024-02-29T03:37:10.111Z",
                //     "updatedAt": "2024-02-29T03:37:10.111Z",
                //     "__v": 0
                // },
                {
                    "category": "Backlog", 
                    "description": "Description of the task. ", 
                    "icon": "📋", 
                    "notes": "Important details about the task.", 
                    "priority": "HIGH", 
                    "section": "All", 
                    "title": "Task",
                    "_id": "65dffbe64102392ebb5783b01235436457",
                    "itemType": "Task",
                    "subtasks": [{"isChecked": false, "task": "first subtask", "_id": "65e134a91635ad960dab35ytsdc1dsc"},
                    {"isChecked": false, "task": "2 subtask", "_id": "65e134a91635ad960dabsrhjdc1c"}],
                    "contacts": [{"isChecked": false, "task": "4 subtask", "_id": "65e134a91635afdgfd96tdku0dabdc1c"},
                    {"isChecked": false, "task": "5 subtask", "_id": "65e134a91635ad96nhdtt0dfgdabdc1c"}],
                    "owner": "65dffad64102392ebb57839b",
                    "duration": "150",
                    "startDate": "2024-03-29T14:30:00.000Z",
                    "endDate": "2024-03-13T17:00:05.326Z",
                    "createdAt": "2024-02-29T03:37:10.111Z",
                    "updatedAt": "2024-02-29T03:37:10.111Z",
                    "__v": 0
                },
                // {
                //     "category": "Backlog", 
                //     "description": "Description of the event. ", 
                //     "favicon": {"assetId": "89BA16EB-A861-4651-848B-33B0D9E412E5/L0/001", "base64": null, "duration": null, "exif": null, "fileName": "IMG_1345.jpg", "fileSize": 3784860, "height": 4032, "mimeType": "image/jpeg", "type": "image", "uri": "file:///var/mobile/Containers/Data/Application/2B539751-A0AE-44FE-B0A5-919A07440921/Library/Caches/ExponentExperienceData/@anonymous/VibeCheck-c25b1d4f-7003-4b9f-8017-6562b5a94a07/ImagePicker/F223FEC7-EEF1-40AE-AAA2-F16ED2247BEB.jpg", "width": 3024}, 
                //     "icon": "📍", 
                //     "section": "All", 
                //     "title": "Event",
                //     "_id": "65dffbe64102392ebb5783b056478",
                //     "contacts": [],
                //     "subtasks": [],
                //     "owner": "65dffad64102392ebb57839b",
                //     "duration": "60",
                //     "itemType": "Event",
                //     "startDate": "2024-03-29T18:15:00.000Z",
                //     "endDate": "2024-03-29T19:15:05.326Z",
                //     "createdAt": "2024-02-29T03:37:10.111Z",
                //     "updatedAt": "2024-02-29T03:37:10.111Z",
                //     "__v": 0
                // },{
                //     "_id": "65dffbe64102392ebb5783b0xtu",
                //     "icon": '\u{1F4C4}',
                //     "title": "Daily Reflection",
                //     "category": "Backlog",
                //     "section": "All",
                //     "itemType": "Page",
                //     "repeat": "DAILY",
                //     "notes": "Journal prompt here.",
                //     "owner": "65dffad64102392ebb57839b",
                //     "startDate": "2024-03-29T20:00:00.000Z",
                //     "endDate": "2024-03-13T20:30:00.326Z",
                //     "createdAt": "2024-02-29T03:37:10.111Z",
                //     "updatedAt": "2024-02-29T03:37:10.111Z",
                //     "__v": 0
                // },{
                //     "_id": "65dffbe64102392ebb5b0xtu",
                //     "title": "Dinner - Recipe",
                //     "category": "Cooking",
                //     "section": "Recipes",
                //     "favicon": {"assetId": "62706304-B2F0-4E98-9790-67237652BE20/L0/001", "base64": null, "duration": null, "exif": null, "fileName": "IMG_1416.jpg", "fileSize": 5345389, "height": 4032, "mimeType": "image/jpeg", "type": "image", "uri": "file:///var/mobile/Containers/Data/Application/2B539751-A0AE-44FE-B0A5-919A07440921/Library/Caches/ExponentExperienceData/@anonymous/VibeCheck-c25b1d4f-7003-4b9f-8017-6562b5a94a07/ImagePicker/099B69F1-2513-4BBF-BF8A-5EAB53A1EA33.jpg", "width": 3024},
                //     "itemType": "Recipe",
                //     "icon": '\u{1F37D}',
                //     "servings": 3,
                //     "repeat": "WEEKLY",
                //     "priority": "HIGH",
                //     "ingredients" : [{"isChecked": false, "task": "2 cups all puprose flour", "_id": "65e134a91635ad9sads60dab35ytsdc1c"},
                //         {"isChecked": false, "task": "1 cup water", "_id": "65e134a91635ad960dabsrhjdc1c"},
                //         {"isChecked": false, "task": "1tbsp yeast", "_id": "65e134a91635ad960dabsrhjwew1c"},
                //     ],
                //     "instructions": [{"isChecked": false, "task": "Mix ingredients and knead dough", "_id": "65e134a91635ad960fsvgdbdab35ytsdc1c"},
                //     {"isChecked": false, "task": "Rest for 30 mins", "_id": "65e134a91635ad960dabsrhjdc1c"},
                //     {"isChecked": false, "task": "Separate dough into 4", "_id": "65e134a91635ad960dabsrhjwew1c"},
                //     {"isChecked": false, "task": "Preheat oven to 350F", "_id": "65e1sfvb34a91635ad960dab35ytsdc1c"}],
                //     "owner": "65dffad64102392ebb57839b",
                //     "startDate": "2024-03-29T22:00:00.000Z",
                //     "endDate": "2024-03-13T23:30:00.326Z",
                //     "createdAt": "2024-02-29T03:37:10.111Z",
                //     "updatedAt": "2024-02-29T03:37:10.111Z",
                //     "__v": 0
                // },
            ]
        };
    }

    
    let items = body.items;
    return items.map((item) => {
        return {
            ...item,
        }
    });
}

export async function POSTcreateItemTEST(itemType, item) {
    const ext = getURL(itemType);

    const response = await fetchWithAuthJSON(`${ITEMS_BASE_URL}/${itemID}${ext}`, {
        method: 'POST',
        body: JSON.stringify(item),
    });

    console.log(response);

    const body = {"item": {}};
    return body.item;
}

export async function PATCHitemTEST(itemType, newItem, itemID) {
    const ext = getURL(itemType);

    delete newItem._id; // remove _id from newPost
    delete newItem.id;

    console.log(newItem);
    const response = `${ITEMS_BASE_URL}/${itemID}${ext}`;

    console.log(response);

    const body = {"item": {}};
    return body.item;
}

export async function DELETEitemTEST(itemID) {
    const ext = getURL(itemType);
    
    const response = await fetchWithAuth(`${ITEMS_BASE_URL}/${itemID}${ext}`, {
        method: "DELETE",
    });

    console.log(response);

    const body = {"item": {}};
    return body.item;
}

//#endregion

//#endregion