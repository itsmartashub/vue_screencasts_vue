<template>
	<v-container grid-list-xs>
		<h1>{{ video.name }}</h1>

		<v-text-field v-model="video.name" label="Name" />
		<v-textarea v-model="video.description" label="Description" />
		<v-text-field v-model="video.thumbnail" label="Thumbnail URL" />
		<v-text-field
			v-model="video.videoUrl" 
			label="Video URL" 
			hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo." 
		/>

		<v-btn @click="editVideo">Save Video</v-btn>

	</v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'AdminVideoEdit',

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