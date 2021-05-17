<template>
  <el-container class="warpper">
    <el-aside width="200px" class="aside">
      <h4 class="dpflex aicenter">外卖商家中心</h4>
      <el-menu
        :default-active="selected"
        background-color="#304156"
        text-color="#fff"
        active-text-color=""
        router
      >
        <div v-for="item in rolearr" :key="item.index">
          <el-menu-item v-if="!item.children" :index="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.index" :key="item.index">
            <template slot="title">
              <div>
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </div>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.index"
              :index="child.index"
            >
              <i :class="child.icon"></i>
              <span slot="title">{{ child.name }}</span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <!-- header和main -->
    <el-container class="flex1 right-content">
      <el-header class="bgcfff">
        <div class="dpflex jcbetween aicenter header-box">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in breadlist" :key="item">{{
              item
            }}</el-breadcrumb-item>
          </el-breadcrumb>

          <div class="dpflex aicenter">
            <p>欢迎你,{{ info.account }}</p>
            <img
              @click="click_to_personcenter"
              :src="info.imgUrl"
              height="55px"
            />
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { api_accountInfo } from "@/apis/users.js";
let id = JSON.parse(localStorage.getItem("userData")).id;
export default {
  data() {
    return {
      selected: "/main/index",
      treelist: [
        {
          index: "/main/index",
          icon: "el-icon-s-home",
          name: "后台首页",
          role: ["super", "normal"],
        },
        {
          index: "/main/ordermanage",
          icon: "el-icon-document",
          name: "订单管理",
          role: ["super", "normal"],
        },
        {
          index: "item",
          icon: "el-icon-s-management",
          name: "商品管理",
          role: ["super", "normal"],
          children: [
            {
              index: "/main/productlist",
              icon: "el-icon-s-management",
              name: "商品列表",
            },
            {
              index: "/main/productadd",
              icon: "el-icon-s-management",
              name: "商品添加",
            },
            {
              index: "/main/productsort",
              icon: "el-icon-s-management",
              name: "商品分类",
            },
          ],
        },
        {
          index: "/main/shopmanage",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          role: ["super"],
        },
        {
          index: "account",
          icon: "el-icon-user",
          name: "账号管理",
          role: ["super"],
          children: [
            {
              index: "/main/accountlist",
              icon: "el-icon-user",
              name: "账号列表",
            },
            {
              index: "/main/accountadd",
              icon: "el-icon-user",
              name: "添加账号",
            },
            {
              index: "/main/accountpwd",
              icon: "el-icon-user",
              name: "修改密码",
            },
          ],
        },
        {
          index: "sale",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          role: ["super"],
          children: [
            {
              index: "/main/itemreport",
              icon: "el-icon-pie-chart",
              name: "商品统计",
            },
            {
              index: "/main/orderreport",
              icon: "el-icon-pie-chart",
              name: "订单统计",
            },
          ],
        },
      ],
      info: "",
      breadlist: [],
    };
  },
  created() {
    this.selected = location.hash.replace("#", "");
    this.getData();
  },
  mounted() {
    this.$bus.on("sendheadimg", (res) => {
      this.info.imgUrl = res;
    });
  },
  methods: {
    getData() {
      api_accountInfo({ id }).then((res) => {
        this.info = res.data.accountInfo;
      });
      this.secbreadname = sessionStorage.secbreadname;
      this.thirdbreadname = sessionStorage.thirdbreadname;
      this.breadlist = this.$route.meta.breadlist;
    },
    click_to_personcenter() {
      if (this.$route.path == "/main/mycenter") return;
      this.$router.push("/main/mycenter");
    },
  },
  //监听面包屑变化
  watch: {
    $route(val) {
      this.breadlist = val.meta.breadlist;
    },
    a: {
      deep: true,
      handler() {},
    },
  },
  computed: {
    rolearr() {
      return this.treelist.filter((item) =>
        item.role.includes(localStorage.role)
      );
    },
  },
};
</script>

<style lang="less" scoped>
.warpper {
  width: 100%;
  height: 100%;
  h4 {
    height: 80px;
    padding: 10px;
  }
}

.el-menu {
  border: 0;
}
.aside {
  color: #fff;
  height: 100%;
  background-color: #304156;
}

.right-content {
  background-color: #f0f2f5;
  .header-box {
    height: 100%;
    img {
      margin-left: 8px;
      border-radius: 50%;
    }
  }
}
</style>