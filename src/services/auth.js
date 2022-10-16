import { onAuthStateChanged, signInWithCustomToken, User, UserCredential, NextOrObserver } from 'firebase/auth';

import { createUserProfile, getUserProfileWithTwitchId, updateUserProfile } from './database';
import { auth } from './firebase';
import { generateAuthTokenForTwitchSignIn, getUserToken } from './functions';
import { getTwitchUserData } from './twitch';

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

export async function authWithTwitch(twitchClientCode, onSuccess) {
    const tokenData = await getUserToken(twitchClientCode);
    if (tokenData && tokenData.data && tokenData.data.access_token) {
        const userData = await getTwitchUserData(tokenData.data.access_token);
        const user = await signTwitchUser(userData, tokenData.data);

        if (user.isNewUser) {
            // For a new user their uid and userName are the same than their twitch id and twitch display name
            await createUserProfile(user.uid, user.email, user.displayName, user.photoURL, user.uid, user.displayName);
        } else {
            await updateUserProfile(user.uid, {
                email: user.email,
                userName: user.displayName,
                photoUrl: user.photoURL
            });
        }

        onSuccess(user);
    }
}