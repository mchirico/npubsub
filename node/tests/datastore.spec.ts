import { addEntry, query, } from '../src/datastore/datastore';
import { expect } from "chai";

describe('Datastore', function() {
  it('Create datastore', function(done) {
    this.timeout(14000);
    const kind = ['kind', 'name'];

    const data = [
      {
        name: 'category',
        value: 'Personal',
      },
      {
        name: 'created',
        value: new Date(),
      },
      {
        name: 'done',
        value: false,
      },
      {
        name: 'priority',
        value: 4,
      },
      {
        name: 'tags',
        value: ['fun', 'programming'],
      },
      {
        name: 'percent_complete',
        value: 10.0,
      },
      {
        name: 'description',
        value: 'Learn Cloud Datastore',
        excludeFromIndexes: false,
      },
    ];


    addEntry(kind, data)
      .then(r => {
        console.log('added...');
        done();
      })
      .catch(r => {
        console.log(r.code);
        done();
      });
  });


  it('query datastore', function(done) {
    this.timeout(14000);

    const kind = 'kind';
    const name = 'name'
    query(kind, name)
      .then(r => {
        const [recs] = r;
        recs.forEach(rec => {
          console.log('rec: ', rec);
          expect(rec.stuff).to.contain('stuff');
        });
        console.log('done');
        done();
      })
      .catch(r => {
        console.log(r.code);
        done();
      });
  });




});
