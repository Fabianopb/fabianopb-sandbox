import { execSync } from 'child_process';
import cron from 'node-cron';

const cloudServer = process.env.APP_ENV !== 'production' ? '' : '+srv';
const user = encodeURIComponent(process.env.MONGO_USERNAME || '');
const password = encodeURIComponent(process.env.MONGO_PASSWORD || '');
const cluster = process.env.MONGO_CLUSTER;
const uri = `mongodb${cloudServer}://${user}:${password}@${cluster}/?retryWrites=true&w=majority`;

export const init = () => {
  // TODO: run weekly
  cron.schedule('30 23 17 * * *', async () => {
    const now = new Date();
    console.log(`Backing up Mongo data ${now.toLocaleString()}`);

    const archive = `mongodb-backup-${now.toISOString().split('T')[0]}.gzip`;

    execSync(`mongodump --archive=${archive} --gzip --uri=${uri}`);
  });
};
