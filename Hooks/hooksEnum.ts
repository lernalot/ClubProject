const pageEnum = {
    HOME: 'CLUB',
    PROFILE: 'profile',
    SETTINGS: 'settings',
} as const;

const cashierCallbackEnum = {
    OPEN: 'openSucc',
    FAILURE: 'failure',
    PAY: 'paySucc',
} as const;

export { pageEnum, cashierCallbackEnum };