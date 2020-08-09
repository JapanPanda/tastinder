const express = require('express');
const room = require('./routes/room');
const router = express.Router();

module.exports = (server) => {
  router.use('/room', room(server));
  return router;
};
