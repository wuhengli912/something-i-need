<template>
  <el-card>
    <div class="dpflex jcbetween">
      <span>店铺管理</span>
      <el-button type="primary" size="small" @click="saveEdit">保存</el-button>
    </div>
    <el-divider></el-divider>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">店铺名称</span>
      <el-input v-model="renderData.name" style="width: 400px"></el-input>
    </div>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">店铺公告</span>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6 }"
        placeholder="请输入内容"
        v-model="renderData.bulletin"
        style="width: 400px"
      >
      </el-input>
    </div>

    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">店铺头像</span>
      <el-upload
        action="http://127.0.0.1:5000/shop/upload"
        :show-file-list="false"
        :on-success="sendHeadImg"
      >
        <img :src="url + renderData.avatar" v-if="renderData.avatar" alt="" />

        <i v-else class="el-icon-plus"></i>
      </el-upload>
    </div>

    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px; width: 100px">店铺图片</span>
      <el-upload
        action="http://127.0.0.1:5000/shop/upload"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-success="searchShopImg"
        list-type="picture-card"
      >
        <i slot="default" class="el-icon-plus"></i>
      </el-upload>
    </div>

    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">配送费</span>
      <el-input
        style="width: 400px"
        v-model="renderData.deliveryPrice"
      ></el-input>
    </div>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">配送时间</span>
      <el-input
        style="width: 400px"
        v-model="renderData.deliveryTime"
      ></el-input>
    </div>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">配送描述</span>
      <el-input
        style="width: 400px"
        v-model="renderData.description"
      ></el-input>
    </div>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">店铺评分</span>
      <el-input style="width: 400px" v-model="renderData.score"></el-input>
    </div>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">销量</span>
      <el-input style="width: 400px" v-model="renderData.sellCount"></el-input>
    </div>
    <div class="dpflex mb20">
      <span style="margin-right: 10px">活动</span>
      <el-checkbox-group v-model="checked">
        <div class="dpflex flexwarp" style="width: 400px">
          <el-checkbox
            class="mb20"
            v-for="item in activityArr"
            :key="item"
            :label="item"
            >{{ item }}</el-checkbox
          >
        </div>
      </el-checkbox-group>
    </div>
    <div class="dpflex mb20 aicenter">
      <span style="margin-right: 10px">添加活动</span>
      <el-input v-model="addactivity" style="width: 300px; margin-right: 20px">
      </el-input>
      <el-button type="primary" @click="addact">添加</el-button>
    </div>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">营业时间</span>
      <el-time-picker
        is-range
        v-model="renderData.date"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
      >
      </el-time-picker>
    </div>
  </el-card>
</template>

<script>
import { api_shopInfo, api_shopEdit } from "@/apis/shop";

const activityoptions = [
  "在线支付满28-5",
  "VC无限橙果汁全场8折",
  "单人精彩套餐",
  "特价饮品8折抢购",
  "单人特色套餐",
];
export default {
  data() {
    return {
      openhours: [new Date(2016, 9, 10, 9, 30), new Date(2016, 9, 10, 18, 30)],
      textarea1: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      renderData: {},
      activity: activityoptions,
      activityArr: [],
      url: "http://127.0.0.1:5000/upload/shop/",
      fileList: [],
      pics: [],
      addactivity: "",
      checked: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      api_shopInfo().then((res) => {
        console.log(res);
        this.renderData = res.data.data;
        this.pics = JSON.parse(JSON.stringify(res.data.data.pics));
        this.activityArr = this.renderData.supports;
        let temparr = [];
        for (let index in this.renderData.pics) {
          temparr.push({
            name: this.renderData.pics[index],
            url: this.url + this.renderData.pics[index],
          });
        }
        this.fileList = temparr;
      });
    },

    //修改店铺头像
    sendHeadImg(res) {
      console.log(res);
      this.renderData.avatar = res.imgUrl;
    },
    //添加店铺图片
    searchShopImg(res) {
      this.renderData.pics.push(res.imgUrl);
      this.pics.push(res.imgUrl);
      console.log(this.pics);
    },
    handleRemove(file) {
      let imgpath = file.response ? file.response.imgUrl : file.name;
      this.pics.splice(
        this.pics.findIndex((val) => val == imgpath),
        1
      );
      console.log(this.pics);
    },
    handlePreview(file) {
      console.log(file);
    },
    //保存编辑
    saveEdit() {
      let tempParams = JSON.parse(JSON.stringify(this.renderData));
      tempParams.date = JSON.stringify(tempParams.date);
      tempParams.pics = JSON.stringify(this.pics);
      tempParams.supports = this.activityArr;
      tempParams.supports = JSON.stringify(tempParams.supports);
      console.log(tempParams);
      api_shopEdit(tempParams).then((res) => {
        console.log(res);
      });
    },
    //添加活动
    addact() {
      this.activityArr.push(this.addactivity);
      this.addactivity = "";
    },
  },
};
</script>

<style lang="less" scoped>
</style>