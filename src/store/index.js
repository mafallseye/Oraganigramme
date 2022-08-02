import { createStore } from 'vuex'



import largeSidebar from './modules/largeSidebar'
import auth from './auth'
import approvers from './approvers';
import askProfile from './askProfile';
import member from './member'
import role from './role'
import application from './application'



export default  createStore({
    modules: {
        largeSidebar,
        auth,
        member,
        application,
        role,
        approvers,
        askProfile,
       
      
     

        
        
    }
});

