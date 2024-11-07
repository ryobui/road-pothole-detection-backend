import * as dotenv from 'dotenv';
dotenv.config();

export const slackConfig = () => ({
    slack: {
        webhookAPI: process.env.SLACK_WEBHOOK_API,
    },
});
