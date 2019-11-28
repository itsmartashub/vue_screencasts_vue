<template>
	<v-container grid-list-xs>

		<div class="flex-table">
			<div>Name</div>
			<div># videos</div>
			<div></div>
		</div>

		<div v-for="tag in tags" :key="tag.id" class="flex-table">

			<div>
				<div v-if="tagEditingId == tag.id">
					<!-- editing -->
					<v-text-field
						v-model="tag.name"
						:id="`tag-edit-${tag.id}`"
						@blur="updateTagName(tag)"
						@keydown.enter="updateTagName(tag)"
					/>
				</div><!-- ako postoji tag sa tim id-em, prikazi editing -->
				<div v-else @click="setToEditing(tag)">{{ tag.name }}</div><!-- a ako ne, prikazi tag.name -->
			</div>
			
			<div>
				<router-link :to="{name: 'tag', params: {id: tag.id}}">
					{{ tag.video_ids.length }}
				</router-link>
			</div>

			<div class="actions">
				<v-btn color="#2f495e" dark x-small @click="setToEditing(tag)">edit</v-btn>
				<v-btn color="red" dark x-small @click="deleteTag(tag)">delete</v-btn>
			</div>
		</div>

		<div v-if="!isEditingNewTag" class="mt-10">
			<v-btn color="#00c58e" dark  @click="startNewTag()">add tag</v-btn>
		</div>
		<div v-else>
			<v-text-field
				v-model="newTagName"
				id="new-tag-name"
				@blur="createTag()"
				@keydown.enter="createTag()"
			/>

		</div>
	</v-container>
</template>

<script>
import {mapState} from 'vuex'
import { nextTick } from 'q'

export default {
	name: 'AdminTagList',

	data() {
		return {
			tagEditingId: '', // mogli smo isEditing, medjuttim ovde ima mnogo tagova, a ne zelimo da se odjednom svi edituju, vec cemo ih birati po id-u
			isEditingNewTag: false,
			newTagName: ''
		}
	},

	computed: {
		...mapState(['tags'])
	},

	methods: {
		setToEditing(tag) {
			this.tagEditingId = tag.id
			// document.getElementById(`tag-edit-${tag.id}`).focus() //! ovo je null, jer vue nema vremena da apply ovu vrednost za this.tagEditingId = tag.id i onda ovaj focus() vec nam treba ovo u nextTick()

			this.$nextTick(() => {
				document.getElementById(`tag-edit-${tag.id}`).focus()
			})
		},

		updateTagName(tag) {
			this.$store.dispatch('updateTagName', {tag})
			this.tagEditingId = ''
		},

		deleteTag(tag) {
			let confirmed = confirm(`Are you sure you want to delete tag ${tag.name}? It is connected to ${tag.video_ids.length} videos.`)

			if(confirmed) {
				this.$store.dispatch('deleteTag', {tag})
			}
		},

		startNewTag() {
			this.isEditingNewTag = true
			this.$nextTick(() => {
				document.getElementById('new-tag-name').focus()
			})
		},

		createTag() {
			if(this.newTagName.length > 0) {
				this.$store.dispatch('createTag', {name: this.newTagName})
				this.newTagName = ''
			}
			this.isEditingNewTag = false
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
	margin: 0 10px;
}
</style>