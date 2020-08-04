const express = require('express');
const session = require('./routes/session');
const router = express.Router();

module.exports = () => {
  router.use('/session', session());
  return router;
};
