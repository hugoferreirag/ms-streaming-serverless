const useCases = require("../../application/use_cases/main");
const serviceLocator = require("../../core/config/serviceLocator");
const SessionService = require("../services/SessionService");
const ISession = require("../../interfaces/session/ISession");
const { methods } = require("../../core/config/consts");
const {
  isRequiredInObject,
  isRequired,
} = require("../../core/config/libs/validator");
const {
  handleError,
  successfullyCreated,
  successfullyRead,
} = require("../../core/config/libs/ResponseService");

class SessionController {
  get controllersMap() {
    return Object.freeze({
      create: {
        method: methods.POST,
        action: this.#create,
      },
      update: {
        method: methods.PUT,
        action: this.#update,
      },
      findAll: {
        method: methods.GET,
        action: this.#findAll,
      },
      pagination: {
        method: methods.GET,
        action: this.#pagination,
      },
    });
  }
  async #create({ body }) {
    try {
      if (!body) throw 400;

      const session = new ISession(JSON.parse(body));

      const sessionService = new SessionService();

      await isRequiredInObject(["name", "description"], session, 400);

      await sessionService.checkSessionExists(
        session,
        {
          FindOneSession: useCases.Session.FindOneSession,
        },
        serviceLocator
      );

      const result = await sessionService.createSession(
        session,
        {
          CreateSession: useCases.Session.CreateSession,
        },
        serviceLocator
      );

      return successfullyCreated({ data: result });
    } catch (error) {
      return handleError({ error });
    }
  }
  async #findAll() {
    try {
      const sessionService = new SessionService();

      const result = await sessionService.findAllSessions(
        {
          FindAllSessions: useCases.Session.FindAllSessions,
          FindAllVideos: useCases.Video.FindAllVideos,
        },
        serviceLocator
      );

      return successfullyRead({ data: result });
    } catch (error) {
      return handleError(error);
    }
  }

  async #pagination({ pathParameters }) {
    try {
      await isRequired(pathParameters.page, 400);
      const sessionService = new SessionService();

      const result = await sessionService.paginationSessions(
        pathParameters,
        {
          PaginationSession: useCases.Session.PaginationSession,
          FindAllVideos: useCases.Video.FindAllVideos,
        },
        serviceLocator
      );
      return successfullyRead({ data: result });
    } catch (error) {
      return handleError(error);
    }
  }
  async #update() {}
}

module.exports = SessionController;
