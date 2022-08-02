import $http from "@/libs/axios";

const BaseUrl = "https://192.168.1.174:5001"

export default {
    getMembers() {
        return $http.get("/api/v1/organigram/user/all")
    },
   addMembers(payload) {
        return $http.post("/api/v1/organigram/user/register", payload)
    }

};
