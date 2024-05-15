import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export function login({ email, password }) {
  console.log(email, password);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
}
