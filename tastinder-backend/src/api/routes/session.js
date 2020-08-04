const express = require('express');
const router = express.Router();
const { Container } = require('typedi');

module.exports = () => {
  let logger = Container.get('logger');

  router.get('/status', (req, res) => {
    res.status(200).end();
  });

  return router;
};
