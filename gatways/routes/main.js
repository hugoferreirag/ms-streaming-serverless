const SessionController = require("../controllers/SessionController");
const VideoController = require("../controllers/VideoController");
const { notFound } = require("../../core/config/libs/ResponseService");
const { controllersEntitys } = require("../../core/config/consts");

const runCorrectControllerMethod = async ({
  body,
  pathParameters,
  httpMethod,
}) => {
  const { controller, action } = pathParameters;

  const controllerRequest = findControllersRequest({ controller });

  if (!controllerRequest) return notFound();

  const methodRequest = findTheMethodRequest({
    action,
    httpMethod,
    controllersMap: controllerRequest.controllersMap,
  });

  if (!methodRequest) return notFound();
  const [_, correctlyMethod] = methodRequest;
  return await correctlyMethod.action({ body, pathParameters });
};

const findControllersRequest = ({ controller }) => {
  let result;
  switch (controller.toUpperCase()) {
    case controllersEntitys.SESSION:
      result = new SessionController();
      break;
    case controllersEntitys.VIDEO:
      result = new VideoController();
      break;
    default:
      result = undefined;
      break;
  }
  return result;
};
const findTheMethodRequest = ({ controllersMap, action, httpMethod }) =>
  Object.entries(controllersMap).find(
    ([actionName, insideContent]) =>
      actionName.toUpperCase() == action.toUpperCase() &&
      insideContent.method == httpMethod
  );

module.exports.handle = async (event) => {
  const result = await runCorrectControllerMethod(event);
  return result;
};
