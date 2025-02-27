export default {
    setRole(state, payload){
        state.role = payload;
        sessionStorage.setItem('role',payload);
    },
    setLoginDetails(state, payload){
        state.loginDetails = payload;
        sessionStorage.setItem('loginDetails',JSON.stringify(payload));
    }  
}

