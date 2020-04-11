import { expect } from 'chai';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import request from 'supertest';
import { getApp } from '../src/app';


describe('/api/v1/test', () => {
  it('works', async () => {
    const app = getApp();
    const res = await request(app).get('/api/v1/test');
    const { ok } = res.body;
    expect(res.status).to.equal(200);
    expect(ok).to.equal(true);
  });
});
describe('/trainview', () => {
  it(' trainview', async () => {
    const app = getApp();
    const res = await request(app).get('/trainview');
    const { lat } = res.body[0];

    console.log(res.body[0].lat);
    expect(+lat).to.gte(20);
    expect(res.status).to.equal(200);
  });
});
describe('/trainviewp', () => {
  it(' trainviewp', async () => {
    const app = getApp();
    const res = await request(app).get('/trainviewp');
    const allowOrigin = res.header['access-control-allow-origin'];
    // Check header information for jsonp
    expect(allowOrigin).to.equal('*');

    const { lat } = res.body[0];
    console.log(res.body[0].lat);
    expect(+lat).to.gte(20);
    expect(res.status).to.equal(200);
  });
});
describe('/auth', () => {
  it(' auth', async () => {
    const app = getApp();
    const res = await request(app).get('/auth');
    const allowOrigin = res.header['access-control-allow-origin'];
    // Check header information for jsonp
    expect(allowOrigin).to.equal('*');
    expect(res.status).to.equal(200);
  });
});
describe('/push/topic', () => {
  it(' topic', async () => {
    const app = getApp();
    const res = await request(app).get('/push/topic');
    const { ok } = res.body;

    console.log(ok);
    expect(ok).to.equal(true);
  });
});

