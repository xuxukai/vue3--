<template>
  <!-- 饼图，柱状图 -->
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          <div class="grid_title">菜品销量排行榜</div>
          <div id="Piechart"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          <div class="grid_title">客户年龄分布</div>
          <div id="Columnar"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onMounted, watch } from "vue";
import { Pie, Column } from "@antv/g2plot";
export default {
  props: {
    pieChert: Array,
    hisTogram: Array,
  },
  setup(props) {
    // 饼图
    function pieChart(data) {
      const piePlot = new Pie("Piechart", {
        appendPadding: 10,
        data,
        angleField: "value",
        colorField: "name",
        radius: 0.8,
        label: {
          type: "outer",
        },
        interactions: [{ type: "element-active" }],
      });

      piePlot.render();
    }
    // 柱状图
    function coLumnar(data) {
      const columnPlot = new Column("Columnar", {
        data,
        xField: "age",
        yField: "sales-volume",
        label: {
          // 可手动配置 label 数据标签位置
          position: "middle", // 'top', 'bottom', 'middle',
          // 配置样式
          style: {
            fill: "#eee",
            opacity: 0.9,
          },
        },
        meta: {
          age: {
            alias: "年龄",
          },
          "sales-volume": {
            alias: "销售额",
          },
        },
      });
      columnPlot.render();
    }
    onMounted(() => {});

    //传值数据有异步问题 需要监听到有数据时才进行图表渲染
    watch(props, (newVal, oldVal) => {
      pieChart(newVal.pieChert);
      coLumnar(newVal.hisTogram);
    });

    return {
      pieChart,
      coLumnar,
    };
  },
};
</script>
<style   scoped>
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
</style>