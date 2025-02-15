import { createStore } from "vuex";
import rootActions from './actions.js';
import rootGetters from './getters.js';
import rootMutations from './mutations.js'

const store = createStore({
    // modules:{
    //     admin:adminModule,
    //     publisher:publisherModule,
    //     user:userModule
    // },
    state() {
        return {
            base_url: 'http://localhost:8448',
            role: JSON.parse(sessionStorage.getItem('role')) || '',
        };
    },
    mutations:rootMutations,
    actions:rootActions,
    getters:rootGetters
})

export default store;