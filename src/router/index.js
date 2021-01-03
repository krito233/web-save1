import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StuwayList from "../views/StuwayList";
import Addstuway from "../views/Addstuway";
import Search from "../views/Search";
import Login from "../views/Login";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      component: Login,
      show: false
    },
    {
      path: '/Home',
      name: '主菜单',
      component: Home,
      show: true,
      children:[
          {
            path: '/StuwayList',
            name: '查看列表',
            component: StuwayList
          },
        {
          path: '/AddStuway',
          name: '添加学生',
          component: Addstuway
        },
        {
          path: '/Search',
          name: '查询学生',
          component: Search
        }]
    }]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
