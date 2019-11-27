<template>
	<v-container grid-list-xs>
		<div class="display-1 pt-3">{{ video.name}}</div>
		<div v-html="video.description"></div>

		<v-autocomplete 
			:items="tags"
			item-text="name"
			v-model="videoTags"
			multiple
			chips
			deletable-chips
			hide-selected
			return-object
			@change="updateTags($event)"
		></v-autocomplete>
	</v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import VideoEditForm from '@/components/VideoEditForm.vue'
import _ from 'lodash'

export default {
	name: 'AdminVideoShow',

	computed: {
		...mapState(['videos', 'tags']),
		...mapGetters(['getTag']),

		video() {
			return this.videos.find(v => v.id == this.$route.params.id) 
		},

		videoTags: {
			get() {
				return this.video.tag_ids.map(id => this.getTag(id))
			},
			set(newTags) {
				let addedTags = _.differenceBy(newTags, this.videoTags, 'id') //? prvi argument bigger, drugi je smaller, a treci property po kom poredimo prva dva 
				let removedTags = _.differenceBy(this.videoTags, newTags, 'id') //? u ovom slucaju pcekujemo da videoTags bude veci od newTags
				if(addedTags.length > 0) { // dodali smo tag 
					this.$store.dispatch('connectTagToVideo', {
						tag: addedTags[0],
						video: this.video
					})
				}

				if(removedTags.length > 0) { // dodali smo tag 
					this.$store.dispatch('disconnectTagFromVideo', {
						tag: removedTags[0],
						video: this.video
					})
				}
			}
		}
	},

	methods: {
		updateTags(newTags) {
			// debugger
		}
	},

}
</script>

<style>

</style>