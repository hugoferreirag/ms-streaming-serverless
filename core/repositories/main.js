"use strict";
const SessionRepositorieMongo = require("./SessionRepositorieMongo");
const VideoRepositorieMongo = require("./VideoRepositoriesMongo");

module.exports = {
  sessionRepository: new SessionRepositorieMongo(),
  videoRepository: new VideoRepositorieMongo(),
};
