import axios from "axios";
export default {

    //  list languages 

    async fetchLanguages({rootGetters,commit}) {
        try {
          const res = await axios.get(`${rootGetters.getUrl}/api/Admin/display/language`);
          if(res.status >= 200 || res.status < 300){
            commit('setLanguage',res.data)
            console.log(res);
            return true;
        }
        } catch (error) {
          console.error('Error fetching languages:', error);
          throw error;
        }
      },


    //   add language
  
    async addLanguage({ rootGetters }, languageData) {
        try {
          const res = await axios.post(
            `${rootGetters.getUrl}/api/Admin/add/language`,
            languageData,  // Send the languageData in the request body
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          if (res.status >= 200 && res.status < 300) {
            console.log(res);
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error while adding language:', error);
          return false;
        }
      },
  
      //   update language
  
     async updateLanguage({ rootGetters },payload) {
    try {

       const res = await axios.put(`${rootGetters.getUrl}/api/Admin/update/language`,null, {
        params: {
          languageId: payload.languageId,
          languageName: payload.languageName
        }
      });
  
      if (res.status >= 200 && res.status < 300) {
        console.log(res);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error while updating language:', error);
      return false;
    }
  },
  
      //  delete language
      async deleteLanguage({ rootGetters }, payload) {
        try {
          const res = await axios.delete(`${rootGetters.getUrl}/api/Admin/delete/language?=&languageId=${payload.languageId}`);
      
          if (res.status >= 200 && res.status < 300) {
            console.log(res);
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error while deleting language:', error);
    
        }
      },   
      
      //  dashboard stats
      async dashboardStats({rootGetters, commit}) {
        try {
          const res = await axios.get(`${rootGetters.getUrl}/api/Admin/dashboard-stats`);
          if(res.status >= 200 && res.status < 300) {
            commit('setDashboardStats', res.data);
            console.log('Dashboard stats:', res.data);
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error fetching dashboard stats:', error);
          throw error;
        }
      },

      
    //  list category

    async fetchCategory({rootGetters,commit}) {
      try {
        const res = await axios.get(`${rootGetters.getUrl}/api/Admin/list/category`);
        if(res.status >= 200 || res.status < 300){
          commit('setCategory',res.data)
          console.log(res);
          return true;
      }
      } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
      }
    },


  //   add category

  async addCategory({ rootGetters }, categoryData) {
      try {
        const res = await axios.post(
          `${rootGetters.getUrl}/api/Admin/add/category`,
          categoryData,  
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        if (res.status >= 200 && res.status < 300) {
          console.log(res);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error while adding category:', error);
        return false;
      }
    },

    //   update category

    async updateCategory({ rootGetters }, payload) {
      try {
        const res = await axios.put(`${rootGetters.getUrl}/api/Admin/update/category`, null, {
          params: {
            cat_id: payload.cat_id,
            cat_name: payload.cat_name
          }
        });
    
        if (res.status >= 200 && res.status < 300) {
          console.log(res);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error while updating category:', error);
        return false;
      }
    },

      //  delete category
      async deleteCategory({ rootGetters }, payload) {
        try {
          const res = await axios.delete(`${rootGetters.getUrl}/api/Admin/delete/category?cat_id=${payload.cat_id}`);
      
          if (res.status >= 200 && res.status < 300) {
            console.log(res);
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error while deleting category:', error);
          return false;
        }
      },

      // delete book


async deleteBook({ rootGetters }, payload) {
  try {
    const res = await axios.delete(`${rootGetters.getUrl}/api/Admin/delete/book?bookId=${payload.bookId}`);

    if (res.status >= 200 && res.status < 300) {
      console.log(res);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error while deleting book:', error);
    return false;
  }
},

     // update book

  async updateBook({ rootGetters }, payload) {
    try {
      const res = await axios.put(`${rootGetters.getUrl}/api/Admin/update/book`, payload, {
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
  },

      //  list publishers 

      async fetchPublishers({rootGetters,commit}) {
        try {
          const res = await axios.get(`${rootGetters.getUrl}/api/Admin/display/publishers`);
          if(res.status >= 200 || res.status < 300){
            commit('setPublisher',res.data)
            console.log(res);
            return true;
        }
        } catch (error) {
          console.error('Error fetching publishers:', error);
          throw error;
        }
      },

      //  list users
      async fetchUsers({rootGetters,commit}) {
        try {
          const res = await axios.get(`${rootGetters.getUrl}/api/Admin/display/users`);
          if(res.status >= 200 || res.status < 300){
            commit('setUsers',res.data)
            console.log(res);
            return true;
        }
        } catch (error) {
          console.error('Error fetching users:', error);
          throw error;
        }
      },

            // delete publisher


async deletePublisher({ rootGetters }, payload) {
  try {
    const res = await axios.delete(`${rootGetters.getUrl}/api/Admin/delete/publisher?pubId=${payload.pubId}`);

    if (res.status >= 200 && res.status < 300) {
      console.log(res);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error while deleting publisher:', error);
    return false;
  }
},

    //  list status

    async fetchStatus({rootGetters,commit}) {
      try {
        const res = await axios.get(`${rootGetters.getUrl}/api/Admin/displayStatus'`);
        if(res.status >= 200 || res.status < 300){
          commit('setStatus',res.data)
          console.log(res);
          return true;
      }
      } catch (error) {
        console.error('Error fetching status:', error);
        throw error;
      }
    },

    // update publisher status
    
async updatePermission({ rootGetters }, payload) {
  try {
    const res = await axios.put(`${rootGetters.getUrl}/api/Admin/update/permission`, null, {
      params: {
        pubId: payload.pubId,
        statusId: payload.statusId
      }
    });

    if (res.status >= 200 && res.status < 300) {
      console.log(res);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error while updating permission:', error);
    return false;
  }
}


    
 
}