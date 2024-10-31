export const googleApiConfig = () => ({
    googleapis: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUrl: process.env.GOOGLE_REDIRECT_URL,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        userEmail: process.env.GOOGLE_USER_EMAIL,
    },
    googleAuth: {
        clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        redirectUrl: process.env.GOOGLE_AUTH_REDIRECT_URL,
    },
    googleAccountService: {
        clientEmail: process.env.GOOGLE_ACCOUNT_SERVICE_CLIENT_EMAIL,
        privateKey: process.env.GOOGLE_ACCOUNT_SERVICE_PRIVATE_KEY,
    },
    emailName: 'Coffee Shop',
});
