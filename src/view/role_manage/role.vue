<template>
  <div class="ordering" v-loading.fullscreen.lock="Loading">
    <div class="heading">员工详情</div>
    <div class="query-view">
      <el-button type="success" @click="add_to">添加员工</el-button>
      <el-button
        type="danger"
        @click="Delete"
        :disabled="arr_id.length > 0 ? false : true"
        >批量删除</el-button
      >
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        :data="table_data"
        style="width: 100%"
        @select="Select"
        @select-all="Selectall"
      >
        <el-table-column type="selection" />
        <el-table-column
          prop="time"
          label="创建时间"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="jobnumber"
          label="工号"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="sex"
          align="center"
          label="性别"
          min-width="100"
        />
        <el-table-column
          prop="position"
          align="center"
          label="职位"
          min-width="100"
        />
        <el-table-column align="center" label="是否离职" min-width="100">
          <template #default="scope">
            <el-switch
              v-model="scope.row.quit"
              @change="Switch($event, scope.row._id, scope.$index)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      background
      center
      layout="prev, pager, next"
      :total="total"
      :hide-on-single-page="true"
      @current-change="currentchange"
      :current-page="cur_page"
    >
    </el-pagination>
    <Dialog ref="addDialog" @launch="launch"></Dialog>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted, getCurrentInstance } from "vue";
import Dialog from "./component/el-dialog.vue";
import { ElMessageBox } from "element-plus";
import qs from "qs";
export default {
  name: "role",
  components: {
    Dialog,
  },
  setup() {
    const Loading = ref(true);
    const { proxy } = getCurrentInstance();
    const oper_data = reactive({
      table_data: [],
      page: 0,
      total: 0,
      arr_id: [],
      cur_page: 0, //当前下面页码
    });
    const addDialog = ref();
    //添加
    const add_to = () => {
      addDialog.value.show();
    };
    onMounted(() => {
      get_role();
    });
    //请求员工数据
    const get_role = async () => {
      try {
        const res = await new proxy.$request(
          proxy.$urls.m().getemployees + "?page=" + oper_data.page
        ).modeget();
        console.log(res);
        oper_data.table_data = res.data.data.result;
        oper_data.total = res.data.data.total;
        Loading.value = false;
      } catch (e) {
        new proxy.$tips("服务器发生错误", "error").mess_age();
      }
    };
    // 单行选中or取消选中
    const Select = (e) => {
      const ID = e.map((item) => {
        return item._id;
      });
      oper_data.arr_id = ID;
    };
    // 全选or取消全选
    const Selectall = (e) => {
      const ID = e.map((item) => {
        return item._id;
      });
      oper_data.arr_id = ID;
    };
    //删除事件
    const Delete = () => {
      console.log(oper_data.arr_id);
      ElMessageBox.confirm(
        `确定删除${oper_data.arr_id.length}个员工吗?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      )
        .then((res) => {
          Batch();
        })
        .catch((err) => {});
    };
    // 调用接口删除员工数据
    const Batch = async () => {
      const obj = { arrayid: oper_data.arr_id };
      try {
        const res = await new proxy.$request(
          proxy.$urls.m().deleteemp,
          obj
        ).modepost();
        oper_data.arr_id = [];
        get_role();
        new proxy.$tips(res.data.msg, "success").mess_age();
      } catch (e) {
        new proxy.$tips("服务器发生错误", "error").mess_age();
      }
    };
    //分页功能
    const currentchange = (e) => {
      oper_data.page = e - 1;
      oper_data.cur_page = e;
      get_role();
    };

    const Switch = async (val, id, index) => {
      const query = qs.stringify({ id, quit: val });
      try {
        const res = await new proxy.$request(
          proxy.$urls.m().modifyresi + "?" + query
        ).modeget();
        if (res.staus !== 200) {
          new proxy.$tips(res.data.msg, "success").mess_age();
          return;
        }
        oper_data.table_data[index].quit = !val;
      } catch (e) {}
    };

    //调用子组件的方法 提交后传递事件出来
    const launch = () => {
      oper_data.page = 0;
      oper_data.cur_page = 1;
      get_role();
    };

    return {
      ...toRefs(oper_data),
      currentchange,
      add_to,
      addDialog,
      get_role,
      Switch,
      Select,
      Selectall,
      Delete,
      launch,
      Loading,
    };
  },
};
</script>
<style scoped>
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #00be06;
  color: #fff;
}
</style>