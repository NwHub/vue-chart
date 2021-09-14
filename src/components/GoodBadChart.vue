<template>
  <div>
    <h4 class="subheading">高評価・低評価・コメント件数</h4>
    <GChart type="LineChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  name: "GoodBadChart",
  components: {
    GChart,
  },
  props: ["youtubeData"],
  data: () => ({
    chartData: [],
    chartOptions: {
      // curveType: "function",
      // height: 350,
      tooltip: { isHtml: true },
      legend: { position: "bottom" },
    },
  }),
  created() {
    const viewCountList = this.youtubeData.videoInfoList.map((videoData) => {
      return [
        new Date(videoData.publishedAt),
        Number(videoData.likeCount),
        `<p style="text-align: left">投稿日：<b>${videoData.publishedAt}</b><br />タイトル：<b>${videoData.title}</b><br />高評価：<b>${videoData.likeCount}件</b></p>`,
        Number(videoData.dislikeCount),
        `<p style="text-align: left">投稿日：<b>${videoData.publishedAt}</b><br />タイトル：<b>${videoData.title}</b><br />低評価：<b>${videoData.dislikeCount}件</b></p>`,
        Number(videoData.commentCount),
        `<p style="text-align: left">投稿日：<b>${videoData.publishedAt}</b><br />タイトル：<b>${videoData.title}</b><br />コメント数：<b>${videoData.commentCount}件</b></p>`,
      ];
    });

    this.chartData = [
      [
        "日付",
        "高評価",
        { type: "string", role: "tooltip", p: { html: true } },
        "低評価",
        { type: "string", role: "tooltip", p: { html: true } },
        "コメント数",
        { type: "string", role: "tooltip", p: { html: true } },
      ],
      ...viewCountList,
    ];
  },
};
</script>
