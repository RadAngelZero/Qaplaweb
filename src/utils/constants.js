/**
 * Twitch API keys
 */
export const TWITCH_CLIENT_ID = '3cwpzmazn716nmz6g1087kh4ciu4sp';

/**
 * Twitch Utils
 */
export const TWITCH_REDIRECT_URI = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://web.qapla.gg';

export const MEMES = 'memes';

// Giphy media types
export const GIPHY_GIFS = 'gifs';
export const GIPHY_STICKERS = 'stickers';
export const GIPHY_CLIPS = 'videos';
export const GIPHY_TEXT = 'text';