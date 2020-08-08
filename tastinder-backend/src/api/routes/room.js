const express = require('express');
const router = express.Router();
const { Container } = require('typedi');

module.exports = () => {
  let logger = Container.get('logger');

  router.get('/status', (req, res) => {
    res.status(200).end();
  });

  router.post('/session', async (req, res) => {
    let roomService = Container.get('roomService');
    let roomName = await roomService.createSession(
      req.body.location,
      req.body.keyword
    );

    res.send({ error: '', roomName: roomName });
  });

  return router;
};
