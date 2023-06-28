<template>
  <div class="ordering">
    <div class="heading">用户页面</div>
    <div>
      <el-table
        :data="user_array"
        style="width: 100%"
        v-loading.fullscreen.lock="Loading"
      >
        <el-table-column
          prop="time"
          label="注册时间"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          min-width="100"
        />
        <el-table-column label="头像" align="center" min-width="100">
          <!-- 头像 -->
          <template #default="scope">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.head"
              :preview-src-list="[scope.row.head]"
              fit="cover"
              :hide-on-click-modal="true"
              lazy
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          align="center"
          label="性别"
          min-width="100"
        />
        <el-table-column
          prop="position"
          align="center"
          label="职业"
          min-width="100"
        />
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :hide-on-single-page="true"
        @current-change="currentchange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, getCurrentInstance, toRefs, ref } from "vue";
export default {
  name: "",
  setup() {
    const { proxy } = getCurrentInstance();
    const Loading = ref(true);
    onMounted(() => {
      userList();
    });
    const oper_data = reactive({
      user_array: [], //用户信息
      total: 0, //总条数
      page: 0,
    });
    //请求用户信息
    const userList = async () => {
      try {
        const res = await new proxy.$request(
          proxy.$urls.m().pulluserlist + "?page=" + oper_data.page
        ).modeget();
        oper_data.user_array = res.data.data.result;
        oper_data.total = res.data.data.total;
        Loading.value = false;
      } catch (e) {
        new proxy.$tips("服务器发生错误", "error").mess_age();
      }
    };

    //分页改变
    const currentchange = (e) => {
      oper_data.page = e - 1;
      userList();
    };
    return {
      ...toRefs(oper_data),
      Loading,
      userList,
      currentchange,
    };
  },
};
</script>
<style   scoped>
</style>