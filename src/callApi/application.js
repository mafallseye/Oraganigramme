import $http from "@/libs/axios";


export default {

  allApplications() {
    return $http.get("/api/v1/organigram/application/all");
  },

 

 
  
};
