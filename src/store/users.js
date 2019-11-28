import Api from '@/services/api'
import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		users: [],
		currentUser: {},
	},
	mutations: { //! mutations nema rootState
		SET_PLAYED_VIDEOS(state, playedVideos) {
		//   state.currentUser.playedVideos = playedVideos 
		Vue.set(state.currentUser, 'playedVideos', playedVideos) // u Vue 3 ovo bi trebalo valjda da radi bez tog Vue.set(), mada ja msm da meni i sad radi (tipa kad otvorimo VideoWatch da i tamo pise "Played" na videu)
		},
		MARK_VIDEO_PLAYED(state, videoId) {
		//   let playedVideos = state.playedVideos.concat(videoId) // zelimo pored niza pustenih videa zelim i njihov id
		//   state.playedVideos = playedVideos
		//   window.localStorage.playedVideos = JSON.stringify(playedVideos)
			let playedVideos = state.currentUser.playedVideos.concat(videoId);
			state.currentUser.playedVideos = playedVideos;
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

		
	},
	actions: {
		async loadAll({commit}) {
			let response = await Api().get('/users')
			let users = response.data.data

			commit('SET_USERS', users.map(u => u.attributes))

			let user = JSON.parse(window.localStorage.currentUser)
			commit('SET_CURRENT_USER', user)
		},

		async loadCurrent({commit, dispatch}) {
			let user = JSON.parse(window.localStorage.currentUser)
			if(user) {
				commit('SET_CURRENT_USER', user)
				dispatch('loadPlayedVideos', user.id)
			}
		},

		async loadPlayedVideos({commit}, userID) {
			let response = await Api().get(`users/${userID}`)
			let user = response.data.data.attributes
			commit('SET_PLAYED_VIDEOS', user.played_video_ids)
		},
		markVideoPlayed({commit, state}, videoID) {
			if(state.currentUser.name) {
				commit('MARK_VIDEO_PLAYED', videoID)
				
				Api().post('/video_plays', {
					video_id: videoID
				})
			}
		},
		
		async login({commit, dispatch}, loginInfo) { // iz loginInfo podaci, ne treba nam sve vec email i password
			try {
				let response = await Api().post('/sessions', loginInfo)
				let user = response.data.data.attributes
				
				commit('SET_CURRENT_USER', user)
				dispatch('loadPlayedVideos', user.id)

				return user
			} catch {
				// console.error(error)
				return {
					error: 'Email/password combination was incorrect. Please try again.'
				}
			}
		},
		async register({commit, dispatch}, registrationInfo) {
			try {
				let response = await Api().post('/users', registrationInfo)
				let user = response.data.data.attributes
				
				commit('SET_CURRENT_USER', user)
				dispatch('loadPlayedVideos', user.id)

				return user
			} catch {
				// console.error(error)
				return {
					error: 'There was an error. Please try again.'
				}
			}
		},
		logout({commit}) {
			commit('LOGOUT_USER')
		},
	},
	getters: {
		playedVideos: state => {
		  return state.currentUser.playedVideos || []
	  },
		videoIsPlayed: (state, getters) => videoID => {
			return getters.playedVideos.includes(videoID)
		}
	},
	modules: {}
}