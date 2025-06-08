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
          
        </v-col>
        <v-col cols="6">
          <!-- <v-img src="../assets/loginpage.jpeg" height="400px" contain></v-img> -->
           <login-form></login-form>
        </v-col>
      </v-row>
    </v-container>

  </v-container>


 <!-- About Us Section -->
 <v-row class="section">
      
      <v-col cols="12" md="6">
        <h2 class="section-title">About Us</h2>
        <p class="section-text">
          We are a leading online bookstore offering a vast collection of books across different genres. 
          Whether you love fiction, non-fiction, or academic books, we have something for everyone.
        </p>
      </v-col>
    </v-row>

    <!-- Services Section -->
    <v-row class="section">
      <v-col cols="12">
        <h2 class="section-title">Our Services</h2>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="service-card" elevation="4">
          <v-icon size="50" color="primary">mdi-book</v-icon>
          <h3>Wide Collection</h3>
          <p>Thousands of books available in different categories.</p>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="service-card" elevation="4">
          <v-icon size="50" color="primary">mdi-truck-fast</v-icon>
          <h3>Fast Shipping</h3>
          <p>Get your books delivered quickly and safely.</p>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="service-card" elevation="4">
          <v-icon size="50" color="primary">mdi-tag-heart</v-icon>
          <h3>Discounts & Offers</h3>
          <p>Enjoy great discounts on your favorite books.</p>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="service-card" elevation="4">
          <v-icon size="50" color="primary">mdi-headset</v-icon>
          <h3>24/7 Support</h3>
          <p>We are here to help you anytime, anywhere.</p>
        </v-card>
      </v-col>
    </v-row>

    <v-footer class="footer" dark>
    <v-container>
      <v-row>
        <!-- Contact Information -->
        <v-col cols="12" md="4" class="text-center text-md-left">
          <h3 class="footer-title">Contact Us</h3>
          <p><v-icon color="white">mdi-map-marker</v-icon> 123 Book Street, City, Country</p>
          <p><v-icon color="white">mdi-phone</v-icon> +1 234 567 890</p>
          <p><v-icon color="white">mdi-email</v-icon> support@bookstore.com</p>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="12" md="4" class="text-center">
          <h3 class="footer-title">Quick Links</h3>
          <v-btn text to="/" class="footer-link">Home</v-btn>
          <v-btn text to="/about" class="footer-link">About</v-btn>
          <v-btn text to="/services" class="footer-link">Services</v-btn>
          <v-btn text to="/contact" class="footer-link">Contact</v-btn>
        </v-col>

        <!-- Social Media Icons -->
        <v-col cols="12" md="4" class="text-center text-md-right">
          <h3 class="footer-title followus" >Follow Us</h3>
          <v-btn icon class="social-icon">
            <v-icon color="#1976D2">mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon class="social-icon">
            <v-icon color="#1976D2">mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon class="social-icon">
            <v-icon color="#1976D2">mdi-instagram</v-icon>
          </v-btn>
          <v-btn icon class="social-icon">
            <v-icon color="#1976D2">mdi-linkedin</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Copyright -->
      <v-row justify="center" class="copyright">
        <v-col cols="12" class="text-center">
          <p>© 2025 Online Book Store. All rights reserved.</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>

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

/* Hero Section */
.hero {
  padding: 50px 0;
  background: #f5f5f5;
}
.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
}
.hero-subtitle {
  font-size: 1.2rem;
  color: #555;
}

/* Sections */
.section {
  text-align: center;
}
.section-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
.section-text {
  font-size: 1.1rem;
  color: #666;
}

/* Image */
.image {
  border-radius: 10px;
  width: 100%;
}

/* Service Cards */
.service-card {
  text-align: center;
  padding: 20px;
}
.service-card h3 {
  font-size: 1.3rem;
  margin-top: 10px;
}
.service-card p {
  font-size: 1rem;
  color: #666;
}

/* Contact Card */
.contact-card {
  padding: 20px;
  background: #f5f5f5;
}

.footer {
  background-color: #1e1e1e;
  padding: 30px 0;
  color: white;
}

.footer-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

/* .followus{
  margin-left: 290px;
} */

.footer-link {
  color: rgb(55, 3, 3) !important;
  margin: 5px;
  font-size: 1rem;
}

.social-icon {
  margin: 5px;
}

.copyright {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #bbb;
}
</style>
