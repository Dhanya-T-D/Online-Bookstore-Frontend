<template>
  
  <v-container class="maincontainer ">
    <v-card class="pa-5 mx-auto head_div" max-width="500" >
      <v-card-title class="text-h5 text-center logincard">User Registration</v-card-title>

      <v-form ref="form" v-model="isValid">
        <!-- Username -->
        <v-text-field
          v-model="user.username"
          label="Username"
          variant="outlined"
          :rules="[rules.required]"
          required
        />

        <!-- Email -->
        <v-text-field
          v-model="user.email"
          label="Email"
          variant="outlined"
          type="email"
          :rules="[rules.required, rules.email]"
          required
        />

        <!-- Phone -->
        <v-text-field
          v-model="user.phone"
          label="Phone"
          variant="outlined"
          type="tel"
          :rules="[rules.required, rules.phone]"
          required
        />

        <!-- Password -->
        <v-text-field
          v-model="user.password"
          label="Password"
          variant="outlined"
          type="password"
          :rules="[rules.required, rules.minLength]"
          required
        />

        <!-- Confirm Password -->
        <v-text-field
          v-model="user.confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          :rules="[rules.required, rules.passwordMatch]"
          required
        />

        <!-- Register Button -->
        <v-btn
          block
          color="primary"
          class="mt-3"
          :disabled="!isValid"
          @click="register"
        >
          Register
        </v-btn>
      </v-form>
    </v-card>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      isValid: false, // Form validation status
      user: {
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
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
    register() {
      if (this.$refs.form.validate()) {
        alert("User registered successfully!");
        // Handle registration logic here (e.g., API call)
      }
    },
  },
};
</script>

<style scoped>

/* .cardbg{
  background-image: url(../assets/regbackground.png);
  width: 100vw;
} */
</style>