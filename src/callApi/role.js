import $http from "@/libs/axios";


export default {

  allRoles() {
    return $http.get("/api/v1/organigram/roles");
  },

  allProfilRoles() {
    return $http.get("/api/v1/organigram/profil/role/all");
  },

  createRole(payload){
    return $http.post("/api/v1/organigram/role/create", payload);
  },

  createProfilRole(payload){
    return $http.post("/api/v1/organigram/profil/role/create", payload);
  },

  deleteRole(payload){
    return $http.delete("/api/v1/organigram/role/delete", payload);
  },

  deleteProfileRole(payload){
    return $http.delete("/api/v1/organigram/profil/role/delete", payload);
  },

  updateProfileRole(payload){
    return $http.put("/api/v1/organigram/profil/role/update", payload);
  },

  getTechnicalProfile(){
    return $http.get("/api/v1/organigram/profil/technical/all");
  },

  createTechnicalProfile(payload){
    return $http.post("/api/v1/organigram/profil/technical/create", payload);
  },

  updateTechnicalProfile(payload){
    return $http.put("/api/v1/organigram/profil/technical/update", payload);
  },

  deleteTechnicalProfile(payload){
    return $http.delete("/api/v1/organigram/profil/technical/delete", payload);
  },

 
  
};
