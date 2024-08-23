
const asyncHandler = require('../middlewares/asyncHandler');
const { insertEmailsQueue } = require('../config/bullmqQueues');
const { KLAVIYO_AUTH_TOKEN } = process.env;

// @desc Get Webhook Data from Klaviyo and push to BullMQ
// @route POST /api/webhook/klaviyo
exports.klaviyoWebhook = asyncHandler(async (req, res, next) => {

    // Checking if req headers contain auth-token, if not reject the req
    const authToken = req.headers['auth-token'];
    if (authToken !== KLAVIYO_AUTH_TOKEN)
        return res.sendStatus(403); // Unauthorized

    const { email } = req.body;
    if (!email)
        return res.sendStatus(400); // Bad Request

    await insertEmailsQueue.add("insertEmailsQueue", email);
    res.sendStatus(200);
});