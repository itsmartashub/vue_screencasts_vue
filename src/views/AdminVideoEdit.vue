<template>
	<v-container>
		<VideoEditForm :video="video" :saveVideo="editVideo" buttonText="Save Video" />
	</v-container>
</template>

<script>
import { mapState } from 'vuex'
import VideoEditForm from '@/components/VideoEditForm.vue'

export default {
	name: 'AdminVideoEdit',
	components: { VideoEditForm },

	data() {
		return {
		}
	},

	computed: {
		...mapState(['videos']),

		video() {
			return this.videos.find(v => v.id == this.$route.params.id) 
		}
	},

	methods: {
		async editVideo() {
			let video = await this.$store.dispatch('editVideo', this.video)
			this.$store.dispatch('setSnackbar', { text: `You have successfully edited your video, "${video.name}" ` })

			this.$router.push({ name: 'admin-video-list' })
		}
	},
}
</script>

<style>

</style>