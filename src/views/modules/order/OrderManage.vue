<template>
  <el-card>
    <div class="dpflex fdcolumn">
      <div class="search-ipt">
        <div class="dpflex aicenter">
          <div class="dpflex aicenter pl8">
            <span style="width: 100px">订单号</span>
            <el-input
              v-model="searchData.orderNo"
              type="text"
              placeholder="订单号"
              clearable
            >
            </el-input>
          </div>
          <div class="dpflex aicenter pl8">
            <span style="width: 100px">收货人</span>
            <el-input
              v-model="searchData.consignee"
              type="text"
              placeholder="收货人"
              clearable
            >
            </el-input>
          </div>
          <div class="dpflex aicenter pl8">
            <span style="width: 100px">手机号</span>
            <el-input
              v-model="searchData.phone"
              type="text"
              placeholder="手机号"
              clearable
            >
            </el-input>
          </div>
          <div class="dpflex aicenter pl8">
            <span style="width: 100px">订单状态</span>
            <el-select v-model="searchData.orderState" placeholder="订单状态">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="dpflex aicenter mt20">
          <div class="dpflex aicenter pl8">
            <span style="width: 100px">选择时间</span>
            <el-date-picker
              v-model="searchData.orderTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            <el-button
              type="primary"
              size="medium "
              class="ml12"
              @click="searchOrder"
              >查询</el-button
            >
            <el-button size="medium " class="ml12" @click="reset"
              >重置</el-button
            >
          </div>
        </div>
      </div>
      <!-- table -->
      <div class="table mt40 flex1">
        <el-table :data="tableData">
          <el-table-column prop="orderNo" width="80px" label="订单号">
          </el-table-column>
          <el-table-column prop="orderTime" width="160px" label="下单时间">
          </el-table-column>
          <el-table-column prop="phone" label="手机号"> </el-table-column>
          <el-table-column prop="consignee" label="收货人"> </el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址">
          </el-table-column>
          <el-table-column prop="deliveryTime" width="160px" label="送达时间">
          </el-table-column>
          <el-table-column prop="remarks" label="用户备注"> </el-table-column>
          <el-table-column prop="orderAmount" label="订单金额">
          </el-table-column>
          <el-table-column prop="orderState" label="订单状态">
          </el-table-column>
          <el-table-column width="150px" label="操作" fixed="right">
            <template slot-scope="data">
              <el-button size="medium" type="text" @click="check(data.row)"
                >查看</el-button
              >
              <el-button size="medium" type="text" @click="clickEdit(data.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 20px"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="订单信息"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      class="pd16"
    >
      <template style="padding-left: 100px">
        <p class="dpflex" style="padding-left: 100px">
          <span style="width: 60px; text-align: left">订单号</span
          ><span style="margin-left: 20px">{{ maskdata.orderNo }}</span>
        </p>
        <p class="mt20 dpflex" style="padding-left: 100px">
          <span style="width: 60px; text-align: left">手机号</span
          ><span style="margin-left: 20px">{{ maskdata.phone }}</span>
        </p>
        <p class="mt20 dpflex" style="padding-left: 100px">
          <span style="width: 60px; text-align: left">收货人</span
          ><span style="margin-left: 20px">{{ maskdata.consignee }}</span>
        </p>
        <p class="mt20 dpflex" style="padding-left: 100px">
          <span style="width: 60px; text-align: left">配送地址</span
          ><span style="margin-left: 20px">{{ maskdata.deliverAddress }}</span>
        </p>
        <p class="mt20 dpflex" style="padding-left: 100px">
          <span style="width: 60px; text-align: left">送达时间</span
          ><span style="margin-left: 20px">{{ maskdata.deliveryTime }}</span>
        </p>
        <p class="mt20 dpflex" style="padding-left: 100px">
          <span style="width: 60px; text-align: left">用户备注</span
          ><span style="margin-left: 20px">{{ maskdata.remarks }}</span>
        </p>
        <p class="mt20 dpflex" style="padding-left: 100px">
          <span style="width: 60px; text-align: left">订单金额</span
          ><span style="margin-left: 20px">{{ maskdata.orderAmount }}</span>
        </p>
        <p class="mt20 dpflex" style="padding-left: 100px">
          <span style="width: 60px; text-align: left">订单状态</span
          ><span style="margin-left: 20px">{{ maskdata.orderState }}</span>
        </p>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog
      title="编辑订单信息"
      :visible.sync="editOrderInfo"
      width="60%"
      center
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        class="dpflex flexwarp jcbetween pd16"
      >
        <el-form-item style="width: 45%" label="订单号">
          <el-input v-model="form.orderNo" disabled></el-input>
        </el-form-item>
        <el-form-item style="width: 45%" label="下单时间">
          <el-input v-model="form.orderTime" disabled></el-input>
        </el-form-item>
        <el-form-item style="width: 45%" label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item style="width: 45%" label="收货人">
          <el-input v-model="form.consignee"></el-input>
        </el-form-item>
        <el-form-item style="width: 45%" label="配送地址">
          <el-input v-model="form.deliverAddress"></el-input>
        </el-form-item>
        <el-form-item style="width: 45%" label="送达时间">
          <el-input v-model="form.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item style="width: 45%" label="用户备注">
          <el-input v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item style="width: 45%" label="订单金额">
          <el-input v-model="form.orderAmount" disabled></el-input>
        </el-form-item>
        <el-form-item style="width: 45%" label="订单状态">
          <el-input v-model="form.orderState" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOrderInfo = false">取 消</el-button>
        <el-button type="primary" @click="saveOrderInfo">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
