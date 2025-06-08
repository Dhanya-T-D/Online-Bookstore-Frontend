export default {

        // list language
        setLanguage(state,payload){
            state.language = payload;
            sessionStorage.setItem('language',JSON.stringify(payload));
        },

        // dashboard stats
        setDashboardStats(state, stats) {
            state.stats = stats;
          },

        //   list category
        
        setCategory(state,payload){
            state.category = payload;
            sessionStorage.setItem('category',JSON.stringify(payload));
        },
        // list publishers

        setPublisher(state,payload){
            state.publisher = payload;
            sessionStorage.setItem('publisher',JSON.stringify(payload));
        },
        setUsers(state,payload){
            state.users = payload;
            sessionStorage.setItem('users',JSON.stringify(payload));
        },

                //   list status
        
                setStatus(state,payload){
                    state.status = payload;
                    sessionStorage.setItem('status',JSON.stringify(payload));
                },
}