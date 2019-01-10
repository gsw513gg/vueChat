import Vue from 'vue'
import App from './App.vue'
import router from './scripts/router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueAxios,axios)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.use(BootstrapVue)
axios.defaults.baseURL = 'http://gsw513gg.gz01.bdysite.com/api/'
// axios.defaults.withCredentials = true;//允许axios带cookie

//自定义指令
Vue.directive('rainbow',{
    bind:function(el,binding,vnode){
      el.style.color = '#' + Math.random().toString(16).slice(2,8)
    }
  }
)

router.beforeEach((to,from,next) =>{
  var isLogin = $cookies.get('userId')

  if(to.path == "/login" || to.path == "/registor"){
    next()
  }else{
    if(!isLogin){
      next({path:'/login'})
      alert("您未登录")
    }else{
      next()
    }
  }
})

new Vue({
  el:"#app",
  router,
  render: h => h(App),
}).$mount('#app')
