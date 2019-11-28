<template>
  <v-app>
    <v-app-bar app color="#00c58e">
		 <v-toolbar-title class="headline text-uppercase">
			 <v-btn text to="/">Vue Screencasts</v-btn>
		 </v-toolbar-title>

		<v-btn text to="/admin/videos" v-if="currentUser.admin">Admin</v-btn>

      <v-spacer></v-spacer>

		
		<div v-if="currentUser.name">
			{{ currentUser.name }}
			<v-btn class="mr-2" color="red" dark @click="logoutUser">Logout</v-btn>
		</div>

      <div v-else text>
        <v-btn class="mr-2" to="/login" color="#108775" dark>Login</v-btn>
        <v-btn class="mr-2" to="/registration" color="#2f495e" dark>Register</v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

	<v-snackbar
		v-for="(snackbar, index) in snackbars.filter(s => s.showing)" :key="snackbar + Math.random()"
		:color="snackbar.color"
		v-model="snackbar.showing"
		:timeout="snackbar.timeout"
		:style="`bottom: ${(index * 60) + 8}px`"
	>
		{{ snackbar.text }}
		<v-btn dark text @click.native="snackbar.showing = false">Close</v-btn>
	</v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  created() {
	  this.$store.dispatch('videos/loadAll')
	  this.$store.dispatch('users/loadCurrent')
	  this.$store.dispatch('tags/loadAll')
  },

  computed: {
	//   ...mapState(['currentUser', 'snackbars']) // bez modules i namespaced
	  ...mapState({
		  currentUser: state => state.users.currentUser,
		  snackbars: state => state.snackbar.snackbars
		}) // sa modules i namespaced: true
  },

  methods: {
	  logoutUser() {
		  this.$store.dispatch('users/logout')
		  this.$nextTick(() => {
			  this.$router.push('/')
		  })
	  }
  },
}
</script>
