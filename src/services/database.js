import {
    child,
    DataSnapshot,
    equalTo,
    get,
    orderByChild,
    query,
    runTransaction,
    TransactionResult,
    update,
    onValue,
    set,
    orderByValue,
    remove
} from 'firebase/database';

import { database } from './firebase';

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
    const usersChild = child(database, '/Users');

    return await get(query(usersChild, orderByChild('twitchId'), equalTo(twitchId)));
}

/**
 * Listen for changes on the given user profile
 * @param {string} uid User identifier
 * @param {DataSnapshot} callback Handler for the database results
 */
export function listenToUserProfile(uid, callback) {
    const userChild = child(database, `/Users/${uid}`);
    return onValue(query(userChild), callback);
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

/**
 * Saves the 3D avatar url of the user
 * @param {string} uid User identifier
 * @param {string} avatarUrl Avatar url
 * @returns {Promise<void>} Resulting DataSnaphsot of the query
 */
 export async function saveAvatarUrl(uid, avatarUrl) {
    const userAvatarUrlChild = child(database, `/Users/${uid}/avatarUrl`);

    return await set(userAvatarUrlChild, avatarUrl);
}

/**
 * Saves the ready player me avatar identifier of the user
 * @param {string} uid User identifier
 * @param {string} rpmAvatarId Ready player me avatar identifier
 * @returns {Promise<void>} Resulting DataSnaphsot of the query
 */
export async function saveAvatarId(uid, rpmAvatarId) {
    const userAvataridChild = child(database, `/Users/${uid}/avatarId`);

    return await set(userAvataridChild, rpmAvatarId);
}

/**
 * Saves the avatar background
 * @param {string} uid User identifier
 * @param {Object} background Object describing gradient background for the avatar image
 * @param {number} background.angle Avatar gradient angle
 * @param {Array<string>} background.colors Array of colors for gradient background
 * @returns {Promise<void>} Resulting DataSnaphsot of the query
 */
export async function saveAvatarBackground(uid, background) {
    const userAvatarBackgroundChild = child(database, `/Users/${uid}/avatarBackground`);

    return await set(userAvatarBackgroundChild, background);
}

/**
 * Saves the ready player me user identifier of the user
 * @param {string} uid User identifier
 * @param {string} rpmUid Ready player me user identifier
 * @returns {Promise<void>} Resulting DataSnaphsot of the query
 */
 export async function saveReadyPlayerMeUserId(uid, rpmUid) {
    const userRpmUidChild = child(database, `/Users/${uid}/rpmUid`);

    return await set(userRpmUidChild, rpmUid);
}

//////////////////////
// User Streamer
//////////////////////

/**
 * Returns the number of followers of the given streamer public profile
 * @param {string} streamerUid Streamer identifier
 * @returns {Promise<DataSnapshot>} Resulting DataSnapshot of the query
 */
export async function getStreamerFollowersNumber(streamerUid) {
    const userStreamerChild = child(database, `/UserStreamer/${streamerUid}/followers`);

    return await get(query(userStreamerChild));
}

//////////////////////
// Streamer Public Data
//////////////////////

/**
 * Returns only the isStreaming of the given streamer
 * @param {string} streamerUid Streamer identifier
 * @returns {Promise<DataSnapshot>} Resulting DataSnaphsot of the query
 */
export async function getStreamerIsStreaming(streamerUid) {
    const streamerIsStreamingChild = child(database, `/UserStreamerPublicData/${streamerUid}/isStreaming`);

    return await get(query(streamerIsStreamingChild));
}

//////////////////////
// Streamer Public Profile
//////////////////////

/**
 * Returns the public profile of the given streamer
 * @param {string} streamerUid Streamer identifier
 * @returns {Promise<DataSnapshot>} Resulting DataSnaphsot of the query
 */
export async function getStreamerPublicProfile(streamerUid) {
    const streamerProfileChild = child(database, `/StreamersPublicProfiles/${streamerUid}`);

    return await get(query(streamerProfileChild));
}

//////////////////////
// Streamer Links
//////////////////////

/**
 * Returns all the (social) links of the given streamer
 * @param {string} streamerUid Streamer identifier
 * @returns {Promise<DataSnapshot>} Resulting DataSnaphsot of the query
 */
export async function getStreamerLinks(streamerUid) {
    const streamerLinksChild = child(database, `/StreamerLinks/${streamerUid}`);

    return await get(query(streamerLinksChild));
}

//////////////////////
// Streams
//////////////////////

/**
 * Returns all the published streams of the given streamer
 * @param {string} streamerUid Streamer identifier
 * @returns {Promise<DataSnapshot>} Resulting DataSnaphsot of the query
 */
export async function getStreamerStreams(streamerUid) {
    const streamerStreams = child(database, `/eventosEspeciales/eventsData`);

    return await get(query(streamerStreams, orderByChild('idStreamer'), equalTo(streamerUid)));
}

//////////////////////
// Gifs
//////////////////////

/**
 * Returns the Gifs library
 * @returns {Array<Object>} Resulting Objects of the query
 */

export async function getReactionModuleGifs() {
    const gifsRef = child(database, '/Gifs/ReactionModule');

    return await get(query(gifsRef));
}

//////////////////////
// Streamers Deep Links
//////////////////////

/**
 * Find a streamer by using their branch deep link alias
 * (Branch alias are unique so this query will return always 0 or 1 result at most)
 * @param {string} linkAlias Branch deep link alias
 * @returns {Promise<DataSnapshot>} Resulting DataSnaphsot of the query
 */
export async function getStreamerUidWithDeepLinkAlias(linkAlias) {
    const streamersDeepLinksRef = child(database, '/StreamersDeepLinks');

    return await get(query(streamersDeepLinksRef, orderByValue(), equalTo(`https://myqap.la/${linkAlias}`)));
}

//////////////////////
// User To Streamer Subscriptions
//////////////////////

/**
 * Subscribes a user to the given streamer
 * @param {string} uid User identifier
 * @param {string} streamerUid Stramer identifier
 * @returns {Promise<void>} Resulting DataSnaphsot of the query
 */
export async function followStreamer(uid, streamerUid) {
    const streamerFollower = child(database, `/UserToStreamerSubscriptions/${uid}/${streamerUid}`);

    return await set(streamerFollower, {
        cancelations: true,
        changes: true,
        customMessages: true,
        reminders: true
    });
}

/**
 * Unubscribes a user from the given streamer
 * @param {string} uid User identifier
 * @param {string} streamerUid Stramer identifier
 * @returns {Promise<void>} Resulting DataSnaphsot of the query
 */
export async function unfollowStreamer(uid, streamerUid) {
    const streamerFollower = child(database, `/UserToStreamerSubscriptions/${uid}/${streamerUid}`);

    return await remove(streamerFollower);
}

/**
 * Listen for the user to streamer subscription (to know if a user is following a streamer)
 * @param {string} uid User identifier
 * @param {string} streamerUid Stramer identifier
 * @param {DataSnapshot} callback Handler for the database results
 */
export async function listenToFollowingStreamer(uid, streamerUid, callback) {
    const streamerFollower = child(database, `/UserToStreamerSubscriptions/${uid}/${streamerUid}`);

    return onValue(query(streamerFollower), callback);
}

//////////////////////
// Avatars Animations Overlay
//////////////////////

/**
 * Gets the given animation information (camera position, name, etc.)
 * @param {string} animationId Animation identifier
 * @returns {Promise<DataSnapshot>} Resulting DataSnaphsot of the query
 */
export async function getAnimationData(animationId) {
    const animation = child(database, `/AvatarsAnimationsOverlay/${animationId}`);

    return await get(query(animation));
}

//////////////////////
// Users Greetings
//////////////////////

/**
 * Gets all the information about the user greeting of the given user
 * @param {string} uid User identifier
 */
export async function getUserGreetingData(uid) {
    const greeting = child(database, `/UsersGreetings/${uid}`);

    return await get(query(greeting));
}

//////////////////////
// Streams Greetings
//////////////////////

/**
 * Saves the greeting of the user for the given streamer
 * @param {string} uid User identifier
 * @param {string} streamerUid Streamer identifier
 * @param {string} avatarId Avatar identifier
 * @param {string} animationId Animation identifier
 * @param {string} message Message for TTS
 * @param {string} twitchUsername Twitch user name
 * @param {string} messageLanguage Language for the message to be spoken
 */
 export async function writeStreamGreeting(uid, streamerUid, avatarId, animationId, message, twitchUsername, messageLanguage) {
    const streamGreeting = child(database, `/StreamsGreetings/${streamerUid}/${uid}`);

    return await update(streamGreeting, {
        avatarId,
        animationId,
        message,
        twitchUsername,
        messageLanguage,
        timestamp: (new Date()).getTime(),
        read: false
    });
}

//////////////////////
// Gifs Libraries
//////////////////////

/**
 * Returns a random gif from the library of Download App gifs
 */
 export async function getRandomDownloadAppGif() {
    const lengthChild = child(database, '/GifsLibraries/DownloadApp/length');

    const length = await get(query(lengthChild));
    const index = Math.floor(Math.random() * length.val());

    const gifChild = child(database, `/GifsLibraries/DownloadApp/gifs/${index}`);

    return await get(query(gifChild));
}

/**
 * Returns a random gif from the library of Avatar animation gifs
 */
export async function getRandomAvatarAnimationGif() {
    const lengthChild = child(database, '/GifsLibraries/AvatarAnimation/length');

    const length = await get(query(lengthChild));
    const index = Math.floor(Math.random() * length.val());

    const gifChild = child(database, `/GifsLibraries/AvatarAnimation/gifs/${index}`);

    return await get(query(gifChild));
}