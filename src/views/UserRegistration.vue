<template>
	<v-container>
		<UserAuthForm :submitForm="registerUser" buttonText="Register" hasName=true />
	</v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm.vue'

export default {
	name: 'UserRegistration',

	components: { UserAuthForm },

	methods: {
		async registerUser(registrationInfo) {
			let user = await this.$store.dispatch('registerUser', registrationInfo)
			
			if(user.error) {
				alert(user.error)
			} else {
				alert(`Welcome to our app, ${user.name}!`)
			}
			// this.$router.push({ name: 'home' })
		}
	},
}
</script>

<style>

</style>