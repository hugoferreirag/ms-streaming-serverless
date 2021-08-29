const useCases = require("../../application/use_cases/main");
const serviceLocator = require("../../core/config/serviceLocator");
const SessionService = require("../services/SessionService");

module.exports.findAllSessions = async (event) => {
  const session = await new SessionService().findAllSessions(
    event,
    {
      FindAllSessions: useCases.Session.FindAllSessions,
      FindAllVideos: useCases.Video.FindAllVideos,
    },
    serviceLocator
  );

  return {
    statusCode: 200,
    body: JSON.stringify(session),
  };
};

module.exports.paginationSessions = async ({ pathParameters }) => {
  const session = await new SessionService().paginationSessions(
    pathParameters,
    {
      PaginationSession: useCases.Session.PaginationSession,
      FindAllVideos: useCases.Video.FindAllVideos,
    },
    serviceLocator
  );

  return {
    statusCode: 200,
    body: JSON.stringify(session),
  };
};
module.exports.createSession = async ({ body }) => {
  const result = await new SessionService().createSession(
    JSON.parse(body),
    {
      FindOneSession: useCases.Session.FindOneSession,
      CreateSession: useCases.Session.CreateSession,
    },
    serviceLocator
  );
  return result;
};
