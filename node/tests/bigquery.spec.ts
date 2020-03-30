import { expect } from 'chai';
import { createDataset, createTable, insertRowsAsStream, select } from '../src/bigQuery/bigQuery';

describe('Dataset', function() {
  it('Create dataset', function(done) {
    this.timeout(14000);
    const dataset = 'test';
    createDataset(dataset)
      .then(r => {
        console.log('done');
        expect(r[0].id).to.equal(dataset);
        done();
      })
      .catch(r => {
        console.log(r.code);
        expect(r.code).to.equal(409);
        done();
      });
  });
});

describe('Table', function() {
  it('Create table', function(done) {
    this.timeout(14000);
    const datasetId = 'test';
    const schema = 'Name:string, Age:integer, Weight:float, IsMagic:boolean';
    const tableId = 'test';
    createTable(datasetId, tableId, schema)
      .then(r => {
        console.log('done');
        expect(r[0].id).to.equal(tableId);
        done();
      })
      .catch(r => {
        console.log(r.code);
        expect(r.code).to.equal(409);
        done();
      });
  });
});

describe('Table', function() {
  it('Insert table', function(done) {
    this.timeout(14000);
    const datasetId = 'test';
    const tableId = 'test';
    const rows = [
      { name: 'Tom', age: 30 },
      { name: 'Jane', age: 32 },
    ];

    insertRowsAsStream(datasetId, tableId, rows)
      .then(r => {
        console.log('done');
        //expect(r[0].id).to.equal(tableId);
        done();
      })
      .catch(r => {
        console.log(r.code);
        expect(r.code).to.equal(409);
        done();
      });
  });
});

describe('Query', function() {
  it('Query results', function(done) {
    this.timeout(14000);
    const query = `SELECT name
      FROM \`bigquery-public-data.usa_names.usa_1910_2013\`
      WHERE state = 'TX'
      LIMIT 5`;

    select(query)
      .then(r => {
        const [job] = r;
        console.log(`Job ${job.id} started.`);
        return job.getQueryResults();
      })
      .then(r => {
        const [rows] = r;
        rows.forEach(row => console.log(row));
        done();
      })
      .catch(r => {
        console.log(r.code);
        expect(r.code).to.equal(409);
        done();
      });
  });
});
