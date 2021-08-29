const Session = require("../../interfaces/session/ISession");
module.exports.CreateSession = (
  { name, description, locked },
  { sessionRepository }
) => {
  const session = new Session(null, name, description, locked);
  delete session._id;
  return sessionRepository.create(session);
};

module.exports.FindAllSessions = ({ sessionRepository }) => {
  return sessionRepository.getAll();
};
module.exports.FindOneSession = (name, { sessionRepository }) => {
  return sessionRepository.findOne(name);
};

module.exports.PaginationSession = (page, { sessionRepository }) => {
  return sessionRepository.pagination(page);
};
