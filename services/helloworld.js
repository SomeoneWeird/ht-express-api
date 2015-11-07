
import ht from 'hudson-taylor';

export default function (client, transport, config) {
  const service = new ht.Service(transport);

  service.on('hello', function (data, callback) {
    return callback(null, 'world');
  });

  return {
    name: 'helloworld',
    service
  };
}
