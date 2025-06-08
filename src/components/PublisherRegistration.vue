
<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title class="text-h5">Publisher Registration</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Publisher Name" v-model="name"  class="custom-label" :rules="[rules.required]"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Phone" v-model="phone" :rules="[rules.required, rules.phone]"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Email" v-model="email" :rules="[rules.required, rules.email]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="License Number" v-model="licenseNumber" :rules="[rules.required]"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Address Line" v-model="addressLine" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Street" v-model="street" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Pincode" v-model="pincode"  :rules="[rules.required, rules.pincode]"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="District" v-model="district" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="State" v-model="state" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Country" v-model="country" :rules="[rules.required]"/>
            </v-col>

            <!-- --- text field for password with eye  -->
            <v-col cols="12" md="6">
              <v-text-field label="Password" :type="visible ? 'text' : 'password'" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" 
              v-model="password"
              @click:append-inner="visible = !visible"
               :rules="[rules.required, rules.password]" />
            </v-col>


            <v-col cols="12" md="6">
              <v-text-field label="Confirm Password" :type="visible ? 'text' : 'password'" v-model="confirmPassword" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="visible = !visible"
              :rules="[rules.required, rules.confirmPassword]" />
            </v-col>
             <v-col cols="12" md="6">
              <v-file-input label="License Image" v-model="licenseImage" accept="image/*" :rules="[rules.required]" />
            </v-col> 


          </v-row>
      
          <v-btn color="primary" block class="mt-4" @click="onSubmit">Register</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h6"> Registration Pending </v-card-title>
          <v-card-text>
            Your registration request is pending. Please wait for approval.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="showDialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
  export default{
    data :() => ({
        name:'',
      phone:'',
      email:'',
      addressLine:'',
      street:'',
      pincode:'',
      district:'',
      state:'',
      country:'',
      password:'',
      confirmPassword:'',
      licenseNumber:'',
      visible:false,
      sFormValid: false,
      
      rules : {
  required: (value) => !!value || "Required",
  email: (value) =>
    /.+@.+\..+/.test(value) || "Enter a valid email",
  phone: (value) =>
    /^\d{10}$/.test(value) || "Enter a valid 10-digit phone number",
  pincode: (value) =>
    /^\d{6}$/.test(value) || "Enter a valid 6-digit pincode",
  password: (value) =>
    (value && value.length >= 6) || "Password must be at least 6 characters",
  confirmPassword: (value) =>
    value !== value.password || "Passwords must match",
},
showDialog: false,

    }),

    methods:{
     
async onSubmit() {
  const isValid = await this.$refs.form.validate()
      
      if (!isValid) {
        return
      }
  const payload = {
    "pub_name":this.name,
    "phone":this.phone,
    "email":this.email,
    "address":{
            "addressline":this.addressLine,
            "street":this.street,
            "pincode":this.pincode,
            "district":this.district,
            "state":this.state,
            "country":this.country
    },
    "password":this.password,
    "license_no":this.licenseNumber,
    
  }
  try{
          const res = await this.$store.dispatch('publisher/pubReg',payload)
          if(res) {
            alert("Registration Successful!!!!");
            
            this.name = '',
            this.phone = '',
            this.email = '',
               this.addressLine = '',
               this.street = '', 
               this.pincode = '',
               this.district = '',
                this.state = '',
               this.country = '',
        this.password = '',
        this.licenseNumber = ''

          }else{
            console.log('error');
            
            
          }
        }catch(error){
          // alert("Invalid login details")
          console.error(error);
        }
        
}
    }
  }
</script>



<style scoped>

</style>
