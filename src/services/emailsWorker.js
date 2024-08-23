const BullMQ = require("bullmq");
const { updateCustomerTagInShopify } = require("../controllers/updateCustomerTag");
const { BULLMQ_REDIS_HOST, BULLLMQ_REDIS_PORT } = process.env;

// @desc Get emails and update tags in Shopify
const emailsWorker = new BullMQ.Worker('insertEmailsQueue', async (job) => {
    await updateCustomerTagInShopify(job.data, job.id);
}, {
    connection: {
        host: `${BULLMQ_REDIS_HOST}`,
        port: `${BULLLMQ_REDIS_PORT}`,
    },
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
    },
    concurrency: 1,
    limiter: {
        max: 1,
        duration: 1500
    }
});