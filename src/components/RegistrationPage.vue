
<template>

  <v-container>

    <v-app-bar app color="#8D6E63" dark>
      <v-toolbar-title class="storename">Magic Margins</v-toolbar-title>
     
      <v-spacer></v-spacer>
      <v-btn class="navtext">Home</v-btn>
      <v-btn class="navtext">About</v-btn>
      <v-btn class="navtext">Service</v-btn>
      <v-btn class="navtext">Contact</v-btn>
    </v-app-bar>

    <!-- Dialog for selecting registration type -->
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Select Registration Type</v-card-title>
        <v-card-text>
          <v-btn block class="mb-3" color="primary" @click="selectType('publisher')">
            Register as Publisher
          </v-btn>
          <v-btn block color="secondary" @click="selectType('user')">
            Register as User
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Show respective form based on selection -->
    <publisher-registration v-if="selectedType === 'publisher'" />
    <user-registration v-if="selectedType === 'user'" />
  </v-container>
</template>

<script>
import PublisherRegistration from "@/components/PublisherRegistration.vue";
import UserRegistration from "@/components/UserRegistration.vue";

export default {
  components: { PublisherRegistration, UserRegistration },
  data() {
    return {
      dialog: true, // Show dialog initially
      selectedType: null, // Store selected type
    };
  },
  methods: {
    selectType(type) {
      this.selectedType = type;
      this.dialog = false; // Close dialog
    },
  },
};
</script>

<style scoped>
v-container{
  background-image: url("../assets/regbackground.png");
}
</style>





