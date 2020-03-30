import { Datastore } from '@google-cloud/datastore';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './credentials/access.json';

const datastore = new Datastore();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addEntry(kind: string, name: string, data: Record<string, any>) {
  // The kind for the new entity
  //const kind = 'Task';

  // The name/ID for the new entity
  //const name = 'sampletask1';

  // The Cloud Datastore key for the new entity
  const pKey = datastore.key([kind, name]);

  // Prepares the new entity
  const doc = {
    key: pKey,
    data: data,
  };

  // Saves the entity
  return datastore.save(doc);
  // console.log(`Saved ${task.key.name}: ${task.data.description}`);
}

export function query(kind: string) {
  const query = datastore.createQuery(kind);

  //const [tasks] = await datastore.runQuery(query);
  return datastore.runQuery(query);
  // console.log('Tasks:');
  // tasks.forEach(task => {
  //   const taskKey = task[datastore.KEY];
  //   console.log(taskKey.id, task);
  // });
}
