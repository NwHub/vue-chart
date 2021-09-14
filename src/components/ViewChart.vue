<template>
  <div>
    <h4 class="subheading">動画毎の視聴回数</h4>
    <GChart type="LineChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  name: "ViewChart",
  components: {
    GChart,
  },
  props: ["youtubeData"],
  data: () => ({
    chartData: [],
    chartOptions: {
      // logScale: false,
      curveType: "function",
      // width: 1200,
      // height: 700,
      tooltip: { isHtml: true },
      legend: { position: "bottom" },
    },
  }),
  created() {
    const viewCountList = this.youtubeData.videoInfoList.map((videoData) => {
      return [
        new Date(videoData.publishedAt),
        Number(videoData.viewCount),
        `<p style="text-align: left">投稿日：<b>${videoData.publishedAt}</b><br />タイトル：<b>${videoData.title}</b><br />視聴回数：<b>${videoData.viewCount}回</b></p>`,
      ];
    });

    this.chartData = [
      [
        "日時",
        "視聴回数",
        { type: "string", role: "tooltip", p: { html: true } },
      ],
      ...viewCountList,
    ];
  },
};
</script>
