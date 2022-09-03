import { child, DataSnapshot, equalTo, get, orderByChild, query, update } from 'firebase/database';
import { database } from './firebase';

const usersChild = child(database, '/Users');

//////////////////////
// Qapla Users
//////////////////////

/**
 * Returns the found uid´s linked to the given Twitch id (it returns an object of objects but we know that
 * the relationship between uid and Twitch id is 1:1)
 * @param {string} twitchId Twitch identifier
 * @returns {Promise<DataSnapshot>} Resulting DataSnapshot of the query
 */
export async function getUserProfileWithTwitchId(twitchId) {
    return await get(query(usersChild, orderByChild('twitchId'), equalTo(twitchId)));
}

/**
 * Returns the profile of the given user
 * @param {string} uid User identifier
 * @returns {Promise<DataSnapshot>} Resulting DataSnapshot of the query
 */
export async function getUserProfile(uid) {
    const userChild = child(database, `/Users/${uid}`);
    return await get(query(userChild));
}

/**
 * Creates the basic Qapla profile for the given user
 * @param {string} uid User identifier
 * @param {string} email Email
 * @param {string} userName Qapla username
 * @param {string} photoUrl Qapla photo url
 * @param {string} twitchId Twitch identifier
 * @param {string} twitchUsername Twitch username
 */
export async function createUserProfile(uid, email, userName, photoUrl, twitchId, twitchUsername) {
    let city = userName.toUpperCase();

    const profileObj = {
        bio: '',
        city,
        credits: 0,
        email,
        id: uid,
        level: 0,
        status: false,
        token: '',
        userName,
        isUserLoggedOut: false,
        photoUrl,
        twitchId,
        twitchUsername,
        language: 'en' // i18 value
    };

    const userChild = child(database, `/Users/${uid}`);

    await update(userChild, profileObj);
}

/**
 * Update the given fields on the user profile
 * @param {string} uid User identifier
 * @param {object} dateToUpdate Data to update
 * @param {object} dateToUpdate.email Email
 * @param {object} dateToUpdate.userName Qapla username
 * @param {object} dateToUpdate.photoUrl Qapla photo url
 * @param {object} dateToUpdate.twitchUsername Twitch username
 */
export async function updateUserProfile(uid, dateToUpdate) {
    const userChild = child(database, `/Users/${uid}`);

    await update(userChild, dateToUpdate);
}

//////////////////////
// Reactions count
//////////////////////

/**
 * Returns the count of prepaid reactions the user have with the given streamer
 * @param {string} uid User identifier
 * @param {string} streamerUid Streamer user identifier
 * @returns {Promise<DataSnapshot>} Resulting DataSnapshot of the query
 */
export async function getUserReactionsWithStreamer(uid, streamerUid) {
    const reactionsCountChild = child(database, `/UsersReactionsCount/${uid}/${streamerUid}`);

    return await get(query(reactionsCountChild));
}

//////////////////////
// Streamer Public Data
//////////////////////

/**
 * Returns the public information of the given streamer
 * @param {string} streamerUid Stremer identifier
 * @returns {Promise<DataSnapshot>} Resulting DataSnapshot of the query
 */
export async function getStreamerPublicData(streamerUid) {
    const streamerPublicDataChild = child(database, `/UserStreamerPublicData/${streamerUid}`);

    return await get(query(streamerPublicDataChild));
}

//////////////////////
// Streamer Alerts Settings
//////////////////////

/**
 * Returns the reactionsEnabled setting value of the given streamer (used to know if the Qapla overlay is
 * enabled or not)
 * @param {string} streamerUid Streamer identifier
 * @returns {Promise<DataSnapshot>} Resulting DataSnapshot of the query
 */
export async function streamerHasReactionsEnabled(streamerUid) {
    const streamerReactionsEnabledChild = child(database, `/StreamerAlertsSettings/${streamerUid}/reactionsEnabled`);

    return await get(query(streamerReactionsEnabledChild));
}