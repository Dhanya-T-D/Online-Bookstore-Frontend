import { createStore } from "vuex";
import rootActions from './actions.js';
import rootGetters from './getters.js';
import rootMutations from './mutations.js';
import adminModule from './modules/admin/index.js';
import publisherModule from './modules/publisher/index.js';
import userModule from './modules/user/index.js'

const store = createStore({
    modules:{
        admin:adminModule,
        publisher:publisherModule,
        user:userModule
    },
    state() {
        return {
            base_url: 'http://localhost:8448',
            role: JSON.parse(sessionStorage.getItem('role')) || '',
            loginDetails: JSON.parse(sessionStorage.getItem('loginDetails')) || [],
        };
    },
    mutations:rootMutations,
    actions:rootActions,
    getters:rootGetters
})

export default store;