const express = require('express');
const errorMiddleware = require('./middlewares/error');

const existingCustomersRoute = require('./routes/existingCustomers');
const klaviyoWebhookRoute = require('./routes/klaviyoWebhook');

const app = express();

// queue worker
require("./services/emailsWorker")

// Body Parser
app.use(express.json());

// Routes
app.use("/api", existingCustomersRoute);
app.use("/api", klaviyoWebhookRoute);

// Error Middlewares
app.use(errorMiddleware);

module.exports = app;
