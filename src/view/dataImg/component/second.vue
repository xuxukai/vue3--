<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <div class="grid_title">菜品分类销量趋势</div>
          <div id="broken-line"></div>
          <!-- 切换图表 -->
          <div class="query-time">
            <el-radio-group v-model="sort_value" size="small">
              <el-radio-button
                v-for="(item, index) in el_radil"
                :key="index"
                :label="item"
              ></el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Line } from "@antv/g2plot";
import { getCurrentInstance, toRefs, reactive, watch } from "vue";
export default {
  name: "",
  props: {
    lineChart: Array,
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const res_data = reactive({
      line_chart: [], //接收折线图的数据
      sort_value: "素菜类",
      el_radil: ["素菜类", "荤菜类", "酒水类", "龙虾"],
      line_update: null,
    });

    function brokenLine() {
      const line = new Line("broken-line", {
        data: res_data.line_chart,
        xField: "month",
        yField: "sales-volume",
        label: {},
        point: {
          size: 5,
          shape: "diamond",
          style: {
            fill: "white",
            stroke: "#5B8FF9",
            lineWidth: 2,
          },
        },
        tooltip: { showMarkers: false },
        state: {
          active: {
            style: {
              shadowBlur: 4,
              stroke: "#000",
              fill: "red",
            },
          },
        },
        meta: {
          month: { alias: "月份" },
          "sales-volume": { alias: "销售额" },
        },
        interactions: [{ type: "marker-active" }],
      });

      line.render();
      res_data.line_update = line;
    }

    watch(props, (newVal, oldVal) => {
      res_data.line_chart = newVal.lineChart;
      brokenLine();
    });

    // 监听选中哪个分类菜品
    watch(
      () => res_data.sort_value,
      (newVal, oldVal) => {
        Switch(newVal);
      }
    );

    //请求分类菜品数据
    const Switch = async (val) => {
      try {
        const res = await new proxy.$request(
          proxy.$urls.m().switchcate + "?cateid=" + val
        ).modeget();
        res_data.line_update.changeData(res.data.data);
      } catch (e) {
        new proxy.$tips("服务器发生错误", "error").mess_age();
      }
    };
    return {
      ...toRefs(res_data),
      brokenLine,
    };
  },
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.grid-content {
  background-color: #ffffff;
}
.grid_title {
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid #eee;
  margin-top: 20px;
}
.query-time {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 20px;
}
</style>