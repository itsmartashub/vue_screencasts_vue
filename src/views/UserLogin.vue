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
			let user = await this.$store.dispatch('users/login', loginInfo)
			
			if(user.error) {
				this.$store.dispatch('snackbar/setSnackbar', { color: 'error', text: user.error })
			} else {
				// alert(`Thank you for signing in, ${user.name}!`)
				this.$store.dispatch('snackbar/setSnackbar', { color: '#00c58e', text: `Thank you for signing in,  ${user.name}!` })

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