import { auth, database } from "@/main";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { ref, set } from "firebase/database";

export default {
  state: {
    user: {
      loggedIn: false, // сообщает нам, прошел ли пользователь аутентификацию или нет
      data: null, // Свойство data содержит информацию о вошедшем в систему пользователе (например, содержимое объекта formData)
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    // SET_LOGGED_IN устанавливает для свойства loggedIn в state.user значение, которое было передано ему.
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    // SET_USER вносит изменения в свойство данных state.user
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    async register(context, { email, password, name }) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //   console.log(response.user);

      if (response) {
        context.commit("SET_USER", response.user);
        updateProfile(response.user, { displayName: name });
        // console.log(response.user); /* содержимое экземпляра user */

        // /* выдает ошибку updateProfile is not a function (Firebase) даже при импорте данной ф-ии */
        // // response.user.updateProfile({displayName: name})

        // /* ош: Cannot destructure property 'displayName' of 'undefined' as it is undefined. */
        // // await updateProfile({ displayName: name });
        // // console.log(displayName); /* до данной строчки обработчик не доходит. */

        // /* заполнит displayName, но не обновит значение */
        // // response.user.displayName = name;

        const uid = response.user.uid;
        set(ref(database, `users/${uid}/info`), {
          bill: 10000,
          userName: name,
        });
      } else {
        throw new Error("Unable to register user");
      }
    },

    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      //   console.log(response.user);  /* содержимое экземпляра user */
      if (response) {
        context.commit("SET_USER", response.user);
      } else {
        throw new Error("login failed");
      }
    },

    getUid() {
      const user = auth.currentUser;
      return user.uid;
    },

    async logOut(context) {
      await signOut(auth);
      context.commit("SET_USER", null);
      context.commit("clearInfo");
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
};
