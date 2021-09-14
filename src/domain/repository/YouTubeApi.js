import axios from "axios";

// YouTube Apiの取得件数 0〜50
const MAX_SEARCH = 50;

// YouTube APIのベースURL
const BASE_URL = "https://www.googleapis.com/youtube/v3";
// const BASE_URL = "http://localhost:3000";

// YouTube API KEY ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const KEY = "";

export const getChannelInfo = async function (videoId) {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: KEY,
        id: videoId,
        part: "snippet",
        maxResults: 1,
      },
    });
    // console.log(JSON.stringify(response.data, null, 2));
    return {
      channelId: response.data.items[0].snippet.channelId,
      channelTitle: response.data.items[0].snippet.channelTitle,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getVideoIdList = async function (channelId) {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: KEY,
        channelId: channelId,
        part: "id",
        order: "date",
        type: "video",
        maxResults: MAX_SEARCH,
      },
    });

    // console.log(JSON.stringify(response.data, null, 2));
    return response.data.items.map((item) => item.id.videoId);
  } catch (error) {
    console.log(error);
  }
};

export const getVideoInfoList = async function (videoIdList) {
  try {
    const commaVideoIdList = videoIdList.join(",");
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: KEY,
        id: commaVideoIdList,
        part: "snippet,statistics",
        maxResults: MAX_SEARCH,
      },
    });

    // console.log(JSON.stringify(response.data, null, 2));

    const videoInfoList = response.data.items.map((item) => {
      const videoInfo = {
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        dislikeCount: item.statistics.dislikeCount,
        commentCount: item.statistics.commentCount,
        videId: item.id,
        title: item.snippet.title,
        publishedAt: item.snippet.publishedAt,
      };
      return videoInfo;
    });
    return videoInfoList;
  } catch (error) {
    console.log(error);
  }
};
