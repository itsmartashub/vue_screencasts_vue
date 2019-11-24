<template>
	<div class="video_watch_page">
		<video-player
			class="video-player-box"
			ref="videoPlayer"
			:options="playerOptions"
		>
		</video-player>
		<span v-for="tag_id in video.tag_ids" :key="tag_id">
			<button class="tag-button">{{ getTag(tag_id).name }}</button>
		</span>

		<h1>{{ video.name }}</h1>
		<div v-html="video.description"></div>
	</div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player' // yarn add vue-video-player --save
import { mapGetters } from 'vuex'

export default {
	name: 'VideoWatch',
	components: {
		videoPlayer,
	},

	computed: {
		video() {
			return this.$store.state.videos.find(v => v.id == this.$route.params.id)
		},

		...mapGetters(['getTag']),
		
		playerOptions() { // https://www.npmjs.com/package/vue-video-player
			return {
				// muted: true,
				language: 'en',
				playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
				sources: [{
					type: "video/mp4",
					src: this.video.videoUrl
				}],
				poster: this.video.thumbnail,
			}
		}
	},
}
</script>

<style>
/* .video_watch_page {

} */

.video-player-box .video-js {
	margin: auto;
	height: 50vh;
	width: 80vw;
}
</style>