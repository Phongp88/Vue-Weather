import Vue from 'vue'
import Router from 'vue-router'
import VueSkycons from 'vue-skycons'

Vue.use(Router)
Vue.use(VueSkycons,  { color: 'white' })
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  ]
})
