import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import NewPost from '../components/NewPost'
import NewView from '../components/NewView'
import Registor from '../components/Registor'
import Login from '../components/Login'
import Message from '../components/Message'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'login'
  },
  {
    path:'/registor',
    component:Registor
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/index',
    component:Index
  },
  {
    path: '/newpost',
    component: NewPost
  },
  {
    path: '/newview/:id',
    component: NewView
  },
  {
    path: '/message',
    component: Message
  }
]


const router = new VueRouter({
  routes,
  base: "/dist/",
  mode: "history" //去除url上的#
  
})



export default router