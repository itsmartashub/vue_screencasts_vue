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
		...mapState({
        	users: s => s.users.users
      })
	},

	mounted() {
		this.$store.dispatch('users/loadAll')
	},

	methods: {
		loginUser(user) {
			this.$store.dispatch('users/login', user)
		}
	},
}
</script>