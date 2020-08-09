const config = require('../config');
const bodyParser = require('body-parser');
const routes = require('../api');
const cors = require('cors');

module.exports = (app, server) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // cors
  app.use(cors());

  // connect our routes with router
  app.use(config.api_prefix, routes(server));

  // error handling
  if (process.env.NODE_ENV === 'production') {
    // don't return error if production
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        errors: {},
      });
    });
  } else {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    });
  }

  app.get('/status', (req, res) => {
    res.status(200).end();
  });
};
