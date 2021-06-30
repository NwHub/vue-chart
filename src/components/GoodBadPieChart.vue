<template>
  <div>
    <h4 class="subheading">高評価 vs 低評価</h4>
    <GChart type="PieChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  name: "GoodBadPieChart",
  components: {
    GChart,
  },
  props: ["youtubeData"],
  data: () => ({
    chartData: [],
    chartOptions: {
      height: 400,
      width: 400,
      legend: { position: "bottom" },
    },
  }),
  created() {
    let sumGood = 0;
    let sumBad = 0;
    this.youtubeData.videoDataList.forEach((videoData) => {
      sumGood += Number(videoData.likeCount);
      sumBad += Number(videoData.dislikeCount);
    });
    this.chartData = [
      ["評価", "件数"],
      ["高評価", sumGood],
      ["低評価", sumBad],
    ];
  },
};
</script>
