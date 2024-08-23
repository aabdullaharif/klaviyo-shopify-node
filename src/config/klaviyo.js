const { ApiKeySession, ListsApi } = require('klaviyo-api');

const { KLAVIYO_SECRET_TOKEN } = process.env;
// Initialize Klaviyo API instance
const session = new ApiKeySession(KLAVIYO_SECRET_TOKEN);
const listsApi = new ListsApi(session);

module.exports = { listsApi };
