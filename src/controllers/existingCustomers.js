const { ApiKeySession, ListsApi } = require('klaviyo-api');
const handleErrorTrace = require('../utils/errorTrace');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');
const { listsApi } = require('../config/klaviyo');
const { insertEmailsQueue } = require('../config/bullmqQueues');


// @desc Get Emails from Klaviyo and push to BullMQ
// @route POST /api/existingCustomers
exports.existingCustomers = asyncHandler(async (req, res, next) => {
    const { klaviyo_list_id } = req.body;

    if (!klaviyo_list_id)
        return next(new ErrorHandler("Klaviyo list id missing!", 400));

    let listSize = 0;

    try {
        const allProfiles = await getAllProfiles(klaviyo_list_id, {
            pageSize: 100,
            fieldsProfile: ['email']
        });

        for (let profile of allProfiles) {
            const { email } = profile.attributes;
            // Inserting emails into queue
            await insertEmailsQueue.add('insertEmailsQueue', email);
        }

        listSize = allProfiles.length;

        res.status(200).json({
            "success": true,
            "message": "Inserting emails into queue and processing",
            "list_size": listSize,
            klaviyo_list_id
        });

    } catch (err) {
        handleErrorTrace("klaviyoError.log", err);

        // If 'err.response' exists and has a status, send it; otherwise, use a fallback error status code
        const statusCode = err.response && err.response.status ? err.response.status : 500;
        return res.status(statusCode).json({
            "success": false,
            "message": err.message
        });
    }
});

// Recursive func getting emails from the list 
async function getAllProfiles(listID, options, allProfiles = []) {
    return new Promise((resolve, reject) => {
        listsApi.getListProfiles(listID, options)
            .then(result => {
                const { data, links } = result.response.data;
                allProfiles.push(...data);
                if (links.next) {
                    const nextPageUrl = new URL(links.next);
                    const nextPageParams = nextPageUrl.searchParams;
                    const nextPageCursor = nextPageParams.get('page[cursor]');
                    const nextPageOptions = {
                        ...options,
                        pageCursor: nextPageCursor
                    };
                    setTimeout(() => {
                        getAllProfiles(listID, nextPageOptions, allProfiles)
                            .then(resolve)
                            .catch(reject);
                    }, 1000); // Safety Check (Rate Limit)
                } else {
                    resolve(allProfiles);
                }
            })
            .catch(err => {
                handleErrorTrace("klaviyoError.log", err);
                reject(err);
            });
    });
}