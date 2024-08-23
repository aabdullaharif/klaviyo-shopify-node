const { Router } = require("express");
const { klaviyoWebhook } = require("../controllers/klaviyoWebhook");
const router = Router();

router.route("/webhook/klaviyo").post(klaviyoWebhook);

module.exports = router;