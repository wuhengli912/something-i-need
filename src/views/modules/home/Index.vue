<template>
  <div class="index-container">
    <div class="title-list">
      <el-card style="width: 24%" v-for="item in titlelist" :key="item.name">
        <div class="card">
          <i
            :class="item.icon"
            :style="{ color: item.color, fontSize: '50px' }"
          ></i>
          <div>
            <p style="color: #ccc">{{ item.name }}</p>
            <p class="mt8" style="font-weight: 600">{{ item.num }}</p>
          </div>
        </div>
      </el-card>
    </div>
    <div>
      <el-card>
        <header class="fw600">数据统计</header>
        <div id="charts" style="width: 100%; height: 400px"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { api_indexEcharts } from "@/apis/echarts.js";
import echarts from "echarts";
export default {
  data() {
    return {
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      titlelist: [
        {
          icon: "el-icon-document",
          name: "总订单",
          num: "102400",
          color: "#5cb6e5",
          matchname: "totalOrder",
        },
        {
          icon: "el-icon-coin",
          name: "总销售额",
          num: "102400",
          color: "#d63082",
          matchname: "totalAmount",
        },
        {
          icon: "el-icon-s-order",
          name: "今日订单",
          num: "102400",
          color: "#1296db",
          matchname: "todayOrder",
        },
        {
          icon: "el-icon-money",
          name: "今日销售额",
          num: "102400",
          color: "#1afa29",
          matchname: "totayAmount",
        },
      ],
      renderData: {},
    };
  },
  mounted() {
    let mycharts = echarts.init(document.getElementById("charts"));
    api_indexEcharts().then((res) => {
      this.renderData = JSON.parse(JSON.stringify(res.data));
      for (let item of this.titlelist) {
        for (const key in this.renderData) {
          if (item.matchname == key) {
            item.num = this.renderData[key];
          }
        }
      }
      mycharts.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["每日订单", "每日金额"],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.renderData.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "每日订单",
            type: "line",
            stack: "订单",
            data: this.renderData.orderData,
          },
          {
            name: "每日金额",
            type: "line",
            stack: "金额",
            data: this.renderData.amountData,
          },
        ],
      });
    });
  },
};
</script>

<style lang="less" scoped>
.index-container {
  display: flex;
  flex-direction: column;
  .title-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }
}
.card {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
</style>