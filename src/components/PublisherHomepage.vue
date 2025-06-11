

<template>
  <v-container class="custom-container">
    <v-main>


  <!-- ------nav bar ----------- -->
    <v-app-bar app color="#8D6E63" dark class="custom-app-bar">
    
      <v-toolbar-title class="storename" style="flex-grow: 1; white-space: nowrap;">
    Magic Margins
    </v-toolbar-title>

  <!-- Filter Button -->
  <v-menu v-model="showDropdown" offset-y close-on-content-click>
  <template v-slot:activator="{ props }">
    <v-btn v-bind="props" class="addbutton" color="white">
      <v-icon left>mdi-filter-outline</v-icon>Filter
    </v-btn>
  </template>
  <v-list>
    <v-list-item @click="openPublishedDateDialog">By Published Date</v-list-item>
    <v-list-item @click="openBetweenDatesDialog">Between Dates</v-list-item>
  </v-list>
</v-menu>


    <v-select class="dropdown" style="width: 20px;" density="compact" variant="outlined" label="Category"
      :items="category" item-title="catName" item-value="catId" v-model="selectedCat">
    </v-select>

    <v-select class="dropdown" style="width: 20px;" density="compact" variant="outlined" label="Language"
      :items="language" item-title="languageName" item-value="languageId" v-model="selectedLang">
    </v-select>


