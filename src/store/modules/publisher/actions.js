import axios from "axios"
export default {
    // publisher registration
    async pubReg({rootGetters},payload){
        const res = await axios.post(`${rootGetters.getUrl}/api/publisher/Registration`,payload);
        if(res.status >= 200 || res.status < 300){
            console.log(res);
            return true;
        }
    },


    // list all books 
    async listByPubId({rootGetters,commit},payload){
        const res=await axios.get(`${rootGetters.getUrl}/api/publisher/display/Publisher/books?pubId=${payload}`);
        if(res.status >= 200 || res.status < 300){
            commit('setBookListByPubId',res.data)
            console.log(res);
            return true;
        }
    },

    // category

    async categoryList({rootGetters,commit}){
        const res=await axios.get(`${rootGetters.getUrl}/api/Admin/list/category`);
        if(res.status >= 200 || res.status < 300){
            commit('setCategory',res.data)
            console.log(res);
            return true;
        }
    }
}