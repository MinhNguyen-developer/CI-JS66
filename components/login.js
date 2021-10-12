import { InputGroup } from "./shared/inputGroup.js";
import { setScreen } from "../index.js";
import { Register } from "./register.js";

class Login {
  $container = document.createElement("div");
  $txtTitle = document.createElement("div");

  $form = document.createElement("form");
  $inputGroupEmail = new InputGroup("Email", "email");
  $inputGroupPassword = new InputGroup("Password", "password");

  $btnLogin = document.createElement("button");
  $btnGoToRegister = document.createElement("div");

  constructor() {
    this.$txtTitle.innerHTML = "Login";
    this.$txtTitle.classList.add("login-title");

    this.$btnLogin.innerHTML = "Login";
    this.$btnLogin.classList.add("btn", "btn-primary");
    this.$btnGoToRegister.innerHTML = "Go to Register";
    this.$btnGoToRegister.classList.add("link");
    this.$btnGoToRegister.addEventListener("click", this.handleGoToRegister);

    this.$container.classList.add("center", "w-100", "h-100", "background");

    const $cardContainer = document.createElement("div");
    $cardContainer.classList.add("card", "login-card-container");
    $cardContainer.appendChild(this.$form);

    this.$container.appendChild($cardContainer);

    this.$form.classList.add("justify-center", "flex-col");

    this.$form.appendChild(this.$txtTitle);
    this.$form.appendChild(this.$inputGroupEmail.$container);
    this.$form.appendChild(this.$inputGroupPassword.$container);

    this.$form.appendChild(this.$btnLogin);
    const $hr = document.createElement("hr");
    this.$form.appendChild($hr);
    this.$form.appendChild(this.$btnGoToRegister);

    this.$form.addEventListener("submit", this.handleSubmit);
  }

  handleGoToRegister = () => {
    const registerScreen = new Register();
    setScreen(registerScreen.$container);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const email = this.$inputGroupEmail.getValue();
    const password = this.$inputGroupPassword.getValue();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
      });
  };
}

export { Login };
