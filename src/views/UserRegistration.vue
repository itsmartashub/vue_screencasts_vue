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
			let user = await this.$store.dispatch('users/register', registrationInfo)
			
			if(user.error) {
				this.$store.dispatch('snackbar/setSnackbar', { color: 'error', text: user.error })
			} else {
				this.$store.dispatch('snackbar/setSnackbar', { color: '#00c58e', text: `Welcome to our app,  ${user.name}!` })
				this.$router.push('/')
			}
		}
	},
}
</script>