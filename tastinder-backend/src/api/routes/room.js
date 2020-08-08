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
    try {
      let roomName = await roomService.createSession(
        req.body.location,
        req.body.keyword
      );
      res.send({ error: '', roomName: roomName });
    } catch (e) {
      this.logger.error(e);
      return res.send({ error: 'Unsuccessful' });
    }
  });

  router.post('/join', async (req, res) => {
    let roomService = Container.get('roomService');

    try {
      await roomService.joinSession(req.body.roomName);
      res.send({ error: '' });
    } catch (e) {
      this.logger.error(e);
      return res.send({ error: 'Unsuccessful' });
    }
  });

  return router;
};
