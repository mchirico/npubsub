import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getS$ } from './septa/septa';
import { publishMessage } from './pubsub/pubsub';
import * as path from 'path';

export const getApp = () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  const angularDirectoryPath = path.join(__dirname, '../dist');

  app.use('/', express.static(angularDirectoryPath));

  app.get('/api/v1/test', (_, res) => {
    res.json({ ok: true });
  });

  app.get('/push/topic', (_, res) => {
    const data = { webiste: '/push/topic' };
    publishMessage('topic-npubsub', JSON.stringify(data)).catch();
    res.json({ ok: true });
  });

  app.use('/auth', (req, res) => {
    const url = req.url.toString();
    const header = req.rawHeaders.toString();
    const data = { auth: '/auth', header: header, url: url };
    publishMessage('topic-npubsub', JSON.stringify(data)).catch();
    res.json({ ok: true });
  });

  app.get('/trainview', (_, res) => {
    getS$.subscribe(x => res.json(x));
  });

  app.get('/trainviewp', (_, res) => {
    getS$.subscribe(x => res.jsonp(x));
  });
  // Default ... keep last
  app.use('*', express.static(angularDirectoryPath));
  return app;
};
