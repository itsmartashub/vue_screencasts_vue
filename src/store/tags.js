import Api from '@/services/api'

export default {
	namespaced: true, //* i bez ovoga recimo, state je UVEK DIFOLTNO namespaced: true i kad to ne stavimo. Tako da gde god smo pozivali state iz tags.js treba da editujemo, recimo ako imamo ...mapState i sl
	state: {
		tags: []
	},
	mutations: { //! mutations nema rootState
		SET_TAGS(state, tags) {
			state.tags = tags
		},
		CREATE_TAG(state, {tag}) {
			state.tags = state.tags.concat(tag)
		},
		UPDATE_TAG_NAME(state, {tag}) {
			let tagToUpdate = state.tags.find(t =>t.id == tag.id)
			tagToUpdate.name = tag.name
		},
		DELETE_TAG(state, {tag}) {
			state.tags = state.tags.filter(t => t.id != tag.id)
		},

		CONNECT_TAG_TO_VIDEO(state, {video, tag}) { //* ovo moze i u videos.js module, i u ovaj, i mozda da napravimo poseban video_tags.js module, ali Jeff se odlucio za ovaj, tags.js module
			video.tag_ids = video.tag_ids.concat(tag.id.toString())
			tag.video_ids = tag.video_ids.concat(video.id.toString())
		},
		DISCONNECT_TAG_FROM_VIDEO(state, {video, tag}) { //* ovo moze i u videos.js module, i u ovaj, i mozda da napravimo poseban video_tags.js module, ali Jeff se odlucio za ovaj, tags.js module
			video.tag_ids = video.tag_ids.filter(t_id => t_id != tag.id )
			tag.video_ids = tag.video_ids.filter(v_id => v_id != video.id)
		},
	},
	actions: {
		async loadAll({commit}) {
			let response = await Api().get('/tags')
			let tags = response.data.data

			tags.forEach(t => {
				t.attributes.id = t.id
				t.attributes.video_ids = t.relationships.videos.data.map(v => v.id)
			})
			commit('SET_TAGS', tags.map(t => t.attributes))
		},

		connectToVideo({commit}, {video, tag}) { // btw, za actions nikad ne moze 3 ili vise argumenta, valjda moze samo dva
			Api().post('/video_tags', {
				video_id: video.id,
				tag_id: tag.id
			})

			commit('CONNECT_TAG_TO_VIDEO', {video, tag})
		},
		disconnectFromVideo({commit}, {video, tag}) {
			Api().post('/video_tags/delete', { // prvo je probao on na apiju da uradi delete umesto post, ali onda trazi nmp sta za url ka kojoj saljemo zahtev, tako da je ipak odradio post i dodao /delete u url
				video_id: video.id,
				tag_id: tag.id
			})
			
			commit('DISCONNECT_TAG_FROM_VIDEO', {video, tag})
		},

		async create({commit}, {name}) {
			let response = await Api().post('/tags', {name}) // server vraca tag sa name i id-em
			let createdTag = response.data.data.attributes // {name: nekoIme}
			createdTag.id = response.data.data.id // id taga
			createdTag.video_ids = []
			// console.log(createdTag);

			commit('CREATE_TAG', { tag: createdTag })

			return createdTag // da bismo mogli posle u templejtu da u asinhronoj f-ji, ovde je slucaj sa set() sacuvamo odg ove f-je tj return u promenljivoj koju posle prosledjujemo u connectTagToVideo() dispatchovanju kao jedan od propertija 
		},

		updateName({commit}, {tag}) {
			Api().put(`/tags/${tag.id}`, tag)
			commit('UPDATE_TAG_NAME', {tag})
		},
		delete({commit}, {tag}) {
			Api().delete(`/tags/${tag.id}`)
			commit('DELETE_TAG', {tag})
		}
	},

	getters: {
		get: state => id => {
		  return state.tags.find(t => t.id == id)
	  },
	},

	modules: {}
}