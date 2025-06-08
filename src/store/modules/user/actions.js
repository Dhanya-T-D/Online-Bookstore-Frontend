import axios from "axios"
import { ADD_TO_CART } from './mutations'
import { SET_CART_ITEMS } from './mutations'
import { UPDATE_CART_QUANTITY } from './mutations'

export default {

      // user registration
      async userRegistration({rootGetters},payload){
        const res = await axios.post(`${rootGetters.getUrl}/api/User/add/user`,payload);
        if(res.status >= 200 || res.status < 300){
            console.log(res);
            return true;
        }
    },
     // category dropdown

        async categoryList({rootGetters,commit}){
            const res=await axios.get(`${rootGetters.getUrl}/api/Admin/list/category`);
            if(res.status >= 200 || res.status < 300){
                commit('setCategory',res.data)
                console.log(res.data);
                return true;
            }
        },

     // language dropdown
    
        async languageList({rootGetters,commit}){
            const res=await axios.get(`${rootGetters.getUrl}/api/Admin/display/language`);
            if(res.status >= 200 || res.status < 300){
                commit('setLanguage',res.data)
                console.log(res);
                return true;
            }
    },

    //  list all books

    async listBooks({ rootGetters, commit }) {
        const res = await axios.get(`${rootGetters.getUrl}/api/User/list/all/books`);
        if (res.status >= 200 && res.status < 300) {
            commit('setBookList', res.data);
            return true;
        }
        return false;
    },

    // search book by category 

async searchBooksByCategory({rootGetters,commit }, payload) {  
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/User/search/Category?catId=${payload.catId}`);
      if(response.status >=200 && response.status<300)
      {
        commit('setBookList', response.data)
        return true;
      }
    }
    catch (error) {
        
        return false;  // Indicate failure
    }


},

//  search book by language
async searchBooksByLanguage({rootGetters,commit }, payload) {  
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/User/search/language?languageId=${payload.languageId}`);
      if(response.status >=200 && response.status<300)
      {
        commit('setBookList', response.data)
        return true;
      }
    }
    catch (error) {
        
        return false;  // Indicate failure
    }


},

// search book by category and language
async searchBooksByCatAndLang({ rootGetters, commit }, payload) {
    try {
      const res = await axios.get(
        `${rootGetters.getUrl}/api/User/searchBooksByCatAndLang`,
        {
          params: {
            catId: payload.catId,
            languageId: payload.languageId,
          },
        }
      );
      if (res.status >= 200 && res.status < 300) {
        commit('setBookList', res.data);
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      return false;
    }
  },

  
//  search by book name

async searchBooksByName({ rootGetters,commit }, payload) {
  try {
    const url = `${rootGetters.getUrl}/api/User/search/book/name?bookName=${encodeURIComponent(payload.bookName)}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      commit('setBookList', response.data);
      return response.data; // Return filtered books
    }
  } catch (error) {
    console.error("Error searching books by name:", error);
    return [];
  }
},

//  search book by author name

async searchBooksByAuthorName({ rootGetters,commit }, payload) {
  try {
    const url = `${rootGetters.getUrl}/api/User/search/author/name?author=${encodeURIComponent(payload.author)}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      commit('setBookList', response.data);
      return response.data; // Return filtered books
    }
  } catch (error) {
    console.error("Error searching books by name:", error);
    return [];
  }
},

// edit user data
async updateUserDetails({ rootGetters },payload) {
  try {

     const res = await axios.put(`${rootGetters.getUrl}/api/User/edit/user/details`,null, {
      params: {
        userid: payload.userid,
        email: payload.email,
        phone:payload.phone
      }
    });

    if (res.status >= 200 && res.status < 300) {
      console.log(res);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error while updating user details:', error);
    return false;
  }
},

// get user details
async getUserDetails({ rootGetters }, payload) {
  try {
    const res = await axios.get(`${rootGetters.getUrl}/api/User/display/user/details`, {
      params: {
        userid: payload.userid
      }
    });
    
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
},

//  add item to cart
async addToCart({ commit, rootState }, { bookId, userid, quantity }) {
  try {
    const response = await axios({
      method: 'post',
      url: `${rootState.base_url}/api/cart/add`,
      params: {
        bookId,
        userid,
        quantity
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status >= 200 && response.status < 300) {
      commit(ADD_TO_CART, response.data);
      return response.data;
    } else {
      throw new Error('Failed to add item to cart');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
},

//  display cart items

async getCartItems({ commit, rootState }, userid) {
  try {
    const response = await axios.get(`${rootState.base_url}/api/cart/items`, {
      params: { userid }
    });

    if (response.status >= 200 && response.status < 300) {
      commit(SET_CART_ITEMS, response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
},


// update cart
async updateCartQuantity({ commit, rootState }, { bookId, userid, quantity }) {
  try {
    const response = await axios.put(`${rootState.base_url}/api/cart/updateQuantity`, null, {
      params: {
        bookId,
        userid,
        quantity
      }
    });

    if (response.status >= 200 && response.status < 300) {
      commit(UPDATE_CART_QUANTITY, { bookId, quantity });
      return response.data;
    }
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
},

async removeFromCart({ commit }, { bookId, userid }) {
  try {
    const response = await axios.delete(`http://localhost:8448/api/cart/removeItem`, {
      params: {
        bookId,
        userid
      }
    });

    // If your backend responds with success, update Vuex store
    commit('REMOVE_FROM_CART', bookId); // make sure this mutation exists
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}
    
}