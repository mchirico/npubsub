import { expect } from 'chai';
import { App } from '../src/firebase/firebase';

describe('Cities', function() {
  it('Create basic data', function(done) {
    this.timeout(14000);
    const app = App();
    const db = app.firestore();

    const citiesRef = db.collection('cities');

    // FIXME: Works, but race if ever deleted before this is run... good to see how to insert
    citiesRef
      .doc('SF')
      .set({
        name: 'San Francisco',
        state: 'CA',
        country: 'USA',
        capital: false,
        population: 860000,
        regions: ['west_coast', 'norcal'],
      })
      .then(r => {
        console.log(r)
      });

    citiesRef
      .doc('LA')
      .set({
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        capital: false,
        population: 3900000,
        regions: ['west_coast', 'socal'],
      })
      .then(r => {
        console.log(r)
      });

    citiesRef
      .doc('DC')
      .set({
        name: 'Washington, D.C.',
        state: null,
        country: 'USA',
        capital: true,
        population: 680000,
        regions: ['east_coast'],
      })
      .then(r => {
        console.log(r)
      });

    citiesRef
      .doc('TOK')
      .set({
        name: 'Tokyo',
        state: null,
        country: 'Japan',
        capital: true,
        population: 9000000,
        regions: ['kanto', 'honshu'],
      })
      .then(r => {
        console.log(r)
      });

    citiesRef
      .doc('BJ')
      .set({
        name: 'Beijing',
        state: null,
        country: 'China',
        capital: true,
        population: 21500000,
        regions: ['jingjinji', 'hebei'],
      })
      .then(r => {
        console.log(r)
      });

    db.collection('cities')
      .where('regions', 'array-contains', 'west_coast')
      .get()
      .then(function(querySnapshot) {
        let count = 0;
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          count += 1;
          if (count >= 2) {
            done();
          }
        });
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  });
});

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
      })
      .catch(function(error: any) {
        console.error('Error adding document: ', error);
      });
  });

  it('Create App2', function(done) {
    this.timeout(4000);
    const app = App();
    const db = app.firestore();
    db.collection('long')
      .doc('y')
      .collection('c')
      .doc('b')
      .set({
        first: 'What now okay done...',
        last: 'Lovelace',
        born: 1815,
        msg: 'Hello world',
      })
      .then(r => {
        console.log('Document written with ID: ', r);
        done();
      })
      .catch(function(error: any) {
        console.error('Error adding document: ', error);
      });
  });
});

describe('stuff', function() {
  it('Create App2', function(done) {
    this.timeout(14000);
    const app = App();
    const db = app.firestore();

    db.collection('long')
      .doc('y')
      .collection('c')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const p = doc.data();
          expect(p.last).to.equal('Lovelace');
          console.log(p.last);
          console.log(`${doc.id} => ${doc.data()}`);
          done();
        });
      });
  });
});
