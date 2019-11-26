<template>
	<v-card width="340px" hover :to="{ name: 'video-watch', params: {id: video.id} }" class="ma-2">

		<v-img :src="video.thumbnail" />
		<v-card-title>{{ video.name }}</v-card-title>

		<v-card-text>
			<div v-if="isPlayed" class="red--text">
				<font-awesome-icon icon="check" /> Played
			</div>
		</v-card-text>

		<v-card-actions>
			<span v-for="tag_id in video.tag_ids" :key="tag_id">
				<v-btn
					color="#00c58e"
					class="mr-2"
					small
					
					@mousedown.stop
					:to="{name: 'tag', params: {id: tag_id}}"
				>
					{{ getTag(tag_id).name }}
				</v-btn>
			</span>
		</v-card-actions>
	
	</v-card>

</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
	name: 'VideoListVideo',
	props: ['video'],
	computed: {
		...mapGetters(['getTag']),
		...mapState(['playedVideos']),

		isPlayed() {
			return this.playedVideos.includes(this.video.id)
		}
	}
}
</script>

<style>

</style>