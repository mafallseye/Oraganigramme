import $http from "@/libs/axios";

const BaseUrl = "https://192.168.1.174:5001"

export default {
  
    approveask(payload) {
        const Token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjE1OTAwNDYsImlhdCI6MTY1OTM4MjA0Niwic3ViIjoiMDAwMDExNiJ9.AICKdOKaFzQPd2ZxZUS0SQpL_dPXtKmlefaE0j7HUig"
        return $http.post(`/api/v1/organigram/user/profil_role/grant_deny/${Token}`, payload)
    },
    askProfile() {
        return $http.get("/api/v1/organigram/profil/role/all")
    },
   
    requestAsk(){
        return $http.get('/api/v1/organigram/user/profile_role_request/all')
    }
};
