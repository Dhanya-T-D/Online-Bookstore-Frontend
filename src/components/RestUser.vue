<template>
    <v-app>
      <!-- Navigation -->
      <v-app-bar 
        fixed 
        :class="{ 'navbar-custom': scrolled }"
        :elevation="scrolled ? 8 : 0"
        height="80"
      >
        <v-container class="d-flex align-center">
          <v-app-bar-title class="text-deep-orange text-h4 font-weight-bold text-amber-accent-3">
            <i class="fas fa-utensils mr-2"></i>
            Bella Vista
          </v-app-bar-title>
          
          <v-spacer></v-spacer>
          
          <v-btn-group variant="text" class="d-none d-md-flex" >
            <v-btn @click="scrollToSection('hero')" class="text-black font-weight-bold">HOME</v-btn>
            <v-btn @click="scrollToSection('about')" class="text-black font-weight-bold">About</v-btn>
            <v-btn @click="scrollToSection('menu')" class="text-black font-weight-bold">Menu</v-btn>
            <v-btn @click="scrollToSection('contact')" class="text-black font-weight-bold">Contact</v-btn>
          </v-btn-group>
          
          <v-btn 
            class="reservation-btn ml-4 pulse-animation" 
            size="large"
            @click="openReservation"
          >
            <i class="fas fa-calendar-plus mr-2"></i>
            Reserve Now
          </v-btn>
          
                 <!-- Add Profile Menu -->
        <v-menu>
          <template  v-slot:activator="{ props }">
            <v-btn  icon v-bind="props" class="ml-4 ">
              <v-avatar color="amber-accent-3" size="40">

                <v-icon>mdi-account</v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="openProfile">
              <v-list-item-title>
                <v-icon start>mdi-account-edit</v-icon>
                Edit Profile
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="openOrderHistory">
              <v-list-item-title>
                <v-icon start>mdi-history</v-icon>
                Order History
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>
                <v-icon start>mdi-logout</v-icon>
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
          
          <!-- Mobile Menu -->
          <v-app-bar-nav-icon 
            class="d-md-none text-white" 
            @click="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-container>
      </v-app-bar>
  
      <!-- Mobile Navigation Drawer -->
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
          <v-list-item @click="scrollToSection('hero')">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="scrollToSection('about')">
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <v-list-item @click="scrollToSection('menu')">
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item>
          <v-list-item @click="scrollToSection('contact')">
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <!-- Hero Section -->
        <section id="hero" class="hero-section">
          <div class="hero-content fade-in">
            <h1 class="text-h1 font-weight-bold mb-4">
              Welcome to Bella Vista
            </h1>
            <p class="text-h5 mb-8 text-grey-lighten-2">
              Experience culinary excellence in an atmosphere of elegance
            </p>
            <v-row justify="center" class="mt-8">
              <v-col cols="auto">
                <v-btn 
                  size="x-large" 
                  class="reservation-btn mr-4"
                  @click="openReservation"
                >
                  <i class="fas fa-calendar-check mr-2"></i>
                  Make Reservation
                </v-btn>
                <v-btn 
                  size="x-large" 
                  variant="outlined" 
                  color="white"
                  @click="$router.push('/foodlist')"
                >
                  <i class="fas fa-book-open mr-2"></i>
                  View Menu
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </section>
  
        <!-- Stats Section -->
        <section class="stats-section py-16">
          <v-container>
            <v-row>
              <v-col cols="12" md="3" class="text-center" v-for="stat in stats" :key="stat.label">
                <div class="fade-in">
                  <v-icon size="60" class="text-amber-accent-3 mb-4">{{ stat.icon }}</v-icon>
                  <h2 class="text-h2 font-weight-bold text-amber-accent-3">{{ stat.number }}</h2>
                  <p class="text-h6">{{ stat.label }}</p>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </section>
  
        <!-- About Section -->
        <section id="about" class="about-section py-16">
          <v-container>
            <v-row align="center">
              <v-col cols="12" md="6">
                <div class="fade-in">
                  <h2 class="text-h2 font-weight-bold text-amber-darken-2 mb-6">
                    Our Story
                  </h2>
                  <p class="text-h6 text-grey-darken-2 mb-4">
                    For over 25 years, Bella Vista has been serving exceptional cuisine 
                    crafted with passion and precision. Our commitment to using only the 
                    finest ingredients creates an unforgettable dining experience.
                  </p>
                  <p class="text-body-1 text-grey-darken-1 mb-6">
                    From our wood-fired oven to our carefully curated wine selection, 
                    every detail is designed to transport you to the heart of culinary excellence.
                  </p>
                  <v-btn class="reservation-btn" size="large">
                    <i class="fas fa-info-circle mr-2"></i>
                    Learn More
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="floating-card" elevation="12">
                  <div style="height: 400px; background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%); display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-chef-hat" style="font-size: 120px; color: white; opacity: 0.8;"></i>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </section>
  
        <!-- Menu Highlights -->
        <section id="menu" class="py-16">
          <v-container>
            <div class="text-center mb-12 fade-in">
              <h2 class="text-h2 font-weight-bold text-amber-darken-2 mb-4">
                Signature Dishes
              </h2>
              <p class="text-h6 text-grey-darken-1">
                Discover our chef's most celebrated creations
              </p>
            </div>
            
            <v-row>
              <v-col cols="12" md="4" v-for="dish in menuHighlights" :key="dish.name">
                <v-card class="menu-item-card floating-card h-100" elevation="8">
                  <div style="height: 250px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); display: flex; align-items: center; justify-content: center;">
                    <i :class="dish.icon" style="font-size: 80px; color: #d4af37;"></i>
                  </div>
                  <v-card-title class="text-h5 font-weight-bold text-amber-darken-2">
                    {{ dish.name }}
                  </v-card-title>
                  <v-card-text>
                    <p class="text-body-1 text-grey-darken-2 mb-4">{{ dish.description }}</p>
                    <div class="d-flex justify-space-between align-center">
                      <span class="text-h5 font-weight-bold text-amber-darken-2">
                        ${{ dish.price }}
                      </span>
                      <v-rating 
                        :model-value="dish.rating" 
                        color="amber" 
                        half-increments 
                        readonly 
                        size="small"
                      ></v-rating>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            
            <div class="text-center mt-12">
              <v-btn class="reservation-btn" size="x-large" @Click=" $router.push('/foodlist')">
                <i class="fas fa-utensils mr-2"></i>
                View Full Menu

              </v-btn >
            </div>
          </v-container>
         
        </section>
  
        <!-- Contact Section -->
        <section id="contact" class="contact-section py-16">
          <v-container>
            <div class="text-center mb-12 fade-in">
              <h2 class="text-h2 font-weight-bold text-amber-accent-3 mb-4">
                Visit Us Today
              </h2>
              <p class="text-h6 text-grey-lighten-2">
                Experience the finest dining in the heart of the city
              </p>
            </div>
            
            <v-row>
              <v-col cols="12" md="4" class="text-center" v-for="contact in contactInfo" :key="contact.title">
                <div class="fade-in">
                  <v-avatar size="80" class="mb-4 bg-amber-accent-3">
                    <v-icon size="40" color="black">{{ contact.icon }}</v-icon>
                  </v-avatar>
                  <h3 class="text-h5 font-weight-bold text-amber-accent-3 mb-2">
                    {{ contact.title }}
                  </h3>
                  <p class="text-body-1 text-grey-lighten-1">{{ contact.info }}</p>
                </div>
              </v-col>
            </v-row>
            
            <div class="text-center mt-12">
              <v-btn 
                class="reservation-btn pulse-animation" 
                size="x-large"
                @click="openReservation"
              >
                <i class="fas fa-phone mr-2"></i>
                Call for Reservations
              </v-btn>
            </div>
          </v-container>
        </section>
      </v-main>
  
      <!-- Reservation Dialog -->
      <v-dialog v-model="reservationDialog" max-width="600">
        <v-card>
          <v-card-title class="text-h4 font-weight-bold text-amber-darken-2 pa-6">
            <i class="fas fa-calendar-plus mr-3"></i>
            Make a Reservation
          </v-card-title>
          <v-card-text class="pa-6">
            <v-form>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reservation.name"
                    label="Full Name"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reservation.phone"
                    label="Phone Number"
                    prepend-inner-icon="mdi-phone"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reservation.date"
                    label="Date"
                    type="date"
                    prepend-inner-icon="mdi-calendar"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reservation.time"
                    label="Time"
                    type="time"
                    prepend-inner-icon="mdi-clock"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="reservation.guests"
                    :items="[1,2,3,4,5,6,7,8]"
                    label="Number of Guests"
                    prepend-inner-icon="mdi-account-group"
                    variant="outlined"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-6">
            <v-spacer></v-spacer>
            <v-btn @click="reservationDialog = false" size="large">Cancel</v-btn>
            <v-btn class="reservation-btn ml-4" size="large" @click="submitReservation">
              <i class="fas fa-check mr-2"></i>
              Confirm Reservation
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Success Snackbar -->
      <v-snackbar v-model="successSnackbar" color="success" timeout="4000">
        <i class="fas fa-check-circle mr-2"></i>
        Reservation request submitted successfully! We'll contact you soon.
      </v-snackbar>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'RestUser',
    data() {
      return {
        profileDialog: false,
        orderHistoryDialog: false,
        drawer: false,
        scrolled: false,
        reservationDialog: false,
        successSnackbar: false,
        reservation: {
          name: '',
          phone: '',
          date: '',
          time: '',
          guests: 2
        },
        stats: [
          { icon: 'mdi-clock', number: '25+', label: 'Years of Excellence' },
          { icon: 'mdi-star', number: '4.8', label: 'Customer Rating' },
          { icon: 'mdi-chef-hat', number: '50+', label: 'Signature Dishes' },
          { icon: 'mdi-account-group', number: '1000+', label: 'Happy Customers' }
        ],
        menuHighlights: [
          {
            name: 'Truffle Risotto',
            description: 'Creamy arborio rice with black truffle, parmesan, and wild mushrooms',
            price: 32,
            rating: 4.8,
            icon: 'fas fa-seedling'
          },
          {
            name: 'Wagyu Beef Steak',
            description: 'Premium A5 wagyu with roasted vegetables and red wine reduction',
            price: 89,
            rating: 4.9,
            icon: 'fas fa-drumstick-bite'
          },
          {
            name: 'Lobster Thermidor',
            description: 'Fresh Atlantic lobster with cognac cream sauce and gruyere cheese',
            price: 65,
            rating: 4.7,
            icon: 'fas fa-fish'
          }
        ],
        contactInfo: [
          {
            title: 'Location',
            info: '123 Gourmet Street, Culinary District, City 12345',
            icon: 'mdi-map-marker'
          },
          {
            title: 'Phone',
            info: '+1 (555) 123-4567',
            icon: 'mdi-phone'
          },
          {
            title: 'Hours',
            info: 'Mon-Thu: 5PM-10PM\nFri-Sat: 5PM-11PM\nSun: Closed',
            icon: 'mdi-clock'
          }
        ]
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      this.handleScroll();
    },
    unmounted() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {

      openProfile() {
      this.profileDialog = true
    },
    openOrderHistory() {
      this.orderHistoryDialog = true
    },
    logout() {
      // Add your logout logic here
      this.$router.push('/login')
    },
      handleScroll() {
        this.scrolled = window.scrollY > 50;
      },
      scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = sectionId === 'hero' ? 0 : 80;
          const elementPosition = element.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
        this.drawer = false;
      },
      openReservation() {
        this.reservationDialog = true;
      },
      submitReservation() {
        // Here you would typically send the reservation data to your backend
        console.log('Reservation submitted:', this.reservation);
        this.reservationDialog = false;
        this.successSnackbar = true;
        
        // Reset form
        this.reservation = {
          name: '',
          phone: '',
          date: '',
          time: '',
          guests: 2
        };
      }
    }
  }
  </script>
  
  <style scoped>
  .profile{
    margin-left: 300px;
    
  }
  .hero-section {
    background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(139,69,19,0.8)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23654321" width="1200" height="600"/><circle fill="%23d2691e" cx="200" cy="150" r="50" opacity="0.3"/><circle fill="%23cd853f" cx="800" cy="400" r="80" opacity="0.2"/><rect fill="%23daa520" x="400" y="200" width="400" height="200" opacity="0.1"/></svg>');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    position: relative;
  }
  
  .hero-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 2;
  }
  
  .floating-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .floating-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
  }
  
  .menu-item-card {
    background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
    border-left: 4px solid #d4af37;
    transition: all 0.3s ease;
  }
  
  .menu-item-card:hover {
    border-left-color: #b8860b;
    transform: scale(1.02);
  }
  
  .stats-section {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
  }
  
  .about-section {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  }
  
  .contact-section {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    color: white;
  }
  
  .pulse-animation {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .fade-in {
    animation: fadeIn 0.8s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .navbar-custom {
    background: rgba(0,0,0,0.9) !important;
    backdrop-filter: blur(10px);
  }
  
  .reservation-btn {
    background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
    color: white;
    border: none;
    transition: all 0.3s ease;
  }
  
  .reservation-btn:hover {
    background: linear-gradient(135deg, #b8860b 0%, #daa520 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  }
  </style>