<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col offset="2" cols="8">
        <v-text-field
          v-model="inputUrl"
          label="Please enter the url of the YouTube video!!!"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-parallax
          v-if="channelTitle"
          height="200"
          src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        >
          <v-row align="center" justify="center">
            <v-col class="text-center" cols="12">
              <h4 class="subheading">チャンネル名</h4>
              <h1 class="">{{ channelTitle }}</h1>
            </v-col>
          </v-row>
        </v-parallax>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <ViewChart v-if="youtubeData" :youtubeData="youtubeData" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7">
        <GoodBadChart v-if="youtubeData" :youtubeData="youtubeData" />
      </v-col>
      <v-col cols="3">
        <GoodBadPieChart v-if="youtubeData" :youtubeData="youtubeData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ViewChart from "@/components/ViewChart.vue";
import GoodBadChart from "@/components/GoodBadChart";
import GoodBadPieChart from "@/components/GoodBadPieChart";
import { getYouTube } from "@/repository/youtube.js";
export default {
  name: "Chart",
  components: {
    ViewChart,
    GoodBadChart,
    GoodBadPieChart,
  },
  data: () => ({
    inputUrl: "",
    channelTitle: "",
    youtubeData: "",
  }),
  watch: {
    inputUrl: function () {
      const youtubeBaseUrl = "https://www.youtube.com/watch?v=";
      const regex = /.+watch\?v=([\w-]{11})/;
      this.youtubeData = "";
      this.channelTitle = "";
      if (this.inputUrl.indexOf(youtubeBaseUrl) !== -1) {
        const videoId = this.inputUrl.match(regex)[1];
        this.convertChartData(videoId);
      }
      return;
    },
  },
  methods: {
    async convertChartData(videoId) {
      const youtubeData = await getYouTube(videoId);
      this.channelTitle = youtubeData.channelInfo.channelTitle;
      this.youtubeData = youtubeData;
    },
  },
};
</script>
