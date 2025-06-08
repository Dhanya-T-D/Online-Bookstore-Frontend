<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="text-h4 font-weight-bold text-primary">
          User Management Dashboard
        </h1>
        <p class="text-subtitle-1 text-medium-emphasis">
          Manage users, view user details, and handle user accounts
        </p>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title>
        User Management
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          variant="outlined"
          density="compact"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="userHeaders"
        :items="users"
        :search="search"
        :loading="loading"
        class="elevation-1"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider class="mx-4" vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:[`item.index`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            :color="item.status === 'Active' ? 'success' : 'error'"
            size="small"
          >
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex justify-center">

            <v-icon
              size="small" 
              @click="deleteUser(item)"
              icon="mdi-delete"
            ></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- User Details Dialog -->
    <!-- <v-dialog v-model="detailDialog" max-width="600">
      <v-card>
        <v-card-title>{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-form v-model="formValid" ref="userForm">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedUser.userName"
                  label="Username"
                  :rules="[v => !!v || 'Username is required']"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedUser.email"
                  label="Email"
                  type="email"
                  :rules="[
                    v => !!v || 'Email is required',
                    v => /.+@.+\..+/.test(v) || 'Email must be valid'
                  ]"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedUser.phone"
                  label="Phone"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="selectedUser.address"
                  label="Address"
                  rows="3"
                  variant="outlined"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedUser.status"
                  :items="['Active', 'Inactive']"
                  label="Status"
                  variant="outlined"
                ></v-select>
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
            @click="saveUserChanges"
            :disabled="!formValid"
            :loading="saving"
          >
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title>Delete User</v-card-title>
        <v-card-text>
          Are you sure you want to delete this user? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="grey-darken-1" 
            variant="text" 
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn 
            color="error" 
            variant="text" 
            @click="confirmDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserManagement',
  emits: ['show-snackbar'],
  data() {
    return {
      search: '',
      loading: false,
      detailDialog: false,
      deleteDialog: false,
      saving: false,
      formValid: true,
      selectedUser: {
        userId: null,
        userName: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active'
      },
      userToDelete: null,
      userHeaders: [
        { title: 'Sl.No', key: 'index', align: 'start', width: '80px' },
        { title: 'User ID', key: 'userid', align: 'start' },
        { title: 'Username', key: 'username', align: 'start' },
        { title: 'Email', key: 'email', align: 'start' },
        { title: 'Phone', key: 'phone', align: 'start' },
        { title: 'Actions', key: 'actions', sortable: false, align: 'center' }
      ]
    }
  },

  computed: {
    ...mapGetters('admin', ['getUsers']),
    users() {
      return this.getUsers || []
    },
    formTitle() {
      return this.selectedUser.userId ? 'Edit User' : 'User Details'
    }
  },

  async created() {
    await this.fetchUsers()
  },

  methods: {
    async fetchUsers() {
      try {
        this.loading = true
        await this.$store.dispatch('admin/fetchUsers')
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        this.loading = false
      }
    },

    viewUser(item) {
      this.selectedUser = { ...item }
      this.detailDialog = true
    },

    editUser(item) {
      this.selectedUser = { ...item }
      this.detailDialog = true
    },

    deleteUser(item) {
      this.userToDelete = item
      this.deleteDialog = true
    },

    async confirmDelete() {
      try {
        const result = await this.$store.dispatch('admin/deleteUser', {
          userId: this.userToDelete.userId
        })
        if (result) {
          await this.fetchUsers()
          this.$emit('show-snackbar', {
            color: 'success',
            text: 'User deleted successfully!'
          })
        }
      } catch (error) {
        console.error('Error deleting user:', error)
        this.$emit('show-snackbar', {
          color: 'error',
          text: 'Failed to delete user'
        })
      } finally {
        this.deleteDialog = false
        this.userToDelete = null
      }
    },

    closeDialog() {
      this.detailDialog = false
      this.selectedUser = {
        userId: null,
        userName: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active'
      }
      if (this.$refs.userForm) {
        this.$refs.userForm.reset()
      }
    },

    // async saveUserChanges() {
    //   if (!this.$refs.userForm.validate()) return

    //   try {
    //     this.saving = true
    //     const result = await this.$store.dispatch('admin/updateUser', this.selectedUser)
    //     if (result) {
    //       await this.fetchUsers()
    //       this.closeDialog()
    //       this.$emit('show-snackbar', {
    //         color: 'success',
    //         text: 'User updated successfully!'
    //       })
    //     }
    //   } catch (error) {
    //     console.error('Error updating user:', error)
    //     this.$emit('show-snackbar', {
    //       color: 'error',
    //       text: 'Failed to update user'
    //     })
    //   } finally {
    //     this.saving = false
    //   }
    // }
  }
}
</script>

<style scoped>
.text-h4 {
  letter-spacing: 0.5px;
}
.text-subtitle-1 {
  margin-top: 8px;
}
</style>