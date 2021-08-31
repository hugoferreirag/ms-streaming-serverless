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
      return new Video({
        _id: mongoVideo._id,
        sessionId: mongoVideo.sessionId,
        videoName: mongoVideo.videoName,
        videoDescription: mongoVideo.videoDescription,
        videoUrl: mongoVideo.videoUrl,
        videoThumb: mongoVideo.videoThumb,
        locked: mongoVideo.locked,
      });
    });
  }
};
