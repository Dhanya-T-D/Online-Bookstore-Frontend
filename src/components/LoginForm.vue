<template>
  <div class="maindiv pt-5">


<div class="carddiv">
    <v-card
      class="mx-auto pa-12 pb-8  maincard"
      elevation="8"
      max-width="380"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis text-start">Username</div>

      <v-text-field
        density="compact"
        v-model="email"
        placeholder="Enter your email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        v-model="password"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <!-- <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text> -->
      </v-card>

      <v-btn
        class="mb-8"
        color="blue-grey-darken-4"
        size="large"
        variant="tonal"
        @click="submit()"
        block
      >
        Login
      </v-btn>

      <v-card-text class="text-center">

        <router-link to="/reg"> Sign up now <v-icon icon="mdi-chevron-right"></v-icon></router-link>
      </v-card-text>
    </v-card>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    data: () => ({
      visible: false,
      email:'',
      password:''
    }),
    methods:{
      async submit() {
        const payload = {
          'email': this.email,
          'password' : this.password
        }
        try{
          const res = await this.$store.dispatch('login',payload)
          if(res) {
            if(this.Role === 'publisher'){
              // this.$router.push('/publisherhome');
              this.$router.push({name:'publisher-home'})

            }else if(this.Role === 'user'){
              this.$router.push('/userhomepage')
              // alert('admin logined');
            }
            else{
              this.$router.push('/adminhomepage')
            }

          }else{
            alert('Something went wrong');
            console.log('error');
            
            
          }
        }catch(error){
          alert("Invalid login details")
          console.error(error);
        }
      }
    },
    computed : {
      ...mapGetters(['getRole']),
      Role(){
        return this.getRole;
      }
    }
  }
</script>

<style>
.maindiv{
  height:550px;
  background-repeat: no-repeat;
  backface-visibility: hidden;
}

.carddiv{
  margin-left: 200px;
  margin-top: 0px;
  background-color: aqua;
}

</style>