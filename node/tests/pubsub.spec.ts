import { expect } from 'chai';
import {
  CreateTopic,
  CreateTopicSubscription,
  DeleteTopic,
  listenForMessages,
  publishMessage,
} from '../src/pubsub/pubsub';
import { bindCallback } from 'rxjs';

describe('Create Sub', () => {
  it('run sub', async () => {
    await CreateTopicSubscription()
      .then(r => {
        console.log(r.name);
      })
      .catch(console.error);
    //expect(t).to.equal({});
  });
});

describe('Create topic', function() {
  it('Create junk2', function(done) {
    this.timeout(4000);
    CreateTopic('junk2')
      .then(r => {
        console.log('done');
        done();
      })
      .catch(r => {
        // 'Error: 6 ALREADY_EXISTS: Resource already exists in the project';
        expect(r.code).to.equal(6);
        done();
      });
  });
});

describe('Create topic again', () => {
  it('junk2', async () => {
    await CreateTopic('junk2')
      .then(r => {
        console.log('done');
      })
      .catch(r => {
        // 'Error: 6 ALREADY_EXISTS: Resource already exists in the project';
        expect(r.code).to.equal(6);
      });
  });
});

describe('publish', () => {
  it('p 0', async () => {
    const data = { foo: 'foo more here' };
    await publishMessage('topic-npubsub', JSON.stringify(data))
      .then(messageID => {
        console.log(`message: ${messageID}`);
      })
      .catch();
  });
});

describe('Rxjs add', function() {
  it('Rxjs', function(done) {
    this.timeout(4000);

    const getListenAsObservable = bindCallback(listenForMessages);
    const result = getListenAsObservable('sub-npubsub', 2);
    result.subscribe(
      x => {
        console.log(x);
        done();
      },
      e => {
        console.error(e);
        done();
      },
    );
  });
});


describe('listen', function() {
  it('p 0', function(done) {
    this.timeout(14000);
    listenForMessages('sub-npubsub', 10, (m: string) => {
      console.log(m);
      done();
    });
  });
});

describe('delete Topic', function() {
  it('delete', function(done) {
    //this.timeout(1400);
    DeleteTopic('junk2')
      .then(r => {
        console.log('done');
        done();
      })
      .catch(r => {
        expect(r.code).to.equal(5);
        done();
      });
  });
});
