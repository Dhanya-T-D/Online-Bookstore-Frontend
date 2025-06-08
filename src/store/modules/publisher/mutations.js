export default {
    
    setBookListByPubId(state, payload){
        state.bookList = payload;
        sessionStorage.setItem('bookList',JSON.stringify(payload));
    },

    // list category

    setCategory(state,payload){
        state.category = payload;
        sessionStorage.setItem('category',JSON.stringify(payload));
    },

    // list language

    setLanguage(state,payload){
        state.language = payload;
        sessionStorage.setItem('language',JSON.stringify(payload));
    },

    //  delete book
        removeBookFromList(state, bookId) {
          state.books = state.books.filter(book => book.id !== bookId);
        }
      

}