<template>
  <v-container>
    <!-- Cart Icon with Badge -->
    <v-badge
      :content="cartItemCount"
      :value="cartItemCount"
      color="error"
      offset-x="15"
      offset-y="15"
    >
      <v-btn icon @click="toggleCart">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-badge>

    <!-- Cart Dialog -->
    <v-dialog v-model="showCart" max-width="550px">
      <v-card>
        <v-card-title class="text-center">Shopping Cart</v-card-title>

        <v-card-text>
          <v-list v-if="cartItems.length > 0">
            <v-list-item
              v-for="item in cartItems"
              :key="item.bookId"
              class="cart-item"
            >
             

<div class="item-div">

<div class="img-div">
                    <v-img
                      v-if="item.coverImage"
                      :src="'data:image/jpeg;base64,' + item.coverImage"
                      height="90"
                      width="70"
                      contain
                    />
                    <v-icon v-else size="48">mdi-book</v-icon>
</div>


<div class="content">

  <div class="details">
                <div class="book-title">{{ item.bookName }}</div>
                <div class="price-text">₹{{ item.price }} | Qty: {{ item.quantity }}</div>
                <div class="action-buttons">
                  <v-btn icon small variant="text" @click="decrementQuantity(item)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <v-btn icon small variant="text" @click="incrementQuantity(item)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn icon small variant="text" @click="removeFromCart(item)">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </div>


  </div>

</div>


<div class="buy-button">
  <v-btn  class="buy-btn"  color="primary" size="small"  @click="openBuyNow(item)">Buy Now</v-btn>
</div>

</div>
              







            </v-list-item>
          </v-list>

          <v-alert v-else type="info" text="Your cart is empty" />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="text-right">
          <div class="text-h6">Total: ₹{{ cartTotal }}</div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="clearCart" :disabled="!cartItems.length">
            Clear Cart
          </v-btn>
          <v-btn color="primary" @click="checkout" :disabled="!cartItems.length">
            Checkout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'AddToCart',
  data() {
    return {
      showCart: false,
      cartItems: [],
      snackbar: {
        show: false,
        message: '',
        color: 'success'
      }
    }
  },
  computed: {
    cartItemCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
    }
  },
  created() {
    this.fetchCartItems();
  },
  methods: {
    toggleCart() {
      this.showCart = !this.showCart;
    },
    async fetchCartItems() {
      try {
        const loginDetails = JSON.parse(sessionStorage.getItem('loginDetails'));
        if (!loginDetails || !loginDetails.id) {
          this.showSnackbar('Please login to view cart items', 'error');
          return;
        }

        const response = await this.$store.dispatch('user/getCartItems', loginDetails.id);
        if (response) {
          this.cartItems = response;
        }

      } catch (error) {
        console.error('Error loading cart items:', error);
        this.showSnackbar('Failed to load cart items', 'error');
      }
    },
    async removeFromCart(item) {
      try {
        const loginDetails = JSON.parse(sessionStorage.getItem('loginDetails'));
        if (!loginDetails || !loginDetails.id) {
          this.showSnackbar('Please login to view cart items', 'error');
          return;
        }

        await this.$store.dispatch('user/removeFromCart', {
          bookId: item.bookId,
          userid: loginDetails.id,
        });

        this.cartItems = this.cartItems.filter(i => i.bookId !== item.bookId);
        this.showSnackbar('Item removed from cart');
            // 🔄 Refresh the page

      } catch (error) {
        this.showSnackbar('Error removing item from cart');
        console.error('Error:', error);
      }
    },
    async incrementQuantity(item) {
      try {
        const loginDetails = JSON.parse(sessionStorage.getItem('loginDetails'));
        const newQuantity = item.quantity + 1;
        await this.$store.dispatch('user/updateCartQuantity', {
          bookId: item.bookId,
          userid: loginDetails.id,
          quantity: newQuantity
        });
        item.quantity = newQuantity;
      } catch (error) {
        console.error('Error incrementing quantity:', error);
      }
    },
    async decrementQuantity(item) {
      try {
        const loginDetails = JSON.parse(sessionStorage.getItem('loginDetails'));
        if (item.quantity > 1) {
          const newQuantity = item.quantity - 1;
          await this.$store.dispatch('user/updateCartQuantity', {
            bookId: item.bookId,
            userid: loginDetails.id,
            quantity: newQuantity
          });
          item.quantity = newQuantity;
        } else {
          this.removeFromCart(item);
        }
      } catch (error) {
        console.error('Error decrementing quantity:', error);
      }
    },
    clearCart() {
      this.cartItems = [];
      this.showSnackbar('Cart cleared', 'info');
    },
    checkout() {
      console.log('Proceeding to checkout with items:', this.cartItems);
      this.showSnackbar('Proceeding to checkout...', 'success');
    },
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },

    openBuyNow(item) {
  this.$emit('buy-now', item);
}
  }
}
</script>

<style scoped>

.item-div{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.img-div{
  margin-right: 8px;
}

.buy-button{
  margin-left: 10px;
 
}


</style>
