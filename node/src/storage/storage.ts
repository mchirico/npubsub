import { Storage } from '@google-cloud/storage';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './credentials/access.json';
const storage = new Storage();

export function createBucket(bucketName: string) {
  return storage.createBucket(bucketName, {
    regional: true,
    location: 'us-east1',
    standard: true,
  });
}

export function listFiles(bucketName: string) {
  //const [files] = await storage.bucket(bucketName).getFiles();
  return storage.bucket(bucketName).getFiles();

  // console.log('Files:');
  // files.forEach(file => {
  //   console.log(file.name);
  // });
}

export function uploadFile(bucketName: string, srcFilename: string, destFilename: string) {
  // Uploads a local file to the bucket

  const options = {
    // The path to which the file should be uploaded, e.g. "file_encrypted.txt"
    destination: destFilename,
    // Encrypt the file with a customer-supplied key.
    // See the "Generating your own encryption key" section above.
    //   encryptionKey: Buffer.from(key, 'base64'),
  };
  return storage.bucket(bucketName).upload(srcFilename, options);
}

export function downloadFile(bucketName: string, srcFilename: string, destFilename: string) {
  const options = {
    // The path to which the file should be downloaded, e.g. "./file.txt"
    destination: destFilename,
  };

  // Downloads the file
  return storage
    .bucket(bucketName)
    .file(srcFilename)
    .download(options);
}
