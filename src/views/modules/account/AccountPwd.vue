<template>
  <el-card>
    <div>修改密码</div>
    <el-divider></el-divider>
    <el-form
      class="form"
      label-position="right"
      label-width="100px"
      :model="formLabelAlign"
      :rules="rules"
    >
      <el-form-item label="原密码" prop="oldpwd">
        <el-input
          @blur="checkoldpwd"
          v-model="formLabelAlign.oldpwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input v-model="formLabelAlign.newpwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checknewpwd">
        <el-input
          v-model="formLabelAlign.checknewpwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editPwd">确认</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { api_accountCheckOldPwd, api_accountEditPwd } from "@/apis/users.js";
let id = JSON.parse(localStorage.getItem("userData")).id;

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("值不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        console.log(this.$refs);
        /* if (this.formLabelAlign.newpwd !== "") {
          this.$refs.formLabelAlign.validateField("newpwd");
        } */
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formLabelAlign.newpwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formLabelAlign: {
        oldpwd: "",
        newpwd: "",
        checknewpwd: "",
      },
      rules: {
        newpwd: [{ validator: validatePass, trigger: "blur" }],
        checknewpwd: [{ validator: validatePass2, trigger: "blur" }],
        oldpwd: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    //验证旧密码
    checkoldpwd() {
      if (!this.formLabelAlign.oldpwd) return;
      api_accountCheckOldPwd({
        oldPwd: this.formLabelAlign.oldpwd,
        id: id,
      }).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            message: "旧密码验证正确",
            type: "success",
          });
        } else {
          this.$message.error("旧密码不正确");
        }
      });
    },
    //修改密码
    editPwd() {
      api_accountEditPwd({ newPwd: this.formLabelAlign.newpwd, id }).then(
        (res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          } else {
            this.$message.error(res.data.msg);
          }
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  width: 400px;
}
</style>