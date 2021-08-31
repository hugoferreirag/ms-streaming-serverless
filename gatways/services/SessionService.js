const SessionService = require("../../interfaces/session/ISessionService");
const IVideo = require("../../interfaces/video/IVideo");
const {
  handleError,
  successfullyCreated,
} = require("../../core/config/libs/ResponseService");

module.exports = class extends SessionService {
  async createSession(session, { CreateSession }, serviceLocator) {
    try {
      const newSession = await CreateSession(session, serviceLocator);

      return newSession;
    } catch (error) {
      return error;
    }
  }

  async checkSessionExists({ name }, { FindOneSession }, serviceLocator) {
    const sessionExists = await FindOneSession(name, serviceLocator);

    if (sessionExists) throw 409;
  }

  async findAllSessions({ FindAllSessions, FindAllVideos }, serviceLocator) {
    try {
      const allVideos = await FindAllVideos(serviceLocator);

      const allSessions = await FindAllSessions(serviceLocator);

      const showcasePerSession = allSessions.map((session) => {
        const videosOfCurrentSession = allVideos.filter((video, index) => {
          return video.sessionId == session._id;
        });

        return {
          _id: session._id,
          sessionName: session.name,
          description: session.description,
          locked: session.locked,
          videos: videosOfCurrentSession.slice(0, 5),
        };
      });

      return showcasePerSession;
    } catch (error) {
      return error;
    }
  }
  async paginationSessions(
    { page },
    { PaginationSession, FindAllVideos },
    serviceLocator
  ) {
    try {
      const allVideos = await FindAllVideos(serviceLocator);

      const allSessions = await PaginationSession(page, serviceLocator);

      const showcasePerSession = allSessions.map((session) => {
        const videosOfCurrentSession = allVideos.filter((video, index) => {
          return video.sessionId == session._id;
        });

        return {
          _id: session._id,
          sessionName: session.name,
          description: session.description,
          videos: videosOfCurrentSession.slice(0, 5),
        };
      });

      return showcasePerSession;
    } catch (error) {
      return error;
    }
  }
};
