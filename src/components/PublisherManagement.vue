<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="text-h4 font-weight-bold text-primary">
          Publisher Management Dashboard
        </h1>
        <p class="text-subtitle-1 text-medium-emphasis">
          Manage publishers and their status in the system
        </p>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title class="d-flex align-center">
        <span>Publishers List</span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          variant="outlined"
          density="compact"
          class="max-width-200"
        ></v-text-field>
      </v-card-title>
      
      <v-data-table
        :headers="publisherHeaders"
        :items="publishers"
        :search="search"
        :loading="loading"
        class="elevation-1"
      >
        <template #[`item.index`]="{ index }">
          {{ index + 1 }}
        </template>

        <template #[`item.status`]="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            :text-color="item.status?.toLowerCase() === 'pending' ? 'black' : 'white'"
            size="small"
            class="font-weight-medium"
          >
            <v-icon
              start
              size="small"
              :icon="getStatusIcon(item.status)"
            ></v-icon>
            {{ item.status }}
          </v-chip>
        </template>

        <template #[`item.actions`]="{ item }">
          <div class="d-flex align-center justify-center gap-2">
            <v-menu location="end" offset="8">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-dots-vertical"
                  size="small"
                  variant="text"
                  color="primary"
                ></v-btn>
              </template>
              <v-list>
                <v-list-subheader>Change Status</v-list-subheader>
                <v-list-item
                  v-for="status in statusOptions"
                  :key="status"
                  :value="status"
                  @click="updatePublisherStatus(item, status)"
                  :active="item.status === status"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="status.toLowerCase() === 'pending' ? 'orange-darken-2' : getStatusColor(status)"
                      :icon="getStatusIcon(status)"
                      size="small"
                    ></v-icon>
                  </template>
                  <v-list-item-title>{{ status }}</v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item
                  color="error"
                  @click="deletePublisher(item)"
                >
                  <template v-slot:prepend>
                    <v-icon
                      color="error"
                      icon="mdi-delete"
                      size="small"
                    ></v-icon>
                  </template>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PublisherManagement',
  data() {
    return {
      search: '',
      loading: false,
      publisherHeaders: [
        { 
          title: 'Sl.No',
          key: 'index',
          align: 'start',
          sortable: false
        },
        { 
          title: 'Publisher ID',
          key: 'pubId',
          align: 'start'
        },
        { 
          title: 'Publisher Name',
          key: 'pub_name',
          align: 'start'
        },
        { 
          title: 'Email',
          key: 'email',
          align: 'start'
        },
        { 
          title: 'Phone',
          key: 'phone',
          align: 'start'
        },
        { 
          title: 'Address',
          key: 'address',
          align: 'start'
        },
        { 
          title: 'License No',
          key: 'license_no',
          align: 'center'
        },
        { 
          title: 'Status',
          key: 'status',
          align: 'center'
        },
        { 
          title: 'Actions',
          key: 'actions',
          sortable: false,
          align: 'center'
        }
      ]
    }
  },

  computed: {
    ...mapGetters('admin', ['getPublisher']),
    publishers() {
      return this.getPublisher || []
    },
    statusOptions() {
      return ['Pending', 'Accepted', 'Rejected']
    }
  },

  async created() {
    await this.fetchPublishers()
  },

  methods: {
    async fetchPublishers() {
      try {
        this.loading = true
        await this.$store.dispatch('admin/fetchPublishers')
      } catch (error) {
        console.error('Error fetching publishers:', error)
      } finally {
        this.loading = false
      }
    },

    getStatusColor(status) {
      switch (status?.toLowerCase()) {
        case 'accepted':
          return 'blue-accent-4'
        case 'rejected':
          return 'red-accent-4'
        case 'pending':
        default:
          return 'orange-darken-3'
      }
    },

    getStatusIcon(status) {
      switch (status?.toLowerCase()) {
        case 'accepted':
          return 'mdi-check-circle'
        case 'rejected':
          return 'mdi-close-circle'
        case 'pending':
        default:
          return 'mdi-clock-outline'
      }
    },

    async updatePublisherStatus(item, newStatus) {
  try {
    let statusId;
    switch(newStatus.toLowerCase()) {
      case 'accepted':
        statusId = 2;
        break;
      case 'rejected':
        statusId = 3;
        break;
      case 'pending':
      default:
        statusId = 1;
    }

    const result = await this.$store.dispatch('admin/updatePermission', {
      pubId: item.pubId,
      statusId: statusId
    });

    if (result) {
      await this.fetchPublishers();
      this.$emit('show-snackbar', {
        color: 'success',
        text: 'Status updated successfully!'
      });
    }
  } catch (error) {
    console.error('Error updating status:', error);
    this.$emit('show-snackbar', {
      color: 'error',
      text: 'Failed to update status'
    });
  }
},


    async deletePublisher(item) {
      if (confirm(`Are you sure you want to delete ${item.pub_name}?`)) {
        try {
          const result = await this.$store.dispatch('admin/deletePublisher', { pubId: item.pubId })
          if (result) {
            await this.fetchPublishers()
            this.$emit('show-snackbar', {
              color: 'success',
              text: 'Publisher deleted successfully!'
            })
          }
        } catch (error) {
          console.error('Error deleting publisher:', error)
          this.$emit('show-snackbar', {
            color: 'error',
            text: 'Failed to delete publisher'
          })
        }
      }
    }
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
.max-width-200 {
  max-width: 200px;
}
.gap-2 {
  gap: 8px;
}
</style>