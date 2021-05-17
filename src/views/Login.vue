<template>
  <div class="login-box dpflexcenter">
    <div class="cfff">
      <h4 class="tac mb20">系统登录</h4>
      <slide-verify
        v-show="showverify"
        :l="42"
        :r="10"
        :w="310"
        :h="155"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        slider-text="向右滑动进行验证"
      ></slide-verify>
      <div></div>
      <el-input
        v-model="acc"
        type="text"
        autocomplete="off"
        class="base-ipt"
        placeholder="请输入账号"
        clearable
      >
        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
      </el-input>
      <el-input
        type="password"
        v-model="pwd"
        autocomplete="off"
        placeholder="请输入密码"
        class="base-ipt"
        show-password
        clearable
      >
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
      </el-input>

      <el-button class="btn" type="primary" @click="login">提交</el-button>
    </div>
  </div>
</template>

<script>
import { api_login } from "@/apis/users.js";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      oldacc: "",
      oldpwd: "",
      showverify: false,
    };
  },
  methods: {
    login() {
      // this.showverify = true;
      if (this.pwd == this.oldpwd && this.acc == this.oldacc) return;

      api_login({ account: this.acc, password: this.pwd }).then((res) => {
        if (res.data.code === 0) {
          localStorage.setItem(
            "userData",
            JSON.stringify({ pwd: this.pwd, id: res.data.id })
          );
          this.$message({
            message: "恭喜你，登录成功",
            type: "success",
          });
          localStorage.role = res.data.role;
          localStorage.token = res.data.token;
          setTimeout(() => {
            this.$router.push("/main/index");
          }, 50);
        } else {
          this.$message.error("登录失败，用户名或密码错误");
          this.oldpwd = this.pwd;
          this.oldacc = this.acc;
        }
      });
    },
    onSuccess() {
      console.log("成功");
      /*   api_login({ account: this.acc, password: this.pwd }).then((res) => {
        if (res.data.code === 0) {
          localStorage.setItem(
            "userData",
            JSON.stringify({ pwd: this.pwd, id: res.data.id })
          );
          this.$message({
            message: "恭喜你，登录成功",
            type: "success",
          });
          localStorage.role = res.data.role;
          localStorage.token = res.data.token;
          setTimeout(() => {
            this.$router.push("/main/index");
          }, 50);
        } else {
          this.$message.error("登录失败，用户名或密码错误");
          this.oldpwd = this.pwd;
          this.oldacc = this.acc;
        }
      }); */
    },
    onFail() {
      console.log("失败");
    },
    onRefresh() {
      console.log("刷新");
    },
  },
};
</script>

<style lang="less" scoped>
.login-box {
  height: 100%;
  background-color: #2d3a4b;
  .base-ipt {
    height: 30px;
    margin: 15px 0;
  }
  .base-ipt/deep/ input {
    background-color: #283443;
    outline: none;
  }
  .base-ipt/deep/ input:focus {
    border-color: skyblue;
  }
  .btn {
    width: 100%;
    margin-top: 15px;
  }
}
</style>