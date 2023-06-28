<template>
  <div class="ordering" v-loading.fullscreen.lock="Loading">
    <div class="heading">菜品管理</div>
    <div class="button-view">
      <el-button type="success" @click="addDishes">添加菜品</el-button>
    </div>

    <div class="modify-button">
      <el-table :data="dish_data" style="width: 100%">
        <el-table-column
          prop="time"
          label="创建时间"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="category"
          label="类目"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="name"
          label="菜品名称"
          align="center"
          min-width="100"
        />
        <el-table-column label="商品图片" align="center" min-width="100">
          <!-- 头像 -->
          <template #default="scope">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.image[0].url"
              :preview-src-list="[scope.row.image[0].url]"
              fit="cover"
              :hide-on-click-modal="true"
              lazy
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="unitprice"
          align="center"
          label="价格"
          min-width="100"
        />
        <el-table-column align="center" label="操作" min-width="100">
          <template #default="scope">
            <el-button size="small" type="primary" @click="Edit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-if="scope.row.onsale"
              @click="offthe_Shelf(scope.row.name, scope.row._id, scope.$index)"
              >下架</el-button
            >
            <el-button size="small" type="danger" disabled v-else
              >已下架</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
import { onMounted, reactive, toRefs, getCurrentInstance, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
export default {
  name: "",
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    //分页功能
    const currentchange = () => {};
    const Loading = ref(true);
    //添加菜品
    const addDishes = () => {
      router.push({ name: "dishes_upload" });
    };
    const oper_data = reactive({
      page: 0,
      dish_data: [],
      total: 0,
    });

    //搜索菜品
    const get_dishes = async () => {
      try {
        const res = await new proxy.$request(
          proxy.$urls.m().obtaindishes + "?page=" + oper_data.page
        ).modeget();
        oper_data.dish_data = res.data.data.result;
        oper_data.total = res.data.data.total;
        Loading.value = false;
      } catch (e) {
        console.log(e);
      }
    };
    //下架商品弹窗
    const offthe_Shelf = (name, id, index) => {
      ElMessageBox.confirm(`确定对 ${name} 下架吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then((res) => {
          Shelf(id, index);
        })
        .catch((err) => {
          new proxy.$tips("已取消", "none").mess_age();
        });
    };
    //下架
    const Shelf = async (id, index) => {
      try {
        const res = await new proxy.$request(
          proxy.$urls.m().fromsale + "?id=" + id
        ).modeget();
        oper_data.dish_data[index].onsale = false;
        new proxy.$tips("下架成功", "success").mess_age();
      } catch (e) {
        console.log(e);
        new proxy.$tips("服务器发生错误", "error").mess_age();
      }
    };

    // 编辑商品
    const Edit = (scope) => {
      const val = JSON.stringify(scope);
      router.push({ name: "dishes_upload", params: { val } });
    };
    onMounted(() => {
      get_dishes();
    });
    return {
      ...toRefs(oper_data),
      currentchange,
      addDishes,
      get_dishes,
      offthe_Shelf,
      Shelf,
      Edit,
      Loading,
    };
  },
};
</script>
<style  scoped>
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #00be06;
  color: #fff;
}
</style>