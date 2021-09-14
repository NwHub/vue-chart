import * as youTubeService from "@/domain/service/YouTubeService";

export async function getYouTube(videoId) {
  const channelInfo = await youTubeService.getChannelInfo(videoId);

  const channelId = channelInfo.channelId;
  const videoInfoList = await youTubeService.getVideoInfoList(channelId);

  const youTubeInfo = {
    channelInfo: channelInfo,
    videoInfoList: videoInfoList,
  };

  return youTubeInfo;
}
