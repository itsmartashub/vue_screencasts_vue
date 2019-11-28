import Vue from 'vue'
import Vuex from 'vuex'

import snackbarModule from '@/store/snackbar'
import tagsModule from '@/store/tags'
import videosModule from '@/store/videos'
import usersModule from '@/store/users'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		snackbar: snackbarModule,
		tags: tagsModule,
		videos: videosModule,
		users: usersModule,
	}
})
