export default {
	namespaced: true,
	state: {
		snackbars: []
	},
	mutations: { //! mutations nema rootState
		SET_SNACKBAR(state, snackbar) {
			state.snackbars = state.snackbars.concat(snackbar)
		},
	},
	actions: {
		setSnackbar({commit}, snackbar) {
			snackbar.showing = true
			snackbar.color = snackbar.color || '#00c58e'
			commit('SET_SNACKBAR', snackbar)
		},
	},
	getters: {},
	modules: {}
}