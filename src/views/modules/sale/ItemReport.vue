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
        style="width: 400px"
      >
      </el-date-picker>
      <el-button type="primary"> 查询</el-button>
    </div>
    <el-card>
      堆叠区域图
      <div id="charts" style="width: 100%; height: 600px"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      searchdate: "",
    };
  },
  mounted() {
    let mycharts = echarts.init(document.getElementById("charts"));
    mycharts.setOption({
      legend: {
        top: "bottom",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "面积模式",
          type: "pie",
          radius: [50, 250],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 40, name: "rose 1" },
            { value: 38, name: "rose 2" },
            { value: 32, name: "rose 3" },
            { value: 30, name: "rose 4" },
            { value: 28, name: "rose 5" },
            { value: 26, name: "rose 6" },
            { value: 22, name: "rose 7" },
            { value: 18, name: "rose 8" },
          ],
        },
      ],
    });
  },
};
</script>

<style lang="less" scoped>
</style>