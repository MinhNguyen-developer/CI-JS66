class TitleBar {
  name;

  $container = document.createElement("div");
  $txtName = document.createElement("span");
  $btnLogout = document.createElement("button");

  constructor() {
    this.$txtName.innerHTML = "Please choose a conversation ...";
    this.$txtName.classList.add("title-bar-txt-title");
    this.$btnLogout.innerHTML = "Logout";
    this.$btnLogout.addEventListener("click", this.handleLogout);
    this.$btnLogout.classList.add("btn", "btn-secondary");

    this.$container.classList.add("title-bar-container");
    this.$container.appendChild(this.$txtName);
    this.$container.appendChild(this.$btnLogout);
  }

  setName = (name) => {
    this.name = name;
    this.$txtName.innerHTML = name;
  };

  handleLogout = () => {
    firebase.auth().signOut();
  };
}

export { TitleBar };
