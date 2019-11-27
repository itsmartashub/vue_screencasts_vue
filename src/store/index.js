import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  videos: [],
	  tags: [],
	//   playedVideos: [2, 3, 4], // umesto ovog, dohvatacemo playedVideos niz iz LS-a
	  playedVideos: [],

	  users: [],
	  currentUser: {},
	  snackbars: []
  },

  mutations: {
	  SET_VIDEOS(state, videos) {
			// response.data.data.map(v => v.attributes)
		  state.videos = videos
	  },
	  SET_TAGS(state, tags) {
		  state.tags = tags
	  },
	  SET_PLAYED_VIDEOS(state, playedVideos) {
		  state.playedVideos = playedVideos
	  },
	  MARK_VIDEO_PLAYED(state, videoId) {
		  let playedVideos = state.playedVideos.concat(videoId) // zelimo pored niza pustenih videa zelim i njihov id
		  state.playedVideos = playedVideos
		  window.localStorage.playedVideos = JSON.stringify(playedVideos)
	  },
	  ADD_VIDEO(state, video) {
		  let videos = state.videos.concat(video)
		  state.videos = videos
	  },
	  DELETE_VIDEO(state, videoId) {
		  let videos = state.videos.filter(v => v.id != videoId)
		  state.videos = videos
	  },
	  EDIT_VIDEO(state, video) {
		  state.videos.forEach(v => {
			  if(v.id == video.id) {
				  v = video
			  }
		  })
	  },
	  SET_USERS(state, users) {
		  state.users = users
	  },
	  LOGOUT_USER(state) {
		  state.currentUser = {}
			window.localStorage.currentUser = JSON.stringify({})
	  },
	  SET_CURRENT_USER(state, user) {
		  state.currentUser = user
		  window.localStorage.currentUser = JSON.stringify(user)
	  },
	  SET_SNACKBAR(state, snackbar) {
		  state.snackbars = state.snackbars.concat(snackbar)
	  }
  },

  actions: {
	  async loadVideos({commit}) {
			let response = await Api().get('/videos')
			let videos = response.data.data
			let tags = response.data.included.filter(i => i.type === 'tag')

			console.log(tags);
			// debugger
			tags.forEach(t => {
				t.attributes.id = t.id
				t.attributes.video_ids = t.relationships.videos.data.map(v => v.id)
			})

			videos.forEach(v => {
				v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
			})


			// debugger

			commit('SET_VIDEOS', videos.map(v => v.attributes))
			commit('SET_TAGS', tags.map(t => t.attributes))

			// debugger
			let playedVideos = JSON.parse(window.localStorage.playedVideos)
			commit('SET_PLAYED_VIDEOS', playedVideos)
		},

		markPlayed({commit}, videoId) {
			commit('MARK_VIDEO_PLAYED', videoId)
		},

		async createVideo({commit}, video) {
			let response = await Api().post('/videos', video) //! za ovo sam morala na serveru u app/controllers/api/video_controller.rb da zakomentarisem :authenticate_user jer je trazio auth a to trenutno nemamo
			let savedVideo = response.data.data.attributes
			commit('ADD_VIDEO', savedVideo)

			return savedVideo
		},
		
		async deleteVideo({commit}, video) {
			// delete video on the server
			let response = await Api().delete(`/videos/${video.id}`)
			// debugger // response.status
			if(response.status == 200 || response.status == 204) {
				// delete video in the state
				commit('DELETE_VIDEO', video.id)
			}

		},

		async editVideo({commit}, video) {
			let response = await Api().put(`/videos/${video.id}`, video)
			let newVideo = response.data.data.attributes

			commit('EDIT_VIDEO', newVideo)

			return newVideo // ovo se valjda radi da bismo u componenti mogli prozvati ovaj metod u async await modu i da bismo nakon uspesnog editovanja redirektovali na neku stranicu
		},

		async loadUsers({commit}) {
			let response = await Api().get('/users')
			let users = response.data.data

			commit('SET_USERS', users.map(u => u.attributes))

			let user = JSON.parse(window.localStorage.currentUser)
			commit('SET_CURRENT_USER', user)
		},

		async loadCurrent({commit, dispatch}) {
			let user = JSON.parse(window.localStorage.currentUser)
			commit('SET_CURRENT_USER', user)
			// dispatch('loadPlayedVideos', user.id)
		},

		logoutUser({commit}) {
			commit('LOGOUT_USER')
		},

		async loginUser({commit}, loginInfo) { // iz loginInfo podaci, ne treba nam sve vec email i password
			try {
				let response = await Api().post('/sessions', loginInfo)
				let user = response.data.data.attributes
				
				commit('SET_CURRENT_USER', user)

				return user
			} catch {
				// console.error(error)
				return {
					error: 'Email/password combination was incorrect. Please try again.'
				}
			}
		},

		async registerUser({commit}, registrationInfo) {
			try {
				let response = await Api().post('/users', registrationInfo)
				let user = response.data.data.attributes
				
				commit('SET_CURRENT_USER', user)

				return user
			} catch {
				// console.error(error)
				return {
					error: 'There was an error. Please try again.'
				}
			}
		},

		setSnackbar({commit}, snackbar) {
			snackbar.showing = true
			snackbar.color = snackbar.color || '#00c58e'
			commit('SET_SNACKBAR', snackbar)
		}

  },

  getters: {
	  getTag: state => id => {
		  return state.tags.find(t => t.id == id)
	  }
  },


  modules: {}
})
