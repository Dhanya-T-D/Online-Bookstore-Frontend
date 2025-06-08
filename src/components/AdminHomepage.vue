<template>
  <v-app>
    <!-- Side Navigation -->
    <v-navigation-drawer v-model="drawer" app  theme="dark">
      <v-list-item>
        <v-list-item-title class="text-h6">
          Magic Margins
        </v-list-item-title>
        <v-list-item-subtitle>
          Admin Panel
        </v-list-item-subtitle>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item 
          v-for="item in menuItems" 
          :key="item.title" 
          :prepend-icon="item.icon"
          :title="item.title"
          @click="currentView = item.view"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Top App Bar -->
    <v-app-bar app color="primary" theme="dark">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Admin Dashboard</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-refresh" @click="refreshData"></v-btn>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-account-circle" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-grey-lighten-3">
      <v-container fluid>
        <!-- Dashboard Overview -->
        <v-row v-if="currentView === 'dashboard'">
          <v-col cols="12" sm="6" md="3">
            <v-card class="mx-auto" elevation="2">
              <v-card-text>
                <div class="text-overline mb-4">TOTAL USERS</div>
                <div class="text-h4 mb-2">{{ stats.totalUsers }}</div>
                <v-icon color="primary" size="large">mdi-account-group</v-icon>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="mx-auto" elevation="2">
              <v-card-text>
                <div class="text-overline mb-4">PUBLISHERS</div>
                <div class="text-h4 mb-2">{{ stats.totalPublishers }}</div>
                <v-icon color="success" size="large">mdi-book-open-page-variant</v-icon>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="mx-auto" elevation="2">
              <v-card-text>
                <div class="text-overline mb-4">TOTAL BOOKS</div>
                <div class="text-h4 mb-2">{{ stats.totalBooks }}</div>
                <v-icon color="info" size="large">mdi-book-multiple</v-icon>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="mx-auto" elevation="2">
              <v-card-text>
                <div class="text-overline mb-4">TOTAL ORDERS</div>
                <div class="text-h4 mb-2">{{ stats.totalOrders }}</div>
                <v-icon color="warning" size="large">mdi-cart</v-icon>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Recent Activity Chart -->
          <v-col cols="12" md="8">
            <v-card elevation="2">
              <!-- <v-card-title>Recent Activity</v-card-title> -->
              <v-card-text>
                <v-sheet height="400">
                  <ActivityChart></ActivityChart>
                </v-sheet>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Quick Actions -->
          <v-col cols="12" md="4">
            <v-card elevation="2">
              <v-card-title>Quick Actions</v-card-title>
              <v-card-text>
                <v-btn block color="primary" class="mb-2" @click="openAddLanguageDialog">Add Language</v-btn>
                <v-btn block color="success" class="mb-2" @click="openAddCategoryDialog">Add Category</v-btn>
                <v-btn block color="info">View Reports</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Books Management -->
        <v-row v-if="currentView === 'books'">
          <v-col cols="12">
            <book-management></book-management>
          </v-col>
        </v-row>        
        
        <!-- Publishers Management -->
        <v-row v-if="currentView === 'publishers'">
          <v-col cols="12">
            <publisher-management></publisher-management>
          </v-col>
        </v-row>

        <!-- Users Management -->
        <v-row v-if="currentView === 'users'">
          <v-col cols="12">
            <user-management></user-management>
          </v-col>
        </v-row>

        <!-- Category Management -->
        <v-row v-if="currentView === 'categories'">
          <v-col cols="12">
            <v-card>
              <v-card-title>
                Category Management
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-inner-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="categoryHeaders"
                :items="categories"
                :search="search"
                :loading="loading"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Categories</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="mb-2" @click="openAddCategoryDialog">
                      <v-icon start>mdi-plus</v-icon>
                      Add Category
                    </v-btn>
                  </v-toolbar>
                </template>
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ item.catId }}</td>
                    <td>{{ item.catName }}</td>
                    <td>
                      <div class="d-flex justify-center">
                        <v-icon size="small" class="me-2" @click="editCategory(item)">mdi-pencil</v-icon>
                        <v-icon size="small" @click="deleteCategory(item)">mdi-delete</v-icon>
                      </div>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>

        <!-- Category Dialog -->
        <v-dialog v-model="categoryDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ categoryFormTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form v-model="formValid" ref="categoryForm">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="categoryData.catName"
                        :rules="Rules.name"
                        label="Category Name"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeCategoryDialog">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="saveCategory" :disabled="!formValid">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Category Delete Dialog -->
        <v-dialog v-model="categoryDeleteDialog" max-width="500px">
          <v-card>
            <v-card-title class="text-h7">Are you sure you want to delete this category?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeCategoryDeleteDialog">Cancel</v-btn>
              <v-btn color="red-darken-1" variant="text" @click="deleteCategoryConfirm">Delete</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Language Management -->
        <v-row v-if="currentView === 'languages'">
          <v-col cols="12">
            <v-card>
              <v-card-title>
                Language Management
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-inner-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="languageHeaders"
                :items="language"
                :search="search"
                :loading="loading"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Languages</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="mb-2" @click="openAddLanguageDialog">
                      <v-icon start>mdi-plus</v-icon>
                      Add Language
                    </v-btn>
                  </v-toolbar>
                </template>
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ item.languageId }}</td>
                    <td>{{ item.languageName }}</td>
                    <td>
                      <div class="d-flex justify-center">
                        <v-icon size="small" class="me-2" @click="editLanguage(item)">mdi-pencil</v-icon>
                        <v-icon size="small" @click="deleteLanguage(item)">mdi-delete</v-icon>
                      </div>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>

        <!-- Language Dialog -->
        <v-dialog v-model="languageDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form v-model="formValid" ref="languageForm">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedLanguage.name"
                        :rules="Rules.name"
                        label="Language Name"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeLanguageDialog">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="saveLanguage" :disabled="!formValid">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Delete Dialog -->
        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card>
            <v-card-title class="text-h7">Are you sure you want to delete this language?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDeleteDialog">Cancel</v-btn>
              <v-btn color="red-darken-1" variant="text" @click="deleteLanguageConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import BookManagement from './BookManagement.vue'
