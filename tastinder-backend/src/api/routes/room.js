const express = require('express');
const router = express.Router();
const { Container } = require('typedi');
const WebSocket = require('ws');

module.exports = (server) => {
  let logger = Container.get('logger');

  // sockets
  const wss = new WebSocket.Server({ server: server, path: '/room' });

  let rooms = new Map();
  let users = new Map();

  let roomService = Container.get('roomService');

  wss.on('connection', async (ws, req) => {
    let roomName = req.url.slice(15).toLowerCase();

    // handle join on database
    try {
      let players = await roomService.joinSession(roomName);

      if (players === null) {
        logger.error('Room not found, player update unsuccessful');
        ws.send('Error connecting to the room');
        return;
      }
      logger.info(`Successfully entered a new player into ${roomName}
                  New player count: ${players}`);

      // push client to respective room
      if (rooms.has(roomName)) {
        let currArray = rooms.get(roomName);
        currArray.push(ws);
        rooms.set(roomName, currArray);
      } else {
        let newArray = new Array();
        newArray.push(ws);
        rooms.set(roomName, newArray);
      }
      users.set(ws, roomName);

      let clients = rooms.get(roomName);

      Array.from(clients).forEach(async (client) => {
        try {
          let response = {
            action: 'userJoined',
            players: players,
            roomName: roomName,
          };

          client.send(JSON.stringify(response));
        } catch (e) {
          logger.error(e.stack);
          let response = {
            action: 'error',
          };

          client.send(JSON.stringify(response));
        }
      });
    } catch (e) {
      logger.error(e.stack);
      ws.send('Error connecting to the room');
    }

    ws.on('message', async (message) => {
      let userRoom = users.get(ws);
      let clients = rooms.get(userRoom);

      let payload = message;

      try {
        payload = JSON.parse(message);
      } catch (e) {
        logger.error('Error trying to parse message');
        logger.error(e.stack);
        let response = {
          action: 'error',
        };

        return ws.send(JSON.stringify(response));
      }
    });

    // on disconnect
    ws.on('close', async () => {
      // handle leave on database
      let userRoom = users.get(ws);
      let clients = rooms.get(userRoom);

      let players = await roomService.leaveSession(userRoom);

      if (players === null) {
        logger.error('Room not found, player update unsuccessful');
        return;
      }

      Array.from(clients).forEach(async (client) => {
        try {
          let response = {
            action: 'userJoined',
            players: players,
            roomName: userRoom,
          };

          client.send(JSON.stringify(response));
        } catch (e) {
          logger.error(e.stack);
          let response = {
            action: 'error',
          };

          client.send(JSON.stringify(response));
        }
      });

      // remove user from room
      let newClients = Array.from(clients).filter(
        (candidate) => candidate !== ws
      );
      users.delete(ws);
      // if empty room
      if (newClients.length === 0) {
        rooms.delete(userRoom);
      } else {
        rooms.set(userRoom, newClients);
      }
      ws.send(`Successfully left ${userRoom}`);
    });
  });

  // health checkpoint
  router.get('/status', (req, res) => {
    res.status(200).end();
  });

  // create a session
  router.post('/session', async (req, res) => {
    try {
      let roomName = await roomService.createSession(
        req.body.location,
        req.body.keyword
      );
      res.send({ error: '', roomName: roomName });
    } catch (e) {
      logger.error(e.stack);
      return res.send({ error: 'Unsuccessful in creating room' });
    }
  });

  // join a session
  router.post('/join', async (req, res) => {
    try {
      await roomService.joinSession(req.body.roomName);
      res.send({ error: '' });
    } catch (e) {
      logger.error(e.stack);
      return res.send({ error: 'Unsuccessful in joining room' });
    }
  });

  // load a session (fill up with yelp data)
  router.post('/load', async (req, res) => {
    try {
      await roomService.loadSession(req.body.roomName);
      res.send({ error: '' });
    } catch (e) {
      logger.error(e.stack);
      return res.send({ error: 'Unsuccessful in loading room' });
    }
  });

  // return a session's yelp data
  router.get('/fetchData', async (req, res) => {
    try {
      if (req.query.roomName === null) {
        throw new Error('Invalid paramaters');
      }
      let data = await roomService.fetchData(req.query.roomName);
      res.send({ error: '', data: data });
    } catch (e) {
      logger.error(e.stack);
      return res.send({ error: 'Unsuccessful in fetching data' });
    }
  });

  return router;
};
