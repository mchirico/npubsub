import { addEntry, query, queryAncestor } from '../src/datastore/datastore';
import { expect } from 'chai';

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


  it('Create datastore Ancestor', function(done) {
    this.timeout(14000);
    const kind = [
      'TaskList',
      'default',
      'Task',
      'sampleTask',
    ];

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

  it('Create datastore Ancestor Large', function(done) {
    this.timeout(14000);
    const kind = ['User',
      'alice',
      'TaskList',
      'default',
      'Task',
      'sampleTask',
    ];

    const data = [
      {
        name: 'category',
        value: 'Business',
      },
      {
        name: 'created',
        value: new Date(),
      },
      {
        name: 'done',
        value: true,
      },
      {
        name: 'priority',
        value: 9,
      },
      {
        name: 'tags',
        value: ['work', 'programming'],
      },
      {
        name: 'percent_complete',
        value: 100.0,
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
    const name = 'name';
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

  it('queryAncestor', function(done) {
    this.timeout(14000);

    const kind = 'Task';
    const names = ['TaskList', 'default'];
    queryAncestor(kind, names)
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

  it('queryAncestor large', function(done) {
    this.timeout(14000);

    const kind = 'Task';
    const names = ['User',
      'alice',
      'TaskList',
      'default'];
    queryAncestor(kind, names)
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
