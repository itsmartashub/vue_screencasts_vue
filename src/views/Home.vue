<template>
  <div class="home">
		<!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
		<h1 class="display-4 ma-4 d-flex justify-center">All Videos</h1>
		

		<div class="d-flex flex-wrap justify-center">
			<div v-for="video in videos" :key="video.id">
				<VideoListVideo :video="video"></VideoListVideo>
			</div>
		</div>
  </div>
</template>

<script>
// import Api from '@/services/api'
import { mapState, mapGetters } from 'vuex'
import VideoListVideo from '@/components/VideoListVideo'

export default {
	components: { VideoListVideo },

	//? NA KRAJU SMO SVE OVO PREMESTILI U APP.VUE jer nam treba da vise komponenti
	// mounted() {
	// 	// Promise su kao zaostale, pa radimo axync await, medjutim ne mozememo za mounted() da stavimo da je async, vec cemo da napravimo ovo kao method pa cemo ovde pozvaati taj metod
	// 	// Api().get('/videos').then((response) => {
	// 	// 	// console.log(response.data.data)
	// 	// 	this.videos = response.data.data.map(v => v.attributes)
	// 	// })

	// 	// this.loadVideos()

	// 	this.$store.dispatch('loadVideos')
	// },
	methods: {
		// premestili smo u store
		// async loadVideos() {
		// 	let response = await Api().get('/videos')
		// 	this.videos = response.data.data.map(v => v.attributes)
		// }

		//? premesteno u store u getters
		// getTag(tagId) {
		// 	// console.log(tagId, this.tags)
		// 	return this.tags.find(t => t.id == tagId)
		// }
	},

	// data() {
	// 	return {
	// 		// videos: Api().get('/videos') // napravili smo anonimnu f-ju u services/api, nismo joj dali ime, zato smo sad ovde mogli da importujemo kojim god imenom, i taj import je f-ja, zato ide () tj Api(). Medjutim ovo je Promise, nije array, tj axios vraca Promise, zato ovo bolje da odardimo u mounted i da cejnujemo
	// 		videos: []
	// 	}
	// },

	computed: {
		//? bez mapState
		// videos() { return this.$store.state.videos },
		// tags() { return this.$store.state.tags }

		//? sa mapState
		...mapState({
			videos: state => state.videos.videos, 
			tags: state => state.tags.tags
		}),
		...mapGetters({
			getTag: 'tags/get'
		})
	}
}
</script>