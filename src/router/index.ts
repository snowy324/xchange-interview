import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import CloudTravel from '../views/CloudTravel/CloudTravel.vue';

const CloudSearchPage = () => import("@mobile/CloudSearchPage.vue");
const CloudSorterPage = () => import("@mobile/CloudSorterPage.vue");

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'cloudtravle',
    component: CloudTravel
  },
  {
    path: '/searchm',
    name: 'search-mobile',
    component: CloudSearchPage
  },
  {
    path: '/sorterm',
    name: 'sorter-mobile',
    component: CloudSorterPage
  }
]

const router = new VueRouter({
  routes
})

export default router
