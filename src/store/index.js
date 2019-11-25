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
		}

  },

  getters: {
	  getTag: state => id => {
		  return state.tags.find(t => t.id == id)
	  }
  },


  modules: {}
})
