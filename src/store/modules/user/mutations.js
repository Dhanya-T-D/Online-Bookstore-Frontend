export const ADD_TO_CART = 'ADD_TO_CART';
export const SET_CART_ITEMS = 'SET_CART_ITEMS'
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export default {
    
    setBookList(state, payload){
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

    [ADD_TO_CART](state, item) {
        state.cartItems.push(item);
      },

      [SET_CART_ITEMS](state, items) {
        state.cartItems = items
      },

      [UPDATE_CART_QUANTITY](state, { bookId, quantity }) {
        const item = state.cartItems.find(item => item.bookId === bookId);
        if (item) {
          item.quantity = quantity;
        }

      },

      REMOVE_FROM_CART(state, bookId) {
        state.cartItems = state.cartItems.filter(item => item.bookId !== bookId);
      },
    



}