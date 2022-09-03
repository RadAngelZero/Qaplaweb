import { TWITCH_CLIENT_ID, TWITCH_REDIRECT_URI } from '../utils/constants';

/**
 * Redirect the user to Twitch login, when the user log into their Twitch account and authorize the requested
 * information in the scope field of the uri Twitch sent him back with the code we need to generate their tokens
 */
 export function signInWithTwitch() {
    const uri =
        `https://id.twitch.tv/oauth2/authorize?` +
        `client_id=${TWITCH_CLIENT_ID}&` +
        `redirect_uri=${TWITCH_REDIRECT_URI}&` +
        `response_type=code&` +
        `scope=user:read:email%20user:read:subscriptions%20user:read:follows%20user:read:broadcast`;

    return window.location.href = uri;
}

/**
 * Get the info of the given twitch user
 * @param {string} accessToken Twitch user access token
 */
 export async function getTwitchUserData(accessToken) {
    const response = await fetch('https://api.twitch.tv/helix/users', {
        method: 'GET',
        headers: {
            'Client-Id': TWITCH_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`
        }
    });
    const user = (await response.json()).data[0];

    return user;
};