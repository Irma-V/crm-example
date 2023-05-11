import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
// import dateFilter from "./filters/date.filter";

const app = createApp(App)
app.use(store)
app.use(router)
// app.filter('date', dateFilter)

app.mount("#app");
// .use(dateFilter)