import PublisherManagement from './PublisherManagement.vue'
import UserManagement from './UserManagement.vue'
import ActivityChart from './ActivityChart.vue';


export default {
  name: 'AdminHomepage',

  created() {
    localStorage.setItem('lastRoute', 'admin-home');
  },

  components: {
    BookManagement,
    PublisherManagement,
    UserManagement,
    ActivityChart
  },
  data() {
    return {
      drawer: true,
      currentView: 'dashboard',
      search: '',
      loading: false,
      languageDialog: false,
      deleteDialog: false,
      editedIndex: -1,
      editedLanguage: {
        name: ''  
      },
      defaultLanguage: {
        name: ''
      },
      Rules: {
        name: [
          v => !!v || 'must required',
          v => (v && v.length >= 2) || 'Language name must be at least 2 characters',
          v => (v && v.length <= 50) || 'Language name must be less than 50 characters'
        ]
      },

      menuItems: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', view: 'dashboard' },
        { title: 'Users', icon: 'mdi-account-group', view: 'users' },
        { title: 'Publishers', icon: 'mdi-book-open-page-variant', view: 'publishers' },
        { title: 'Books', icon: 'mdi-book-multiple', view: 'books' },
        { title: 'Categories', icon: 'mdi-shape', view: 'categories' },
        { title: 'Languages', icon: 'mdi-translate', view: 'languages' },
        { title: 'Reports', icon: 'mdi-chart-bar', view: 'reports' }
      ],

      languageHeaders: [
        { 
          title: 'Sl.No',
          key: 'index',
          sortable: false,
          align: 'center',
          width: 80
        },
        { title: 'Language ID', key: 'languageId' },
        { title: 'Language', key: 'languageName' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],

      // Category management data
      formValid: false,
      categoryDialog: false,
      categoryDeleteDialog: false,
      categoryToDelete: null,
      editedCategoryIndex: -1,
      categoryData: {
        catName: ""
      },
      editedCategory: {
        name: '',
        description: ''
      },
      defaultCategory: {
        name: '',
        description: ''
      },
      categoryHeaders: [
        { 
          title: 'Sl.No',
          key: 'index',
          sortable: false,
          align: 'center',
          width: 80
        },
        { title: 'Category ID', key: 'catId' },
        { title: 'Category Name', key: 'catName' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
    }
  },

  computed: {
    ...mapGetters('admin', ['getLanguage', 'getDashboardStats', 'getCategory']),

    language() {
      return this.getLanguage || [];
    },
    categories() {
      return this.getCategory || [];
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Language' : 'Edit Language'
    },
    categoryFormTitle() {
      return this.editedCategoryIndex === -1 ? 'New Category' : 'Edit Category'
    },
    stats() {
      return this.getDashboardStats || {
        totalUsers: 0,
        totalPublishers: 0,
        totalBooks: 0,
        totalOrders: 0
      };
    },
  },

  mounted() {
    this.refreshData();
    this.fetchDashboardData();
    this.fetchLanguages();
    this.fetchCategory();
  },

  methods: {
    async refreshData() {
      this.loading = true;
      try {
        await this.$store.dispatch('admin/fetchLanguages');
        this.$store.dispatch('admin/dashboardStats');
        await this.$store.dispatch('admin/fetchCategory');
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchDashboardData() {
      try {
        await this.$store.dispatch('admin/dashboardStats');
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    },

    async fetchLanguages() {
      try {
        await this.$store.dispatch("admin/fetchLanguages");
      } catch (error) {
        console.error('Error fetching languages:', error)
      }
    },

    async fetchCategory() {
      try {
        await this.$store.dispatch("admin/fetchCategory");
      } catch (error) {
        console.error('Error fetching category:', error)
      }
    },

    openAddLanguageDialog() {
      this.editedIndex = -1;
      this.editedLanguage = Object.assign({}, this.defaultLanguage);
      this.languageDialog = true;
    },

    editLanguage(item) {
      this.editedIndex = this.language.indexOf(item);
      this.editedLanguage = {
        languageId: item.languageId,
        name: item.languageName
      };
      this.languageDialog = true;
    },

    deleteLanguage(item) {
      this.editedIndex = this.language.indexOf(item);
      this.editedLanguage = Object.assign({}, item);
      this.deleteDialog = true;
    },

    async deleteLanguageConfirm() {
      try {
        const success = await this.$store.dispatch('admin/deleteLanguage', {
          languageId: this.editedLanguage.languageId
        });
        
        if (success) {
          this.language.splice(this.editedIndex, 1);
        }
      } catch (error) {
        console.error('Error deleting language:', error);
      }
      this.closeDeleteDialog();
    },

    closeDeleteDialog() {
      this.deleteDialog = false;
      this.$nextTick(() => {
        this.editedLanguage = Object.assign({}, this.defaultLanguage);
        this.editedIndex = -1;
      });
    },

    closeLanguageDialog() {
      this.$refs.languageForm.reset();
      this.languageDialog = false;
      this.$nextTick(() => {
        this.editedLanguage = Object.assign({}, this.defaultLanguage);
        this.editedIndex = -1;
      });
    },

    async saveLanguage() {
      if (this.$refs.languageForm.validate()) {
        try {
          if (this.editedIndex > -1) {
            await this.$store.dispatch('admin/updateLanguage', {
              languageId: this.editedLanguage.languageId,
              languageName: this.editedLanguage.name
            });
          } else {
            await this.$store.dispatch('admin/addLanguage', {
              languageName: this.editedLanguage.name
            });
          }
          await this.refreshData();
          this.closeLanguageDialog();
        } catch (error) {
          console.error('Error saving language:', error);
        }
      }
    },

    // Category Management Methods
    openAddCategoryDialog() {
      this.editedCategoryIndex = -1;
      this.editedCategory = Object.assign({}, this.defaultCategory);
      this.categoryDialog = true;
    },

    editCategory(item) {
      this.editedCategoryIndex = this.categories.indexOf(item);
      this.editedCategory = Object.assign({}, item);
      this.categoryData.catName = item.catName;
      this.categoryDialog = true;
    },

    deleteCategory(item) {
      console.log('Category to delete:', item);
      if (!item || !item.catId) {
        console.error('Invalid category data:', item);
        this.$emit('show-snackbar', {
          color: 'error',
          text: 'Invalid category data'
        });
        return;
      }
      this.categoryToDelete = Object.assign({}, item);
      this.categoryDeleteDialog = true;
    },

    async deleteCategoryConfirm() {
      try {
        if (!this.categoryToDelete || !this.categoryToDelete.catId) {
          this.$emit('show-snackbar', {
            color: 'error',
            text: 'Invalid category data'
          });
          return;
        }

        console.log('Attempting to delete category with ID:', this.categoryToDelete.catId);

        const result = await this.$store.dispatch('admin/deleteCategory', {
          cat_id: this.categoryToDelete.catId
        });
        
        if (result) {
          await this.$store.dispatch('admin/fetchCategory');
          this.$emit('show-snackbar', {
            color: 'success',
            text: 'Category deleted successfully'
          });
        } else {
          this.$emit('show-snackbar', {
            color: 'error',
            text: 'Failed to delete category. It might be in use.'
          });
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        this.$emit('show-snackbar', {
          color: 'error',
          text: error.response?.data?.message || 'Error occurred while deleting category'
        });
      } finally {
        this.closeCategoryDeleteDialog();
      }
    },

    closeCategoryDeleteDialog() {
      this.categoryDeleteDialog = false;
      this.categoryToDelete = null;
    },

    closeCategoryDialog() {
      this.$refs.categoryForm.reset();
      this.categoryDialog = false;
      this.$nextTick(() => {
        this.categoryData.catName = '';
        this.editedCategoryIndex = -1;
      });
    },

    async saveCategory() {
      try {
        if (!this.$refs.categoryForm.validate()) {
          return;
        }
        
        if (this.editedCategoryIndex === -1) {
          const success = await this.$store.dispatch('admin/addCategory', this.categoryData);
          if (success) {
            await this.$store.dispatch('admin/fetchCategory');
            this.$emit('show-snackbar', {
              color: 'success',
              text: 'Category added successfully!'
            });
          }
        } else {
          const updateData = {
            cat_id: this.editedCategory.catId,
            cat_name: this.categoryData.catName
          };
          console.log('Update category data:', updateData);
          const success = await this.$store.dispatch('admin/updateCategory', updateData);
          if (success) {
            await this.$store.dispatch('admin/fetchCategory');
            this.$emit('show-snackbar', {
              color: 'success',
              text: 'Category updated successfully!'
            });
          }
        }
        this.closeCategoryDialog();
      } catch (error) {
        console.error('Error saving category:', error);
        this.$emit('show-snackbar', {
          color: 'error',
          text: 'Failed to save category'
        });
      }
    },

    logout() {
      this.$router.push('/');
    }
  }
};
</script>
  
  <style scoped>
  .v-card {
    transition: all 0.3s ease-in-out;
  }
  
  .v-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
  }
  
  .v-navigation-drawer {
    transition: all 0.3s ease-in-out;
  }
  </style>