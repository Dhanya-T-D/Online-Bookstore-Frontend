import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

export default {
    namespaced: true,
    state() {
        return {
            bookList: JSON.parse(sessionStorage.getItem('bookList')) || [],
            category: JSON.parse(sessionStorage.getItem('category')) || [],
        };
    },

    actions,
    mutations,
    getters
}