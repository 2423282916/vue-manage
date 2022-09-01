import Vue from 'vue'
import App from './App.vue'
import ElementUI, { Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '../router'
import './assets/less/index.less'
import store from '../store'
import http from 'axios'
import '../api/mock.js'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http=http
Vue.prototype.$confirm=MessageBox.confirm
Vue.prototype.$message=Message

// 导航守卫，登录跳转查看token
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token=store.state.user.token
  if(!token&&to.name!=='login'){
    next({name:'login'})
  }else if(token&&to.name==='login'){
    next({name:'home'})
  }else{
    next()
  }
})

new Vue({
  router,store,
  render: h => h(App),
  // 解决从login登入后，再刷新出现的白屏问题
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')


