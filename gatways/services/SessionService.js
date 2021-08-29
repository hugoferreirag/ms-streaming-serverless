const SessionService = require("../../interfaces/session/ISessionService");
const IVideo = require("../../interfaces/video/IVideo");
const Response = require("./ResponseService");

module.exports = class extends SessionService {
  constructor() {
    super();
    this.response = new Response();
  }
  async createSession(
    session,
    { FindOneSession, CreateSession },
    serviceLocator
  ) {
    try {
      console.log(this.response, this.statusCode);
      this.#validatePayloadReceived(session);

      await this.#checkSessionExists(session, FindOneSession, serviceLocator);

      const newSession = await CreateSession(session, serviceLocator);
      this.response.successfullyCreated({ data: newSession });
    } catch (error) {
      return this.response.handleError({ error: error });
    }
  }
  #validatePayloadReceived({ name }) {
    if (!name) throw 400;
  }

  async #checkSessionExists({ name }, FindOneSession, serviceLocator) {
    const sessionExists = await FindOneSession(name, serviceLocator);

    if (sessionExists) throw 400;
  }

  async findAllSessions(
    event = null,
    { FindAllSessions, FindAllVideos },
    serviceLocator
  ) {
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
      return {
        status: 400,
        message: error.message,
      };
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
      return {
        status: 400,
        message: error.message,
      };
    }
  }
};
