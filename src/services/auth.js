import { onAuthStateChanged, signInWithCustomToken, User, UserCredential, NextOrObserver } from 'firebase/auth';

import { getUserProfileWithTwitchId } from './database';
import { auth } from './firebase';
import { generateAuthTokenForTwitchSignIn } from './functions';

/**
 * Listen to changes on the firebase auth state
 * @param {NextOrObserver<User>} callback Handler of auth state changes
 */
export function listenToAuthState(callback) {
    onAuthStateChanged(auth, callback);
}

/**
 * Sign a user on firebase with Twitch auth information
 * @param {object} twitchUserData Object coming from Twitch with auth data
 * @param {object} twitchUserData.id Twitch id
 * @param {object} twitchUserData.display_name Twitch display name
 * @param {object} twitchUserData.email Twitch email
 * @param {object} twitchUserData.profile_image_url Twitch email
 * @returns {Promise<UserCredential>} Firebase auth user credential
 */
export async function signTwitchUser(twitchUserData) {
    const userProfileSnapshot = await getUserProfileWithTwitchId(twitchUserData.id);
    let userProfile = null;

    userProfileSnapshot.forEach((profile) => userProfile = profile.val());

    // If there is a profile and have an id field use that field, otherwise (new user) use Twitch id
    const qaplaCustomAuthToken = await generateAuthTokenForTwitchSignIn(
        userProfile.id ? userProfile.id : twitchUserData.id,
        twitchUserData.display_name,
        twitchUserData.email || null
    );

    if (qaplaCustomAuthToken.data && qaplaCustomAuthToken.data.token) {
        const user = await signInWithCustomToken(auth, qaplaCustomAuthToken.data.token);

        // Overwrite of isNewUser and photoURL is necessary
        return { ...user.user, isNewUser: !userProfileSnapshot.exists(), photoURL: twitchUserData.profile_image_url };
    }
}