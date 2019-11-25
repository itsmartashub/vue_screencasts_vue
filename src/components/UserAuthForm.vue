<template>
	<v-form v-model="valid">
		<v-text-field
			label="Name"
			v-model="userInfo.name"
			:rules="[required('name'), minLength('name', 3)]"
			autocomplete="username"
			v-if="hasName"
		/>

		<v-text-field
			label="Email"
			v-model="userInfo.email"
			:rules="[required('email'), emailFormat()]"
			autocomplete="email"
		/>

		<v-text-field
			label="Password"
			v-model="userInfo.password"
			:type="showPassword ? 'text' : 'password'"
			:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
			@click:append="showPassword = !showPassword"
			:rules="[required('password'), minLength('email', 8)]"
			counter=true
			autocomplete="current-password"

		/>

			<v-btn color="blue-grey white--text" @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
	</v-form>
</template>

<script>
import validations from '@/utils/validations'

export default {
	name: 'UserAuthForm',

	props: [
		'submitForm',
		'buttonText',
		'hasName'
	],


	data() {
		return {
			valid: false,
			userInfo: {
				email: '',
				password: ''
			},
			showPassword: false,
			...validations,
		}
	},

}
</script>

<style>

</style>