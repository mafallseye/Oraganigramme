import $service1 from '@/callApi/approvers'
export default {
    namespaced: true,
    state: {
       
        nom:"",
        id:"",
        etat:"approve",
        etat1:"rejected",
        ask:[],
        roleId:"",
        request:[]

    },
    getters: {
   
        getAsk: (state) => state.ask,
        getApprovers: (state) => state.request,

    },
    mutations: {
     
        SET_ASK(state, ask) {
            state.ask = ask
        },
        SET_APPROVERS(state, request) {
            state.request = request
        }
    },
    actions: {

      
        async approveAskAction({commit},payload){
            const response=await $service1.approveask(payload)
            console.log(response);
            return response.data
        },
        async askAction({ commit }) {
            const response = await $service1.askProfile()

            let ask = response.data.data
            console.log('ask');
            console.log(ask);
            commit('SET_ASK', ask)


            return response.data
        },
      
        
        async requestAction({ commit }) {
            const response = await $service1.requestAsk()
    
            let request = response.data
            console.log('request');
            console.log(request);
            commit('SET_APPROVERS', request)
    
    
            return response.data
        },
    },
    modules: {
    }
}
