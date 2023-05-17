// import {
//   getAuth,
//   //   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import {firebase} from 'firebase/app'
// const auth = getAuth();

// export default {
//   actions: {
//     // createUser() {
//     //   createUserWithEmailAndPassword(auth, email, password)
//     //     .then((userCredential) => {
//     //       // Signed in
//     //       const user = userCredential.user;
//     //       // ...
//     //     })
//     //     .catch((error) => {
//     //       const errorCode = error.code;
//     //       const errorMessage = error.message;
//     //       // ..
//     //     });
//     // },

//     async login({ dispatch, commit }, { email, password }) {
//     //   await signInWithEmailAndPassword(auth, email, password)
//     //     .then((userCredential) => {
//     //       // Signed in
//     //       const user = userCredential.user;
//     //       // ...
//     //     })
//     //     .catch((error) => {
//     //       const errorCode = error.code;
//     //       const errorMessage = error.message;
//     //     });
        
//         try {
//             await signInWithEmailAndPassword(auth, email, password)
//         } catch (error) {
//             throw error
//         }
//     },
//   },
// };
