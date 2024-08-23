const BullMQ = require('bullmq');
const { BULLMQ_REDIS_HOST, BULLLMQ_REDIS_PORT } = process.env;

exports.insertEmailsQueue = new BullMQ.Queue('insertEmailsQueue', {
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
        removeOnComplete: true,
        removeOnFail: 1000,
    },
});