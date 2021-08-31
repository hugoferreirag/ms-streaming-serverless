"use strict";

const Video = require("../../interfaces/video/IVideo");
module.exports.CreateVideo = (
  { sessionId, videoName, videoDescription, videoUrl, videoThumb, locked },
  { videoRepository }
) => {
  const video = new Video({
    _id: null,
    sessionId,
    videoName,
    videoDescription,
    videoUrl,
    videoThumb,
    locked,
  });
  delete video._id;
  return videoRepository.create(video);
};

module.exports.PaginationVideo = (page, { videoRepository }) => {
  return videoRepository.pagination(page);
};
module.exports.FindAllVideos = ({ videoRepository }) => {
  return videoRepository.getAll();
};
module.exports.CreateVideo = (video, { videoRepository }) => {
  return videoRepository.create(video);
};
