<template>
  <div class="about">
    <div
      ref="chart2"
      id="chart2"
      style="width:70%; height:300px; margin: 0 auto;"
    ></div>
  </div>
</template>

<script>
import echarts from "echarts";
import jsonp from "jsonp";
// import { log } from 'fullcalendar';
var option = {
  title: {
    text: "全国 新增确诊/疑似 趋势"
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data: ["新增确诊", "新增疑似"]
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: "category",
    data: []
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "新增确诊",
      type: "line",
      smooth: true,
      data: []
    },
    {
      name: "新增疑似",
      type: "line",
      smooth: true,
      data: []
    }
  ]
};

export default {
  data() {
    return {
      mycharts: "",
      mycharts1: "",
      dataArr: [],
      series1Arr: [],
      series2Arr: []
    };
  },
  methods: {
    geiData() {
      jsonp(
        "http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427",
        {},
        (error, data) => {
          console.log(data.data.historylist);
          data.data.historylist.map((val, index) => {
            this.series1Arr.unshift(val.cn_conNum);
            this.series2Arr.unshift(val.cn_susNum);
            this.dataArr.unshift(val.date);
          });
          let series1Arrar = [];
          let length1 = this.series1Arr.length;
          for (let i = 0; i < length1; i++) {
            var str = this.series1Arr[i] - this.series1Arr[i - 1];
            series1Arrar.push(str);
          }

          option.xAxis.data = this.dataArr;
          option.series[0].data = series1Arrar;
          option.series[1].data = series2Arrar;
          this.mycharts.setOption(option);
        }
      );
    }
  },
  // option.xAxis.data option.series[0].data option.series[1].data
  mounted() {
    this.geiData();
    this.mycharts1.setOption(option2);
    this.mycharts = echarts.init(this.$refs.chart2);
    this.mycharts.setOption(option);
  }
};
</script>