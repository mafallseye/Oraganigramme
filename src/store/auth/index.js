import $service from '@/callApi/auth'

export default {
    namespaced: true,
    state: {
        uid: null,
        user: null,
        pwd: null,
        userRole : null,
        token: false,
    },
    getters: {
        getUid: (state) => state.uid,
        getUser: (state) => state.user,
        getPwd: (state) => state.pwd,
        getUserRole: (state) => state.userRole,
        getToken: (state) => state.token,
    },
    mutations: {
        SET_UID(state, val) {
            state.uid = val
        },
        SET_USER(state, val) {
            state.user = val
        },
        SET_PWD(state, val) {
            state.pwd = val
        },
        SET_USERROLE(state, val) {
            state.userRole = val
        },
        SET_TOKEN(state, val) {
            state.token = val
        },
    },
    actions: {
        async loginAction({ commit }, payload) {
            const response = await $service.login(payload)
            //localStorage.setItem('pwd', payload.password)
            localStorage.setItem('userRole', response.data.user_groups)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('uid', JSON.stringify(response.data.uid))
            commit('SET_UID', JSON.stringify(response.data.uid))
            commit('SET_USER', response.data.user_info)
            commit('SET_TOKEN', response.data.token)
            return response.data
        },

        async logoutAction({ commit },){
            const response = await $service.logout()
            return response.data
        },
    },
}
