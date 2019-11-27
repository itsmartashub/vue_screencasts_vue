<template>
	<v-container grid-list-xs>
		<UserAuthForm :submitForm="loginUser" buttonText="Login" />
	</v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'
import { userInfo } from 'os'

export default {
	name: 'UserLogin',
	components: { UserAuthForm },

	methods: {
		async loginUser(loginInfo) {
			let user = await this.$store.dispatch('loginUser', loginInfo)
			
			if(user.error) {
				this.$store.dispatch('setSnackbar', { color: 'error', text: user.error })
			} else {
				// alert(`Thank you for signing in, ${user.name}!`)
				this.$store.dispatch('setSnackbar', { color: '#00c58e', text: `Thank you for signing in,  ${user.name}!` })

				if(user.admin) {
					this.$router.push('/admin/videos')

				} else {
					this.$router.push('/')
				}
			}
		}
	},
}
</script>

<style>

</style>