/**
 * Twitch API keys
 */
 export const TWITCH_CLIENT_ID = '3cwpzmazn716nmz6g1087kh4ciu4sp';

 /**
  * Twitch Utils
  */
 export const TWITCH_REDIRECT_URI = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://web.qapla.gg/';