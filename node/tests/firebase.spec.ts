import { App } from '../src/firebase/firebase';

describe('Datastore', function() {

  it('Create App', function(done) {
    this.timeout(4000);
    const app = App();
    const db = app.firestore();
    db.collection('users')
      .doc('y')
      .set({
        first: 'What now okay done...',
        last: 'Lovelace',
        born: 1815,
        msg: 'Hello world',
      })
      .then(r => {
        console.log('Document written with ID: ', r);
        done();
      }).catch(function(error: any) {
        console.error('Error adding document: ', error);
      });
  });

  it('Create App2', function(done) {
    this.timeout(4000);
    const app = App();
    const db = app.firestore();
    db.collection('users')
      .doc('y')
      .set({
        first: 'What now okay done...',
        last: 'Lovelace',
        born: 1815,
        msg: 'Hello world',
      })
      .then(r => {
        console.log('Document written with ID: ', r);
        done();
      }).catch(function(error: any) {
        console.error('Error adding document: ', error);
    });
  });

});
