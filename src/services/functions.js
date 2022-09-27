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

/**
 * Gets the relations between the user and streamer (is user following? Is sub? And what sub tier he has)
 * @param {string} userTwitchId Twitch Id of the user
 * @param {string} streamerUid Streamer user identifier
 */
export async function getUserToStreamerRelation(userTwitchId, streamerUid) {
    const getUserToStreamerRelationData = httpsCallable(functions, 'getUserToStreamerRelationData');

    try {
        return await getUserToStreamerRelationData({ userTwitchId, streamerUid });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Gets the given streamer Twitch emotes library
 * @param {string} streamerUid Streamer user identifier
 */
export async function getEmotes(streamerUid) {
    const getStreamerEmotes = httpsCallable(functions, 'getStreamerEmotes');

    try {
        return await getStreamerEmotes({ streamerUid });
    } catch (error) {
        console.log(error);
    }
}
