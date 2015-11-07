
import assert from 'assert';

import { wrapService } from './utils';

const service = require('../services/helloworld');

const client = wrapService('helloworld', service);

describe('helloworld', function () {
  describe('hello', function () {
    it('should return "world"', function (done) {
      client.call('helloworld', 'hello', function (err, response) {
        assert.ifError(err);
        assert.equal(response, 'world');
        done();
      });
    });
  });
});
