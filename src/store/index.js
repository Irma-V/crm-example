import { createStore } from "vuex";
import { auth } from "@/main";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
const store = createStore({
  state: {
    user: {
      loggedIn: false, // сообщает нам, прошел ли пользователь аутентификацию или нет
      data: null, // Свойство data содержит информацию о вошедшем в систему пользователе (содержимое объекта formData)
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    async register(context, { email, password, name }) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (response) {
        context.commit("SET_USER", response.user);
        // выдает ошибку updateProfile is not a function (Firebase) даже при импорте данной ф-ии
        // console.log(usr);
        //  updateProfile({ displayName: name });
      } else {
        throw new Error("Unable to register user");
      }
    },

    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("SET_USER", response.user);
        console.log(context);
      } else {
        throw new Error("login failed");
      }
    },

    async logOut(context) {
      await signOut(auth);
      context.commit("SET_USER", null);
    },

    async fetchUser(context, user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        context.commit("SET_USER", null);
      }
    },
  },
  modules: {
    // auth
  },
});

export default store;
