<template>
  <div class="ordering" v-loading.fullscreen.lock="Loading">
    <div class="heading">数据分析</div>
    <div>
      <First :pieChert="pieChert" :hisTogram="hisTogram"></First>
      <Second :lineChart="lineChart"></Second>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance, onMounted, toRefs } from "vue";
import First from "./component/first-floor.vue";
import Second from "./component/second.vue";
export default {
  components: { First, Second },
  name: "data",
  setup() {
    const { proxy } = getCurrentInstance();
    const Loading = ref(true);
    const ansLysis = reactive({
      pieChert: [], //饼图
      hisTogram: [], //柱状图
      lineChart: [], //折线图
    });

    // 请求数据
    onMounted(() => {
      get_data();
    });

    //请求图表的数据
    const get_data = async () => {
      try {
        const res = await new proxy.$request(
          proxy.$urls.m().analysis
        ).modeget();
        ansLysis.pieChert = res.data.data[0];
        ansLysis.hisTogram = res.data.data[1];
        ansLysis.lineChart = res.data.data[2];
        Loading.value = false;
      } catch (e) {
        new proxy.$tips("服务器发生错误", "error").mess_age();
      }
    };

    return {
      ...toRefs(ansLysis),
      get_data,
      Loading,
    };
  },
};
</script>
<style   scoped>
</style>