import { InputGroup } from "./shared/inputGroup.js";

class Register {
  $container = document.createElement("div");
  $txtTitle = document.createElement("div");

  $form = document.createElement("form");
  $inputGroupEmail = new InputGroup("Email", "email");
  $inputGroupDisplayName = new InputGroup("Display Name", "text");
  $inputGroupPassword = new InputGroup("Password", "password");
  $inputGroupConfirmPassword = new InputGroup("Confirm Password", "password");

  $btnRegister = document.createElement("button");
  $btnGoToLogin = document.createElement("div");

  constructor() {
    this.$container.classList.add("center", "w-100", "h-100", "background");

    const $cardContainer = document.createElement("div");
    $cardContainer.classList.add("card");
    this.$container.appendChild($cardContainer);
    $cardContainer.appendChild(this.$form);
    $cardContainer.classList.add("register-card-container");

    this.$txtTitle.innerHTML = "Register";
    this.$txtTitle.classList.add("register-title");

    this.$form.appendChild(this.$txtTitle);
    this.$form.appendChild(this.$inputGroupEmail.$container);
    this.$form.appendChild(this.$inputGroupDisplayName.$container);
    this.$form.appendChild(this.$inputGroupPassword.$container);
    this.$form.appendChild(this.$inputGroupConfirmPassword.$container);
    this.$form.addEventListener("submit", this.handleSubmit);

    this.$btnRegister.innerHTML = "Register";
    this.$btnRegister.type = "submit";
    this.$btnRegister.classList.add("btn", "btn-primary");
    this.$btnGoToLogin.innerHTML = "Go to Login";
    this.$btnGoToLogin.type = "button";
    this.$btnGoToLogin.classList.add("link");

    this.$form.appendChild(this.$btnRegister);
    const $hr = document.createElement("hr");
    this.$form.appendChild($hr);
    this.$form.appendChild(this.$btnGoToLogin);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const email = this.$inputGroupEmail.getValue();
    const displayName = this.$inputGroupDisplayName.getValue();
    const password = this.$inputGroupPassword.getValue();
    const confirmPassword = this.$inputGroupConfirmPassword.getValue();
    if (!email) {
      this.$inputGroupEmail.setErrorMessage("Email cannot be empty!");
    } else {
      this.$inputGroupEmail.setErrorMessage("");
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            alert("Please check your inbox!");
          });
      });
  };
}

export { Register };
