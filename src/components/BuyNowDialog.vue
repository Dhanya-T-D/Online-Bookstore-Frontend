<template>
  <v-dialog v-model="internalDialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h6">Buy Now</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <v-text-field
            label="Name"
            v-model="userData.name"
            :rules="[rules.required]"
            required
          />
          <v-text-field
            label="Phone Number"
            v-model="userData.phone"
            type="tel"
            :rules="[rules.required, rules.phone]"
            required
          />
          <v-textarea
            label="Shipping Address"
            v-model="userData.address"
            :rules="[rules.required]"
            required
          />

          <v-text-field
            label="Quantity"
            v-model.number="quantity"
            type="number"
            min="1"
            @input="updateTotalPrice"
            :rules="[rules.required]"
            required
          />

          <v-divider class="my-4" />

          <div><strong>Book Name:</strong> {{ book.bookName }}</div>
          <div><strong>Book Price (each):</strong> ₹{{ book.bookPrice || book.price || 0 }}</div>
          <div><strong>Selected Quantity:</strong> {{ quantity }}</div>
          <div><strong>Shipping Charge:</strong> ₹{{ shippingCharge }}</div>
          <div><strong>Total Price:</strong> ₹{{ totalPrice }}</div>
          <div><strong>Expected Delivery:</strong> {{ expectedDeliveryDate }}</div>
          <div><strong>Payment Mode:</strong> Cash On Delivery</div>

          <v-divider class="my-4" />

          <p class="text-body-2 mb-2">
            ✅ <strong>Replacement Policy:</strong> Only for damaged products with proper unboxing video.<br />
            ✅ <strong>Terms & Conditions:</strong> Ensure your contact details are correct.
          </p>

          <v-checkbox
            v-model="acceptTerms"
            label="I accept the terms and conditions"
            :rules="[rules.required]"
            required
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
export default {
  name: 'BuyNowDialog',

  props: {
    modelValue: Boolean,
    book: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      internalDialog: this.modelValue,
      quantity: 1,
      shippingCharge: 50,
      userData: {
        name: this.user.name || '',
        phone: this.user.phone || '',
        address: this.user.address || '',
      },
      snackbar: {
        show: false,
        message: '',
        color: '',
      },
      acceptTerms: false,
      isFormValid: false,
      rules: {
        required: (v) => !!v || 'This field is required',
        phone: (v) => /^\d{10}$/.test(v) || 'Phone number must be 10 digits',
      },
    };
  },

  computed: {
    totalPrice() {
      const price = this.book.bookPrice || this.book.price || 0;
      return price * this.quantity + this.shippingCharge;
    },
    expectedDeliveryDate() {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date.toLocaleDateString('en-GB');
    },
    canPlaceOrder() {
      return this.isFormValid && this.acceptTerms;
    },
  },

  watch: {
    modelValue(val) {
      this.internalDialog = val;
    },
    internalDialog(val) {
      this.$emit('update:modelValue', val);
    },
  },

  methods: {
    updateTotalPrice() {
      // Handled by computed property
    },

    async placeOrder() {
      const isValid = await this.$refs.form.validate();
      if (!isValid) return;

      try {
        const loginDetails = JSON.parse(sessionStorage.getItem('loginDetails'));
        const payload = {
          userid: loginDetails.id,
          bookId: this.book.bookId,
          quantity: this.quantity,
          name: this.userData.name,
          phone: this.userData.phone,
          address: this.userData.address,
        };

        console.log('Payload:', payload);
        await this.$store.dispatch('user/buyNow', payload);
        this.showSnackbar('Order placed successfully', 'success');
        this.internalDialog = false;

            // 🔄 Refresh the page
    setTimeout(() => {
      window.location.reload();
    }, 1000); 
    
      } catch (error) {
        this.showSnackbar('Failed to place order', 'error');
        console.error(error);
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
