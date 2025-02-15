import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap";
import store from './store'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')
