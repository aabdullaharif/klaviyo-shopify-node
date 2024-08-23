const Shopify = require('shopify-api-node');
const { SHOPIFY_STORE_NAME, SHOPIFY_API_KEY, SHOPIFY_ADMIN_API_ACCESS_TOKEN } = process.env;

// Initialize Shopify API instance
const shopify = new Shopify({
    shopName: SHOPIFY_STORE_NAME,
    apiKey: SHOPIFY_API_KEY,
    password: SHOPIFY_ADMIN_API_ACCESS_TOKEN
});

module.exports = { shopify }; 