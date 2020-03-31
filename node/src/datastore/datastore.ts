import { Datastore } from '@google-cloud/datastore';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './credentials/access.json';

// Ref: https://cloud.google.com/datastore/docs/concepts/queries

const datastore = new Datastore();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addEntry(kind: string[], data: Record<string, any>) {
  const pKey = datastore.key(kind);

  const doc = {
    key: pKey,
    data: data,
  };
  return datastore.save(doc);
}

export function query(kind: string, name: string) {
  const query = datastore.createQuery(kind).filter('__key__', '=', datastore.key([kind, name]));
  return datastore.runQuery(query);
}

export function queryAncestor(kind: string, ancestor: string[]) {
  const ancestorKey = datastore.key(ancestor);
  const query = datastore.createQuery(kind);
  query.hasAncestor(ancestorKey);
  return datastore.runQuery(query);
}

export function filter() {
  const query = datastore
    .createQuery('Task')
    .filter('done', '=', true)
    .filter('priority', '>=', 4)
    .order('priority', {
      descending: true,
    });
  return datastore.runQuery(query);
}

export function filter2() {
  const query = datastore
    .createQuery('Task')
    .filter('tags', '=', 'fun')
    .filter('tags', '=', 'programming');

  return datastore.runQuery(query);
}
