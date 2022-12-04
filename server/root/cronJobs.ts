import { execSync } from 'child_process';
import cron from 'node-cron';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS credentials not defined!');
}

const s3Client = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const cloudServer = process.env.APP_ENV !== 'production' ? '' : '+srv';
const user = encodeURIComponent(process.env.MONGO_USERNAME || '');
const password = encodeURIComponent(process.env.MONGO_PASSWORD || '');
const cluster = process.env.MONGO_CLUSTER;
const uri = `mongodb${cloudServer}://${user}:${password}@${cluster}/?retryWrites=true&w=majority`;

export const init = async () => {
  // TODO: run weekly
  cron.schedule('15 7 13 * * *', async () => {
    try {
      const now = new Date();
      console.log(`Backing up Mongo data ${now.toLocaleString()}`);

      const archiveName = `mongodb-backup-${now.toISOString().split('T')[0]}.gzip`;

      const dumpBuffer = execSync(`mongodump --archive --gzip --uri=${uri}`);

      const uploadParams = {
        Bucket: process.env.S3_BACKUP_BUCKET_NAME,
        Key: archiveName,
        Body: dumpBuffer,
      };

      const data = await s3Client.send(new PutObjectCommand(uploadParams));
      console.log('Success', data);
      return data; // For unit tests.
    } catch (err) {
      console.error('Backup Error!', err);
    }
  });
};
