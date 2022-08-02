import $service1 from '@/callApi/ask'
export default {
    namespaced: true,
    state: {
        pending: [],

        ask: [],
       
    },
    getters: {
        getAsk: (state) => state.ask,
        getPending: (state) => state.pending,
    },
    mutations: {
        SET_ASK(state, ask) {
            state.ask = ask
        },
        SET_REQUEST(state, pending) {
            state.pending = pending
        },
    },
    actions: {
        async approversAction({ commit }) {
            const response = await $service1.approvers()

            let pending = response.data.data
            console.log('pending')
            console.log(pending)
            commit('SET_REQUEST', pending)

            return response.data
        },

        async askAction({ commit }) {
            const response = await $service1.askProfile()

            let ask = response.data
            console.log('ask')
            console.log(ask)
            commit('SET_ASK', ask)

            return response.data
        },
        async profileAction({ commit }, payload) {
            const response = await $service1.profileRole(payload)
            console.log(response)
            return response.data
        },
    },
    modules: {},
}
