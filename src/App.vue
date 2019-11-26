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
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  components: {
  },

  created() {
	  this.$store.dispatch('loadVideos')
	  this.$store.dispatch('loadCurrent')
  },

  computed: {
	  ...mapState(['currentUser'])
  },

  data: () => ({
    //
  }),

  methods: {
	  logoutUser() {
		  this.$store.dispatch('logoutUser')
	  }
  },
};
</script>
