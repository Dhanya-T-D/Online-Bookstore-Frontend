export default {
    setRole(state, payload){
        state.role = payload;
        sessionStorage.setItem('role',payload);
    }
}