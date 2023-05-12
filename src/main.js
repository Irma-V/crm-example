import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
// import dateFilter from "./filters/date.filter";
import messagePlugin from "@/utils/message.plugin";

const app = createApp(App);
app.use(store);
app.use(router);
// app.filter('date', dateFilter);
app.use(messagePlugin);
app.mount("#app");
// .use(dateFilter)
