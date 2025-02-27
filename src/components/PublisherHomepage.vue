<template>
  <!-- ------nav bar ----------- -->
<v-app-bar app color="#8D6E63" dark>
      <v-toolbar-title class="storename">Magic Margins</v-toolbar-title>
      <v-card
    class="mx-auto"
    color="surface-light"
  >
 
  </v-card>

  <!-- -----category dropdown button------------- -->
  
  <v-select clearable density="comfortable" variant="outlined" label="Select a category" width="300"
                :items="category" item-title="catName" item-value="catId" v-model="selectedCat">
            </v-select>
  

  <!-- ----------- language dropdown button------------------ -->
  
  
  
  <!-- --------- search bar  -->

  <v-text-field
      class="searchbar"
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search"
        variant="solo"
        hide-details
        single-line
        @click:append-inner="onClick"
      ></v-text-field>
      <v-spacer></v-spacer>

       <!-- add  book -->

       <v-btn class="addbutton" color="white" @click="addBook">
      <v-icon left>mdi-plus</v-icon>
      Add Book
     </v-btn>
    
     <!-- revenue -->
    <v-btn class="addbutton" color="white"> Revenue </v-btn>


    <!------------- profile---------- -->
    <v-btn icon>
      <v-avatar size="40">
        <v-img src="https://randomuser.me/api/portraits/men/1.jpg"></v-img>
      </v-avatar>
    </v-btn>
    
    </v-app-bar>
    <!-- **end of nav bar **-->

<!--  -----------cards ---------- -->
  <div class="d-flex flex-wrap"> 
<v-card
    class="mx-auto"
    max-width="344"
   v-for="book in books" :key="book.id"
  >
    <v-img
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    ></v-img>

    <v-card-title>
      {{book.bookName}}
    </v-card-title>

    <v-card-subtitle>
     <p>1,000 miles of wonder</p> 
      <p>Price</p>
      <p>Quantity</p>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        text="Edit"
      ></v-btn>

      <v-spacer></v-spacer>
      <v-btn
        color="orange-lighten-2"
        text="Delete"
      ></v-btn>
      
    </v-card-actions>

  
  </v-card>

</div>
  
  

</template>


<script>
import { mapGetters } from 'vuex';
  export default {
    data: () => ({
      loaded: false,
      loading: false,

    }),

    methods: {
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
      async fetchBookList(){
       const payload=this.loginDetails.id;
       await this.$store.dispatch('publisher/listByPubId',payload)
       
      }

     
    },
    computed:{
      ...mapGetters(['getLoginDetails']),
      ...mapGetters('publisher',['getBookListByPubId','getCategory']),
      loginDetails(){
        return this.getLoginDetails;
      },
      books(){
        return this.getBookListByPubId;
      },
      category(){
        return this.getCategory;
      }
    },
  
mounted(){
  this.fetchBookList();
  this.$store.dispatch('publisher/categoryList')
  }
  }
</script>

<style>
.searchbar{
  width: 30px;  
}
.addbutton{
  background-color: #A1887F;
  margin-right: 20px;
}
</style>