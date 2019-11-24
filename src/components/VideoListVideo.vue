<template>
	<router-link :to="{ name: 'video-watch', params: {id: video.id} }">
		<div class="video-box">
			<img :src="video.thumbnail" />
			<div>
				<h3>{{ video.name }}</h3>
				<div v-html="video.description"></div>
				<!-- ovo v-html nam omogucava da bajndujemo html kod, recimo ako u ovom descripion ima negde kao <p></p> tag on ga renderuje kao p tag, a ne kao text <p> -->
				<span v-for="tag_id in video.tag_ids" :key="tag_id">
					<router-link :to="{name: 'tag', params: {id: tag_id}}">
						<button class="tag-button">{{ getTag(tag_id).name }}</button>
					</router-link>
				</span>
			</div>
		</div>
	</router-link>

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
.video-box {
	border: 1px solid black;
	border-radius: 10px;
	margin: 10px;
	padding: 10px;
	text-align: left;
	display: flex;
	justify-content: flex-start;
}
.video-box img {
	width: 200px;
	padding: 10px;
}
</style>