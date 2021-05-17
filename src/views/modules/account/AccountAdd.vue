<template>
  <el-card>
    <div>添加账号</div>
    <el-divider></el-divider>
    <el-form class="form">
      <el-form-item class="ipt" label="账号">
        <el-input type="text" v-model="acc"></el-input>
      </el-form-item>

      <el-form-item class="ipt" label="密码">
        <el-input type="password" v-model="pwd"></el-input>
      </el-form-item>

      <el-form-item class="ipt" label="用户组">
        <el-select v-model="select" placeholder="请选择用户组">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" @click="accountAdd">添加</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { api_accountAdd } from "@/apis/users.js";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      select: "普通管理员",
      options: [
        { value: "普通管理员", label: "普通管理员" },
        { value: "超级管理员", label: "超级管理员" },
      ],
    };
  },
  methods: {
    accountAdd() {
      api_accountAdd({
        account: this.acc,
        password: this.pwd,
        userGroup: this.select,
      }).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            message: "添加账号成功",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  width: 500px;
  padding-left: 60px;
}
.ipt {
  display: flex;
}
.ipt/deep/ input {
  width: 200px;
}
.ipt/deep/ label {
  width: 56px;
}
.submit {
  padding-left: 56px;
}
</style>