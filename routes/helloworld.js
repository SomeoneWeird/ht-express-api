
import hte from 'ht-express';

export default function (app, client, config) {
  app.all('*', hte(client, 'helloworld', 'hello'));
}