<v-text-field
      v-model="searchQuery"
      class="searchbar"
      label="Search Book by Name or Author"
      density="compact"
      variant="outlined"
      prepend-inner-icon="mdi-magnify"
      clearable
      @click:clear="fetchBookList"
      @keyup.enter="fetchBooksByNameAndAuthor(searchQuery)"
    ></v-text-field>



    <v-btn class="addbutton" color="white" @click="addBook">
      <v-icon left>mdi-plus</v-icon> Add Book
    </v-btn>

    <v-btn class="addbutton" color="white" >
      <v-icon left>mdi-plus</v-icon> Add Offer
    </v-btn>

    <!-- <v-btn icon class="profile-avatar">
      <v-avatar size="50" color="#616161" class="text-white">
          <span class="avatar-text">{{ publisherInitials }}</span>
      </v-avatar>
    </v-btn> -->
    <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon class="profile-avatar">
              <v-avatar size="50" color="#616161" class="text-white">
                <span class="avatar-text">{{ publisherInitials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          
          <v-list>
            <v-list-item @click="openProfileDialog">
              <v-list-item-title>
                <v-icon left>mdi-account-edit</v-icon>
                Edit Profile
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item @click="logout">
              <v-list-item-title>
                <v-icon left>mdi-logout</v-icon>
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

    <v-spacer></v-spacer>
    
  </v-app-bar>

<!------------------ **end of nav bar **------------------------>




<!--  -----------cards ---------- -->
<v-skeleton-loader type="card"  v-if="loadingSkel"> </v-skeleton-loader>

  <div class="d-flex flex-wrap" v-else> 
      <v-card 
        class="mx-auto bookcard"
        
        v-for="book in books" :key="book.id"
      >
      <v-img
        :src="'data:image/jpeg;base64,' + book.coverImage"
        height="220"
        width="100%"
        contain
        class="card-img"
      />

      <v-card-title >
        {{book.bookName}}
      </v-card-title>

      <v-card-subtitle>
      <p>Author : {{book.author}}</p> 
        <p>Price : ₹{{book.price}}</p>
      <p>
      Available Copies :
      <span v-if="book.availableCopies > 0">{{ book.availableCopies }}</span>
      <span v-else class="text-error font-weight-bold">Sold Out</span>
    </p>
        
      
      </v-card-subtitle>

      <v-card-actions class="d-flex justify-space-between align-center px-3">
        <v-icon color="#1A237E" @click="openEditDialog(book)">mdi-pencil-outline</v-icon>

          <v-spacer></v-spacer>
          <v-icon color="#D32F2F" @click="confirmDeleteBook(book)">mdi-delete</v-icon>
      </v-card-actions>

     </v-card>

      <v-dialog v-model="showDialog" >
            <AddbookForm @close="closeDialog" @submitForm="submit" :title="title[0]" :buttonName="buttonName"></AddbookForm>
      </v-dialog>

 

      <v-dialog v-model="publishedDateDialog" max-width="400px">
  <v-card>
    <v-card-title>Select Published Date</v-card-title>
    <v-card-text>
      <!-- Date Input with @keyup.enter to trigger filter -->
      <v-text-field
        v-model="publishedDate"
        label="Select Date"
        type="date"
        placeholder="DD-MM-YYYY"
        @keyup.enter="filterByPublishedDate"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="filterByPublishedDate">OK</v-btn>
      <v-btn @click="publishedDateDialog = false">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


<v-dialog v-model="betweenDatesDialog" max-width="400px">
  <v-card>
    <v-card-title>Select Date Range</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="tempStartDate"
        label="Start Date"
        type="date"
        placeholder="DD-MM-YYYY"
        class="mb-4"
      ></v-text-field>

      <v-text-field
        v-model="tempEndDate"
        label="End Date"
        type="date"
        placeholder="DD-MM-YYYY"
        class="mb-4"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="confirmDateRange">OK</v-btn>
      <v-btn @click="betweenDatesDialog = false">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


<!-- Show "No Books Available" if the list is empty -->
<v-alert
  v-if="!loadingSkel && books.length === 0"
  type="info"
  prominent
  class="mt-5"
>
  No books available for the selected criteria.
</v-alert>


<!-- dialog for delete book -->
<v-dialog v-model="showDeleteConfirmDialog" max-width="400">
  <v-card>
    <v-card-title class="headline">Confirm Delete</v-card-title>
    <v-card-text>
      Are you sure you want to delete <strong>{{ bookToDelete?.bookName }}</strong>?
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="showDeleteConfirmDialog = false">Cancel</v-btn>
      <v-btn color="red" text @click="deleteConfirmed">OK</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

  </div>

  <!-- update book  -->

  <v-dialog v-model="showEditDialog" max-width="600">
  <v-card>
    <v-card-title>Edit Book</v-card-title>
    <v-card-text>
      <v-img
          v-if="bookToEdit.coverImage"
          :src="`data:image/jpeg;base64,${bookToEdit.coverImage}`"
          max-height="200"
          contain
          class="mt-4"
        />
        <br>
      <v-text-field v-model="bookToEdit.bookName" label="Book Name"></v-text-field>
      <v-text-field v-model="bookToEdit.author" label="Author"></v-text-field>
      <v-text-field v-model="bookToEdit.price" label="Price" type="number"></v-text-field>
      <v-text-field v-model="bookToEdit.edition" label="Edition"></v-text-field>
      <v-text-field v-model="bookToEdit.availableCopies" label="Available Copies" type="number"></v-text-field>
      <v-text-field v-model="bookToEdit.publishedDate" label="Published Date" type="date"></v-text-field>


      <v-select
        v-model="bookToEdit.categoryId"
        :items="category"
        item-title="catName"
        item-value="catId"
        label="Category"
      ></v-select>

      <v-select
        v-model="bookToEdit.languageId"
        :items="language"
        item-title="languageName"
        item-value="languageId"
        label="Language"
      ></v-select>



      <v-file-input
      label="Upload New Cover Image (optional)"
      @change="(e) => handleImageChange(e.target.files[0])"
      accept="image/*"
      :clearable="true"
      show-size
    ></v-file-input>



    </v-card-text>
    <v-card-actions>
      <v-btn color="blue darken-1" text @click="closeEditDialog">Cancel</v-btn>
      <!-- <v-btn :disabled="!imageReady" @click="saveBookChanges">Save</v-btn> -->
      <v-btn :disabled="!imageReady" color="blue darken-1" text @click="saveBookChanges">Save</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


 </v-main>
</v-container>
</template>


<script>
import _ from "lodash";
import AddbookForm from './AddbookForm.vue';
import { mapGetters } from 'vuex';

  export default {
    components:{
      AddbookForm
    },
    data: () => ({
      // profile setup
      showProfileDialog: false,
    profile: {
      name: '',
      email: '',
      phone: ''
    },
      // end of profile setup
      visible: false,
      loaded: false,
      loading: false,
      selectedCat:null,
      selectedLang:null,
      showDialog:false,
      loadingSkel:true,
      bookDialog: false,  // Controls the dialog visibility
      title:['Add Book', 'Edit Book'],
      buttonName: 'Add',
// -----------list between dates need updation-----------------
      showDropdown: false,
      publishedDateDialog: false,
      betweenDatesDialog: false,
      publishedDate: "",
      startDate: "",
      endDate: "",
      tempStartDate: "", // Holds temporary start date before confirmation
      tempEndDate: "",   // Holds temporary end date before confirmation

 
      filteredBooks: [],

//  ---------- delete book ----------
      showDeleteConfirmDialog: false,
      bookToDelete: null,

// ---------- update book -----------
      showEditDialog: false,
      imageReady: true,
      bookToEdit: {
  bookName: '',
  author: '',
  price: null,
  edition: '',
  availableCopies: null,
  publishedDate: '',
  categoryId: null,
  languageId: null,
  coverImageFile: null,
  imagePreview: null, 
  coverImage: null 
},
      originalBookData: null,
  
    }),
    

    methods: {
// profile setup
openProfileDialog() {
    // this.showProfileDialog = true;
    this.$router.push('/publisherProfileUpdation')
  },
  async saveProfile() {
    // Add your API call here to save profile changes
    // For example:
    // await axios.put('/api/publisher/profile', this.profile);
    this.showProfileDialog = false;
  },
  logout() {
    localStorage.removeItem('token');
    this.$router.push('/');
  },

// end of profile setup


      async submit(payload){
        console.log('paylod',payload);
        const res = await this.$store.dispatch('publisher/addBook', payload);

      if (res) {
        alert("Successful!!!!");
        this.fetchBookList();
      } 

      },
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
      async fetchBookList(){
       const payload=this.loginDetails.id;
       const res= await this.$store.dispatch('publisher/listByPubId',payload);
       if(res){
        this.loadingSkel=false;
       }
       else{
        console.log(Error);
       }
       
      },

      //  fetch book by category
      async fetchBooksByCategory(catId) {
      try {
        this.loadingSkel = true;
        const payload = {
          pubId: this.loginDetails.id,
          catId: catId,
        };
        const res = await this.$store.dispatch('publisher/searchBooksByCategory', payload);
        if (res) {
          this.books = res;
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        this.loadingSkel = false;
      }
    },

    // fetch book by language

    async fetchBooksByLanguage(languageId) {
      try {
        this.loadingSkel = true;
        const payload = {
          pubId: this.loginDetails.id,
          languageId: languageId,
        };
        const res = await this.$store.dispatch('publisher/searchBooksByLanguage', payload);
        if (res) {
          this.books = res;
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        this.loadingSkel = false;
      }
    },

    // fetch book by category and language

    async fetchBooksByCategoryAndLanguage(catId, languageId) {
  try {
    this.loadingSkel = true;
    
    const payload = {
      pubId: this.loginDetails.id,
      catId: catId || null,       // Use null if no category is selected
      languageId: languageId || null, // Use null if no language is selected
    };

    const res = await this.$store.dispatch('publisher/searchBooksByCatAndLang', payload);

    if (res) {
      this.books = res;
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  } finally {
    this.loadingSkel = false;
  }
},


    // fetch book by published date

    async fetchBooksByPublishedDate(publishedDate) {
  try {
    this.loadingSkel = true;

    // Convert DD-MM-YYYY to YYYY-MM-DD before sending
    const formattedDate = this.formatDateToBackend(publishedDate);

    const payload = {
      pubId: this.loginDetails.id,
      publishedDate: formattedDate, // Correct format for backend
    };

    const res = await this.$store.dispatch("publisher/searchBooksByPublishedDate", payload);

    if (res) {
      // Convert backend dates to DD-MM-YYYY for display
      this.books = res.map(book => ({
        ...book,
        publishedDate: this.formatDateToFrontend(book.publishedDate),
      }));
    }
  } catch (error) {
    console.error("Error fetching books by published date:", error);
  } finally {
    this.loadingSkel = false;
  }
},




    // fetch book between published dates

    async fetchBooksBetweenPublishedDates(startDate, endDate) {
  try {
    this.loadingSkel = true;

    const payload = {
      pubId: this.loginDetails.id,
      startDate: startDate, // Already formatted in YYYY-MM-DD
      endDate: endDate, // Already formatted in YYYY-MM-DD
    };

    const res = await this.$store.dispatch("publisher/searchBooksBetweenPublishedDate", payload);

    if (res) {
      // Convert dates from backend format to DD-MM-YYYY for display
      this.books = res.map(book => ({
        ...book,
        publishedDate: this.formatDateToFrontend(book.publishedDate),
      }));
    }
  } catch (error) {
    console.error("Error fetching books between dates:", error);
  } finally {
    this.loadingSkel = false;
  }
},


// Format date from DD-MM-YYYY to YYYY-MM-DD (for backend)
formatDateToBackend(dateString) {
  if (!dateString || !dateString.includes('-')) return dateString; // Safety check

  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
},

// Format date from YYYY-MM-DD to DD-MM-YYYY (for frontend)
formatDateToFrontend(dateString) {
  if (!dateString || !dateString.includes('-')) return dateString; // Safety check

  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
},

formatStartDateToBackend() {
  if (this.startDate && this.startDate.includes('-')) {
    this.startDate = this.convertToBackendFormat(this.startDate);
  }
},
formatEndDateToBackend() {
  if (this.endDate && this.endDate.includes('-')) {
    this.endDate = this.convertToBackendFormat(this.endDate);
  }
},
convertToBackendFormat(dateString) {
  const [day, month, year] = dateString.split('-');
  if (day && month && year) {
    return `${year}-${month}-${day}`;
  }
  return dateString; // Return original if format is invalid
},

 
addBook(){
   this.showDialog=true;
},

closeDialog(){
  this.showDialog=false;
},


// ------------- list between dates-------------------


openPublishedDateDialog() {
this.publishedDateDialog = true;
this.showDropdown = false;
},
openBetweenDatesDialog() {
  this.betweenDatesDialog = true;
  this.showDropdown = false;
},


async filterByPublishedDate() {
  if (!this.publishedDate) {
    console.warn("Please select a valid date.");
    return;
  }

  // Format date to YYYY-MM-DD for backend
  const formattedDate = this.formatDateToBackend(this.publishedDate);

  // Fetch books using the selected published date
  await this.fetchBooksByPublishedDate(formattedDate);

  // Close the dialog after filtering
  this.publishedDateDialog = false;
  this.showDropdown = false;
},

confirmDateRange() {
    if (this.tempStartDate) {
      this.startDate = this.formatDateToBackend(this.tempStartDate);
    }
    if (this.tempEndDate) {
      this.endDate = this.formatDateToBackend(this.tempEndDate);
    }

    // Now trigger the book fetching after confirmation
    this.filterBetweenDates();

    // Close dialog after confirmation
    this.betweenDatesDialog = false;
  },

async filterBetweenDates() {
  if (!this.startDate || !this.endDate) {
    console.warn("Please enter valid dates.");
    return;
  }

  // Convert to YYYY-MM-DD before sending
  const formattedStartDate = this.convertToBackendFormat(this.startDate);
  const formattedEndDate = this.convertToBackendFormat(this.endDate);

  await this.fetchBooksBetweenPublishedDates(formattedStartDate, formattedEndDate);
  this.betweenDatesDialog = false; // Close dialog
  this.showDropdown = false; // Hide dropdown after filtering
},

//  search book by name

async fetchBooksByName(searchQuery) {
  try {
    this.loadingSkel = true;

    const payload = {
      pubId: this.loginDetails.id,
      bookName: searchQuery,
    };

    // Dispatch API call to search books by name
    const res = await this.$store.dispatch("publisher/searchBooksByName", payload);

    if (res) {
      this.books = res; // Update the book list with the search results
    }
  } catch (error) {
    console.error("Error fetching books by name:", error);
  } finally {
    this.loadingSkel = false;
  }
},

async fetchBooksByNameAndAuthor(query) {
  try {
    this.loadingSkel = true;

    // Trigger both API calls simultaneously
    const [booksByName, booksByAuthor] = await Promise.all([
      this.fetchBooksByName(query),
      this.fetchBooksByAuthorName(query),
    ]);

    // Merge results and remove duplicates if needed
    const combinedBooks = this.removeDuplicateBooks([
      ...(booksByName || []), 
      ...(booksByAuthor || []),
    ]);

    // Update books with combined results
    this.books = combinedBooks;

    // ✅ Handle case when no books are found
    if (combinedBooks.length === 0) {
      console.warn("No books found for the query.");
    }
  } catch (error) {
    console.error("Error fetching books by name and author:", error);
  } finally {
    this.loadingSkel = false;
  }
},






// Helper to remove duplicate books based on book ID
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

// delete book 

confirmDeleteBook(book) {
  console.log("Selected book for deletion:", book);
  this.bookToDelete = book;
  this.showDeleteConfirmDialog = true;
},

  async deleteConfirmed() {
  if (!this.bookToDelete) return;

  try {
    const payload = {
      pubId: this.loginDetails.id,
      bookId: this.bookToDelete.bookId, 
    };
    await this.$store.dispatch("publisher/deleteBook", payload);
    this.fetchBookList(); // refresh book list after deletion
  } catch (error) {
    console.error('Failed to delete book:', error);
  } finally {
    this.showDeleteConfirmDialog = false;
    this.bookToDelete = null;
  }
},

// --------- update book -----------

  openEditDialog(book) {
    this.bookToEdit = { ...book };
    this.originalBookData = { ...book }; // used for change detection
    this.showEditDialog = true;
  },
  closeEditDialog() {
    this.showEditDialog = false;
  },



async saveBookChanges() {
    try {
      const payload = {
  pubId: this.loginDetails.id,
  bookId: this.bookToEdit.bookId,
  bookName: this.bookToEdit.bookName,
  author: this.bookToEdit.author,
  price: this.bookToEdit.price,
  edition: this.bookToEdit.edition,
  availableCopies: this.bookToEdit.availableCopies,
  publishedDate: this.bookToEdit.publishedDate,
  catId: this.bookToEdit.categoryId,
  languageId: this.bookToEdit.languageId,
  coverImage: this.bookToEdit.coverImageFile, // <- base64 here
};

      console.log("Payload before update:", payload);

      const success = await this.$store.dispatch('publisher/updateBook', payload);

      if (success) {
        this.closeEditDialog();
        setTimeout(() => {
          this.fetchBookList();
        }, 500);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  },

  handleImageChange(file) {
  if (!file || !(file instanceof Blob)) {
    this.bookToEdit.coverImageFile = null;
    this.bookToEdit.coverImage = null;
    this.imageReady = true;
    return;
  }

  this.bookToEdit.coverImageFile = file;
  this.imageReady = false;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const base64String = e.target.result.split(',')[1];
      this.bookToEdit.coverImage = base64String; 
      this.imageReady = true;
    } catch (error) {
      console.error('Error processing file:', error);
      this.bookToEdit.coverImage = null;
      this.imageReady = true;
    }
  };

  reader.onerror = (e) => {
    console.error('Error reading file:', e);
    this.bookToEdit.coverImage = null;
    this.imageReady = true;
  };

  reader.readAsDataURL(file);
}
     
},

    watch: {

      //  list by category
      async selectedCat(newCatId) {
    if (newCatId && this.selectedLang) {
      // Fetch by both category and language
      await this.fetchBooksByCategoryAndLanguage(newCatId, this.selectedLang);
    } else if (newCatId) {
      // Fetch by category only
      await this.fetchBooksByCategory(newCatId);
    }
  },

    // list by language
    async selectedLang(newLang) {
    if (newLang && this.selectedCat) {
      // Fetch by both category and language
      await this.fetchBooksByCategoryAndLanguage(this.selectedCat, newLang);
    } else if (newLang) {
      // Fetch by language only
      await this.fetchBooksByLanguage(newLang);
    }
  },

    //  list by published date
    publishedDate(newDate) {
    if (newDate && !newDate.includes('-')) {
      // Only update if the format is not already DD-MM-YYYY
      this.publishedDate = this.formatDateToFrontend(newDate);
    }
  },

  //   filter between dates

  startDate(newStartDate) {
    if (newStartDate && newStartDate.includes('-')) {
      const formattedDate = this.convertToBackendFormat(newStartDate);
      if (formattedDate !== this.startDate) {
        // Update a different property or directly format dates in methods
        this.formattedStartDate = formattedDate; // New variable to store formatted date
      }
    }
  },
  endDate(newEndDate) {
    if (newEndDate && newEndDate.includes('-')) {
      const formattedDate = this.convertToBackendFormat(newEndDate);
      if (formattedDate !== this.endDate) {
        this.formattedEndDate = formattedDate;
      }
    }
  },

//  search book by name

searchQuery: {
  handler: _.debounce(async function (newQuery) {
    if (newQuery && newQuery.trim() !== "") {
      await this.fetchBooksByName(newQuery);
    } else {
      // If the search query is empty, reload all books
      await this.fetchBookList();
    }
  }, 300), // Debounce delay of 300ms to reduce API calls
  immediate: false,
},


  },
    computed:{
      ...mapGetters(['getLoginDetails']),
      ...mapGetters('publisher',['getBookListByPubId','getCategory','getLanguage']),
      loginDetails(){
        return this.getLoginDetails;
      },
      books(){
        return this.getBookListByPubId;
      },
      category(){
        return this.getCategory;
      },
      language(){
        return this.getLanguage;
      },

  //  for displaying profile avatar
   publisherInitials() {
  if (this.loginDetails && this.loginDetails.name) {
    // Split name by space or multiple spaces and remove empty strings
    const words = this.loginDetails.name
      .split(/\s+/) // Handle multiple spaces properly
      .filter(word => word.length > 0); // Remove any empty strings

    // Map first letter of each word and join them
    const initials = words
      .map(word => word.charAt(0).toUpperCase()) // Get first letter and capitalize
      .join(''); // Join letters together

    // Return first 3 initials (max 3 letters)
    return initials.substring(0, 3);
  }
  return 'MM'; // Default if no name is found
},



      
    },
  
mounted(){
  this.fetchBookList();
  this.$store.dispatch('publisher/categoryList');
  this.$store.dispatch('publisher/languageList');
  
  }
  }
</script>

<style scoped>
.custom-container {
  max-width: 1315px; /* Adjust as needed */
  margin-left: auto;
  margin-right: auto;
  
}

.searchbar{
  width: 50px;  
  margin-right: 30px;
  margin-top: 20px;
}
.addbutton{
  background-color: #A1887F;
  margin-right: 20px;
  cursor: pointer;
}

.dropdown{
  /* width: 5px; */
  margin-top: 20px;
  cursor: pointer;
  margin-right: 15px;
}
.bookcard{
  width: 270px;
  margin-top: 20px;
  /* margin-left: 40px; */ 
  
}

.storename {
  white-space: normal;
  word-wrap: break-word;
  max-width: 450px; /* Adjust as needed */
  margin-right: 60px;
  
 
}


.profile-avatar {
  margin-right: 0px; /* Adjust margin to move Profile Avatar to the left */
}

.avatar-text {
  font-size: 20px;
  font-weight: bold;
}


/* .searchbar {
  width: 150px; 
  margin-right: 15px;
} */

.searchbar {
  width: 150px; /* Set a reasonable width for search bar */
  margin-right: 15px;
}


.addbutton {
  background-color: #A1887F;
  margin-right: 20px;
  cursor: default;
}


.v-card-actions {
  padding: 8px 12px; /* Add padding for spacing */
  gap: 10px; /* Space between icons */
}

.v-icon {
  cursor: pointer; /* Pointer for better UX */
  font-size: 20px; /* Make icons slightly larger */

}
.v-icon:hover {
  transform: scale(1.2); /* Slight scale effect */
  transition: 0.2s ease-in-out;
  
}
.v-alert {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
}




</style>