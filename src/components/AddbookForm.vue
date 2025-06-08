
<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title class="text-h5"  >{{ title }}        
        <v-icon  class="deletebtn"  @click="closeDialog">mdi-close</v-icon>  </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Book Name" v-model="bookname" variant="outlined"  class="custom-label" :rules="[rules.required]"/>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Author" variant="outlined" v-model="author" :rules="[rules.required]"/>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Price" variant="outlined" v-model="price" :rules="[rules.required]"/>
            </v-col>

            <v-col cols="12" md="6">
            <v-select class="dropdown"  variant="outlined" label="Select Category" 
                :items="category" item-title="catName" item-value="catId" v-model="selectedCat" :rules="[rules.required]">
            </v-select>
          </v-col>

          <v-col cols="12" md="6">
              <v-select class="dropdown"  variant="outlined" label="Select Language"  
                :items="language" item-title="languageName" item-value="languageId" v-model="selectedLang" :rules="[rules.required]">
              </v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Published Date" variant="outlined" v-model="publishedDate"  type="date" :rules="[rules.required]"/>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Edition" variant="outlined" v-model="edition" :rules="[rules.required]" />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Available Copies" variant="outlined" v-model="availableCopies" :rules="[rules.required]"/>
            </v-col>

           <v-col cols="12" md="6">
              <v-file-input label="Cover Image" variant="outlined"  v-model="coverImage" accept="image/*"  @change="handleFileUpload" :rules="[rules.required]" />
            </v-col> 


          </v-row>
      
          <v-btn color="primary" class="addbtn" type="submit">{{ buttonName }}</v-btn>
         
    
        </v-form>
      </v-card-text>
    </v-card>


  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

  export default{
    data :() => ({
      bookname:'',
      author:'',
      price:'',
      publishedDate:'',
      edition:'',
      availableCopies:'',
      selectedCat:null,
      selectedLang:null,
      coverImage:'',
      
      
      rules : {
  required: (value) => {
    if(value) return true;
    return 'This field is required';
  }
  
},
    }),
    props:{
      title:String,
      buttonName: String
    },
    emits:['close','submitForm'],
   

 methods:{
 

async onSubmit() {
  const { valid } = await this.$refs.form.validate();
  if (valid) {
    try {
      const formData = new FormData();

      formData.append('bookModel', new Blob([JSON.stringify({
        bookName: this.bookname,
        author: this.author,
        price: this.price,
        publishedDate: this.publishedDate,
        edition: this.edition,
        availableCopies: this.availableCopies,
        catId: this.selectedCat,
        languageId: this.selectedLang,
        pubId: this.pubDetails.id,
      })], { type: 'application/json' }));

      formData.append('coverImage', this.coverImage);
      this.$emit('submitForm',formData)
      // const res = await this.$store.dispatch('publisher/addBook', formData);

     
        this.bookname = '';
        this.author = '';
        this.price = '';
        this.publishedDate = '';
        this.edition = '';
        this.availableCopies = '';
        this.selectedCat = '';
        this.selectedLang = '';
        this.coverImage = '';
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('Form validation failed');
  }
},

closeDialog(){
  this.$emit('close',false);
}
    },

    computed:{
      ...mapGetters(['getLoginDetails']),
      ...mapGetters('publisher',['getCategory','getLanguage']),

      category(){
        return this.getCategory;
      },
      language(){
        return this.getLanguage;
      },
      pubDetails(){
        return this.getLoginDetails;
      }
    },
  
mounted(){
  this.$store.dispatch('publisher/categoryList');
  this.$store.dispatch('publisher/languageList');
  }
  }
</script>



<style scoped>

.addbtn{
  width: 100px;
  margin-left: 480px;
}

.deletebtn{
  margin-left: 885px;
  right: -80px;

}

.deletebtn{
  font-size: 30px;
  color: blue;
}
.deletebtn:hover{
  font-size: 38px;
}


</style>
