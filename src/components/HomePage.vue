<template>
  <v-container fluid class="gradient-bg ">
    <v-app-bar app color="#8D6E63" dark>
      <v-toolbar-title class="storename">Magic Margins</v-toolbar-title>
     
      <v-spacer></v-spacer>
      <v-btn class="navtext">Home</v-btn>
      <v-btn class="navtext">About</v-btn>
      <v-btn class="navtext">Service</v-btn>
      <v-btn class="navtext">Contact</v-btn>
    </v-app-bar>

    <v-container class="mt-12 text-center maincontainer">
      <v-row>
        <!-- <v-col cols="6" class="d-flex flex-column align-center justify-center"> -->
          <v-col cols="6" >
          <h1 class="text-h3 font-weight-bold textcontent">Discover Your Next Favorite Book</h1>
          <p class="text-subtitle-1 mt-3 textcontent">
            Explore thousands of books, magazines, and novels at the best prices.
          </p>
          <!-- <v-btn color="secondary" class="mt-4" large>Register</v-btn> -->
        </v-col>
        <v-col cols="6">
          <!-- <v-img src="../assets/loginpage.jpeg" height="400px" contain></v-img> -->
           <login-form></login-form>
        </v-col>
      </v-row>
    </v-container>

   

    
  </v-container>
</template>

<script>

import LoginForm from './LoginForm.vue';

export default {
  components: { LoginForm },
  data() {
    return{
    books:[]


    }
  },
};
</script>

<style scoped>
body{
  height: 650px;
}
.storename{
  font-weight: 800;
}
.gradient-bg {
  background: linear-gradient(to right, #757575, #212121);
  background-image: url(../assets/bg.jpg);
  background-size: contain;
  height: 662px;
}

.textcontent{
  color: white;
}
.navtext{
  padding-right: 80px;
}
</style>
