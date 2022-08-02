import $service from '@/callApi/role'

export default {
    namespaced: true,
    state: {
        roles: [],
        profilRoles: [],
        TechnicalProfiles: [],
        token: false,
    },
    getters: {
        getAllRole: (state) => state.roles,
        getAllProfilRoles: (state) => state.profilRoles,
        getAllTechnicalProfile: (state) => state.TechnicalProfiles,
        getToken: (state) => state.token,
    },
    mutations: {
        SET_ALLROLES(state, val) {
            state.roles = val
        },

        SET_ALLPROFILROLES(state, val) {
            state.profilRoles = val
        },

        SET_ALLTECHNICALPROFILE(state, val) {
            state.TechnicalProfiles = val
        },
       
       
        SET_TOKEN(state, val) {
            state.token = val
        },
    },
    actions: {
        async getAllRoleAction({ commit }) {
            const response = await $service.allRoles()
            commit('SET_ALLROLES', response.data)
            //commit('SET_TOKEN', response.data.token)
            return response.data
        },

        async getAllProfilRoleAction({ commit }) {
            const response = await $service.allProfilRoles()
            commit('SET_ALLPROFILROLES', response.data)
           
            return response.data
        },

        async createRoleAction({ commit }, payload) {
            const response = await $service.createRole(payload)
           
            return response.data
        },

        async createProfileRoleAction({ commit }, payload) {
            const response = await $service.createProfilRole(payload)
           
            return response.data
        },

        async deleteRoleAction({ commit }, payload) {
            const response = await $service.deleteRole(payload)
           
            return response.data
        },

        async deleteProfileRoleAction({ commit }, payload) {
            const response = await $service.deleteProfileRole(payload)
           
            return response.data
        },

        async updateProfileRoleAction({ commit }, payload) {
            const response = await $service.updateProfileRole(payload)
           
            return response.data
        },
        //technical profiles-------------------------------------------------

        async getAllTechnicalProfilAction({ commit }) {
            const response = await $service.getTechnicalProfile()
            commit('SET_ALLTECHNICALPROFILE', response.data)
           
            return response.data
        },

        async createTechnicalProfileAction({ commit }, payload) {
            const response = await $service.createTechnicalProfile(payload)
           
            return response.data
        },

        async updateTechnicalProfileAction({ commit }, payload) {
            const response = await $service.updateTechnicalProfile(payload)
           
            return response.data
        },

        async deleteTechnicalProfileAction({ commit }, payload) {
            const response = await $service.deleteTechnicalProfile(payload)
           
            return response.data
        },

      
    },
}
