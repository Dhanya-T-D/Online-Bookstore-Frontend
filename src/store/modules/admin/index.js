import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

export default {
    namespaced: true,
    state() {
        return {
            category: JSON.parse(sessionStorage.getItem('category')) || [],
            language: JSON.parse(sessionStorage.getItem('language')) || [],
            publisher: JSON.parse(sessionStorage.getItem('publisher')) || [],
            users: JSON.parse(sessionStorage.getItem('users')) || [],
            status: JSON.parse(sessionStorage.getItem('status')) || [],
           
        };
    },

    actions,
    mutations,
    getters
}