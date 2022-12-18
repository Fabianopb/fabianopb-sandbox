import { execSync } from 'child_process';
import cron from 'node-cron';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { readFileSync, unlinkSync } from 'fs';
import path from 'path';
import { getGMTTimestamp } from '../utils';

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
const uri = `mongodb${cloudServer}://${user}:${password}@${cluster}`;

export const init = async () => {
  // Run every Sunday 3AM GMT
  cron.schedule('0 3 * * Sunday', async () => {
    try {
      const now = new Date();
      console.log(`[${getGMTTimestamp()}] Backing up Mongo data`);

      const archiveName = `mongodb-backup-${now.toISOString().split('T')[0]}.gzip`;
      const archivePath = path.join(__dirname, archiveName);

      execSync(`mongodump --archive=${archivePath} --gzip --uri=${uri}`);

      const fileBuffer = readFileSync(archivePath);

      const uploadParams = {
        Bucket: process.env.S3_BACKUP_BUCKET_NAME,
        Key: archiveName,
        Body: fileBuffer,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      await unlinkSync(archivePath);
      console.log(`[${getGMTTimestamp()}] Mongo dump successfully created!`);
    } catch (err) {
      console.error(`[${getGMTTimestamp()}] Backup Error!`, err);
    }
  });
};
