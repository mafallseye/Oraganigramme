import $service from '@/callApi/member'

export default {
    namespaced: true,
    state: {
        users: [],
        token: false,
    },
    getters: {
        getAllUsers: (state) => state.users,
        getToken: (state) => state.token,
    },
    mutations: {
        SET_ALL_USERS(state, val) {
            state.users = val
        },
       
        SET_TOKEN(state, val) {
            state.token = val
        },
    },
    actions: {
        async addMemberAction({ commit }, payload) {
            const response = await $service.addMembers(payload)
           
           
            return response.data
        },

        async getAllMemberAction({ commit }) {
            const response = await $service.getMembers()
           
            commit('SET_ALL_USERS', response.data)
            return response.data
        },

      
    },
}
