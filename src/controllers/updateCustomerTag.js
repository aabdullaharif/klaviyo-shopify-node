const { shopify } = require("../config/shopify");
const handleErrorTrace = require("../utils/errorTrace");
const appendLogToFile = require("../utils/logs");
const { TAG_NAME } = process.env;

// @desc Func to update/add customer tag "shareholder" in Shopify
const updateCustomerTagInShopify = async (email, index) => {
    const searchResult = await searchCustomer(email, index);
    if (searchResult === null)
        return;

    const { customerID, customerTags } = searchResult;

    let customerTagsArr = customerTags.split(',').map(tag => tag.trim());
    if (customerTagsArr.includes(TAG_NAME)) {
        appendLogToFile("emailWorkerLogs.log", `[${index}]: Customer already has the tag ${email}`);
        return;
    }

    let updatedTags = `${customerTags}, ${TAG_NAME}`;
    await updateCustomerTags(customerID, updatedTags);

    appendLogToFile("emailWorkerLogs.log", `[${index}]: Tag updated for ${email}`);
}

// Function to search customer in Shopify with Email
async function searchCustomer(email, index) {
    try {
        const customer = await shopify.customer.search({ email: email });
        if (customer.length === 0) {
            appendLogToFile("emailWorkerLogs.log", `[${index}]: Customer not found: ${email}`);
            return null;
        }
        const { id: customerID, tags: customerTags } = customer[0];
        return { customerID, customerTags };
    } catch (error) {
        handleErrorTrace("shopifyError.log", `[Error occurred: [SEARCH_CUSTOMER] - ${index}] - ${email} - error`);
        return null;
    }
}

// Func to update customer tags in Shopify
async function updateCustomerTags(id, tags) {
    try {
        await shopify.customer.update(id, {
            tags: tags
        });
    } catch (error) {
        handleErrorTrace("shopifyError.log", `[Error occurred: [UPDATE_CUSTOMER_TAGS] - ${index}] - ${email} - error`);
    }
}

module.exports = { updateCustomerTagInShopify };