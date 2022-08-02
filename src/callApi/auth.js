import $http from "@/libs/axios";

const BaseUrl = "https://192.168.1.174:5001"

export default {

  login(payload) {
    return $http.post("/api/v1/auth/login",payload);
  },

  logout(){
    return $http.post("/api/v1/auth/logout");
  }
};
