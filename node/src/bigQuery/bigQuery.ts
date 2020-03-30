import { BigQuery, RowMetadata } from '@google-cloud/bigquery';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './credentials/access.json';

const bigquery = new BigQuery();

export function createDataset(dataset: string) {
  return bigquery.createDataset(dataset);
}

export function createTable(datasetId: string, tableId: string, schema: string) {
  // For all options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource
  const options = {
    schema: schema,
    location: 'US',
  };

  // Create a new table in the dataset
  return bigquery.dataset(datasetId).createTable(tableId, options);
}

export function insertRowsAsStream(datasetId: string, tableId: string, rows: RowMetadata) {
  return bigquery
    .dataset(datasetId)
    .table(tableId)
    .insert(rows);
}

// Ref: https://github.com/googleapis/nodejs-bigquery/blob/master/samples/query.js
export function select(query: string) {
  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // FIXME: see Query results in test, for how to use
  //        need better example here, and not in test
  // Run the query as a job
  return bigquery.createQueryJob(options);
  // console.log(`Job ${job.id} started.`);
  //
  // // Wait for the query to finish
  // return  job.getQueryResults();

  // // Print the results
  // console.log('Rows:');
  // rows.forEach(row => console.log(row));
}
