import { Login } from "./components/login.js";
import { Chat } from "./components/chat.js";

const app = document.getElementById("app");

const setScreen = ($container) => {
  app.innerHTML = "";
  app.appendChild($container);
};

firebase.auth().onAuthStateChanged((user) => {
  if (user !== null) {
    const chatScreen = new Chat();
    setScreen(chatScreen.$container);
  } else {
    const loginScreen = new Login();
    setScreen(loginScreen.$container);
  }
});

export { setScreen };
