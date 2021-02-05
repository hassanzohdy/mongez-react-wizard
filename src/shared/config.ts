import config from 'reactor/config';

config.set({
    endpoint: {
        baseUrl: process.env.REACT_APP_WIZARD_BASE_URL
    },
    locales: {
        en: {
            direction: 'ltr',
            name: 'English',
        },
    },
});