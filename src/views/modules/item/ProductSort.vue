<template>
  <el-card>
    <div class="dpflex jcbetween">
      <span>商品分类</span>
      <el-button type="primary" size="small" @click="dialogFormVisible = true"
        >添加分类</el-button
      >
    </div>

    <el-divider></el-divider>
    <el-table :data="renderInfo" style="width: 100%">
      <el-table-column type="index" width="100px" label="序号">
      </el-table-column>
      <el-table-column prop="cateName" label="分类名称">
        <template slot-scope="scope">
          <span v-if="!scope.row.show">{{ scope.row.cateName }}</span>
          <el-input v-else v-model="scope.row.cateName"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch
            :disabled="!scope.row.show"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.show"
            size="small"
            @click="scope.row.show = true"
            >编辑</el-button
          >
          <el-button
            v-else
            size="small"
            @click="editCate(scope.row)"
            type="success"
            >完成</el-button
          >
          <el-button type="danger" size="small" @click="delSort(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      class="mt20"
      layout="total, prev, pager, next, jumper"
    >
    </el-pagination>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px" label-position="right">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="form.flag"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  api_goodsCateList,
  api_goodsDelCate,
  api_goodsAddCate,
  api_goodsEditCate,
} from "@/apis/goods.js";
export default {
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 8,
      flag: true,
      maskIsShow: true,
      dialogFormVisible: false,
      renderInfo: [],
      form: {
        name: "",
        flag: true,
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getSortData();
  },
  methods: {
    getSortData() {
      api_goodsCateList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }).then((res) => {
        console.log(res);
        for (const obj of res.data.data) {
          obj.state = obj.state === 1;
          obj.show = false;
        }
        this.renderInfo = res.data.data;
        this.total = res.data.total;
      });
    },
    //删除分类
    delSort(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api_goodsDelCate({ id }).then((res) => {
            if (res.data.code === 0) {
              this.getSortData();
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
    //添加分类
    addCate() {
      api_goodsAddCate({
        cateName: this.form.name,
        state: this.form.flag,
      }).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.dialogFormVisible = false;
          this.getSortData();
        }
      });
    },
    //编辑
    editCate(params) {
      params.show = false;
      let { id, cateName, state } = params;
      api_goodsEditCate({ id, cateName, state }).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        }
      });
    },
    //跳转页面
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getSortData();
    },
  },
};
</script>

<style lang="less" scoped>
</style>