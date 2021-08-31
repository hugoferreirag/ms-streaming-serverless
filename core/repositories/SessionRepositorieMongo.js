"use strict";
const SessionRepository = require("../../interfaces/session/ISessionRepository");
const MongoSession = require("../schemas/sessions");
const Session = require("../../interfaces/session/ISession");

module.exports = class extends SessionRepository {
  constructor() {
    super();
  }
  async create({ name, description, locked }) {
    const mongoSession = await MongoSession.connectDb.create({
      name,
      description,
      locked,
    });
    return mongoSession;
  }
  async getAll(limit = 5) {
    const mongoSessions = await MongoSession.connectDb
      .find({ deletedAt: null })
      .limit(limit);
    return mongoSessions.map((mongoSession) => {
      return new Session(
        mongoSession._id,
        mongoSession.name,
        mongoSession.description
      );
    });
  }
  async findOne(name) {
    const mongoSession = await MongoSession.connectDb.findOne({
      name: name,
      deletedAt: null,
    });
    if (!mongoSession) return false;
    return new Session(
      mongoSession._id,
      mongoSession.name,
      mongoSession.description
    );
  }
  async pagination(page) {
    const skip = 5 * (page - 1);

    const mongoSessions = await MongoSession.connectDb
      .find({
        deletedAt: null,
      })
      .skip(skip)
      .limit(5);
    return mongoSessions.map((mongoSession) => {
      console.log(mongoSession.name);
      return new Session({
        _id: mongoSession._id,
        name: mongoSession.name,
        description: mongoSession.description,
        locked: false,
      });
    });
  }
};
