import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VideoWatch from '../views/VideoWatch.vue'
import VideoCreate from '../views/VideoCreate.vue'
import TagVideoList from '../views/TagVideoList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { //! da smo ovo stavili ispod /video/:id path-a, ovo ne bi radilo kada kliknemo na Add Vide button da idemo na /video/new, jer vue onda prvo koristi /video/:id i pokusava da sibne id kao new
	  path: '/video/new',
	  name: 'video-create',
	  component: VideoCreate,
  },
  {
	  path: '/video/:id',
	  name: 'video-watch',
	  component: VideoWatch,
	  params: true
  },
  {
	  path: '/tag/:id',
	  name: 'tag',
	  component: TagVideoList,
	  params: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
