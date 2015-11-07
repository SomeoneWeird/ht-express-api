
import fs from 'fs';
import path from 'path';

import ht from 'hudson-taylor';
import express from 'express';
import bodyParser from 'body-parser';

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = require(path.resolve(__dirname, '../config', NODE_ENV));

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());

const client = new ht.Client();

function jsFileFilter (file) {
  return /.js$/.test(file);
}

const serviceFolder = path.resolve(__dirname, '../services');
const routeFolder = path.resolve(__dirname, '../routes');

const serviceFiles = fs.readdirSync(serviceFolder).filter(jsFileFilter);
const routeFiles = fs.readdirSync(routeFolder).filter(jsFileFilter);

serviceFiles.forEach(file => {
  const transport = new ht.Transports.Local();
  const service = require(path.resolve(serviceFolder, file))(client, transport, config);
  client.add(service.name, transport);
});

routeFiles.forEach(file => {
  require(path.resolve(routeFolder, file))(app, client, config);
});

app.listen(config.app.port, config.app.host, function (err) {
  if (err) {
    throw new Error(err);
  }

  console.log(`Listening on ${config.app.host}:${config.app.port}`);
});
