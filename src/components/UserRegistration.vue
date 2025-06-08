<template>
  <v-container class="maincontainer">
    <v-card class="pa-5 mx-auto head_div" max-width="500" elevation="3">
      <v-card-title class="text-h5 text-center logincard">
        <v-icon large color="primary" class="mr-2">mdi-account-plus</v-icon>
        User Registration
      </v-card-title>

      <v-form ref="form" v-model="isValid" @submit.prevent="register">
        <!-- Username -->
        <v-text-field
          v-model="user.username"
          label="Username"
          prepend-icon="mdi-account"
          variant="outlined"
          :rules="[rules.required]"
          required
        />

        <!-- Email -->
        <v-text-field
          v-model="user.email"
          label="Email"
          prepend-icon="mdi-email"
          variant="outlined"
          type="email"
          :rules="[rules.required, rules.email]"
          required
        />

        <!-- Phone -->
        <v-text-field
          v-model="user.phone"
          label="Phone"
          prepend-icon="mdi-phone"
          variant="outlined"
          type="tel"
          :rules="[rules.required, rules.phone]"
          required
        />

        <!-- Password -->
        <v-text-field
          v-model="user.password"
          label="Password"
          prepend-icon="mdi-lock"
          variant="outlined"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :rules="[rules.required, rules.minLength]"
          required
        />

        <!-- Confirm Password -->
        <v-text-field
          v-model="user.confirmPassword"
          label="Confirm Password"
          prepend-icon="mdi-lock-check"
          variant="outlined"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showConfirmPassword = !showConfirmPassword"
          :rules="[rules.required, rules.passwordMatch]"
          required
        />

        <!-- Register Button -->
        <v-btn
          block
          color="primary"
          size="large"
          type="submit"
          class="mt-4"
          :loading="loading"
          :disabled="!isValid || loading"
        >
          <v-icon left>mdi-account-plus</v-icon>
          Register
        </v-btn>

   

      </v-form>

      <!-- Snackbar for notifications -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="1000"
      >
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn
            color="white"
            variant="text"
            @click="snackbar.show = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'UserRegistration',
  data() {
    return {
      isValid: false,
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      user: {
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        roleid: 3 // Default role for user
      },
      snackbar: {
        show: false,
        text: "",
        color: "success"
      },
      rules: {
        required: (v) => !!v || "This field is required",
        email: (v) => /\S+@\S+\.\S+/.test(v) || "Enter a valid email",
        phone: (v) => /^\d{10}$/.test(v) || "Phone must be 10 digits",
        minLength: (v) => v.length >= 6 || "Minimum 6 characters required",
        passwordMatch: (v) =>
          v === this.user.password || "Passwords do not match",
      },
    };
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const userData = {
            username: this.user.username,
            email: this.user.email,
            phone: this.user.phone,
            password: this.user.password,
            roleid: this.user.roleid
          };

          const success = await this.$store.dispatch('user/userRegistration', userData);
          
          if (success) {
            this.showSnackbar('Registration successful!', 'success');
            this.resetForm();
            setTimeout(() => {
              this.$router.push('/userhomepage');
            }, 1000);
          } else {
            this.showSnackbar('Registration failed. Please try again.', 'error');
          }
        } catch (error) {
          console.error('Registration failed:', error);
          this.showSnackbar('Registration failed. Please try again.', 'error');
        } finally {
          this.loading = false;
        }
      }
    },
    showSnackbar(text, color) {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
    resetForm() {
      this.$refs.form.reset();
      this.user = {
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        roleid: 3
      };
    }
  }
};
</script>

<style scoped>
.maincontainer {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  overflow: hidden;
  padding: 16px;
}

.head_div {
  width: 100%;
  background-color: white;
  border-radius: 8px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
}

.logincard {
  margin-bottom: 24px;
  color: #1976D2;
  font-weight: bold;
}
</style>