<template>
	<v-container grid-list-xs>
		<div v-for="user in users" :key="user.id">
			{{ user.name }} <v-btn color="#108775" dark x-small @click="loginUser(user)">Login</v-btn>
		</div>
	</v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'AdminUserList',

	computed: {
		...mapState(['users']),
	},

	mounted() {
		this.$store.dispatch('loadUsers')
	},

	methods: {
		loginUser(user) {
			this.$store.dispatch('loginUser', user)
		}
	},
}
</script>

<style>

</style>