<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="text-h4 font-weight-bold primary--text">
          Book Management Dashboard
        </h1>
        <p class="text-subtitle-1 grey--text">
          Manage your books inventory, add new books, edit details, or remove books from the system
        </p>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title class="d-flex align-center">
        <span>Book Management</span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          density="compact"
          class="max-w-300"
        ></v-text-field>
      </v-card-title>
      
      <v-data-table
        :headers="bookHeaders"
        :items="booksWithIndex"
        :search="search"
        :loading="loading"
        class="elevation-1"
        item-value="bookId"
      >
        <template #[`item.coverImage`]="{ item }">
          <v-img
            :src="'data:image/jpeg;base64,' + item.coverImage"
            height="50"
            width="40"
            cover
          ></v-img>
        </template>
        
        <template #[`item.price`]="{ item }">
          ₹{{ item.price }}
        </template>
        
        <template #[`item.publishedDate`]="{ item }">
          {{ formatDate(item.publishedDate) }}
        </template>
        
        <template #[`item.actions`]="{ item }">
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              @click="deleteBook(item)"
            ></v-btn>
          
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="detailDialog" max-width="800">
      <v-card>
        <v-card-title>Edit Book</v-card-title>
        <v-card-text>
          <v-form v-model="formValid" ref="bookForm" v-if="selectedBook">
            <v-row>
              <v-col cols="4">
                <v-img
                  :src="'data:image/jpeg;base64,' + selectedBook.coverImage"
                  height="200"
                  cover
                ></v-img>
                <v-file-input
                  v-model="newCoverImage"
                  label="Change Cover Image"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  @change="handleImageChange"
                  class="mt-4"
                ></v-file-input>
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="selectedBook.bookName"
                      label="Book Name"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="selectedBook.author"
                      label="Author"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model.number="selectedBook.price"
                      label="Price"
                      type="number"
                      prefix="₹"
                      :rules="[rules.required, rules.positive]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model.number="selectedBook.availableCopies"
                      label="Available Copies"
                      type="number"
                      :rules="[rules.required, rules.nonNegative]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="selectedBook.catId"
                      :items="category"
                      item-title="catName"
                      item-value="catId"
                      label="Category"
                      :rules="[rules.required]"
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="selectedBook.languageId"
                      :items="language"
                      item-title="languageName"
                      item-value="languageId"
                      label="Language"
                      :rules="[rules.required]"
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model.number="selectedBook.edition"
                      label="Edition"
                      type="number"
                      :rules="[rules.required, rules.positive]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="selectedBook.publishedDate"
                      label="Published Date"
                      type="date"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="grey-darken-1" 
            variant="text" 
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn 
            color="primary" 
            @click="saveBookChanges" 
            :disabled="!formValid"
            :loading="saving"
          >
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
      <template #actions>
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
import { mapGetters } from 'vuex'

