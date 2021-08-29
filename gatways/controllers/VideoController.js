const { FindAllVideos } = require("../../application/use_cases/Video");
const serviceLocator = require("../../core/config/serviceLocator");

module.exports.findAllVideos = async () => {
  const videos = await FindAllVideos(serviceLocator);
  return videos;
};
