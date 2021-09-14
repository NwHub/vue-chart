import * as youTubeApi from "@/domain/repository/YouTubeApi";

export const getChannelInfo = async function (videoId) {
  const channelInfo = await youTubeApi.getChannelInfo(videoId);
  return channelInfo;
};

export const getVideoInfoList = async function (channelId) {
  const videoIdList = await youTubeApi.getVideoIdList(channelId);
  const videoInfoList = await youTubeApi.getVideoInfoList(videoIdList);
  return videoInfoList;
};
