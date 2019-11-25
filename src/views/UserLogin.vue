<template>
	<v-container grid-list-xs>
		<UserAuthForm :submitForm="loginUser" buttonText="Login" />
	</v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
	name: 'UserLogin',
	components: { UserAuthForm },

	methods: {
		async loginUser(loginInfo) {
			let user = await this.$store.dispatch('loginUser', loginInfo)
			
			if(user.error) {
				alert(user.error)
			} else {
				alert(`Thank you for signing in, ${user.name}!`)
			}
			// this.$router.push({ name: 'home' })
		}
	},
}
</script>

<style>

</style>