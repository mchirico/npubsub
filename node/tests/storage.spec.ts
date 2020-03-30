import { expect } from 'chai';
import { createBucket, downloadFile, listFiles, uploadFile } from '../src/storage/storage';
import * as fs from 'fs';
import path from 'path';

describe('Bucket', function() {
  after(function(done) {
    const srcFilename = path.join(__dirname, './junk.txt');
    const srcFilename2 = path.join(__dirname, './junk2.txt');
    try {
      fs.unlinkSync(srcFilename);
      fs.unlinkSync(srcFilename2);
    } finally {
      done();
    }
  });

  it('Create bucket', function(done) {
    this.timeout(14000);
    const bucket = 'septapigtester';
    createBucket(bucket)
      .then(r => {
        console.log('done');
        done();
      })
      .catch(r => {
        console.log(r.code);
        expect(r.message).to.contain('own this bucket');
        expect(r.code).to.equal(409);
        done();
      });
  });

  it('Upload file', function(done) {
    this.timeout(14000);
    const bucket = 'septapigtester';
    const srcFilename = path.join(__dirname, './junk.txt');
    const destFilename = 'junk.txt';

    fs.writeFileSync(srcFilename, 'Hi there!');

    uploadFile(bucket, srcFilename, destFilename)
      .then(r => {
        console.log('done');
        done();
      })
      .catch(r => {
        console.log(r.code);
        expect(r.code).to.equal(409);
        done();
      });
  });

  it('List Files', function(done) {
    this.timeout(14000);
    const bucket = 'septapigtester';
    listFiles(bucket)
      .then(r => {
        const [files] = r;
        console.log('Files:');
        files.forEach(file => {
          console.log(file.name);
        });
        done();
      })
      .catch(r => {
        console.log(r.code);
        expect(r.message).to.contain('own this bucket');
        expect(r.code).to.equal(409);
        done();
      });
  });

  it('Download file', function(done) {
    this.timeout(14000);
    const bucket = 'septapigtester';
    const destFilename = path.join(__dirname, './junk2.txt');
    downloadFile(bucket, 'junk.txt', destFilename)
      .then(r => {

        fs.readFile(destFilename, 'utf8', function(err, contents) {
          console.log(contents);
          done();
        });

      })
      .catch(r => {
        console.log(r.code);
        expect(r.message).to.contain('own this bucket');
        expect(r.code).to.equal(409);
        done();
      });
  });
});

