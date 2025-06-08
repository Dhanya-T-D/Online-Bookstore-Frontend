<template>
    <v-container fluid class="pa-0">
      <!-- Hero Section -->
      <v-parallax
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
        height="600"
      >
        <div class="d-flex flex-column fill-height justify-center align-center text-white">
          <h1 class="text-h2 font-weight-bold mb-4">Gourmet Delights</h1>
          <h2 class="text-h4 font-weight-light">Experience Fine Dining</h2>
          <v-btn
            class="mt-6"
            color="primary"
            size="large"
            @click="scrollToMenu"
          >
            View Menu
          </v-btn>
        </div>
      </v-parallax>
  
      <!-- About Section -->
      <v-container class="py-12">
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h4 mb-6">Our Story</h2>
            <p class="text-body-1">
              Welcome to Gourmet Delights, where culinary excellence meets warm hospitality.
              Our passion for food and dedication to quality has made us a destination
              for food lovers since 1995.
            </p>
          </v-col>
        </v-row>
      </v-container>
  
      <!-- Featured Dishes -->
      <v-container fluid class="grey lighten-4 py-12">
        <v-row justify="center" class="mb-8">
          <v-col cols="12" class="text-center">
            <h2 class="text-h4">Featured Dishes</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="dish in featuredDishes"
            :key="dish.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card elevation="2" class="mx-auto" max-width="400">
              <v-img
                :src="dish.image"
                height="250"
                cover
              ></v-img>
              <v-card-title>{{ dish.name }}</v-card-title>
              <v-card-text>
                <p class="text-body-1">{{ dish.description }}</p>
                <p class="text-h6 mt-2">${{ dish.price }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  variant="text"
                  @click="orderDish(dish)"
                >
                  Order Now
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  
      <!-- Reservation Section -->
      <v-container class="py-12">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="pa-6">
              <h2 class="text-h4 text-center mb-6">Make a Reservation</h2>
              <v-form ref="form" v-model="valid">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="reservation.name"
                      label="Name"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="reservation.email"
                      label="Email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="reservation.phone"
                      label="Phone"
                      :rules="phoneRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="reservation.guests"
                      :items="guestNumbers"
                      label="Number of Guests"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="reservation.date"
                      label="Date"
                      type="date"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="reservation.time"
                      label="Time"
                      type="time"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-btn
                  color="primary"
                  block
                  :disabled="!valid"
                  @click="submitReservation"
                >
                  Book Table
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  
      <!-- Contact Section -->
      <v-container fluid class="grey lighten-4 py-12">
        <v-row justify="center">
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="48" color="primary" class="mb-4">mdi-map-marker</v-icon>
            <h3 class="text-h5 mb-2">Location</h3>
            <p>123 Gourmet Street, Foodie City, FC 12345</p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="48" color="primary" class="mb-4">mdi-clock</v-icon>
            <h3 class="text-h5 mb-2">Hours</h3>
            <p>Mon-Sat: 11:00 AM - 10:00 PM</p>
            <p>Sun: 12:00 PM - 9:00 PM</p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="48" color="primary" class="mb-4">mdi-phone</v-icon>
            <h3 class="text-h5 mb-2">Contact</h3>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@gourmetdelights.com</p>
          </v-col>
        </v-row>
      </v-container>
  
      <!-- Snackbar for notifications -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="3000"
      >
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn
            color="white"
            variant="text"
            @click="snackbar.show = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'RestaurantHome',
    data() {
      return {
        valid: false,
        snackbar: {
          show: false,
          text: '',
          color: 'success'
        },
        featuredDishes: [
          {
            id: 1,
            name: 'Grilled Salmon',
            description: 'Fresh Atlantic salmon with herbs and lemon butter sauce',
            price: 28.99,
            image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927'
          },
          {
            id: 2,
            name: 'Beef Tenderloin',
            description: 'Premium cut beef with red wine reduction',
            price: 34.99,
            image: 'https://images.unsplash.com/photo-1546833998-877b37c3e21c'
          },
          {
            id: 3,
            name: 'Mushroom Risotto',
            description: 'Creamy Arborio rice with wild mushrooms',
            price: 22.99,
            image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371'
          }
        ],
        reservation: {
          name: '',
          email: '',
          phone: '',
          guests: '',
          date: '',
          time: ''
        },
        guestNumbers: [
          { title: '1-2 Guests', value: '2' },
          { title: '3-4 Guests', value: '4' },
          { title: '5-6 Guests', value: '6' },
          { title: '7-8 Guests', value: '8' }
        ],
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length >= 2 || 'Name must be at least 2 characters'
        ],
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+\..+/.test(v) || 'Email must be valid'
        ],
        phoneRules: [
          v => !!v || 'Phone number is required',
          v => /^\d{10}$/.test(v) || 'Phone number must be 10 digits'
        ]
      }
    },
    methods: {
      scrollToMenu() {
        // Implement smooth scroll to menu section
        const element = document.querySelector('#menu')
        element?.scrollIntoView({ behavior: 'smooth' })
      },
      orderDish(dish) {
        this.showSnackbar(`Added ${dish.name} to your order`, 'success')
      },
      submitReservation() {
        if (this.$refs.form.validate()) {
          // Here you would typically make an API call to save the reservation
          console.log('Reservation details:', this.reservation)
          this.showSnackbar('Reservation submitted successfully!', 'success')
          this.$refs.form.reset()
        }
      },
      showSnackbar(text, color) {
        this.snackbar = {
          show: true,
          text,
          color
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .v-parallax {
    position: relative;
  }
  
  .v-parallax::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  
  .text-white {
    color: white !important;
  }
  </style>