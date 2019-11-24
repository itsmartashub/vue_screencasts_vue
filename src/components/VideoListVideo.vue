<template>
	<v-card width="340px" hover :to="{ name: 'video-watch', params: {id: video.id} }" class="ma-2">

		<v-img :src="video.thumbnail" />
		<v-card-title>{{ video.name }}</v-card-title>

		<v-card-actions>
			<span v-for="tag_id in video.tag_ids" :key="tag_id">
				<v-btn
					color="green lighten-2"
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
import { mapGetters } from 'vuex';

export default {
	name: 'VideoListVideo',
	props: ['video'],
	computed: {
		...mapGetters(['getTag'])
	}
}
</script>

<style>

</style>