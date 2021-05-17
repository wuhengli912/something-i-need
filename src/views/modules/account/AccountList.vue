<template>
  <el-card>
    <div>账号列表</div>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" prop="select">
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">
          <span v-if="!scope.row.show">{{ scope.row.account }}</span>
          <el-input size="small" v-else v-model="scope.row.account"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="用户组">
        <template slot-scope="scope">
          <span v-if="!scope.row.show">{{ scope.row.userGroup }}</span>
          <el-input
            size="small"
            v-else
            v-model="scope.row.userGroup"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span v-if="!scope.row.show">{{ scope.row.ctime }}</span>
          <el-input v-else size="small" v-model="scope.row.ctime"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.show"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            v-else
            size="mini"
            @click="saveEdit(scope.$index, scope.row)"
            type="success"
            >完成</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

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
    <div class="mt20">
      <el-button
        type="danger"
        size="small"
        @click="batchDel(JSON.stringify(getIds))"
        >批量删除</el-button
      >
      <el-button type="primary" size="small">取消选择</el-button>
    </div>
  </el-card>
</template>

<script>
import {
  api_accountlist,
  api_accountRemove,
  api_accountBatchDel,
  api_accountEdit,
} from "@/apis/users.js";
import { getYYYYMMDD } from "@/utils/utils.js";
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 4,
      tableData: [],
      multipleSelection: [],
      flag: false,
    };
  },
  methods: {
    //得到数据
    getData() {
      api_accountlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }).then((res) => {
        for (let obj of res.data.data) {
          obj.ctime = getYYYYMMDD(obj.ctime, "/");
          obj.show = false;
        }
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    //手动修改
    handleEdit(index, row) {
      row.show = true;
    },
    //保存编辑
    saveEdit(index, row) {
      row.show = false;
      api_accountEdit({
        id: row.id,
        account: row.account,
        userGroup: row.userGroup,
      }).then(() => {});
    },
    //批量删除
    batchDel(ids) {
      this.$confirm("此操作将永久删除这些账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api_accountBatchDel({ ids }).then(() => {
            this.getData();
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
    //手动删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除此账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api_accountRemove({ id }).then(() => {
            this.getData();
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  computed: {
    getIds() {
      return this.multipleSelection.map((item) => item.id);
    },
  },
};
</script>

<style lang="less" scoped>
.table {
  height: 400px;
}
</style>