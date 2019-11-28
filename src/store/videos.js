import Api from '@/services/api'

export default {
	namespaced: true,
	state: {
		videos: [],
	},
	mutations: { //! mutations nema rootState
		SET_VIDEOS(state, videos) {
			// response.data.data.map(v => v.attributes)
			state.videos = videos
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
	},
	actions: {
		async loadAll({commit}) {
			let response = await Api().get('/videos')
			let videos = response.data.data
			let tags = response.data.included.filter(i => i.type === 'tag')

			console.log(tags);
			// debugger

			videos.forEach(v => {
				v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
			})

			// debugger
			commit('SET_VIDEOS', videos.map(v => v.attributes))
		},

		async create({commit}, video) {
			let response = await Api().post('/videos', video) //! za ovo sam morala na serveru u app/controllers/api/video_controller.rb da zakomentarisem :authenticate_user jer je trazio auth a to trenutno nemamo
			let savedVideo = response.data.data.attributes
			commit('ADD_VIDEO', savedVideo)

			return savedVideo
		},
		
		async delete({commit}, video) {
			// delete video on the server
			let response = await Api().delete(`/videos/${video.id}`)
			// debugger // response.status
			if(response.status == 200 || response.status == 204) {
				// delete video in the state
				commit('DELETE_VIDEO', video.id)
			}
		},

		async edit({commit}, video) {
			let response = await Api().put(`/videos/${video.id}`, video)
			let newVideo = response.data.data.attributes

			commit('EDIT_VIDEO', newVideo)

			return newVideo // ovo se valjda radi da bismo u componenti mogli prozvati ovaj metod u async await modu i da bismo nakon uspesnog editovanja redirektovali na neku stranicu
		},
	},
	getters: {},
	modules: {}
}