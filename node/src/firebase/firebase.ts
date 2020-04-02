import admin from 'firebase-admin';
import fs from 'fs';
const serviceAccount = JSON.parse(fs.readFileSync('./credentials/firebase-adminsdk.json').toString());

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

export function App() {
  if (!admin.apps.length) {
    const app = admin.initializeApp({
      credential: admin.credential.cert(params),
      databaseURL: 'https://septapig.firebaseio.com',
      //databaseURL: databaseConfig.databaseURL;
    });
    return app;
  }
}
