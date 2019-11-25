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

	computed: {
		...mapState(['videos']),

		video() {
			return this.videos.find(v => v.id == this.$route.params.id) 
		}
	},

	methods: {
		async editVideo() {
			let newVideo = await this.$store.dispatch('editVideo', this.video)
			this.$router.push({ name: 'admin-video-list' })
		}
	},
}
</script>

<style>

</style>