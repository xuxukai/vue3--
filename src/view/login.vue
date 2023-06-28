<template>
  <div id="backcont">
    <div class="meituan-content">
      <div class="login-cont">
        <div class="meituan-title">扫码支付点餐系统</div>
        <div class="meituan-user">
          <el-form ref="formRef" :model="user" label-width="120px" class="user">
            <el-form-item label="账号">
              <el-input v-model="account" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password" type="password" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="reg-view" @click="type = type == '登录' ? '注册' : '登录'">
          <p>{{ type }}</p>
        </div>
        <el-button
          v-if="type == '注册'"
          type="success"
          class="meituan-btn"
          @click="login"
          :loading="load"
          >登录</el-button
        >
        <el-button
          v-else
          type="success"
          class="meituan-btn"
          @click="created"
          :loading="load"
          >注册</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "",
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    let user = reactive({
      account: "15819567564",
      password: "xk8862674",
      type: "注册",
      load: false,
    });

    const login = async () => {
      user.load = true;
      const obj = { account: user.account, password: user.password };
      try {
        const res = await new proxy.$request(
          proxy.$urls.m().login,
          obj
        ).modepost();
        if (res.status !== 200) {
          new proxy.$tips(res.data.msg, "warning").mess_age();
          user.load = false;
          return;
        }
        user.load = false;
        // 跳转到内容页面
        // let ids = "1";
        localStorage.setItem("token", res.data.data.token);
        // localStorage.setItem("menuid", JSON.stringify(ids));
        router.push({ name: "index" });
      } catch (e) {
        console.log(e);
        //捕获服务器异常情况
        user.load = false;
        new proxy.$tips("服务器发生错误", "error").mess_age();
      }
    };

    const created = async () => {
      user.load = true;
      const obj = { account: user.account, password: user.password };
      try {
        const res = await new proxy.$request(
          proxy.$urls.m().register,
          obj
        ).modepost();
        if (res.status !== 200) {
          new proxy.$tips(res.data.msg, "warning").mess_age();
          user.load = false;
          return;
        }
        user.load = false;
        user.regi = "注册";
      } catch (e) {
        user.load = false;
        new proxy.$tips("服务器发生错误", "error").mess_age();
      }
    };
    return {
      ...toRefs(user),
      login,
      created,
    };
  },
};
</script>
<style   scoped>
form {
  width: 100%;
}
</style>