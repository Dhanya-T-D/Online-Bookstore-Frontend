export default{
    getBookListByPubId : (state) => state.bookList,
    getCategory : (state) =>state.category,
    getLanguage: (state) => state.language,
    getBookListBySearch(state) {
        return state.bookList || [];
      },
      
    
}