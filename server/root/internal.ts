import { Router } from 'express';
import auth from '../auth';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { execSync } from 'child_process';
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

const authorize = auth('portfolio_admin');

const internalRouter = Router();

internalRouter.post('/mongodump', authorize, async (req, res, next) => {
  try {
    const now = new Date();
    console.log(`[${getGMTTimestamp()}] Starting Mongo backup process`);

    const archiveName = `mongodb-backup-${now.toISOString().split('T')[0]}.gzip`;

    const objectParams = { Bucket: process.env.S3_BACKUP_BUCKET_NAME, Key: archiveName };

    const shouldBackup = await s3Client
      .send(new GetObjectCommand(objectParams))
      .then(() => {
        console.log(`[${getGMTTimestamp()}] Backup already found for today, all good!`);
        return false;
      })
      .catch(() => {
        console.log(`[${getGMTTimestamp()}] Backup not found for today, trying to backup`);
        return true;
      });

    if (shouldBackup) {
      const archivePath = path.join(__dirname, archiveName);
      console.log(`[${getGMTTimestamp()}] creating dump into "${archivePath}"`);

      execSync(`mongodump --archive=${archivePath} --gzip --uri=${uri}`);

      const fileBuffer = readFileSync(archivePath);

      await s3Client.send(new PutObjectCommand({ ...objectParams, Body: fileBuffer }));

      await unlinkSync(archivePath);
      console.log(`[${getGMTTimestamp()}] Mongo dump successfully saved!`);

      return res.status(200).json({ message: 'Mongo dump successfully saved!' });
    } else {
      return res.status(200).json({ message: 'Dump already exists!' });
    }
  } catch (backupError) {
    next(backupError);
  }
});

export default internalRouter;
