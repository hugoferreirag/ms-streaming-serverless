"use strict";

const Video = require("../../interfaces/video/IVideo");
module.exports.CreateVideo = (
  sessionId,
  videoName,
  videoDescription,
  videoUrl,
  videoThumb,
  locked,
  { videoRepository }
) => {
  const user = new Video(
    null,
    sessionId,
    videoName,
    videoDescription,
    videoUrl,
    videoThumb,
    locked
  );
  return videoRepository.create(user);
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
