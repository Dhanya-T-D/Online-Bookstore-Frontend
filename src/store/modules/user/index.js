import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';


export default {
    namespaced: true,
    state() {
        return {
       
            category: JSON.parse(sessionStorage.getItem('category')) || [],
            language: JSON.parse(sessionStorage.getItem('language')) || [],
            bookList: JSON.parse(sessionStorage.getItem('bookList')) || [],
            cartItems: [],
            orders: [],
             orderDetails: {},
      
           
        };
    },

    actions,
    mutations,
    getters
}