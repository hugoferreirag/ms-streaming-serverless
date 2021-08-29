"use strict";

module.exports = class {
  create(IVideo) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  update(IVideo) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  remove(videoId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  pagination(page) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  getAll(page) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
};
