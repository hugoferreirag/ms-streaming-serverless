"use strict";

module.exports = class {
  create(ISession) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  update(ISession) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  remove(sessionId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  getAll(limit) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  pagination(currentPage) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
};
