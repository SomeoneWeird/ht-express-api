
import ht from 'hudson-taylor';

export function wrapService (name, service, config = {}) {
  const transport = new ht.Transports.Local();
  const client = new ht.Client({
    [ name ]: transport
  });
  service(client, transport, config);
  return client;
}
