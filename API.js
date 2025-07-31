import AsyncStorage from '@react-native-async-storage/async-storage';

export let PROFILE_ID;

export const BASE_URL = 'http://localhost:3000/api/v0';

const USERS_BASE_URL = `${BASE_URL}/users`;
const PROFILE_BASE_URL = `${BASE_URL}/profile`;
const AUTH_BASE_URL = `${BASE_URL}/auth`;
const CONTACTS_BASE_URL = `${BASE_URL}/contacts`;
const DIRECTORY_BASE_URL = `${BASE_URL}/directory`;
const TAGS_BASE_URL = `${BASE_URL}/tags`;
const ITEMS_BASE_URL = `${BASE_URL}/items`;


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

export async function saveProfileId(profileId) {
    // save profile ID to storage
    try {
        await AsyncStorage.setItem('PROFILE_ID', profileId);
        console.log('Profile ID saved to storage:', profileId);
    } catch (err) {
        console.log('Error saving profile ID to storage:', err);
    }
}

export async function getProfileId() {
    // get profile ID from storage
    try {
        const profileId = await AsyncStorage.getItem('PROFILE_ID');
        return profileId;
    } catch (err) {
        console.log('Error getting profile ID from storage:', err);
        return null;
    }
}

export async function initializeProfileId() {
    // Initialize PROFILE_ID from AsyncStorage on app startup
    try {
        const profileId = await AsyncStorage.getItem('PROFILE_ID');
        if (profileId) {
            PROFILE_ID = profileId;
            console.log('Profile ID initialized from storage:', profileId);
        } else {
            console.log('No profile ID found in storage');
        }
        return profileId;
    } catch (err) {
        console.log('Error initializing profile ID from storage:', err);
        return null;
    }
}

export async function removeAuth() {
    // remove JWT and profile ID from storage
    await AsyncStorage.removeItem('JWT');
    await AsyncStorage.removeItem('PROFILE_ID');
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
            const profile = await GETme();
            if (profile && profile["_id"]) {
                PROFILE_ID = profile["_id"];
                await saveProfileId(PROFILE_ID);
            }
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
        // success - signed up, get profile and save id to storage
        const profile = await response.json();
        if (profile && profile["_id"]) {
            PROFILE_ID = profile["_id"];
            await saveProfileId(PROFILE_ID);
        }
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
        // If no userID provided, use stored profile ID
        let profileId = userID;
        if (!profileId) {
            profileId = PROFILE_ID || await getProfileId();
        }
        
        const directory = await AsyncStorage.getItem(`directory_${profileId}`);
        directoryList = JSON.parse(directory);
        return JSON.parse(directory);
    } catch (error) {
        console.log('Error retrieving directory from async storage:', error);
        return [];
    }
}

export async function GETdirectory() {
    // Get profile ID from storage if not available
    let profileId = PROFILE_ID;
    if (!profileId) {
        profileId = await getProfileId();
    }
    
    const response = await fetchWithAuth(`${DIRECTORY_BASE_URL}/${profileId}`, {
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
    // Get profile ID from storage if not available
    let profileId = PROFILE_ID;
    if (!profileId) {
        profileId = await getProfileId();
    }
    
    const response = await fetchWithAuthJSON(`${DIRECTORY_BASE_URL}/${profileId}`, {
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
    // Get profile ID from storage if not available
    let profileId = PROFILE_ID;
    if (!profileId) {
        profileId = await getProfileId();
    }
    
    const response = await fetchWithAuthJSON(`${DIRECTORY_BASE_URL}/${profileId}`, {
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
    // Get profile ID from storage if not available
    let profileId = PROFILE_ID;
    if (!profileId) {
        profileId = await getProfileId();
    }
    
    const response = await fetchWithAuthJSON(`${DIRECTORY_BASE_URL}/${profileId}`, {
        method: "DELETE",
        body: JSON.stringify({ deletedId: categoryID }),
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

export async function GETitems(filter={}) {

    const response = await fetchWithAuth(`${ITEMS_BASE_URL}` + (!!Object.keys(filter).length ? "/?" : "") +  new URLSearchParams(filter), {
        method: 'GET',
    });
    try {
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

export async function GETitemsByID(itemID) {

    const response = await fetchWithAuth(`${ITEMS_BASE_URL}/${itemID}`, {
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

export async function GETitemsByIDs(itemIDs) {
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



export async function POSTitem(item) {

    const response = await fetchWithAuthJSON(`${ITEMS_BASE_URL}`, {
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

export async function PATCHitem(newItem, itemID) {

    delete newItem._id; // remove _id from newPost
    delete newItem.id;

    const response = await fetchWithAuthJSON(`${ITEMS_BASE_URL}/${itemID}`, {
        method: "PATCH",
        body: JSON.stringify(newItem),
    });

    try {
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

export async function DELETEitem(itemID) {
    
    const response = await fetchWithAuth(`${ITEMS_BASE_URL}/${itemID}`, {
        method: "DELETE",
    });

    if (response.status === 200) {
        return true;
    } else {
        throw new Error("Error deleting item");
    }
}
//#endregion

//#region CALENDAR

export async function GETtoday(filter={}) {
    if (filter.hasOwnProperty('endlt')) {
        delete filter.endlt;
    }
    const response = await fetchWithAuth(`${ITEMS_BASE_URL}` + (!!Object.keys(filter).length ? "/?" : "") +  new URLSearchParams(filter), {
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

    if (filter.hasOwnProperty('endlt')) {
        delete filter.endlt;
    }
    const response = await fetchWithAuth(`${ITEMS_BASE_URL}` + (!!Object.keys(filter).length ? "/?" : "") +  new URLSearchParams(filter), {
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

        const response = await fetchWithAuth(`${ITEMS_BASE_URL}` + (!!Object.keys(filter).length ? "/?" : "") +  new URLSearchParams(filter), {
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
