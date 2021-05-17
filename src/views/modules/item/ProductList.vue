<template>
  <el-card>
    <div>商品列表</div>
    <el-divider></el-divider>
    <div class="table mt40 flex1">
      <el-table :data="tableData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <img width="50px" :src="url + props.row.imgUrl" alt="" />
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称"> </el-table-column>

        <el-table-column prop="category" label="所属分享"> </el-table-column>

        <el-table-column prop="price" width="100px" label="商品价格">
        </el-table-column>

        <el-table-column label="商品图片">
          <template slot-scope="data">
            <img
              v-if="!data.row.show"
              width="50px"
              :src="url + data.row.imgUrl"
              alt=""
            />
          </template>
        </el-table-column>

        <el-table-column prop="goodsDesc" label="商品描述"> </el-table-column>

        <el-table-column width="150px" label="操作">
          <template slot-scope="data">
            <el-button size="mini" type="primary" @click="clickEdit(data.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="delItem(data.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="mt20"
    >
    </el-pagination>
    <el-dialog title="编辑商品信息" :visible.sync="editShopInfo">
      <el-form :model="form" label-width="120px">
        <el-form-item label="商品名称">
          <el-input style="width: 300px" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属分享">
          <el-input style="width: 300px" v-model="form.category"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number
            :min="0"
            style="width: 150px"
            v-model="form.price"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <template>
            <el-upload
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="form.imgUrl"
                :src="url + form.imgUrl"
                width="100%"
                height="100%"
              />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </template>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input style="width: 300px" v-model="form.goodsDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editShopInfo = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
// category: "炒饭系列"
// ctime: "2021/03/03"
// goodsDesc: "123123123"
// id: 123
// imgUrl: "1614757255176.jpg"
// name: "5555"
// price: 6
// rating: 100
// ratings: "[{"username":"3******c","rateTime":1469281964000,"rateType":0,"text":"很喜欢的粥","avatar":"http://static.galileo.xiaojukeji.com/static/tms/default_header.png"},{"username":"2******3","rateTime":1469271264000,"rateType":0,"text":"","avatar":"http://static.galileo.xiaojukeji.com/static/tms/default_header.png"},{"username":"3******b","rateTime":1469261964000,"rateType":1,"text":"","avatar":"http://static.galileo.xiaojukeji.com/static/tms/default_header.png"}]"
// sellCount: 113
// show: false
import {
  api_goodsList,
  api_goodsDel,
  api_goodsEdit,
  api_goodsCategories,
} from "@/apis/goods";
import { getYYYYMMDD } from "@/utils/utils";

export default {
  created() {
    this.getData();
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 4,
      value: "",
      tableData: [],
      categories: [],
      imageUrl: "",
      url: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      editShopInfo: false,
      form: {},
      flag: false,
    };
  },
  methods: {
    //渲染数据
    getData() {
      api_goodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }).then((res) => {
        for (const obj of res.data.data) {
          obj.ctime = getYYYYMMDD(obj.ctime, "/");
          obj.show = false;
        }
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
      api_goodsCategories().then((res) => {
        this.categories = res.data.categories;
      });
    },
    //删除商品
    delItem(id) {
      this.$confirm("确认删除此商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api_goodsDel({ id }).then((res) => {
            if (res.data.code === 0) {
              this.getData();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getData();
    },
    handleCurrentChange(val) {
      if (this.flag) {
        this.$message("您操作的频率过快,请稍后再试");
        return;
      }
      setTimeout(() => {
        this.flag = false;
      }, 1000);
      this.flag = true;
      this.currentPage = val;
      this.getData();
    },
    clickEdit(row) {
      this.editShopInfo = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    //保存编辑
    saveEdit() {
      this.editShopInfo = false;

      api_goodsEdit({
        name: this.form.name,
        category: this.form.category,
        price: this.form.price,
        imgUrl: this.form.imgUrl,
        goodsDesc: this.form.goodsDesc,
        id: this.form.id,
      }).then(() => {
        this.getData();
      });
    },
    //添加图片
    handleAvatarSuccess(res) {
      this.form.imgUrl = res.imgUrl;
    },
  },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>