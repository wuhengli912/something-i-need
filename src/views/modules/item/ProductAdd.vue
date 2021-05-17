<template>
  <el-card>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">商品名称</span>
      <el-input style="width: 300px" v-model="name"></el-input>
    </div>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">商品分类</span>
      <el-select v-model="value" placeholder="请选择商品分类">
        <el-option
          v-for="item in categories"
          :key="item.cateName"
          :label="item.cateName"
          :value="item.cateName"
        >
        </el-option>
      </el-select>
    </div>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">商品价格</span>
      <el-input-number v-model="itemprice" :min="1"></el-input-number>
    </div>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">商品图片</span>
      <el-upload
        action="http://127.0.0.1:5000/goods/goods_img_upload"
        :show-file-list="false"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" />
        <i v-else class="el-icon-plus"></i>
      </el-upload>
    </div>
    <div class="dpflex aicenter mb20">
      <span style="margin-right: 10px">商品描述</span>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入内容"
        v-model="textarea1"
        style="width: 400px"
        :show-word-limit="true"
      >
      </el-input>
    </div>
    <el-button
      type="primary"
      size="medium"
      style="margin-left: 75px"
      @click="addItem"
      >添加商品</el-button
    >
  </el-card>
</template>

<script>
import { api_goodsCategories, api_goodsAdd } from "@/apis/goods";
export default {
  data() {
    return {
      textarea1: "",
      itemprice: 0,
      categories: [],
      value: "",
      name: "",
      imageUrl: "",
      imgurlpath: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      api_goodsCategories().then((res) => {
        this.categories = res.data.categories;
      });
    },
    addItem() {
      api_goodsAdd({
        name: this.name,
        category: this.value,
        price: this.itemprice,
        imgUrl: this.imgurlpath,
        goodsDesc: this.textarea1,
      }).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imgurlpath = res.imgUrl;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
  },
};
</script>

<style lang="less" scoped>
</style>