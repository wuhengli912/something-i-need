<template>
  <el-card>
    <p>管理员信息</p>
    <el-divider></el-divider>
    <p>
      管理员ID:<span>{{ accountInfo.id }}</span>
    </p>
    <el-divider></el-divider>
    <p>
      账号:<span>{{ accountInfo.account }}</span>
    </p>
    <el-divider></el-divider>
    <p>
      用户组:<span>{{ accountInfo.userGroup }}</span>
    </p>
    <el-divider></el-divider>
    <p>
      创建时间:<span>{{ accountInfo.ctime }}</span>
    </p>
    <el-divider></el-divider>
    <p style="display: flex; align-items: center">
      管理员头像<span>
        <el-upload
          :on-success="sendheadimg"
          :show-file-list="false"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :data="{ id: userid }"
        >
          <img width="150px" :src="accountInfo.imgUrl" alt="" />
        </el-upload>
      </span>
    </p>
  </el-card>
</template>

<script>
import { api_accountInfo } from "@/apis/users.js";
import { getYYYYMMDD } from "@/utils/utils.js";
let id = JSON.parse(localStorage.getItem("userData")).id;

export default {
  data() {
    return {
      accountInfo: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      api_accountInfo({ id }).then((res) => {
        res.data.accountInfo.ctime = getYYYYMMDD(
          res.data.accountInfo.ctime,
          "/"
        );
        this.accountInfo = res.data.accountInfo;
      });
    },
    sendheadimg(res) {
      this.accountInfo.imgUrl =
        "http://127.0.0.1:5000/upload/imgs/acc_img/" + res.imgUrl;
      this.$bus.emit("sendheadimg", this.accountInfo.imgUrl);
    },
  },
  computed: {
    userid() {
      return JSON.parse(localStorage.getItem("userData")).id;
    },
  },
};
</script>

<style lang="less" scoped>
span {
  margin-left: 10px;
}
</style>