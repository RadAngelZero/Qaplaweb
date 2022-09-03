import { httpsCallable } from 'firebase/functions';

import { functions } from './firebase';

/**
 * Generate access and refresh token for Twitch API
 * @param {string} code Twitch code to generate user tokens
 */
 export async function getUserToken(code) {
    const getTwitchUserToken = httpsCallable(functions, 'getTwitchUserToken');

    try {
        return await getTwitchUserToken({ code });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Generate an auth token for the user to signIn with Twitch (custom auth)
 * @param {string} userTwitchId Twitch Id of the user
 * @param {string} displayName Twitch username of the user
 * @param {string} email Twitch email of the user
 */
 export async function generateAuthTokenForTwitchSignIn(userTwitchId, displayName, email) {
    const appTwitchSignin = httpsCallable(functions, 'appTwitchSignin');

    try {
        return await appTwitchSignin({ uid: userTwitchId, displayName, email });
    } catch (error) {
        console.log(error);
    }
}