"use strict";
const VideoRepository = require("../../interfaces/video/IVideoRepository");
const MongoVideo = require("../schemas/videos");
const Video = require("../../interfaces/video/IVideo");

module.exports = class extends VideoRepository {
  constructor() {
    super();
  }
  async getAll() {
    const mongoVideos = await MongoVideo.connectDb.find({ deletedAt: null });
    return mongoVideos.map((mongoVideo) => {
      return new Video(
        mongoVideo._id,
        mongoVideo.sessionId,
        mongoVideo.videoName,
        mongoVideo.videoDescription,
        mongoVideo.videoUrl,
        mongoVideo.videoThumb,
        mongoVideo.locked
      );
    });
  }
};
