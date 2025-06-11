<template>
  <v-dialog v-model="internalDialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h6">Buy Now</v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-text-field label="Name" v-model="user.name" required />
          <v-text-field label="Phone Number" v-model="user.phone" type="tel" required />
          <v-textarea label="Shipping Address" v-model="user.address" required />

          <v-text-field
            label="Quantity"
            v-model.number="quantity"
            type="number"
            min="1"
            @input="updateTotalPrice"
            required
          />

          <v-divider class="my-4" />

          <div><strong>Book Name:</strong> {{ orderDetails.bookName }}</div>
          <div><strong>Book Price (each):</strong> ₹{{ orderDetails.bookPrice }}</div>
          <div><strong>Selected Quantity:</strong> {{ quantity }}</div>
          <div><strong>Shipping Charge:</strong> ₹{{ orderDetails.shippingCharge }}</div>
          <div><strong>Total Price:</strong> ₹{{ totalPrice }}</div>
          <div><strong>Expected Delivery:</strong> {{ orderDetails.expectedDeliveryDate }}</div>
          <div><strong>Payment Mode:</strong> {{ orderDetails.paymentMode }}</div>

          <v-divider class="my-4" />

          <p class="text-body-2 mb-2">
            ✅ <strong>Replacement Policy:</strong> Only for damaged products with proper unboxing video.<br />
            ✅ <strong>Terms & Conditions:</strong> Ensure your contact details are correct.
          </p>

          <v-checkbox
            v-model="acceptTerms"
            label="I accept the terms and conditions"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="internalDialog = false">Cancel</v-btn>
        <v-btn color="primary" :disabled="!canPlaceOrder" @click="placeOrder">
          Place Order
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'BuyNowDialog',
  props: {
    modelValue: Boolean,
    bookId: Number,
  },
  data() {
    return {
      internalDialog: this.modelValue,
      user: {
        name: '',
        phone: '',
        address: '',
      },
      quantity: 1,
      
      totalPrice: 0,
      acceptTerms: false,
      snackbar: {
        show: false,
        message: '',
        color: '',
      },
    };
  },
  watch: {
    modelValue(val) {
      this.internalDialog = val;
      if (val && this.bookId) {
        this.fetchOrderDetails();
      }
    },
    internalDialog(val) {
      this.$emit('update:modelValue', val);
    },
  },
  computed: {
    ...mapGetters('user', ['orderDetails']),
    canPlaceOrder() {
      return (
        this.user.name &&
        this.user.phone &&
        this.user.address &&
        this.quantity >= 1 &&
        this.acceptTerms
      );
    },
  },



  methods: {
  
async fetchOrderDetails() {
  try {
    const details = await this.$store.dispatch('user/fetchOrderDetails', this.bookId);
    console.log('Fetched Order Details:', details);
    this.orderDetails = {
      bookName: details.bookName || '',
      bookPrice: details.bookPrice || 0,
      shippingCharge: details.shippingCharge ?? 50,
      totalPrice: details.totalPrice || 0,
      expectedDeliveryDate: details.expectedDeliveryDate || '',
      paymentMode: details.paymentMode || 'Cash on Delivery',
    };

    this.totalPrice = this.orderDetails.totalPrice;
    this.expectedDelivery = this.orderDetails.expectedDeliveryDate;
  } catch (error) {
    console.error('Error fetching order details:', error);
  }
},


    updateTotalPrice() {
      const price = this.orderDetails.bookPrice || 0;
      const shipping = this.orderDetails.shippingCharge || 0;
      this.totalPrice = this.quantity * price + shipping;
    },

    async placeOrder() {
      try {
        const loginDetails = JSON.parse(sessionStorage.getItem('loginDetails'));
        const payload = {
          userid: loginDetails.id,
          bookId: this.bookId,
          quantity: this.quantity,
          name: this.user.name,
          phone: this.user.phone,
          address: this.user.address,
        };
        console.log('payload :',payload);
        
        await this.$store.dispatch('user/buyNow', payload);
        this.showSnackbar('Order placed successfully', 'success');
        this.internalDialog = false;
      } catch (error) {
        this.showSnackbar('Failed to place order', 'error');
      }
    },

    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  },
};
</script>

<style scoped>
p {
  margin: 4px 0;
}
</style>
