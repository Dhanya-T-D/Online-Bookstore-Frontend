<template>
  <v-container>
    <!-- Navigation Bar -->
    <v-app-bar app color="white" elevation="1">
      <v-container class="d-flex align-center">
        <v-img src="../assets/logo.png" max-height="40" max-width="40"></v-img>
        <v-toolbar-title class="ml-2 toolbar-title">Magic <p>Margins</p></v-toolbar-title>
        
        <v-text-field
          v-model="searchQuery"
          label="Search book by author or publisher"
          hide-details
          outlined
          dense
          density="compact"
          prepend-inner-icon="mdi-magnify"
          class="search-bar"
          clearable
          @click:clear="fetchBookList"
          @keyup.enter="fetchBooksByNameAndAuthor(searchQuery)"
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-select
          v-model="selectedCat"
          :items="category"
          item-title="catName"
          item-value="catId"
          label="Category"
          density="compact"
          dense
          outlined
          hide-details
          class="mx-2"
          style="max-width: 200px"
        />

        <v-select
          v-model="selectedLang"
          :items="language"
          item-title="languageName"
          item-value="languageId"
          label="language"
          dense
          outlined
          hide-details
          class="mx-2"
          style="max-width: 200px"
          density="compact"
        />

        <v-btn text>Home</v-btn>
        <v-btn text>About</v-btn>
        <v-btn text>Contact</v-btn>

        <v-spacer></v-spacer>

        <!-- <add-to-cart ref="cart" v-model="showCartDialog" /> -->
        <div class="d-flex align-center">
          <add-to-cart ref="cart" @buy-now="handleBuyNowClick" class="mr-2" />

        <v-menu>
          <template v-slot:activator="{ props }">
            <!-- <v-btn
              icon
              v-bind="props"
            >
              <v-icon>mdi-account-circle</v-icon>
            </v-btn> -->
            <v-btn icon v-bind="props">
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>

          </template>

          <v-list>
            <v-list-item
              value="edit"
              @click="openProfileDialog"
            >
              <v-list-item-title>Edit Profile</v-list-item-title>
            </v-list-item>
            
            <v-list-item
              value="logout"
              @click="logout"
            >
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Book Cards -->
    <v-skeleton-loader type="card" v-if="loadingSkel"></v-skeleton-loader>

    <div class="d-flex flex-wrap" v-else>
      <v-card
        class="mx-auto bookcard"
        v-for="book in books"
        :key="book.bookId"
        @click="openBookDialog(book)"
      >
        <v-img
          :src="'data:image/jpeg;base64,' + book.coverImage"
          height="220"
          width="100%"
          contain
          class="card-img"
        />

        <v-card-title>
          {{book.bookName}}
        </v-card-title>

        <v-card-subtitle>
          <p>Author : {{book.author}}</p>
          <p>Price : ₹{{book.price}}</p>
          <p>Available Copies : {{book.availableCopies}}</p>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="primary" @click.stop="addToCart(book)" prepend-icon="mdi-cart">Add to Cart</v-btn>
          <v-btn color="success" @click.stop="buyNow(book)">Buy Now</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- Book Detail Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h6">{{ selectedBook.bookName }}</v-card-title>
        <v-card-text>
          <v-img
            :src="'data:image/jpeg;base64,' + selectedBook.coverImage"
            height="150"
            width="130"
            contain
            class="mini-img my-2"
          />

          <p><strong>Author:</strong> {{ selectedBook.author }}</p>
          <p><strong>Publisher:</strong> {{ selectedBook.publisherName }}</p>
          <p><strong>Category:</strong> {{ selectedBook.category }}</p>
          <p><strong>Language:</strong> {{ selectedBook.language }}</p>
          <p><strong>Published Date:</strong>
            {{ new Date(selectedBook.publishedDate).toLocaleDateString('en-GB') }}
          </p>
          <p><strong>Edition:</strong> {{ selectedBook.edition }}</p>
          <p><strong>Available Copies:</strong> {{ selectedBook.availableCopies }}</p>
          <p><strong>Price:</strong> ₹{{ selectedBook.price }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <AddToCart @buy-now="handleBuyNowClick" /> -->

<!-- Add BuyNowDialog Component Here -->
<BuyNowDialog
  v-model="buyNowDialog"
  :book="selectedBookForBuyNow"
  :user="profile"
  @confirm="handleBuyNowConfirm"
/>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from "lodash";
import AddToCart from './AddToCart.vue';
import BuyNowDialog from './BuyNowDialog.vue';


export default {
  components: {
    AddToCart,
    BuyNowDialog
  },
  data() {
 
    return {
      // profile setup
      showProfileDialog: false,
      profile: {
        userid: '',
        name: '',
        email: '',
        phone: ''
      },
      selectedCat: null,
      selectedLang: null,
      searchQuery: "",
      loadingSkel: true,
      dialog: false,
      selectedBook: {},
      showCartDialog: false,

      // buy dialog box

      buyNowDialog: false,
      selectedBookForBuyNow: {},
      
    };
  },

  methods: {
    // profile setup
    async loadUserDetails() {
  try {
    const loginDetails = JSON.parse(sessionStorage.getItem('loginDetails'));
    if (!loginDetails || !loginDetails.id) {
      console.error('No user ID found in session storage');
      return;
    }
    
    const userDetails = await this.$store.dispatch('user/getUserDetails', {
      userid: loginDetails.id
    });
    
    if (userDetails) {
      this.profile = {
        userid: userDetails.userid,
        name: userDetails.username || '', // Changed from name to username
        email: userDetails.email || '',
        phone: userDetails.phone || ''
      };
    }
  } catch (error) {
    console.error('Error loading user details:', error);
  }
},

    async openProfileDialog() {
      await this.loadUserDetails();
      this.showProfileDialog = true;
    },

    async saveProfile() {
      try {
        const payload = {
          userid: this.profile.userid,
          username: this.profile.name,
          email: this.profile.email,
          phone: this.profile.phone
        };

        const success = await this.$store.dispatch('user/updateUserDetails', payload);
        
        if (success) {
          this.showProfileDialog = false;
        } else {
          console.error('Failed to update profile');
        }
      } catch (error) {
        console.error('Error in saveProfile:', error);
      }
    },

    logout() {
      this.$router.push('/');
      console.log("User logged out");
    },

    async fetchBookList() {
      const res = await this.$store.dispatch('user/listBooks');
      if (res) {
        this.loadingSkel = false;
      } else {
        console.log(Error);
      }
    },

    async fetchBooksByCategory(catId) {
      try {
        this.loadingSkel = true;
        const payload = {
          catId: catId,
        };
        const res = await this.$store.dispatch('user/searchBooksByCategory', payload);
        if (res) {
          this.books = res;
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        this.loadingSkel = false;
      }
    },

    async fetchBooksByLanguage(languageId) {
      try {
        this.loadingSkel = true;
        const payload = {
          languageId: languageId,
        };
        const res = await this.$store.dispatch('user/searchBooksByLanguage', payload);
        if (res) {
          this.books = res;
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        this.loadingSkel = false;
      }
    },

    async fetchBooksByCategoryAndLanguage(catId, languageId) {
      try {
        this.loadingSkel = true;
        const payload = {
          catId: catId || null,
          languageId: languageId || null,
        };
        const res = await this.$store.dispatch('user/searchBooksByCatAndLang', payload);
        if (res) {
          this.books = res;
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        this.loadingSkel = false;
      }
    },

    openBookDialog(book) {
      this.selectedBook = book;
      this.dialog = true;
    },

    async fetchBooksByName(bookName) {
      try {
        const payload = {
          bookName,
        };
        const res = await this.$store.dispatch("user/searchBooksByName", payload);
        return res || [];
      } catch (error) {
        console.error("Error fetching books by name:", error);
        return [];
      }
    },

    async fetchBooksByAuthorName(authorName) {
      try {
        const payload = {
          author: authorName,
        };
        const res = await this.$store.dispatch("user/searchBooksByAuthor", payload);
        return res || [];
      } catch (error) {
        console.error("Error fetching books by author:", error);
        return [];
      }
    },

    async fetchBooksByNameAndAuthor(query) {
      try {
        this.loadingSkel = true;
        const [booksByName, booksByAuthor] = await Promise.all([
          this.fetchBooksByName(query),
          this.fetchBooksByAuthorName(query),
        ]);

        const combinedBooks = this.removeDuplicateBooks([
          ...booksByName,
          ...booksByAuthor,
        ]);

        this.books = combinedBooks;

        if (combinedBooks.length === 0) {
          console.warn("No books found for the query.");
        }
      } catch (error) {
        console.error("Error fetching books by name and author:", error);
      } finally {
        this.loadingSkel = false;
      }
    },

    removeDuplicateBooks(books) {
      const uniqueBooks = [];
      const bookIds = new Set();

      books.forEach((book) => {
        if (!bookIds.has(book.id)) {
          bookIds.add(book.id);
          uniqueBooks.push(book);
        }
      });

      return uniqueBooks;
    },
    toggleCart() {
      this.showCartDialog = !this.showCartDialog
    },
    async addToCart(book) {
        try {
            const loginDetails = JSON.parse(sessionStorage.getItem('loginDetails'));
            await this.$store.dispatch('user/addToCart', {
                bookId: book.bookId,
                userid: loginDetails.id,
                quantity: 1,

                bookName: book.bookName,
                price: book.price,
                coverImage: book.coverImage
            });
            this.$refs.cart.showSnackbar('Book added to cart successfully');
        } catch (error) {
            console.error('Error adding to cart:', error);
            this.$refs.cart.showSnackbar('Failed to add book to cart', 'error');
        }
    },

    // buy dialog
    buyNow(book) {
      this.selectedBookForBuyNow = book;
      this.buyNowDialog = true;
    },

    async handleBuyNowConfirm(payload) {
      try {
        await this.$store.dispatch('user/placeOrder', payload);
        this.buyNowDialog = false;
        this.$refs.cart.showSnackbar('Order placed successfully!');
      } catch (error) {
        console.error('Failed to place order:', error);
      }
    },
    handleBuyNowClick(book) {
    this.selectedBookForBuyNow = book;
    this.buyNowDialog = true;
  },
  


  },

  watch: {
    async selectedCat(newCatId) {
      if (newCatId && this.selectedLang) {
        await this.fetchBooksByCategoryAndLanguage(newCatId, this.selectedLang);
      } else if (newCatId) {
        await this.fetchBooksByCategory(newCatId);
      }
    },

    async selectedLang(newLang) {
      if (newLang && this.selectedCat) {
        await this.fetchBooksByCategoryAndLanguage(this.selectedCat, newLang);
      } else if (newLang) {
        await this.fetchBooksByLanguage(newLang);
      }
    },

    searchQuery: {
      handler: _.debounce(async function (newQuery) {
        if (newQuery && newQuery.trim() !== "") {
          await this.fetchBooksByName(newQuery);
        } else {
          await this.fetchBookList();
        }
      }, 300),
      immediate: false,
    },
  },

  computed: {
    ...mapGetters('user', ['getCategory', 'getLanguage', 'getBookList']),

    category() {
      return this.getCategory;
    },

    language() {
      return this.getLanguage;
    },

    books() {
      return this.getBookList;
    },

    // display cart items
    calculateTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
  },

  mounted() {
    this.$store.dispatch('user/categoryList');
    this.$store.dispatch('user/languageList');
    this.fetchBookList();
  }
};
</script>

<style scoped>
.toolbar-title {
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
  margin-top: 10px;
}

.search-bar {
  max-width: 300px;
}

.hero-section {
  position: relative;
  color: white;
  text-align: center;
}

.bookcard {
  width: 270px;
  margin-top: 20px;
}
</style>