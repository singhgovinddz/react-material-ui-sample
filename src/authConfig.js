export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: process.env.REACT_APP_AUTHORITY,
        knownAuthorities: [process.env.REACT_APP_AUTHORITY],
        redirectUri: 'http://localhost:3000',
    },cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
      }
};
export const loginRequest = {
};