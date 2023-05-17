import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
// import dateFilter from "./filters/date.filter";
import messagePlugin from "@/utils/message.plugin";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9woz4HLjKP9KuofGvpNabDpravteUE1o",
  authDomain: "crm-example-1421f.firebaseapp.com",
  projectId: "crm-example-1421f",
  storageBucket: "crm-example-1421f.appspot.com",
  messagingSenderId: "789736613481",
  appId: "1:789736613481:web:2a018c583bee54f0e0a4f8",
};

const app = initializeApp(firebaseConfig);

createApp(App).use(store).use(router).use(messagePlugin).mount("#app");

const auth = getAuth();
export { app, auth };

// const app = createApp(App);
// app.use(store);
// app.use(router);
// // app.filter('date', dateFilter);
// app.use(messagePlugin);
// app.mount("#app");
// // .use(dateFilter)
