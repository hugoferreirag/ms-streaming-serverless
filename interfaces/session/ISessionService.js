module.exports = class {
  async findAllSessions(
    event,
    { FindAllSessions, FindAllVideos },
    serviceLocator
  ) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  async paginationSessions(
    { page },
    { FindAllSessions, FindAllVideos },
    serviceLocator
  ) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  async crateSession(
    session,
    { FindOneSession, CreateSession },
    serviceLocator
  ) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
};
