const express = require('express');
const room = require('./routes/room');
const router = express.Router();

module.exports = () => {
  router.use('/room', room());
  return router;
};
