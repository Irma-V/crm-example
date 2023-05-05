import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min';
// import 'assets/index.css';

createApp(App).use(store).use(router).mount('#app')