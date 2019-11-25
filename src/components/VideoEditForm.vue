<template>
	<v-form v-model="valid">
		<v-text-field 
			v-model="video.name"
			label="Name"
			counter=50
			:rules="[required('name'), minLength('name', 5), maxLength('name', 50)]"
		/>

		<v-textarea 
			v-model="video.description"
			label="Description"
			:rules="[required('description')]"
			counter=true
		/>

		<v-text-field
			v-model="video.videoUrl" 
			label="Video URL" 
			hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo." 
			:rules="[required('video URL')]"
		/>

		<v-text-field
			v-model="video.thumbnail"
			label="Thumbnail URL"
			:rules="[required('thumbnail URL')]"
		/>

		<v-btn @click="saveVideo" :disabled="!valid" color="amber">{{ buttonText }}</v-btn>
	</v-form>
</template>

<script>
export default {
	name: 'VideoEditForm',

	props: ['video', 'saveVideo', 'buttonText'],
	
	data() {
		return {
			valid: false,

			required(propertyType) {
				return val => val && val.length > 0 || `You must input a ${propertyType}`
			},

			minLength(propertyType, minLength) {
				return val => val && val.length >= minLength || `${propertyType} must be at least ${minLength} characters`
			},

			maxLength(propertyType, maxLength) {
				return val => val && val.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
			},
		}
	},
}
</script>

<style>

</style>