// consignee: "汪小哥"
// deliverAddress: "天府新谷"
// deliveryTime: "2020-04-16T02:44:58.000Z"
// id: 21
// orderAmount: 30
// orderNo: "16013"
// orderState: "已完成"
// orderTime: "2020-06-04T09:35:19.000Z"
// phone: "18181358998"
// remarks: "不要辣"
import { api_orderList, api_orderDetail, api_orderEdit } from "@/apis/order";
import { getfulltime } from "@/utils/utils";

export default {
  data() {
    return {
      searchData: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        orderTime: "",
      },
      // getfulltime(new Date())
      centerDialogVisible: false,
      editOrderInfo: false,
      maskdata: "",
      total: 0,
      currentPage: 1,
      pageSize: 4,
      text: "",
      options: ["派送中", "已受理", "已完成"],
      value: "",
      tableData: [],
      form: {},
      flag: false,
      searchflag: false,
      SearchParams: "",
    };
  },
  methods: {
    getData(params = {}) {
      api_orderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...params,
      }).then((res) => {
        for (const obj of res.data.data) {
          obj.deliveryTime = getfulltime(obj.deliveryTime);
          obj.orderTime = getfulltime(obj.orderTime);
        }
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      if (this.searchflag) {
        this.getData(this.SearchParams);
      } else this.getData();
    },
    //页码跳转
    handleCurrentChange(val) {
      //节流  减少发送请求的次数
      if (this.flag) {
        this.$message("您操作的频率过快,请稍后再试");
        return;
      }
      setTimeout(() => {
        this.flag = false;
      }, 1000);
      this.flag = true;

      this.currentPage = val;
      if (this.searchflag) {
        this.getData(this.SearchParams);
      } else this.getData();
    },
    //点击查询订单
    searchOrder() {
      if (this.flag) {
        this.$message("您操作的频率过快,请稍后再试");
        return;
      }
      setTimeout(() => {
        this.flag = false;
      }, 1000);
      this.flag = true;
      this.searchflag = true;
      this.SearchParams = JSON.parse(JSON.stringify(this.searchData));
      if (this.SearchParams.orderTime) {
        this.SearchParams.date = JSON.stringify(this.SearchParams.orderTime);
      }
      this.currentPage = 1;
      this.getData(this.SearchParams);
    },
    //点击查看
    check(row) {
      api_orderDetail({ id: row.id }).then((res) => {
        this.centerDialogVisible = true;
        res.data.data.deliveryTime = getfulltime(res.data.data.deliveryTime);
        this.maskdata = res.data.data;
      });
    },
    //点击编辑
    clickEdit(row) {
      row.isedit = !row.isedit;
      this.editOrderInfo = true;
      this.form = row;
    },
    //保存编辑
    saveOrderInfo() {
      this.editOrderInfo = false;
      api_orderEdit(this.form).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.getData();
        }
      });
    },
    //重置查询
    reset() {
      if (this.flag) {
        this.$message("您操作的频率过快,请稍后再试");
        return;
      }
      setTimeout(() => {
        this.flag = false;
      }, 1000);
      this.flag = true;
      this.currentPage = 1;
      this.searchflag = false;
      for (const key in this.searchData) {
        this.searchData[key] = "";
      }
      this.getData();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
</style>