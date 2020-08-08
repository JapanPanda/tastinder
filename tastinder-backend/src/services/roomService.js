const roomData = require('../models/roomData');
const fs = require('fs');

module.exports = class roomService {
  constructor(logger, roomModel, roomDataModel) {
    this.logger = logger;
    this.roomModel = roomModel;
    this.roomDataModel = roomDataModel;

    // load list of animals and adjectives
    this.adjectives = JSON.parse(
      fs.readFileSync('./src/assets/adjectives.json')
    );
    this.animals = JSON.parse(fs.readFileSync('./src/assets/animals.json'));
  }

  // create the room session
  async createSession(location, keyword) {
    let roomName = await this.getValidName();

    let newRoom = await this.roomModel.create({
      roomName: roomName,
      players: 1,
      endVotes: 0,
      location: location,
      keyword: keyword,
    });

    this.logger.info(`
    ========================
    Creating a Room with the Parameters:
    Name: ${roomName}
    Location: ${location}
    Keyword: ${keyword}
    ========================
    `);

    return roomName;
  }

  // get a valid name (one that is not in the database already)
  async getValidName() {
    let roomName = null;
    let exists = true;
    while (exists) {
      const adjective = this.adjectives[
        Math.floor(Math.random() * this.adjectives.length)
      ];
      const animal = this.animals[
        Math.floor(Math.random() * this.animals.length)
      ];

      roomName = adjective + animal;
      let room = await this.roomModel.findOne({
        where: { roomName: roomName },
      });
      if (!room) {
        exists = false;
      }
    }
    return roomName;
  }
};
