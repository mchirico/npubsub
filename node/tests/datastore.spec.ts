import { addEntry, query } from '../src/datastore/datastore';
import { expect } from "chai";

describe('Datastore', function() {
  it('Create datastore', function(done) {
    this.timeout(14000);
    const kind = 'kind';
    const name = 'name';
    const value = 'value';

    const data = {
      description: value,
      stuff: 'stuff',
      timeStamp: Date.now(),
    };

    addEntry(kind, name, data)
      .then(r => {
        console.log('done');
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

    query(kind)
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
