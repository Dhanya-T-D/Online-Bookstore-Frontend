<template>
    <v-app>
      <!-- Navigation Bar -->
      <v-app-bar fixed color="white" elevation="2">
        <v-container class="d-flex align-center">
          <!-- Company Name -->
          <v-app-bar-title class="text-h4 font-weight-bold text-amber-darken-2">
            <i class="fas fa-utensils mr-2"></i>
            Bella Vista
          </v-app-bar-title>
  
          <!-- Category Dropdown -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="ml-4">
                Categories
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="category in categories" :key="category" @click="filterByCategory(category)">
                <v-list-item-title>{{ category }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
  
          <!-- Search Bar -->
          <v-text-field
            v-model="searchQuery"
            prepend-inner-icon="mdi-magnify"
            label="Search menu items..."
            single-line
            hide-details
            class="ml-4"
            style="max-width: 300px"
          ></v-text-field>
  
          <v-spacer></v-spacer>
  
          <!-- Order Details -->
          <v-btn class="mr-4" prepend-icon="mdi-cart">
            Orders
            <v-badge
              v-if="orderCount > 0"
              :content="orderCount"
              color="amber-darken-2"
              offset-x="-8"
              offset-y="8"
            ></v-badge>
          </v-btn>
  
          <!-- Profile Menu -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-avatar color="amber-accent-3" size="40">
                  <v-icon>mdi-account</v-icon>
                </v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="openProfile">
                <v-list-item-title>
                  <v-icon start>mdi-account-edit</v-icon>
                  Edit Profile
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="openOrderHistory">
                <v-list-item-title>
                  <v-icon start>mdi-history</v-icon>
                  Order History
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-title>
                  <v-icon start>mdi-logout</v-icon>
                  Logout
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-container>
      </v-app-bar>
  
      <!-- Main Content -->
      <v-main class="pt-16">
        <!-- Existing content -->
        <v-container>
          <h1 class="text-h2 font-weight-bold text-amber-darken-2 mb-6 text-center">
            Our Menu
          </h1>
          
          <v-row>
            <v-col cols="12" md="6" lg="4" v-for="(item, index) in filteredMenuItems" :key="index">
              <v-card class="mb-4" elevation="3">
                <v-img
                  :src="item.image"
                  height="200"
                  cover
                  class="bg-grey-lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row align="center" justify="center" style="height: 100%;">
                      <v-icon size="large" color="grey-lighten-1">mdi-food</v-icon>
                    </v-row>
                  </template>
                </v-img>
                
                <v-card-title class="text-amber-darken-2">
                  {{ item.name }}
                </v-card-title>
                
                <v-card-text>
                  <p class="mb-2">{{ item.description }}</p>
                  <p class="text-h6 text-amber-darken-2">${{ item.price }}</p>
                </v-card-text>
              
                <v-card-actions  class="d-flex justify-space-between">
                  <v-btn color="amber-darken-2">
                    <v-icon left>mdi-cart</v-icon>
                    Add to Cart
                  </v-btn>

                  <v-btn color="amber-darken-4" variant="elevated" class="justify-center">
                    <v-icon left>mdi-cash-fast</v-icon>
                    Buy Now
                 </v-btn>  

                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'FoodList',
    data() {
      return {
        searchQuery: '',
        selectedCategory: null,
        orderCount: 0,
        categories: ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'],
        menuItems: [
          {
            name: 'Margherita Pizza',
            description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
            price: 14.99,
            image: '', // Add image URL
            category: 'Main Course'
          },
          {
            name: 'Pasta Carbonara',
            description: 'Creamy sauce with pancetta, eggs, and parmesan',
            price: 16.99,
            image: '', // Add image URL
            category: 'Main Course'
          },
          {
            name: 'Grilled Salmon',
            description: 'Fresh salmon with herbs and lemon butter sauce',
            price: 24.99,
            image: '', // Add image URL
            category: 'Main Course'
          },
        ]
      }
    },
    computed: {
      filteredMenuItems() {
        return this.menuItems.filter(item => {
          const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                               item.description.toLowerCase().includes(this.searchQuery.toLowerCase())
          const matchesCategory = !this.selectedCategory || this.selectedCategory === 'All' ||
                                 item.category === this.selectedCategory
          return matchesSearch && matchesCategory
        })
      }
    },
    methods: {
      filterByCategory(category) {
        this.selectedCategory = category
      },
      openProfile() {
        // Implement profile dialog
      },
      openOrderHistory() {
        // Implement order history dialog
      },
      logout() {
        // Implement logout logic
      },
      methods: {
    // ... existing methods ...
    buyNow(item) {
      // Implement buy now logic here
      console.log('Buying item:', item)
    }
  }
    }
  }
  </script>
  
  <style scoped>
  .v-app-bar {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
  
  .v-main {
    background-color: #f5f5f5;
  }
  </style>