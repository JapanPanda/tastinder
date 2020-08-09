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
    let roomName = req.url.slice(11).toLowerCase();

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

    // TODO: move join to on open instead
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

      // action is join
      if (payload.action === 'join') {
        // handle join on database
        let players = await roomService.joinSession(userRoom);

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
      if (newClients.length === 0) {
        rooms.delete(userRoom);
      } else {
        rooms.set(userRoom, newClients);
      }
      ws.send(`Successfully left ${userRoom}`);
    });

    ws.send(`Successfully connected to ${req.url}`);
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
      return res.send({ error: 'Unsuccessful session creation' });
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

  return router;
};
