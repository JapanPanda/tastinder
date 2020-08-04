const config = require("./config");
const express = require("express");
const logger = require("./loaders/winston");

async function startServer() {
  const app = express();

  // start loading in our loaders while passing in the app
  await require("./loaders")(app);

  app.listen(config.port, (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }

    logger.info(`Server has started on port ${config.port}`);
  });
}

startServer();
