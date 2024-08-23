const { Router } = require("express");
const { existingCustomers } = require("../controllers/existingCustomers");
const router = Router();

router.route("/existingCustomers").post(existingCustomers);

module.exports = router;