<template>
	<v-card width="340px" hover :to="{ name: 'video-watch', params: {id: video.id} }" class="ma-2">

		<v-img :src="video.thumbnail" />
		<v-card-title v-if="video.name">{{ video.name }}</v-card-title>
		<!-- ovo v-if je samo zbog errora u konzoli da ne moze da pronadje vrednost 'name' of undefined, valjda se jos nije ucitalo i onda prikaze err bzvz, zatyo samo ovaj v-if -->

		<v-card-text>
			<div v-if="isPlayed(video.id)" class="red--text">
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
import { mapGetters } from 'vuex';

export default {
	name: 'VideoListVideo',
	props: ['video'],

	computed: {
		...mapGetters({
			getTag: 'tags/get', 
			isPlayed: 'users/videoIsPlayed'
		}),
	}
}
</script>