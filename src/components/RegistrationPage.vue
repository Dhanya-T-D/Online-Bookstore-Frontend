<template>
  <div class="maincontainer">
    <nav id="menu">
        <router-link to="" class="links"> Home </router-link>
        <router-link to="" class="links"> About </router-link>
        <router-link to="" class="links"> Service </router-link>
        <router-link to="" class="links"> Contact </router-link>

    
    </nav>

    <!-- -------------form ------------------------------------>
    <v-row justify="center">
    <v-col
      cols="12"
      lg="6"
      md="8"
      sm="10"
    >
      <v-card ref="form"  class="card1">
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="name"
            :error-messages="errorMessages"
            :rules="[() => !!name || 'This field is required']"
            label="Full Name"
            placeholder="John Doe"
            required
          ></v-text-field>
          <v-text-field
            ref="address"
            v-model="address"
            :rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
              addressCheck
            ]"
            counter="25"
            label="Address Line"
            placeholder="Snowy Rock Pl"
            required
          ></v-text-field>
          <v-text-field
            ref="city"
            v-model="city"
            :rules="[() => !!city || 'This field is required', addressCheck]"
            label="City"
            placeholder="El Paso"
            required
          ></v-text-field>
          <v-text-field
            ref="state"
            v-model="state"
            :rules="[() => !!state || 'This field is required']"
            label="State/Province/Region"
            placeholder="TX"
            required
          ></v-text-field>
          <v-text-field
            ref="zip"
            v-model="zip"
            :rules="[() => !!zip || 'This field is required']"
            label="ZIP / Postal Code"
            placeholder="79938"
            required
          ></v-text-field>
          <v-autocomplete
            ref="country"
            v-model="country"
            :items="countries"
            :rules="[() => !!country || 'This field is required']"
            label="Country"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn variant="text">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              location="left"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  v-bind="props"
                  @click="resetForm"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
            color="primary"
            variant="text"
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </div>
</template>


<script>
  export default {
    data: () => ({
      countries: [ 'Yemen', 'Zambia', 'Zimbabwe'],
      errorMessages: '',
      name: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      country: null,
      formHasErrors: false,
    }),

    computed: {
      form () {
        return {
          name: this.name,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
          country: this.country,
        }
      },
    },

    watch: {
      name () {
        this.errorMessages = ''
      },
    },

    methods: {
      addressCheck () {
        this.errorMessages = this.address && !this.name
          ? `Hey! I'm required`
          : ''

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      },
    },
  }
</script>

<style>
nav{
  height: 50px;
  /* align-content: center; */
  text-align: right;
}
#menu{
  position: fixed;
    top: 0px;
    background-color: #2c3e47;
    width: 100%;
    margin-top: 0px;
}
.links {
    display: inline;
    padding-right: 50px;
    font-size: 20px;
    color: white;
    text-decoration: none;
}
.links:hover{
    font-size: 22px;
    color: #FFAB91;
}
.register{
  font-size:small;
  margin-right: 25px;
}
#pub{
  margin-left:100px;
}


.card1{
  margin-top: 90px;
}
</style>