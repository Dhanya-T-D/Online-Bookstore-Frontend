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

//    add book



async addBook({ rootGetters }, payload) {
  try {
    const res = await axios.post(`${rootGetters.getUrl}/api/publisher/add/book`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (res.status >= 200 && res.status < 300) {
      console.log(res);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error while adding book:', error);
    return false;
  }
},



// search book by category 

async searchBooksByCategory({rootGetters,commit }, payload) {  
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/publisher/search/book/category?pubId=${payload.pubId}&catId=${payload.catId}`);
      if(response.status >=200 && response.status<300)
      {
        commit('setBookListByPubId', response.data)
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
      const response = await axios.get(`${rootGetters.getUrl}/api/publisher/search/book/language?pubId=${payload.pubId}&languageId=${payload.languageId}`);
      if(response.status >=200 && response.status<300)
      {
        commit('setBookListByPubId', response.data)
        return true;
      }
    }
    catch (error) {
        
        return false;  // Indicate failure
    }


},

// list by published date

async searchBooksByPublishedDate({rootGetters,commit }, payload) {  
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/publisher/search/book/date?pubId=${payload.pubId}&publishedDate=${payload.publishedDate}`);
      if(response.status >=200 && response.status<300)
      {
        commit('setBookListByPubId', response.data)
        return true;
      }
    }
    catch (error) {
        
        return false;  // Indicate failure
    }


},

//  list book between dates

async searchBooksBetweenPublishedDate({rootGetters,commit }, payload) {  
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/publisher/search/book/between/published/date?pubId=${payload.pubId}&startDate=${payload.startDate}&endDate=${payload.endDate}`);
      if(response.status >=200 && response.status<300)
      {
        commit('setBookListByPubId', response.data)
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
        `${rootGetters.getUrl}/api/publisher/searchBooksByCatAndLang`,
        {
          params: {
            pubId: payload.pubId,
            catId: payload.catId,
            languageId: payload.languageId,
          },
        }
      );
      if (res.status >= 200 && res.status < 300) {
        commit('setBookListByPubId', res.data);
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
    const url = `${rootGetters.getUrl}/api/publisher/search/book/name?pubId=${payload.pubId}&bookName=${encodeURIComponent(payload.bookName)}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      commit('setBookListByPubId', response.data);
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
    const url = `${rootGetters.getUrl}/api/publisher/search/book/author?pubId=${payload.pubId}&author=${encodeURIComponent(payload.author)}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      commit('setBookListByPubId', response.data);
      return response.data; // Return filtered books
    }
  } catch (error) {
    console.error("Error searching books by name:", error);
    return [];
  }
},
  
// delete book



  async deleteBook({ rootGetters }, payload) {
    try {
      const res = await axios.delete(`${rootGetters.getUrl}/api/publisher/delete/book?pubId=${payload.pubId}&bookId=${payload.bookId}`);
  
      if (res.status >= 200 && res.status < 300) {
        console.log(res);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error while deleting book:', error);

    }
  },

  // update book

  async updateBook({ rootGetters }, payload) {
    try {
      const formData = new FormData();
      
      // Add all the form fields without type specification
      formData.append('pubId', payload.pubId);
      formData.append('bookId', payload.bookId);
      formData.append('bookName', payload.bookName);
      formData.append('author', payload.author);
      formData.append('price', payload.price);
      formData.append('edition', payload.edition);
      formData.append('availableCopies', payload.availableCopies);
      formData.append('publishedDate', payload.publishedDate);
      formData.append('catId', payload.catId);
      formData.append('languageId', payload.languageId);
      
      // Add cover image if provided
      if (payload.coverImage) {
        console.log('coverimage',payload.coverImage);
        formData.append('coverImage', payload.coverImage);
      }
  
      const res = await axios.put(`${rootGetters.getUrl}/api/publisher/update/book/details`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (res.status >= 200 && res.status < 300) {
        console.log(res);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error while updating book:', error);
      return false;
    }
  }
    

}