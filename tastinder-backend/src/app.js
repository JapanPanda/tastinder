const config = require('./config');
const express = require('express');
const logger = require('./loaders/winston');
const http = require('http');
const websocket = require('ws');

async function startServer() {
  const app = express();

  let server = http.createServer(app);

  // start loading in our loaders while passing in the app
  await require('./loaders')(app, server);

  server.listen(config.port, (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }

    logger.info(`Server has started on port ${config.port}`);
  });
}

startServer();
