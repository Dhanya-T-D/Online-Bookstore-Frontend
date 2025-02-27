export default {
    
    setBookListByPubId(state, payload){
        state.bookList = payload;
        sessionStorage.setItem('bookList',JSON.stringify(payload));
    },

    // list category

    setCategory(state,payload){
        state.category = payload;
        sessionStorage.setItem('category',JSON.stringify(payload));
    }
}