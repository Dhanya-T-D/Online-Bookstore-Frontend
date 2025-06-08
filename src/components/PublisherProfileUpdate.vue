<template>
  <v-container>
    <v-card class="mx-auto" max-width="800">
      <v-card-title class="text-h5 pa-6">
        <v-icon left>mdi-account-edit</v-icon>
        Update Publisher Profile
      </v-card-title>
      
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <!-- Basic Information -->
            <v-col cols="12">
              <v-subheader class="text-h6 px-0">Basic Information</v-subheader>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.companyName"
                :rules="companyNameRules"
                label="Company Name"
                prepend-icon="mdi-domain"
                required
                outlined
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.publisherCode"
                :rules="publisherCodeRules"
                label="Publisher Code"
                prepend-icon="mdi-identifier"
                required
                outlined
              ></v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-textarea
                v-model="profile.description"
                :rules="descriptionRules"
                label="Company Description"
                prepend-icon="mdi-text"
                rows="3"
                outlined
              ></v-textarea>
            </v-col>
            
            <!-- Contact Information -->
            <v-col cols="12">
              <v-subheader class="text-h6 px-0">Contact Information</v-subheader>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.email"
                :rules="emailRules"
                label="Email Address"
                prepend-icon="mdi-email"
                type="email"
                required
                outlined
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.phone"
                :rules="phoneRules"
                label="Phone Number"
                prepend-icon="mdi-phone"
                outlined
              ></v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-text-field
                v-model="profile.website"
                :rules="websiteRules"
                label="Website URL"
                prepend-icon="mdi-web"
                outlined
              ></v-text-field>
            </v-col>
            
            <!-- Address Information -->
            <v-col cols="12">
              <v-subheader class="text-h6 px-0">Address Information</v-subheader>
            </v-col>
            
            <v-col cols="12">
              <v-textarea
                v-model="profile.address.street"
                label="Street Address"
                prepend-icon="mdi-home"
                rows="2"
                outlined
              ></v-textarea>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-text-field
                v-model="profile.address.city"
                label="City"
                outlined
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-text-field
                v-model="profile.address.state"
                label="State/Province"
                outlined
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-text-field
                v-model="profile.address.zipCode"
                label="ZIP/Postal Code"
                outlined
              ></v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-select
                v-model="profile.address.country"
                :items="countries"
                label="Country"
                prepend-icon="mdi-earth"
                outlined
              ></v-select>
            </v-col>
            
            <!-- Business Information -->
            <v-col cols="12">
              <v-subheader class="text-h6 px-0">Business Information</v-subheader>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-select
                v-model="profile.businessType"
                :items="businessTypes"
                label="Business Type"
                prepend-icon="mdi-briefcase"
                outlined
              ></v-select>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.taxId"
                label="Tax ID / Registration Number"
                prepend-icon="mdi-card-account-details"
                outlined
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.establishedYear"
                :rules="yearRules"
                label="Established Year"
                prepend-icon="mdi-calendar"
                type="number"
                outlined
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.employeeCount"
                label="Number of Employees"
                prepend-icon="mdi-account-group"
                type="number"
                outlined
              ></v-text-field>
            </v-col>
            
            <!-- Preferences -->
            <v-col cols="12">
              <v-subheader class="text-h6 px-0">Preferences</v-subheader>
            </v-col>
            
            <v-col cols="12">
              <v-switch
                v-model="profile.preferences.emailNotifications"
                label="Email Notifications"
                color="primary"
              ></v-switch>
            </v-col>
            
            <v-col cols="12">
              <v-switch
                v-model="profile.preferences.marketingEmails"
                label="Marketing Emails"
                color="primary"
              ></v-switch>
            </v-col>
            
            <v-col cols="12">
              <v-switch
                v-model="profile.preferences.publicProfile"
                label="Public Profile Visibility"
                color="primary"
              ></v-switch>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      
      <v-card-actions class="pa-6">
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          text
          @click="resetForm"
          :disabled="loading"
        >
          Reset
        </v-btn>
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="!valid"
          @click="updateProfile"
        >
          Update Profile
        </v-btn>
      </v-card-actions>
    </v-card>
    
    <!-- Success Snackbar -->
    <v-snackbar
      v-model="showSuccess"
      color="success"
      timeout="3000"
      top
    >
      Profile updated successfully!
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="showSuccess = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    
    <!-- Error Snackbar -->
    <v-snackbar
      v-model="showError"
      color="error"
      timeout="5000"
      top
    >
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="showError = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'PublisherProfileUpdate',
  
  data() {
    return {
      valid: false,
      loading: false,
      showSuccess: false,
      showError: false,
      errorMessage: '',
      
      profile: {
        companyName: '',
        publisherCode: '',
        description: '',
        email: '',
        phone: '',
        website: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        },
        businessType: '',
        taxId: '',
        establishedYear: null,
        employeeCount: null,
        preferences: {
          emailNotifications: true,
          marketingEmails: false,
          publicProfile: true
        }
      },
      
      originalProfile: {},
      
      countries: [
        'United States',
        'Canada',
        'United Kingdom',
        'Germany',
        'France',
        'Australia',
        'Japan',
        'India',
        'Brazil',
        'Mexico'
      ],
      
      businessTypes: [
        'Corporation',
        'LLC',
        'Partnership',
        'Sole Proprietorship',
        'Non-Profit',
        'Government',
        'Other'
      ],
      
      // Validation rules
      companyNameRules: [
        v => !!v || 'Company name is required',
        v => (v && v.length >= 2) || 'Company name must be at least 2 characters'
      ],
      
      publisherCodeRules: [
        v => !!v || 'Publisher code is required',
        v => (v && v.length >= 3) || 'Publisher code must be at least 3 characters',
        v => /^[A-Z0-9_-]+$/i.test(v) || 'Publisher code can only contain letters, numbers, hyphens and underscores'
      ],
      
      descriptionRules: [
        v => !v || v.length <= 500 || 'Description must be less than 500 characters'
      ],
      
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      
      phoneRules: [
        v => !v || /^[\d\s\-+()]+$/.test(v) || 'Phone number format is invalid'
      ],
      
      websiteRules: [
        v => !v || /^https?:\/\/.+\..+/.test(v) || 'Website must be a valid URL (include http:// or https://)'
      ],
      
      yearRules: [
        v => !v || (v >= 1800 && v <= new Date().getFullYear()) || 'Please enter a valid year'
      ]
    }
  },
  
  mounted() {
    this.loadProfile()
  },
  
  methods: {
    async loadProfile() {
      this.loading = true
      try {
        // Simulate API call to load existing profile
        await this.delay(1000)
        
        // Mock data - replace with actual API call
        const mockProfile = {
          companyName: 'Acme Publishing Co.',
          publisherCode: 'ACME_PUB_001',
          description: 'Leading digital publishing company specializing in educational content.',
          email: 'contact@acmepublishing.com',
          phone: '+1-555-123-4567',
          website: 'https://www.acmepublishing.com',
          address: {
            street: '123 Publishing Street\nSuite 456',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States'
          },
          businessType: 'Corporation',
          taxId: '12-3456789',
          establishedYear: 2010,
          employeeCount: 150,
          preferences: {
            emailNotifications: true,
            marketingEmails: false,
            publicProfile: true
          }
        }
        
        this.profile = { ...mockProfile }
        this.originalProfile = { ...mockProfile }
        
      } catch (error) {
        this.showErrorMessage('Failed to load profile data')
      } finally {
        this.loading = false
      }
    },
    
    async updateProfile() {
      if (!this.$refs.form.validate()) {
        return
      }
      
      this.loading = true
      try {
        // Simulate API call
        await this.delay(2000)
        
        // Here you would make the actual API call
        // const response = await this.$http.put('/api/publisher/profile', this.profile)
        
        this.originalProfile = { ...this.profile }
        this.showSuccess = true
        
      } catch (error) {
        this.showErrorMessage('Failed to update profile. Please try again.')
      } finally {
        this.loading = false
      }
    },
    
    resetForm() {
      this.profile = { ...this.originalProfile }
      this.$refs.form.resetValidation()
    },
    
    showErrorMessage(message) {
      this.errorMessage = message
      this.showError = true
    },
    
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  
  computed: {
    hasChanges() {
      return JSON.stringify(this.profile) !== JSON.stringify(this.originalProfile)
    }
  },
  
  watch: {
    profile: {
      deep: true,
      handler() {
        // You can add auto-save functionality here if needed
      }
    }
  }
}
</script>

<style scoped>
.v-subheader {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87);
}

.v-card-title {
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  color: white;
}

.v-card-title .v-icon {
  color: white;
}
</style>