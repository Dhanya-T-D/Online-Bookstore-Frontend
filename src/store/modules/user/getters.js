export default{

    getCategory : (state) =>state.category,
    getLanguage: (state) => state.language,
    getBookList : (state) => state.bookList,
    getBookListBySearch(state) {
        return state.bookList || [];
      },
      cartItems: state => state.cartItems,
      cartTotal: state => state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      cartItemCount: state => state.cartItems.length,
      

}