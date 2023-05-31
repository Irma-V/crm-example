import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
// import dateFilter from "./filters/date.filter";
import Loader from '@/components/app/Loader';

import messagePlugin from "@/utils/message.plugin";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAITusZAn6_V_yz_UlNf3SNmnwNFWBRLD8",
    authDomain: "crm-example-67f6a.firebaseapp.com",
    projectId: "crm-example-67f6a",
    storageBucket: "crm-example-67f6a.appspot.com",
    messagingSenderId: "944080150353",
    appId: "1:944080150353:web:37cd566c2130b84b19bd70"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

createApp(App).use(store).use(router).use(messagePlugin).component('Loader', Loader).mount("#app");

const auth = getAuth();
export { app, database, auth };

// const app = createApp(App);
// app.use(store);
// app.use(router);
// // app.filter('date', dateFilter);
// app.use(messagePlugin);
// app.mount("#app");
// // .use(dateFilter)
