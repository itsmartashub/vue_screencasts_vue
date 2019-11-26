<template>
	<v-container>
		<v-row>
			<v-col md="3" cols="12">
				<h1>Video Create Page</h1>

				<VideoEditForm :video="video" :saveVideo="createVideo" buttonText="Create Video" />
			</v-col>
			
			<v-col md="9" cols="12">
				<VideoListVideo :video="video" />
			</v-col>
			
		</v-row>
	</v-container>
</template>

<script>
import VideoListVideo from "@/components/VideoListVideo.vue"
import VideoEditForm from "@/components/VideoEditForm.vue"

export default {
	name: 'VideoCreate',
	components: {
		VideoListVideo,
		VideoEditForm
	},

	data() {
		return {
			video: {}
		}
	},

	methods: {
		async createVideo() {
			let video = await this.$store.dispatch('createVideo', this.video)
			this.$router.push({ name: 'video-watch', params: {id: video.id}})
		}
	},
}
</script>

<style scoped>
input  {
	border: 1px solid black;
}
</style>