export default {
  name: 'BookManagement',
  data() {
    return {
      search: '',
      loading: false,
      detailDialog: false,
      selectedBook: {
        bookId: null,
        bookName: '',
        author: '',
        price: 0,
        availableCopies: 0,
        edition: 1,
        publishedDate: '',
        catId: null,
        languageId: null,
        coverImage: null
      },
      formValid: false,
      newCoverImage: null,
      saving: false,
      snackbar: {
        show: false,
        text: '',
        color: 'success'
      },
      rules: {
        required: value => !!value || 'This field is required',
        positive: value => value > 0 || 'Value must be positive',
        nonNegative: value => value >= 0 || 'Value must be non-negative'
      },
      bookHeaders: [
        {
          title: '#',
          key: 'index',
          sortable: false,
          align: 'center',
          width: '60px'
        },
        { 
          title: 'Cover Image',
          key: 'coverImage',
          sortable: false,
          align: 'center',
          width: '80px'
        },
        { 
          title: 'Book ID',
          key: 'bookId',
          align: 'start'
        },
        { 
          title: 'Book Name',
          key: 'bookName',
          align: 'start'
        },
        { 
          title: 'Publisher Name',
          key: 'publisherName',
          align: 'start'
        },
        { 
          title: 'Author',
          key: 'author',
          align: 'start'
        },
        { 
          title: 'Price',
          key: 'price',
          align: 'end'
        },
        { 
          title: 'Category',
          key: 'category',
          align: 'start'
        },
        { 
          title: 'Language',
          key: 'language',
          align: 'start'
        },
        { 
          title: 'Edition',  
          key: 'edition',
          align: 'center'
        },
        { 
          title: 'Available Copies',
          key: 'availableCopies',
          align: 'end'
        },
        { 
          title: 'Published Date',
          key: 'publishedDate',
          align: 'start'
        },
        { 
          title: 'Actions',
          key: 'actions',
          sortable: false,
          align: 'center',
          width: '120px'
        }
      ]
    }
  },

  computed: {
    ...mapGetters('user', ['getBookList']),
    ...mapGetters('admin', ['getCategory', 'getLanguage']),
    
    books() {
      return this.getBookList || []
    },
    
    booksWithIndex() {
      return this.books.map((book, index) => ({
        ...book,
        index: index + 1
      }))
    },
    
    category() {
      return this.getCategory || []
    },
    
    language() {
      return this.getLanguage || []
    }
  },

  async created() {
    await this.fetchBooks()
    await Promise.all([
      this.$store.dispatch('admin/categoryList'),
      this.$store.dispatch('admin/languageList')
    ])
  },

  methods: {
    async fetchBooks() {
      try {
        this.loading = true
        await this.$store.dispatch('user/listBooks')
      } catch (error) {
        console.error('Error fetching books:', error)
        this.showSnackbar('Failed to fetch books', 'error')
      } finally {
        this.loading = false
      }
    },

    async deleteBook(item) {
      const confirmed = await this.confirmDelete(item.bookName)
      if (confirmed) {
        try {
          const result = await this.$store.dispatch('admin/deleteBook', { 
            bookId: item.bookId 
          })
          if (result) {
            await this.fetchBooks()
            this.showSnackbar('Book deleted successfully!', 'success')
          }
        } catch (error) {
          console.error('Error deleting book:', error)
          this.showSnackbar('Failed to delete book', 'error')
        }
      }
    },

    async editBook(item) {
      try {
        await Promise.all([
          this.$store.dispatch('admin/categoryList'),
          this.$store.dispatch('admin/languageList')
        ])

        this.selectedBook = {
          bookId: item.bookId,
          bookName: item.bookName,
          author: item.author,
          price: parseFloat(item.price),
          availableCopies: parseInt(item.availableCopies),
          edition: parseInt(item.edition),
          publishedDate: this.formatDateForInput(item.publishedDate),
          catId: item.categoryId,
          languageId: item.languageId,
          coverImage: item.coverImage
        }
        this.detailDialog = true
      } catch (error) {
        console.error('Error preparing edit:', error)
        this.showSnackbar('Failed to load edit form', 'error')
      }
    },

    closeDialog() {
      this.detailDialog = false
      this.selectedBook = {
        bookId: null,
        bookName: '',
        author: '',
        price: 0,
        availableCopies: 0,
        edition: 1,
        publishedDate: '',
        catId: null,
        languageId: null,
        coverImage: null
      }
      this.newCoverImage = null
      if (this.$refs.bookForm) {
        this.$refs.bookForm.reset()
      }
    },

    handleImageChange(files) {
      if (files && files.length > 0) {
        this.newCoverImage = files[0]
      }
    },

    async saveBookChanges() {
      const { valid } = await this.$refs.bookForm.validate()
      if (!valid) return

      try {
        this.saving = true
        const formData = new FormData()
        
        formData.append('bookId', this.selectedBook.bookId.toString())

        const updateBookDto = {
          author: this.selectedBook.author,
          availableCopies: parseInt(this.selectedBook.availableCopies),
          bookName: this.selectedBook.bookName,
          catId: parseInt(this.selectedBook.catId),
          languageId: parseInt(this.selectedBook.languageId),
          publishedDate: this.selectedBook.publishedDate,
          edition: parseInt(this.selectedBook.edition),
          price: parseFloat(this.selectedBook.price)
        }

        formData.append('updateBookDto', JSON.stringify(updateBookDto))

        if (this.newCoverImage) {
          formData.append('coverImage', this.newCoverImage)
        }

        const result = await this.$store.dispatch('admin/updateBook', formData)
        if (result) {
          await this.fetchBooks()
          this.closeDialog()
          this.showSnackbar('Book updated successfully!', 'success')
        }
      } catch (error) {
        console.error('Error updating book:', error)
        this.showSnackbar('Failed to update book', 'error')
      } finally {
        this.saving = false
      }
    },

    formatDate(dateString) {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString('en-GB')
    },

    formatDateForInput(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toISOString().split('T')[0]
    },

    confirmDelete(bookName) {
      return new Promise((resolve) => {
        const confirmed = confirm(`Are you sure you want to delete "${bookName}"?`)
        resolve(confirmed)
      })
    },

    showSnackbar(text, color = 'success') {
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
.max-w-300 {
  max-width: 300px;
}

.text-h4 {
  letter-spacing: 0.5px;
}

.text-subtitle-1 {
  margin-top: 8px;
}

:deep(.v-data-table) {
  border: 1px solid rgb(var(--v-border-color));
}

:deep(.v-data-table .v-data-table__thead .v-data-table__th) {
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  font-size: 14px;
  font-weight: 500;
  padding: 16px;
  height: 48px;
  border-bottom: thin solid rgb(var(--v-border-color));
  white-space: nowrap;
}

:deep(.v-data-table .v-data-table__tbody .v-data-table__td) {
  padding: 16px;
  height: 64px;
  font-size: 14px;
  color: rgb(var(--v-theme-on-surface));
}

:deep(.v-btn) {
  transition: all 0.2s;
}

:deep(.v-btn:hover) {
  opacity: 0.8;
}

.v-dialog {
  border-radius: 8px;
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: 500;
}

.v-file-input {
  margin-top: 16px;
}
</style>