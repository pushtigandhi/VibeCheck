import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const BASE_URL = 'http://172.27.72.214:3000/api/v0';

export const ItemType = {
    Item: 'Item',
    Task: 'Task',
    Event: 'Event',
    Page: 'Page',
    Recipe: 'Recipe'
};

const USERS_BASE_URL = `${BASE_URL}/users`;
const PROFILE_BASE_URL = `${PROFILE_BASE_URL}`;
const AUTH_BASE_URL = `${BASE_URL}/auth`;
const CONTACTS_BASE_URL = `${BASE_URL}/contacts`;
const DIRECTORY_BASE_URL = `${BASE_URL}/directory`;
const TAGS_BASE_URL = `${BASE_URL}/tags`;
const ITEMS_BASE_URL = `${BASE_URL}/items`;
const ITEMS_EXT = `?itemType=item`;
const TASKS_EXT = `?itemType=task`;
const EVENTS_EXT = `$?itemType=even`;
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
const getURL= ({ itemType }) => {
    let ext;
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
        default:
            url = ITEMS_EXT;
            break;
    }
    return url;
} 

export async function GETitems(itemType, filter={}) {
    const ext = getURL(itemType);

    const response = await fetch(`${ITEMS_BASE_URL}/${ext}` + new URLSearchParams(filter), {
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
export async function GETmeTEST() {
    const response = await fetchWithAuthTEST(PROFILE_BASE_URL, {
        method: 'GET',
    });

    console.log(response);

    const profile = {"profile": {}};
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
export async function GETdirectoryTEST(profileID) {
    // const response = await fetchWithAuthTEST(`${DIRECTORY_BASE_URL}/${profileID}`, {
    //     method: 'GET',
    // });

    // console.log(response);

    const body = {"directory": [
        {
            "_id": "65dffad64102392ebb57839c",
            "title": "Backlog",
            "sections": [
                "All"
            ]
        },
        {
            "title": "Cooking",
            "sections": [
                "All",
                "Recipes",
                "Tips"
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
    const response = await fetchWithAuthJSON(`${DIRECTORY_BASE_URL}/${profileID}`, {
        method: 'POST',
        body: JSON.stringify(category),
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

//#region ITEMS
export async function GETitemsTEST(itemType, filter={}) {
    const ext = getURL(itemType);

    const response = `${ITEMS_BASE_URL}/${ext}` + new URLSearchParams(filter);

    const body = {
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
                "createdAt": "2024-02-29T03:37:10.111Z",
                "updatedAt": "2024-02-29T03:37:10.111Z",
                "__v": 0
            },
            {
                "_id": "65dffccb4102392ebb5783b9",
                "title": "test task 0",
                "category": "Backlog",
                "section": "All",
                "icon": "📍",
                "tags": [
                    "new"
                ],
                "notes": [],
                "owner": "65dffad64102392ebb57839b",
                "itemType": "Task",
                "subtasks": [],
                "createdAt": "2024-02-29T03:40:59.685Z",
                "updatedAt": "2024-02-29T03:40:59.685Z",
                "__v": 0
            },
            {
                "_id": "65e134a91635ad960dabdc1b",
                "title": "task with subtask",
                "category": "Backlog",
                "section": "All",
                "icon": "📍",
                "tags": [
                    "new"
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
                "createdAt": "2024-03-01T01:51:37.332Z",
                "updatedAt": "2024-03-01T01:53:24.873Z",
                "__v": 0
            }
        ]
    };
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

    const response = await fetchWithAuthJSON(`${ITEMS_BASE_URL}/${itemID}${ext}`, {
        method: "PATCH",
        body: JSON.stringify(newItem),
    });

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