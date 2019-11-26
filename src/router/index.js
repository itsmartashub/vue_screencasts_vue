import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VideoWatch from '../views/VideoWatch.vue'
import AdminVideoCreate from '../views/AdminVideoCreate.vue'
import TagVideoList from '../views/TagVideoList.vue'
import AdminVideoList from '../views/AdminVideoList.vue'
import AdminVideoEdit from '../views/AdminVideoEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import UserLogin from '../views/UserLogin.vue'
import UserRegistration from '../views/UserRegistration.vue'
import Admin from '../views/Admin.vue'


Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/admin',
		name: 'admin',
		component: Admin,
		beforeEnter: (to, from, next) => {
			//  debugger
			let currentUser = JSON.parse(window.localStorage.currentUser)
			if(currentUser && currentUser.name) {
				next()
			} else {
				next('/')
			}
		},
		children: [
			{
				path: 'videos', // child routes dont needs /, dakle ne moramo /videos
				name: 'admin-video-list',
				component: AdminVideoList
			},
			{
				path: 'users', // /admin/users
				name: 'admin-user-list',
				component: AdminUserList
			},
			{
				path: 'videos/:id/edit', // /admin/videos/:id/edit
				name: 'admin-video-edit',
				component: AdminVideoEdit,
				params: true
			},
			{ //! da smo ovo stavili ispod /video/:id path-a, ovo ne bi radilo kada kliknemo na Add Vide button da idemo na /video/new, jer vue onda prvo koristi /video/:id i pokusava da sibne id kao new
				path: 'video/new', // /admin/video/new
				name: 'admin-video-create',
				component: AdminVideoCreate,
			},
		]
	},
	{
		path: '/login',
		name: 'user-login',
		component: UserLogin
	},
	{
		path: '/registration',
		name: 'user-registration',
		component: UserRegistration
	},
	//   {
	//     path: '/about',
	//     name: 'about',
	//     // route level code-splitting
	//     // this generates a separate chunk (about.[hash].js) for this route
	//     // which is lazy-loaded when the route is visited.
	//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	//   },
	
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
