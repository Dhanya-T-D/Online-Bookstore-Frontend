<template>
    <div>
      <!-- Buy Now Button -->
      <v-btn color="primary" size="small" @click="openDialog">Buy Now</v-btn>
  
      <!-- Buy Now Dialog -->
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title class="text-h6">Order Summary</v-card-title>
  
          <v-card-text>
            <!-- Book Details -->
            <v-row>
              <v-col cols="12" sm="6">
                <strong>Book:</strong> {{ book.name }}
              </v-col>
              <v-col cols="12" sm="6">
                <strong>Author:</strong> {{ book.author }}
              </v-col>
              <v-col cols="12" sm="6">
                <strong>Price:</strong> ₹{{ book.price }}
              </v-col>
            </v-row>
  
            <v-divider class="my-3"></v-divider>
  
            <!-- Shipping Address -->
            <div v-if="user.address">
              <strong>Shipping Address:</strong>
              <p>{{ user.name }}</p>
              <p>{{ user.address }}</p>
              <p>{{ user.phone }}</p>
            </div>
            <div v-else>
              <strong>Enter Shipping Address:</strong>
              <v-text-field v-model="addressInput.name" label="Name" dense required />
              <v-text-field v-model="addressInput.phone" label="Phone" dense required />
              <v-textarea v-model="addressInput.address" label="Address" rows="3" auto-grow dense required />
            </div>
  
            <!-- Delivery & Shipping Policy -->
            <v-divider class="my-3"></v-divider>
            <div>
              <strong>Shipping & Delivery Policy:</strong>
              <p>📦 Shipping Charges: ₹{{ shippingCharge }}</p>
              <p>🚚 Estimated Delivery: {{ estimatedDelivery }}</p>
              <p>
                Orders are shipped within 2 working days. Delivery may vary based on your location. Cash on Delivery
                is available for all orders.
              </p>
            </div>
  
            <!-- Payment -->
            <v-divider class="my-3"></v-divider>
            <p><strong>Payment Method:</strong> Cash on Delivery</p>
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="placeOrder">Confirm Order</v-btn>
          </v-card-actions>
        </v-card>
  
        <!-- Confirmation Snackbar -->
        <v-snackbar v-model="snackbar" timeout="3000" color="green">
          Order placed successfully!
        </v-snackbar>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BuyNowDialog',
    data() {
      return {
        dialog: false,
        snackbar: false,
        shippingCharge: 40,
        estimatedDelivery: '',
        book: {
          id: 1,
          name: 'The Alchemist',
          author: 'Paulo Coelho',
          price: 299,
        },
        user: {
          id: 101,
          name: 'Dhanya T D',
          phone: '9876543210',
          address: '', // fill this if user has address saved
        },
        addressInput: {
          name: '',
          phone: '',
          address: '',
        },
      };
    },
    methods: {
      openDialog() {
        this.dialog = true;
  
        // Estimate delivery: 4-6 days from today
        const today = new Date();
        const deliveryDate = new Date(today.setDate(today.getDate() + 5));
        this.estimatedDelivery = deliveryDate.toDateString();
  
        if (!this.user.address) {
          this.addressInput.name = this.user.name;
          this.addressInput.phone = this.user.phone;
        }
      },
      placeOrder() {
        if (!this.user.address) {
          if (!this.addressInput.name || !this.addressInput.phone || !this.addressInput.address) {
            alert('Please fill in all address fields');
            return;
          }
  
          this.user.name = this.addressInput.name;
          this.user.phone = this.addressInput.phone;
          this.user.address = this.addressInput.address;
        }
  
        this.dialog = false;
        this.snackbar = true;
  
        // API call to place order can go here
      },
    },
  };
  </script>
  
  <style scoped>
  .v-card-text p {
    margin-bottom: 6px;
  }
  </style>
  