import $service from '@/callApi/application'

export default {
    namespaced: true,
    state: {
        apps: [],

        token: false,
    },
    getters: {
        getAllApps: (state) => state.apps,

        getToken: (state) => state.token,
    },
    mutations: {
        SET_ALLAPPS(state, val) {
            state.apps = val
        },

        SET_TOKEN(state, val) {
            state.token = val
        },
    },
    actions: {
        async getAllAppsAction({ commit }) {
            const response = await $service.allApplications()
            commit('SET_ALLAPPS', response.data)

            return response.data
        },
    },
}
