<template>
	<v-container grid-list-xs>
		<v-row>
			<v-col md="9" cols="12">
				<video-player
					class="video-player-box"
					ref="videoPlayer"
					:options="playerOptions"
					@ended="markPlayed"
				></video-player>
			</v-col>

			<v-col md="3" cols="12">
				<div class="display-1">{{ video.name }}</div>

				<div v-if="isPlayed" class="green--text">
					<font-awesome-icon icon="check" /> Played
				</div>
				<div v-else>
					<v-btn x-small @click="markPlayed">Mark Played</v-btn>
				</div>

				<div v-html="video.description"></div>

				<span v-for="tag_id in video.tag_ids" :key="tag_id">
					<v-btn
						:to="{name: 'tag', params: {id: tag_id}}"
						color="green lighten-2"
						class="ma-1 mb-2"
					>
						{{ getTag(tag_id).name }}
					</v-btn>
				</span>
			</v-col>

		</v-row>
	</v-container>

</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player' // yarn add vue-video-player --save
import { mapGetters, mapState } from 'vuex'

export default {
	name: 'VideoWatch',
	components: {
		videoPlayer,
	},

	computed: {
		video() {
			return this.videos.find(v => v.id == this.$route.params.id) || {}
		},

		...mapGetters(['getTag']),
		...mapState(['playedVideos', 'videos']),
		
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
				fluid: true // da se video shrinkuje po potrebi
			}
		},

		isPlayed() {
			return this.playedVideos.includes(this.video.id)
		}
	},

	methods: {
		markPlayed() {
			this.$store.dispatch('markPlayed', this.video.id)
		}
	},
}
</script>

<style>

</style>