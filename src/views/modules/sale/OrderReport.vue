<template>
  <div>
    <div class="dpflex aicenter mb20">
      <span class="demonstration mr16">时间范围</span>
      <el-date-picker
        v-model="searchdate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="mr16"
        value-format="yyyy-MM-dd"
        style="width: 400px"
      >
      </el-date-picker>
      <el-button type="primary" @click="clickSearch"> 查询</el-button>
    </div>
    <el-card>
      订单统计
      <div id="charts" style="width: 100%; height: 500px"></div>
    </el-card>
  </div>
</template>

<script>
import { api_orderEcharts } from "@/apis/echarts.js";
import echarts from "echarts";
import { getfulltime } from "@/utils/utils.js";
export default {
  data() {
    return {
      searchdate: "",
      renderdata: [],
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["订单量"],
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "订单量",
            type: "bar",
            data: [],
          },
        ],
      },
    };
  },
  // orderAmount: 19.88
  // orderTime: "2020-06-04T09:30:09.000Z"
  methods: {
    //点击搜索
    clickSearch() {
      let myecharts = echarts.init(document.getElementById("charts"));
      console.log(this.searchdate);
      api_orderEcharts({ date: JSON.stringify(this.searchdate) }).then(
        (res) => {
          console.log(res);
          this.renderdata = JSON.parse(JSON.stringify(res.data.data));
          let xdata, ydata;
          xdata = this.renderdata.map((item) => getfulltime(item.orderTime));
          ydata = this.renderdata.map((item) => item.orderAmount);
          this.option.xAxis[0].data = xdata;
          this.option.series[0].data = ydata;
          myecharts.setOption(this.option);
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
</style>