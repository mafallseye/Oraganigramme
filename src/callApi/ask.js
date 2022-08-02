import $http from "@/libs/axios";

const BaseUrl = "https://192.168.1.174:5001"

export default {
    askProfile() {
        return $http.get("/api/v1/organigram/profil/role/all")
    },
    profileRole(payload) {
        return $http.post("/api/v1/organigram/profil/role/request", payload)
    },
    requestAsk(){
        return $http.get('/api/v1/organigram/user/profile_role_request/all')
    },
    approvers() {
        return $http.get("/api/v1/organigram/user/my_request/all")
    },
};
