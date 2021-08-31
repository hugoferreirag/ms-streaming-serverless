"use strict";

module.exports = class {
  constructor({
    _id = null,
    sessionId,
    videoName,
    videoDescription,
    videoUrl,
    videoThumb,
    locked,
  }) {
    this._id = _id;
    this.sessionId = sessionId;
    this.videoName = videoName;
    this.videoDescription = videoDescription;
    this.videoUrl = videoUrl;
    this.videoThumb = videoThumb;
    this.locked = locked;
  }
};
