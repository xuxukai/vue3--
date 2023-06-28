import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import store from './store'

import './style/headtap.css'


const app = createApp(App)
app.use(store).use(router).use(ElementPlus, {locale: zhCn})
import urls from '../api/api' //请求地址引入以及挂载全局地址
//vue3 的写法要写在config里
app.config.globalProperties.$urls =  urls

import request from '../api/request' 
app.config.globalProperties.$request =  request

//挂载公共的toast提示
import tips from '../config/Tips'
app.config.globalProperties.$tips =  tips


app.mount('#app')
