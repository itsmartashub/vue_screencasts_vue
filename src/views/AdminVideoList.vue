<template>
	<v-container grid-list-xs>
		<h1>Video List</h1>
		<v-btn text to="/video/new" color="#2f495e">Add Video</v-btn>

		<div class="flex-table">
			<div>Name</div>
			<div>Description</div>
			<div>Actions</div>
		</div>

		<div v-for="video in videos" :key="video.id" class="flex-table">
			<div>{{ video.name }}</div>
			<div>{{ video.description | abbreviate}}</div>
			<div class="actions">
				<router-link :to="{ name: 'video-watch', params: {id: video.id} }">Show</router-link>
				<router-link :to="{ name: 'admin-video-edit', params: {id: video.id} }">Edit</router-link>
				<v-btn @click="deleteVideo(video)" x-small color="red white--text lighten-1">Delete</v-btn>
			</div>
		</div>
	</v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'AdminVideoList',

	computed: {
		...mapState(['videos']),
	},

	filters: {
		abbreviate(text) {
			if(text) {
				return text && text.slice(0, 50)
			}
		}
	},

	methods: {
		deleteVideo(video) {
			let response = confirm(`Are you sure you want to delete "${video.name}"?`)

			if(response) {
				this.$store.dispatch('deleteVideo', video)
			}
		}
	},
}
</script>

<style>
.flex-table {
	display: grid;
	grid-template-columns: repeat(auto-fill, 33%);
	padding: 10px;
	/* border-bottom: 1px solid silver; */
}

.flex-table:nth-of-type(2n) {
	background-color: #dedede;
}

.actions * {
	padding-right: 15px;
}
</style>